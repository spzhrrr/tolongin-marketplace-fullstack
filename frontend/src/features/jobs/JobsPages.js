import { api } from "../../shared/utils/api.js";
import {
  escape,
  fmtIDR,
  fmtDate,
  toast,
  modal,
  confirmModal,
  timeAgo,
} from "../../shared/utils/helpers.js";
import { statusPill, avatar } from "../../shared/ui/components.js";
import { store } from "../../app/store.js";
import { router } from "../../app/router.js";

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
  // Defensive check: pastikan j ada
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

  // Event listeners untuk price sync
  const priceInput = $("#bid-price");
  const rangeInput = $("#bid-range");
  if (priceInput && rangeInput) {
    priceInput.addEventListener("input", (e) => sync(e.target, rangeInput));
    rangeInput.addEventListener("input", (e) => sync(e.target, priceInput));
  }

  // Event listener untuk cover letter counter
  const coverInput = $("#bid-cover");
  if (coverInput) {
    coverInput.addEventListener("input", (e) => {
      const n = e.target.value.length;
      const countEl = $("#bid-cover-count");
      if (countEl) countEl.textContent = `${n} / min 20`;
    });
  }

  // Preview button
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

  // Form submit
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
        toast("Lamaran berhasil dikirim 🎉", "success");
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
    <div class="container page">
      <div class="page-header">
        <div><h1 class="page-title">Pekerjaan</h1><p class="page-subtitle">Telusuri lowongan dari klien</p></div>
        ${u && u.role !== "ADMIN" ? '<a class="btn btn-primary" href="#/post-job" data-testid="post-job-btn"><i class="fa-solid fa-plus"></i> Posting Pekerjaan</a>' : ""}
      </div>
      <div class="filters">
        <div class="input-icon" style="flex:1;min-width:240px"><i class="fa-solid fa-magnifying-glass"></i><input id="q" class="input" placeholder="Cari pekerjaan..." data-testid="jobs-search"></div>
        <select id="cat" class="select" data-testid="jobs-cat" style="max-width:200px"></select>
      </div>
      <div id="jobs-list" class="flex-col" data-testid="jobs-list"></div>
    </div>`;

  const cats = await api.get("/categories");
  const catSelect = document.getElementById("cat");
  if (catSelect) {
    catSelect.innerHTML =
      `<option value="all">Semua Kategori</option>` +
      cats.map((c) => `<option value="${c.slug}">${c.name}</option>`).join("");
  }

  const load = async () => {
    const params = new URLSearchParams();
    const q = document.getElementById("q")?.value.trim() || "";
    const c = document.getElementById("cat")?.value || "all";
    if (q) params.set("q", q);
    if (c && c !== "all") {
      const cat = cats.find((x) => x.slug === c);
      if (cat) params.set("categoryId", cat.id);
    }
    params.set("status", "OPEN");
    const list = document.getElementById("jobs-list");
    if (list) list.innerHTML = '<div class="spinner"></div>';

    try {
      const [jobsResp, myApps] = await Promise.all([
        api.get("/jobs?" + params.toString()),
        u
          ? api.get("/applications/seller").catch(() => [])
          : Promise.resolve([]),
      ]);
      const items = Array.isArray(jobsResp) ? jobsResp : jobsResp.data || [];
      const appliedJobIds = new Set((myApps || []).map((a) => a.jobId));

      if (!items.length) {
        if (list)
          list.innerHTML = `<div class="empty"><i class="fa-solid fa-briefcase"></i><h3>Belum ada job terbuka</h3></div>`;
        return;
      }

      if (list) {
        const now = Date.now();
        list.innerHTML = items
          .map((j) => {
            const isMine = u && j.buyerId === u.id;
            const hasApplied = appliedJobIds.has(j.id);
            // Compute urgency from deadline
            const deadlineDate = j.deadline ? new Date(j.deadline) : null;
            const daysLeft = deadlineDate
              ? Math.ceil((deadlineDate.getTime() - now) / (24 * 3600 * 1000))
              : null;
            const isUrgent = daysLeft !== null && daysLeft >= 0 && daysLeft < 3;
            // Strip leading [URGENT] from title for cleaner UI
            const cleanTitle = String(j.title || "").replace(
              /^\s*\[URGENT\]\s*/i,
              "",
            );
            const catName =
              (j.category && typeof j.category === "object"
                ? j.category.name
                : j.category) || "Umum";
            const urgentBadge = isUrgent
              ? '<span class="badge badge-danger"><i class="fa-solid fa-fire"></i> URGENT</span>'
              : "";
            const badge = isMine
              ? '<span class="badge badge-info"><i class="fa-solid fa-user-tie"></i> Job Anda</span>'
              : hasApplied
                ? '<span class="badge badge-success"><i class="fa-solid fa-check"></i> Sudah Melamar</span>'
                : "";
            return `
          <a href="#/jobs/${j.id}" class="card card-pad card-hover" data-testid="job-card-${j.id}" data-buyer-id="${j.buyerId}">
            <div class="flex-between" style="align-items:flex-start">
              <div>
                <div class="flex gap-sm mb-1">
                  <span class="badge">${escape(catName)}</span>
                  ${statusPill(j.status)}
                  ${urgentBadge}
                  ${badge}
                </div>
                <div class="buyer-info flex gap-sm mb-1" style="align-items:center">
                  ${avatar(j.buyer, "sm")}
                  <span class="buyer-name" data-profile-id="${j.buyerId}" style="cursor:pointer;color:var(--primary);font-weight:500">
                    ${escape(j.buyer?.name || "Pengguna")}
                  </span>
                </div>
                <h3 style="margin:.25rem 0">${escape(cleanTitle)}</h3>
                <p class="text-muted text-sm" style="max-width:680px;overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical">${escape(j.description || "")}</p>
                <div class="flex gap-md mt-2 text-sm text-muted">
                  <span><i class="fa-solid fa-location-dot"></i> ${escape(j.location || j.city || "Remote")}</span>
                  <span><i class="fa-solid fa-clock"></i> ${timeAgo(j.createdAt)}</span>
                  <span><i class="fa-solid fa-users"></i> ${j.applicationsCount || j.applicationCount || 0} pelamar</span>
                  ${daysLeft !== null && daysLeft >= 0 ? `<span><i class="fa-solid fa-hourglass-half"></i> ${daysLeft} hari lagi</span>` : ""}
                </div>
              </div>
              <div class="text-right">
                <div class="text-xs text-muted">Budget</div>
                <div style="font-family:var(--font-head);font-weight:700;color:var(--primary-dark);font-size:1.15rem">${fmtIDR(j.budget)}</div>
              </div>
            </div>
          </a>`;
          })
          .join("");
      }
    } catch (e) {
      if (list)
        list.innerHTML = `<div class="empty"><h3>Gagal memuat</h3></div>`;
    }
  };

  const searchInput = document.getElementById("q");
  if (searchInput) {
    searchInput.addEventListener(
      "input",
      () => clearTimeout(window._jt) || (window._jt = setTimeout(load, 300)),
    );
  }

  const catSelectChange = document.getElementById("cat");
  if (catSelectChange) catSelectChange.addEventListener("change", load);

  load();
}

export async function PostJobPage({ mount }) {
  const cats = await api.get("/categories");

  mount.innerHTML = `
    <div class="container-sm page">
      <a href="#/jobs"><i class="fa-solid fa-arrow-left"></i> Kembali</a>
      <div class="card card-pad-lg mt-2">
        <h1>Posting Pekerjaan Baru</h1>
        <p class="text-muted">Jelaskan kebutuhan Anda agar freelancer terbaik melamar.</p>
        <form id="job-form" data-testid="post-job-form">
          <div class="form-group"><label class="label">Judul *</label><input class="input" id="title" required data-testid="job-title" placeholder="Minimal 5 karakter"></div>
          <div class="form-group"><label class="label">Kategori *</label>
            <select class="select" id="category" data-testid="job-category" required>
              <option value="">Pilih Kategori</option>
              ${cats.map((c) => `<option value="${c.id}">${c.name}</option>`).join("")}
            </select>
          </div>
          <div class="form-group"><label class="label">Deskripsi *</label><textarea class="textarea" id="description" rows="5" required data-testid="job-desc" placeholder="Minimal 20 karakter"></textarea></div>
          <div class="grid grid-2">
            <div class="form-group"><label class="label">Budget (Rp) *</label><input class="input" id="budget" type="number" required data-testid="job-budget" min="10000" placeholder="Minimal Rp 10.000"></div>
            <div class="form-group"><label class="label">Kota</label><input class="input" id="city" placeholder="Remote / Jakarta..." data-testid="job-city"></div>
          </div>
          <div class="form-group">
            <label class="label">Deadline Pengerjaan</label>
            <input type="date" id="deadline" class="input" min="">
            <div class="text-xs text-muted">Opsional — kapan pekerjaan harus selesai? (Jika tidak diisi, dianggap fleksibel)</div>
          </div>
          <button class="btn btn-primary btn-block" type="submit" data-testid="job-submit">Posting Sekarang</button>
        </form>
      </div>
    </div>`;

  // Set min date ke hari ini untuk field deadline
  const today = new Date().toISOString().split("T")[0];
  const deadlineInput = document.getElementById("deadline");
  if (deadlineInput) deadlineInput.setAttribute("min", today);

  const form = document.getElementById("job-form");
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const title = document.getElementById("title")?.value.trim();
      const categoryId = document.getElementById("category")?.value;
      const description = document.getElementById("description")?.value.trim();
      const budget = parseFloat(document.getElementById("budget")?.value);
      const city = document.getElementById("city")?.value.trim();
      const deadline = document.getElementById("deadline")?.value || null;

      // Validasi client-side
      if (!title || title.length < 5) {
        toast("Judul minimal 5 karakter", "error");
        return;
      }
      if (!categoryId) {
        toast("Pilih kategori", "error");
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
          location: city || "Remote",
          isOnline: city === "Remote" || !city,
          deadline: deadline || null,
        };

        console.log("Submitting job:", body);

        const j = await api.post("/jobs", body);
        toast("Pekerjaan diposting! 🎉", "success");
        router.navigate("/jobs/" + j.id);
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
    const isOpen = String(j.status || "").toUpperCase() === "OPEN";
    const canApply = u && !isOwner && !alreadyApplied && isOpen;

    // PERBAIKAN: Default values untuk field yang mungkin undefined
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

    mount.innerHTML = `
      <div class="container page">
        <a href="#/jobs"><i class="fa-solid fa-arrow-left"></i> Kembali</a>
        <div class="card card-pad-lg mt-2">
          <div class="flex-between mb-2" style="align-items:flex-start">
            <div>
              <div class="flex gap-sm mb-1"><span class="badge">${escape(jobCategory)}</span>${statusPill(j.status)}</div>
              <h1 style="margin:.25rem 0">${escape(cleanTitle)}</h1>
              <div class="flex gap-md text-sm text-muted">
                <span><i class="fa-solid fa-location-dot"></i> ${escape(jobCity)}</span>
                <span><i class="fa-solid fa-clock"></i> ${timeAgo(j.createdAt)}</span>
              </div>
            </div>
            <div class="text-right">
              <div class="text-xs text-muted">Budget</div>
              <div style="font-family:var(--font-head);font-weight:700;color:var(--primary-dark);font-size:1.5rem">${fmtIDR(j.budget)}</div>
            </div>
          </div>
          <p>${escape(jobDescription)}</p>
          ${j.deadline ? `<p><strong>Deadline:</strong> ${new Date(j.deadline).toLocaleDateString("id-ID")}</p>` : ""}
          <div class="divider"></div>
          <h3>Diposting oleh</h3>
          <div class="flex gap-md" style="align-items:center">
            <div class="buyer-avatar" data-profile-id="${j.buyerId}" style="cursor:pointer">
              ${avatar(j.buyer)}
            </div>
            <div>
              <strong class="buyer-name" data-profile-id="${j.buyerId}" style="cursor:pointer;color:var(--primary)">${escape(buyerName)}</strong>
              <div class="text-xs text-muted">${escape(buyerCity)}</div>
            </div>
          </div>
          ${canApply ? '<button class="btn btn-primary mt-3" id="apply-btn" data-testid="apply-job-btn"><i class="fa-solid fa-paper-plane"></i> Lamar Pekerjaan Ini</button>' : ""}
          ${alreadyApplied && !isOwner ? `<button class="btn btn-secondary mt-3" disabled data-testid="already-applied-btn"><i class="fa-solid fa-check"></i> Sudah Melamar (status: ${escape(myApp?.status || "unknown")})</button>` : ""}
          ${isOwner ? '<div class="badge badge-info mt-3"><i class="fa-solid fa-user-tie"></i> Ini job Anda — tidak bisa melamar</div>' : ""}
          ${isOwner ? `<button class="btn btn-danger mt-3" id="del-job" data-testid="delete-job-btn"><i class="fa-solid fa-trash"></i> Hapus Job</button>` : ""}
        </div>
        ${
          isOwner
            ? `
        <div class="card card-pad-lg mt-3">
          <h3>${applicationsCount} Pelamar</h3>
          ${
            j.applications?.length
              ? j.applications
                  .map((a) => {
                    // PERBAIKAN: Handle proposedDuration dengan aman
                    const durationText = a.proposedDuration
                      ? `${a.proposedDuration} hari`
                      : "";
                    const priceText = a.proposedPrice
                      ? fmtIDR(a.proposedPrice)
                      : "";
                    const coverText =
                      a.coverLetter || a.message || "Tidak ada surat lamaran";
                    const sellerName = a.seller?.name || "Pengguna";
                    const appStatus = String(a.status || "PENDING").toUpperCase();

                    return `
            <div class="flex-between" style="padding:1rem 0;border-bottom:1px dashed var(--border);align-items:flex-start">
              <div style="flex:1">
                <div class="flex gap-md" style="align-items:center">
                  <div class="seller-avatar" data-profile-id="${a.sellerId}" style="cursor:pointer">
                    ${avatar(a.seller, "sm")}
                  </div>
                  <strong class="seller-name" data-profile-id="${a.sellerId}" style="cursor:pointer;color:var(--primary)">${escape(sellerName)}</strong>
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

    document.querySelectorAll("[data-decide]").forEach((b) =>
      b.addEventListener("click", async () => {
        try {
          const decision = String(b.dataset.decide || "").toLowerCase();
          if (decision === "accepted") {
            await api.post(`/applications/${b.dataset.app}/accept`, {});
          } else {
            await api.post(`/applications/${b.dataset.app}/reject`, {
              reason: "Ditolak oleh pemilik pekerjaan",
            });
          }
          toast("Berhasil", "success");
          router.render();
        } catch (err) {
          toast(err.message, "error");
        }
      }),
    );

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

if (typeof document !== "undefined") {
  document.body.addEventListener("click", (e) => {
    const profileElement = e.target.closest("[data-profile-id]");
    if (profileElement && profileElement.dataset.profileId) {
      e.preventDefault();
      e.stopPropagation();
      const userId = profileElement.dataset.profileId;
      router.navigate(`/users/${userId}`);
    }
  });
}
