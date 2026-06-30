// frontend/src/features/jobs/JobsPages.js

import { api, resolveAssetUrl } from "../../shared/utils/api.js";
import {
  escape,
  fmtIDR,
  fmtDate,
  toast,
  modal,
  confirmModal,
  timeAgo,
  bindRupiahInput,
  parseIDRInput,
} from "../../shared/utils/helpers.js";
import { statusPill, avatar, jobCard, serviceTypeBadge, discoverPageHero } from "../../shared/ui/components.js";
import { initSearchFilterBar } from "../../shared/utils/search-filter-bar.js";
import {
  postTypeLocationFieldsHtml,
  initPostTypeLocationForm,
  readPostTypeLocation,
  validatePostTypeLocation,
} from "../../shared/utils/post-type-location.js";
import { store } from "../../app/store.js";
import { router } from "../../app/router.js";

function interleaveByKey(items, keyFn) {
  const buckets = new Map();
  for (const item of items) {
    const k = keyFn(item) || "x";
    if (!buckets.has(k)) buckets.set(k, []);
    buckets.get(k).push(item);
  }
  const queues = [...buckets.values()];
  const out = [];
  while (queues.some((q) => q.length)) {
    for (const q of queues) {
      if (q.length) out.push(q.shift());
    }
  }
  return out;
}

/**
 * Bidding dialog — full requirements:
 * - Show budget & allowed range (50%–150%)
 * - Cover letter (min 20 chars)
 * - Proposed price (with live range validation)
 * - Duration in days (1-30, required)
 * - Preview step before submit
 * - Self-job blocking (caller already does this)
 */
function openBidDialog(j) {
  if (!j) return;

  const minP = Math.round((j.budget || 0) * 0.5);
  const maxP = Math.round((j.budget || 0) * 1.5);
  const suggested = Math.round(j.budget || 0);
  const deadlineText = j.deadline
    ? new Date(j.deadline).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "—";

  const html = `
    <div class="bid-dialog">
      <div class="bid-info">
        <div class="bid-info-row">
          <span><i class="fa-solid fa-money-bill-wave"></i> Budget</span>
          <strong>${fmtIDR(j.budget)} <span class="text-xs text-muted">(${escape(j.budgetType || "FIXED")})</span></strong>
        </div>
        <div class="bid-info-row"><span><i class="fa-solid fa-calendar-day"></i> Deadline</span><strong>${escape(deadlineText)}</strong></div>
        <div class="bid-info-row"><span><i class="fa-solid fa-location-dot"></i> Lokasi</span><strong>${j.isOnline ? "Remote (Online)" : escape(j.location || "—")}</strong></div>
        <div class="alert alert-info mt-2"><i class="fa-solid fa-circle-info"></i> Tawaran harus antara <strong>${fmtIDR(minP)}</strong> – <strong>${fmtIDR(maxP)}</strong></div>
      </div>
      <form id="bid-form" data-testid="bid-form">
        <div class="form-group">
          <label class="label">Surat Lamaran *</label>
          <textarea class="textarea" id="bid-cover" required minlength="20" placeholder="Min 20 karakter — pengalaman & kenapa Anda cocok" data-testid="bid-cover"></textarea>
          <div class="text-xs text-muted" id="bid-cover-count">0 / min 20</div>
        </div>
        <div class="form-group">
          <label class="label">Harga Tawaran (Rp) *</label>
          <input class="input" type="number" id="bid-price" value="${suggested}" min="${minP}" max="${maxP}" step="1000" required data-testid="bid-price">
          <input type="range" id="bid-range" min="${minP}" max="${maxP}" step="1000" value="${suggested}" style="width:100%;margin-top:.5rem;accent-color:var(--primary)">
          <div class="flex-between text-xs text-muted"><span>Min: ${fmtIDR(minP)}</span><span id="bid-price-label">${fmtIDR(suggested)}</span><span>Max: ${fmtIDR(maxP)}</span></div>
        </div>
        <div class="form-group">
          <label class="label">Durasi Pengerjaan (hari) *</label>
          <input class="input" type="number" id="bid-duration" min="1" max="30" value="7" required data-testid="bid-duration">
          <div class="text-xs text-muted">Min 1 hari, max 30 hari</div>
        </div>
        <div class="flex gap-sm">
          <button class="btn btn-secondary btn-block" type="button" id="bid-preview" data-testid="bid-preview-btn"><i class="fa-solid fa-eye"></i> Preview</button>
          <button class="btn btn-primary btn-block" type="submit" data-testid="bid-submit-btn"><i class="fa-solid fa-paper-plane"></i> Kirim Lamaran</button>
        </div>
      </form>
    </div>`;

  const m = modal({ title: "Lamar Pekerjaan", body: html });
  const $ = (s) => m.el.querySelector(s);

  const sync = (src, dst) => {
    dst.value = src.value;
    $("#bid-price-label").textContent = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(parseFloat(src.value || 0));
  };

  const priceInput = $("#bid-price");
  const rangeInput = $("#bid-range");
  if (priceInput && rangeInput) {
    priceInput.addEventListener("input", (e) => sync(e.target, rangeInput));
    rangeInput.addEventListener("input", (e) => sync(e.target, priceInput));
  }

  const coverInput = $("#bid-cover");
  if (coverInput) {
    coverInput.addEventListener("input", (e) => {
      const n = e.target.value.length;
      const countEl = $("#bid-cover-count");
      if (countEl) countEl.textContent = `${n} / min 20`;
    });
  }

  const previewBtn = $("#bid-preview");
  if (previewBtn) {
    previewBtn.addEventListener("click", () => {
      const cover = $("#bid-cover")?.value.trim() || "";
      const price = parseFloat($("#bid-price")?.value) || 0;
      const dur = parseInt($("#bid-duration")?.value || "0", 10);

      if (cover.length < 20)
        return toast("Surat lamaran minimal 20 karakter", "error");
      if (price < minP || price > maxP)
        return toast(`Harga harus ${fmtIDR(minP)} – ${fmtIDR(maxP)}`, "error");
      if (dur < 1 || dur > 30) return toast("Durasi harus 1–30 hari", "error");

      toast(
        `Preview: ${fmtIDR(price)} dalam ${dur} hari. Klik "Kirim" untuk submit.`,
        "info",
        6000,
      );
    });
  }

  const form = $("#bid-form");
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const coverLetter = $("#bid-cover")?.value.trim() || "";
      const proposedPrice = parseFloat($("#bid-price")?.value) || 0;
      const proposedDuration = parseInt($("#bid-duration")?.value || "0", 10);

      if (coverLetter.length < 20)
        return toast("Surat lamaran minimal 20 karakter", "error");
      if (proposedPrice < minP || proposedPrice > maxP)
        return toast(
          `Harga harus antara ${fmtIDR(minP)} – ${fmtIDR(maxP)}`,
          "error",
        );
      if (proposedDuration < 1 || proposedDuration > 30)
        return toast("Durasi harus 1–30 hari", "error");

      const btn = $("[type=submit]");
      if (btn) {
        btn.disabled = true;
        btn.innerHTML =
          '<i class="fa-solid fa-spinner fa-spin"></i> Mengirim...';
      }

      try {
        await api.post("/applications", {
          jobId: j.id,
          coverLetter,
          proposedPrice,
          proposedDuration,
        });
        m.close();
        toast("📩 Lamaran terkirim! Pemilik lowongan merespons ±3–5 detik. Refresh halaman lalu buka Pesanan Saya jika lamaran diterima.", "success", 9000);
        router.render();
      } catch (err) {
        if (btn) {
          btn.disabled = false;
          btn.innerHTML =
            '<i class="fa-solid fa-paper-plane"></i> Kirim Lamaran';
        }
        if (err.status === 403 && err.data?.code === "VERIFICATION_REQUIRED") {
          m.close();
          toast(
            "Verifikasi email & nomor telepon dulu di Profil → Verifikasi",
            "warning",
            7000,
          );
          router.navigate("/verification");
          return;
        }
        toast(err.message, "error");
      }
    });
  }
}

export async function JobsPage({ mount, query }) {
  const u = store.getState().user;
  mount.innerHTML = `
    <div class="discover-page discover-page--jobs">
      <div class="discover-head discover-head--jobs">
        ${discoverPageHero({
          variant: "jobs",
          title: "Cari Kerja",
          subtitle:
            "Telusuri lowongan dari klien tepercaya — remote, hybrid, maupun on-site dengan budget yang transparan.",
          eyebrowIcon: "fa-briefcase",
          eyebrowLabel: "Lowongan Freelance",
          ctaHtml:
            u && u.role !== "ADMIN"
              ? `<a href="#/post-job" class="btn btn-light discover-hero__cta" data-testid="post-job-btn"><i class="fa-solid fa-plus"></i> Posting Pekerjaan</a>`
              : "",
        })}
        <div class="container discover-head__bar">
          <div class="filter-sticky-shell" id="jobs-filter-sticky-shell"></div>
        </div>
      </div>
      <div class="container page discover-page__main">
        <div id="jobs-list" class="jobs-grid" data-testid="jobs-list"></div>
      </div>
    </div>`;

  const cats = await api.get("/categories");
  const filterShell = document.getElementById("jobs-filter-sticky-shell");

  const filterBar = initSearchFilterBar({
    shellEl: filterShell,
    categories: cats,
    context: "jobs",
    initial: query,
    sortDefault: "newest",
    sortOptions: [
      { value: "newest", icon: "fa-clock", label: "Terbaru" },
      { value: "budget_desc", icon: "fa-arrow-down-wide-short", label: "Budget tertinggi" },
      { value: "budget_asc", icon: "fa-arrow-up-wide-short", label: "Budget terendah" },
    ],
    panelExtraHtml: `
      <div class="discover-field">
        <label class="discover-label" for="urgent-only">
          <i class="fa-solid fa-fire"></i> Urgensi
        </label>
        <select class="select" id="urgent-only" data-testid="jobs-urgent">
          <option value="">Semua urgensi</option>
          <option value="1">Mendesak saja</option>
        </select>
      </div>`,
    advancedHtml: `
      <div class="filter-advanced">
        <div class="filter-advanced-field">
          <label class="label">Budget (Rp)</label>
          <div class="filter-advanced-range">
            <input id="min-budget" class="input" type="text" placeholder="Min" inputmode="numeric" data-testid="jobs-min-budget">
            <span>—</span>
            <input id="max-budget" class="input" type="text" placeholder="Max" inputmode="numeric" data-testid="jobs-max-budget">
          </div>
        </div>
      </div>`,
    getExtraTags: () => {
      const tags = [];
      const min = parseIDRInput(document.getElementById("min-budget")?.value);
      const max = parseIDRInput(document.getElementById("max-budget")?.value);
      const urgent = document.getElementById("urgent-only")?.value === "1";
      if (min) tags.push({ key: "minBudget", label: `Min ${fmtIDR(min)}`, icon: "fa-coins" });
      if (max) tags.push({ key: "maxBudget", label: `Max ${fmtIDR(max)}`, icon: "fa-coins" });
      if (urgent) tags.push({ key: "urgent", label: "Mendesak", icon: "fa-fire" });
      return tags;
    },
    onClearTag: (key) => {
      if (key === "minBudget") document.getElementById("min-budget").value = "";
      if (key === "maxBudget") document.getElementById("max-budget").value = "";
      if (key === "urgent") document.getElementById("urgent-only").value = "";
    },
    onClearExtra: () => {
      ["min-budget", "max-budget"].forEach((id) => {
        const el = document.getElementById(id);
        if (el) el.value = "";
      });
      document.getElementById("urgent-only").value = "";
    },
    onChange: () => load(),
  });

  if (query.q) {
    const qEl = filterBar.getQueryEl();
    if (qEl) qEl.value = query.q;
  }

  bindRupiahInput(document.getElementById("min-budget"));
  bindRupiahInput(document.getElementById("max-budget"));

  const load = async () => {
    const params = new URLSearchParams();
    const q = filterBar.getQueryEl()?.value.trim() || "";
    if (q) params.set("q", q);
    const typeParams = filterBar.getParams();
    if (typeParams.serviceType) params.set("serviceType", typeParams.serviceType);
    if (typeParams.categoryId) params.set("categoryId", typeParams.categoryId);
    if (typeParams.location) params.set("location", typeParams.location);
    const minBudget = parseIDRInput(document.getElementById("min-budget")?.value);
    const maxBudget = parseIDRInput(document.getElementById("max-budget")?.value);
    const sortBy = filterBar.getSort() || "";
    const urgentOnly = document.getElementById("urgent-only")?.value === "1";
    if (minBudget) params.set("minBudget", minBudget);
    if (maxBudget) params.set("maxBudget", maxBudget);
    if (sortBy) params.set("sortBy", sortBy);
    if (urgentOnly) params.set("urgency", "URGENT");
    params.set("status", "OPEN");
    const list = document.getElementById("jobs-list");
    filterBar.setResultBadge("Memuat…");
    if (list) list.innerHTML = '<div class="spinner"></div>';

    try {
      const [jobsResp, myApps] = await Promise.all([
        api.get("/jobs?" + params.toString()),
        u
          ? api.get("/applications/seller").catch(() => [])
          : Promise.resolve([]),
      ]);
      const raw = Array.isArray(jobsResp) ? jobsResp : jobsResp.data || [];
      const items = interleaveByKey(raw, (j) => j.buyerId || j.buyer?.id);
      const appliedJobIds = new Set((myApps || []).map((a) => a.jobId));

      if (!items.length) {
        if (list)
          list.innerHTML = `<div class="empty"><i class="fa-solid fa-briefcase"></i><h3>Belum ada job terbuka</h3><p>Coba kata kunci lain atau ubah filter</p></div>`;
        filterBar.setResultBadge("0 lowongan", "empty");
        filterBar.refreshTags();
        return;
      }

      if (list) {
        list.innerHTML = items
          .map((j) =>
            jobCard(j, {
              isMine: u && j.buyerId === u.id,
              hasApplied: appliedJobIds.has(j.id),
            }),
          )
          .join("");
      }
      filterBar.setResultBadge(`${items.length} lowongan ditemukan`);
    } catch (e) {
      filterBar.setResultBadge("Gagal memuat", "empty");
      if (list)
        list.innerHTML = `<div class="empty"><h3>Gagal memuat</h3></div>`;
    }
  };

  load();
}

export async function PostJobPage({ mount }) {
  const cats = await api.get("/categories");

  const returnTo = sessionStorage.getItem("return_to_dashboard");

  mount.innerHTML = `
    <div class="container-sm page">
      <a href="#" id="back-link" class="back-link"><i class="fa-solid fa-arrow-left"></i> Kembali</a>
      <div class="card card-pad-lg mt-2">
        <h1>Posting Pekerjaan Baru</h1>
        <p class="text-muted">Jelaskan kebutuhan Anda agar freelancer terbaik melamar.</p>
        <form id="job-form" data-testid="post-job-form">
          <div class="form-group"><label class="label">Judul *</label><input class="input" id="title" required data-testid="job-title" placeholder="Minimal 5 karakter"></div>
          ${postTypeLocationFieldsHtml({
            typeFieldId: "postServiceType",
            categoryFieldId: "category",
            locationFieldId: "postLocation",
            categoryTestId: "job-category",
            typeLabel: "Jenis Pekerjaan",
            categoryLabel: "Sub-kategori",
            locationLabel: "Lokasi",
          })}
          <div class="form-group"><label class="label">Deskripsi *</label><textarea class="textarea" id="description" rows="5" required data-testid="job-desc" placeholder="Minimal 20 karakter"></textarea></div>
          <div class="form-group"><label class="label">Budget *</label><input class="input" id="budget" type="text" required data-testid="job-budget" inputmode="numeric" placeholder="Rp 500.000"></div>
          <div class="form-group">
            <label class="label">Deadline Pengerjaan</label>
            <input type="date" id="deadline" class="input" min="">
            <div class="text-xs text-muted">Opsional — kapan pekerjaan harus selesai? (Jika tidak diisi, dianggap fleksibel)</div>
          </div>
          <button class="btn btn-primary btn-block" type="submit" data-testid="job-submit">Posting Sekarang</button>
        </form>
      </div>
    </div>`;

  const today = new Date().toISOString().split("T")[0];
  const deadlineInput = document.getElementById("deadline");
  if (deadlineInput) deadlineInput.setAttribute("min", today);

  bindRupiahInput(document.getElementById("budget"));
  initPostTypeLocationForm(mount, { categories: cats, categoryFieldId: "category" });

  const backLink = document.getElementById("back-link");
  if (backLink) {
    backLink.addEventListener("click", (e) => {
      e.preventDefault();
      if (returnTo) {
        sessionStorage.removeItem("return_to_dashboard");
        router.navigate(returnTo);
      } else {
        router.navigate("/jobs");
      }
    });
  }

  const form = document.getElementById("job-form");
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const title = document.getElementById("title")?.value.trim();
      const typeLoc = readPostTypeLocation(mount, { categoryFieldId: "category" });
      const categoryId = typeLoc.categoryId;
      const description = document.getElementById("description")?.value.trim();
      const budget = parseIDRInput(document.getElementById("budget")?.value);
      const deadline = document.getElementById("deadline")?.value || null;

      const typeErr = validatePostTypeLocation(typeLoc, "pekerjaan");
      if (typeErr) {
        toast(typeErr, "error");
        return;
      }

      if (!title || title.length < 5) {
        toast("Judul minimal 5 karakter", "error");
        return;
      }
      if (!categoryId) {
        toast("Pilih sub-kategori", "error");
        return;
      }
      if (!description || description.length < 20) {
        toast("Deskripsi minimal 20 karakter", "error");
        return;
      }
      if (!budget || isNaN(budget) || budget < 10000) {
        toast("Budget minimal Rp 10.000", "error");
        return;
      }

      const submitBtn = form.querySelector("[type=submit]");
      submitBtn.disabled = true;
      submitBtn.innerHTML =
        '<i class="fa-solid fa-spinner fa-spin"></i> Memproses...';

      try {
        const body = {
          title,
          categoryId: categoryId,
          description,
          budget,
          location: typeLoc.location,
          isOnline: typeLoc.isOnline,
          deadline: deadline || null,
        };

        await api.post("/jobs", body);
        toast("📢 Pekerjaan berhasil dipublikasikan!", "success");

        // ✅ PERBAIKAN: Kembali ke dashboard jika dari dashboard
        if (returnTo) {
          sessionStorage.removeItem("return_to_dashboard");
          router.navigate(returnTo);
        } else {
          router.navigate("/jobs");
        }
      } catch (err) {
        console.error("Post job error:", err);
        toast(err.message || "Gagal memposting pekerjaan", "error");
        submitBtn.disabled = false;
        submitBtn.innerHTML = "Posting Sekarang";
      }
    });
  }
}

export async function JobDetailPage({ mount, params }) {
  const u = store.getState().user;
  mount.innerHTML = `<div class="container page"><div class="spinner"></div></div>`;

  try {
    const j = await api.get("/jobs/" + params.id);
    const isOwner = u && j.buyerId === u.id;
    const myApp = u && (j.applications || []).find((a) => a.sellerId === u.id);
    const alreadyApplied = !!myApp;
    let relatedOrderId = null;
    let relatedOrder = null;
    if (alreadyApplied && String(myApp?.status || "").toUpperCase() === "ACCEPTED" && u) {
      try {
        const sellerOrders = await api.get("/orders?role=SELLER");
        const orders = Array.isArray(sellerOrders) ? sellerOrders : sellerOrders.data || [];
        const match = orders.find(
          (o) => o.applicationId === myApp.id || (o.jobId === j.id && o.sellerId === u.id),
        );
        relatedOrderId = match?.id || null;
        if (relatedOrderId) {
          relatedOrder = await api.get("/orders/" + relatedOrderId).catch(() => null);
        }
      } catch {
        relatedOrderId = null;
        relatedOrder = null;
      }
    }
    const transactionDone =
      relatedOrder && String(relatedOrder.status || "").toUpperCase() === "COMPLETED";
    const isOpen = String(j.status || "").toUpperCase() === "OPEN";
    const canApply = u && !isOwner && !alreadyApplied && isOpen;

    const jobDescription = j.description || "Tidak ada deskripsi";
    const jobCity = j.city || j.location || "Remote";
    const jobCategory =
      (j.category && typeof j.category === "object"
        ? j.category.name
        : j.category) || "Umum";
    const cleanTitle = String(j.title || "Untitled").replace(
      /^\s*\[URGENT\]\s*/i,
      "",
    );
    const buyerName = j.buyer?.name || "Pengguna";
    const buyerCity = j.buyer?.city || "";
    const applicationsCount = j.applications?.length || 0;

    let skills = [];
    try {
      skills = typeof j.skills === "string" ? JSON.parse(j.skills) : j.skills || [];
    } catch {
      skills = [];
    }
    if (!Array.isArray(skills)) skills = [];

    const skillsChipsHtml = skills.length
      ? `<div class="job-skills-inline">
          <span class="job-skills-label">Skill</span>
          <div class="job-skill-chips">${skills.map((s) => `<span class="job-skill-chip">${escape(String(s))}</span>`).join("")}</div>
        </div>`
      : "";

    const renderApplicantBlock = () => {
      const panel = (body, variant = "") =>
        `<div class="job-applicant-panel${variant ? ` job-applicant-panel--${variant}` : ""}">${body}</div>`;

      if (canApply) {
        return panel(`
          <div class="job-applicant-actions">
            <button class="btn btn-primary" id="apply-btn" data-testid="apply-job-btn"><i class="fa-solid fa-paper-plane"></i> Lamar Pekerjaan</button>
            <button class="btn btn-secondary" id="chat-before-apply-btn" data-testid="chat-before-apply-btn"><i class="fa-solid fa-comment"></i> Chat Pemilik</button>
          </div>`, "apply");
      }
      if (!alreadyApplied || isOwner) {
        if (isOwner) {
          return panel(`
            <p class="job-owner-note"><i class="fa-solid fa-user-tie"></i> Ini lowongan Anda — tidak bisa melamar sendiri.</p>
            <div class="job-applicant-actions">
              <a class="btn btn-secondary" href="#/dashboard/manage-jobs/edit/${j.id}" data-testid="edit-job-btn"><i class="fa-solid fa-pen"></i> Edit</a>
              <button class="btn btn-danger" id="del-job" data-testid="delete-job-btn"><i class="fa-solid fa-trash"></i> Hapus</button>
            </div>`, "owner");
        }
        return "";
      }
      const st = String(myApp?.status || "PENDING").toUpperCase();
      const orderHref = relatedOrderId ? `#/orders/${relatedOrderId}` : "#/dashboard/my-applications";
      if (st === "ACCEPTED") {
        if (transactionDone) {
          return panel(`
            <div class="job-status-callout job-status-callout--success">
              <div class="job-status-callout-icon"><i class="fa-solid fa-circle-check"></i></div>
              <div class="job-status-callout-body">
                <strong>Transaksi selesai</strong>
                <p>Pekerjaan selesai — Anda dapat melamar lowongan lain.</p>
              </div>
            </div>
            <div class="job-applicant-actions">
              <a class="btn btn-secondary" href="${orderHref}"><i class="fa-solid fa-receipt"></i> Lihat Riwayat</a>
            </div>`, "success");
        }
        const orderLabel = relatedOrderId ? "Upload Bukti Kerja" : "Buka Lamaran Saya";
        return panel(`
          <div class="job-status-callout job-status-callout--success" data-testid="application-accepted-alert">
            <div class="job-status-callout-icon"><i class="fa-solid fa-circle-check"></i></div>
            <div class="job-status-callout-body">
              <strong>Lamaran diterima</strong>
              <p>Upload bukti kerja di pesanan terkait. Pemilik approve otomatis ±3–5 detik.</p>
            </div>
          </div>
          <div class="job-applicant-actions">
            <a class="btn btn-primary" href="${orderHref}" data-testid="goto-order-btn"><i class="fa-solid fa-upload"></i> ${orderLabel}</a>
            <button class="btn btn-secondary" id="chat-after-apply-btn" data-testid="chat-after-apply-btn"><i class="fa-solid fa-comment"></i> Chat</button>
          </div>`, "success");
      }
      if (st === "REJECTED") {
        return panel(`<div class="job-status-callout job-status-callout--danger"><div class="job-status-callout-icon"><i class="fa-solid fa-circle-xmark"></i></div><div class="job-status-callout-body"><strong>Lamaran ditolak</strong><p>Pemilik memilih kandidat lain.</p></div></div>`, "danger");
      }
      return panel(`
        <div class="job-status-callout job-status-callout--info">
          <div class="job-status-callout-icon"><i class="fa-solid fa-hourglass-half"></i></div>
          <div class="job-status-callout-body">
            <strong>Menunggu keputusan</strong>
            <p>Pemilik merespons ±3–5 detik. Refresh lalu buka pesanan untuk upload bukti.</p>
          </div>
        </div>
        <div class="job-applicant-actions">
          <a class="btn btn-secondary" href="#/dashboard/my-applications"><i class="fa-solid fa-list-check"></i> Lamaran Saya</a>
        </div>`, "info");
    };

    mount.innerHTML = `
      <div class="container page job-detail-page">
        <a href="#/jobs" class="job-back-link"><i class="fa-solid fa-arrow-left"></i> Kembali ke Cari Kerja</a>

        <div class="job-detail-layout">
          <div class="card job-detail-main">
            ${
              isOwner && isOpen && applicationsCount === 0
                ? `<div class="job-demo-note"><i class="fa-solid fa-clock"></i> Simulasi demo — pelamar muncul ±3–5 detik. Klik <strong>Terima</strong> lamaran.</div>`
                : ""
            }

            <div class="job-detail-inner">
              <header class="job-detail-header">
                <div class="job-detail-badges">
                  ${serviceTypeBadge(j, "job")}
                  <span class="job-cat-chip">${escape(jobCategory)}</span>
                  ${statusPill(j.status)}
                  ${j.isOnline ? '<span class="job-remote-chip"><i class="fa-solid fa-globe"></i> Remote</span>' : ""}
                </div>
                <h1 class="job-detail-title">${escape(cleanTitle)}</h1>
                <div class="job-detail-meta">
                  <span class="job-meta-chip"><i class="fa-solid fa-location-dot"></i> ${escape(jobCity)}</span>
                  <span class="job-meta-chip"><i class="fa-solid fa-clock"></i> ${timeAgo(j.createdAt)}</span>
                  <span class="job-meta-chip"><i class="fa-solid fa-users"></i> ${applicationsCount} pelamar</span>
                  ${j.deadline ? `<span class="job-meta-chip"><i class="fa-solid fa-hourglass-half"></i> ${new Date(j.deadline).toLocaleDateString("id-ID")}</span>` : ""}
                </div>
              </header>

              <div class="job-detail-body">
                <section class="job-detail-block">
                  <h3 class="job-section-title">Deskripsi</h3>
                  <p class="job-detail-desc">${escape(jobDescription)}</p>
                  ${skillsChipsHtml}
                </section>

                <section class="job-detail-block job-detail-block--poster">
                  <h3 class="job-section-title">Diposting oleh</h3>
                  <div class="profile-link job-poster-row" data-user-id="${j.buyerId}" role="link" tabindex="0">
                    ${avatar(j.buyer, "md")}
                    <div class="job-poster-info">
                      <strong>${escape(buyerName)}</strong>
                      <span>${escape(buyerCity || "Member Tolongin")}${j.buyer?.createdAt ? ` · ${timeAgo(j.buyer.createdAt)}` : ""}</span>
                    </div>
                    ${typeof j.buyer?.rating === "number" && j.buyer.rating > 0 ? `<span class="job-poster-rating"><i class="fa-solid fa-star"></i> ${j.buyer.rating.toFixed(1)}</span>` : ""}
                    <i class="fa-solid fa-chevron-right job-poster-chevron"></i>
                  </div>
                </section>
              </div>
            </div>

            ${renderApplicantBlock()}
          </div>

          <aside class="card job-detail-sidebar">
            <div class="job-sidebar-budget">
              <span class="job-sidebar-budget-label">Budget Proyek</span>
              <div class="job-sidebar-budget-value">${fmtIDR(j.budget)}</div>
            </div>
            <ul class="job-sidebar-specs">
              <li><span class="job-spec-label"><i class="fa-solid fa-tag"></i> Kategori</span><span>${escape(jobCategory)}</span></li>
              <li><span class="job-spec-label"><i class="fa-solid fa-location-dot"></i> Lokasi</span><span>${escape(jobCity)}</span></li>
              <li><span class="job-spec-label"><i class="fa-solid fa-globe"></i> Tipe</span><span>${j.isOnline ? "Remote" : "Onsite"}</span></li>
              <li><span class="job-spec-label"><i class="fa-solid fa-hourglass-half"></i> Deadline</span><span>${j.deadline ? new Date(j.deadline).toLocaleDateString("id-ID") : "Fleksibel"}</span></li>
              <li><span class="job-spec-label"><i class="fa-solid fa-users"></i> Pelamar</span><span>${applicationsCount} orang</span></li>
              <li><span class="job-spec-label"><i class="fa-solid fa-calendar-plus"></i> Diposting</span><span>${timeAgo(j.createdAt)}</span></li>
            </ul>
            <p class="job-sidebar-trust"><i class="fa-solid fa-shield-halved"></i> Lamaran aman & terverifikasi</p>
          </aside>
        </div>
        ${
          isOwner
            ? `
        <div class="card card-pad-lg mt-3" id="job-applications-section">
          <h3>${applicationsCount} Pelamar</h3>
          ${
            j.applications?.length
              ? j.applications
                  .map((a) => {
                    const durationText = a.proposedDuration
                      ? `${a.proposedDuration} hari`
                      : "";
                    const priceText = a.proposedPrice
                      ? fmtIDR(a.proposedPrice)
                      : "";
                    const coverText =
                      a.coverLetter || a.message || "Tidak ada surat lamaran";
                    const sellerName = a.seller?.name || "Pengguna";
                    const appStatus = String(
                      a.status || "PENDING",
                    ).toUpperCase();
                    return `
            <div class="flex-between" style="padding:1rem 0;border-bottom:1px dashed var(--border);align-items:flex-start">
              <div style="flex:1">
                <div class="profile-link user-chip" data-user-id="${a.sellerId}" role="link" tabindex="0" style="display:flex;align-items:center;gap:12px">
                  ${avatar(a.seller, "sm")}
                  <strong style="color:var(--primary)">${escape(sellerName)}</strong>
                  ${statusPill(appStatus)}
                </div>
                <p class="mt-1">${escape(coverText)}</p>
                ${priceText ? `<div class="text-sm">Tawaran: <strong>${priceText}</strong></div>` : ""}
                ${durationText ? `<div class="text-sm">Durasi: <strong>${durationText}</strong></div>` : ""}
              </div>
              ${
                appStatus === "PENDING"
                  ? `
                <div class="flex gap-sm">
                  <button class="btn btn-success btn-sm" data-decide="accepted" data-app="${a.id}" data-testid="accept-app-${a.id}">Terima</button>
                  <button class="btn btn-secondary btn-sm" data-decide="rejected" data-app="${a.id}" data-testid="reject-app-${a.id}">Tolak</button>
                </div>`
                  : ""
              }
            </div>`;
                  })
                  .join("")
              : '<p class="text-muted">Belum ada pelamar</p>'
          }
        </div>`
            : ""
        }
      </div>`;

    const applyBtn = document.getElementById("apply-btn");
    if (applyBtn) {
      applyBtn.addEventListener("click", () => openBidDialog(j));
    }

    const chatAfterApplyBtn = document.getElementById("chat-after-apply-btn");
    if (chatAfterApplyBtn) {
      chatAfterApplyBtn.addEventListener("click", async () => {
        try {
          const conv = await api.post("/chat/conversations", { recipientId: j.buyerId });
          router.navigate("/chat/" + conv.id);
        } catch (err) {
          toast(err.message || "Gagal membuka chat", "error");
        }
      });
    }

    const chatBeforeApplyBtn = document.getElementById("chat-before-apply-btn");
    if (chatBeforeApplyBtn) {
      chatBeforeApplyBtn.addEventListener("click", async () => {
        if (!u) {
          toast("Silakan login dulu", "warning");
          return router.navigate("/login");
        }
        if (u.id === j.buyerId) {
          toast("Anda tidak bisa chat dengan diri sendiri", "warning");
          return;
        }
        try {
          const conv = await api.post("/chat/conversations", {
            recipientId: j.buyerId,
          });
          toast("Membuka chat...", "info");
          router.navigate("/chat/" + conv.id);
        } catch (err) {
          console.error("Chat error:", err);
          toast(err.message || "Gagal membuka chat", "error");
        }
      });
    }

    document.querySelectorAll("[data-decide]").forEach((b) =>
      b.addEventListener("click", async () => {
        try {
          const decision = String(b.dataset.decide || "").toLowerCase();
          if (decision === "accepted") {
            const result = await api.post(`/applications/${b.dataset.app}/accept`, {});
            toast("Lamaran diterima — lanjut ke pembayaran", "success");
            if (result?.orderId) {
              router.navigate("/orders/" + result.orderId);
              return;
            }
          } else {
            await api.post(`/applications/${b.dataset.app}/reject`, {
              reason: "Ditolak oleh pemilik pekerjaan",
            });
            toast("Lamaran ditolak", "info");
          }
          router.render();
        } catch (err) {
          toast(err.message, "error");
        }
      }),
    );

    const hashQuery = (window.location.hash.split("?")[1] || "");
    if (hashQuery.includes("tab=applications")) {
      setTimeout(() => {
        document.getElementById("job-applications-section")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 200);
    }

    const delBtn = document.getElementById("del-job");
    if (delBtn) {
      delBtn.addEventListener("click", () =>
        confirmModal("Hapus job ini?", async () => {
          try {
            await api.del("/jobs/" + j.id);
            toast("Job dihapus", "success");
            router.navigate("/jobs");
          } catch (err) {
            toast(err.message, "error");
          }
        }),
      );
    }
  } catch (err) {
    mount.innerHTML = `<div class="container"><div class="empty"><h3>Job tidak ditemukan</h3><p>${escape(err.message)}</p></div></div>`;
  }
}
