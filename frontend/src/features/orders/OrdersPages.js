// frontend/src/features/orders/OrdersPages.js

import { api, resolveAssetUrl } from "../../shared/utils/api.js";
import { uploadFile } from "../../shared/utils/uploads.js";
import {
  escape,
  fmtIDR,
  fmtDate,
  toast,
  modal,
  confirmModal,
  refreshUserReviewsSnapshot,
} from "../../shared/utils/helpers.js";
import { statusPill, avatar, empty, userChip, workProofBadge } from "../../shared/ui/components.js";
import { store } from "../../app/store.js";
import { router } from "../../app/router.js";

function getActionLabel(next) {
  const labels = {
    ACCEPTED: "✓ Terima Pesanan",
    IN_PROGRESS: "🔧 Mulai Pengerjaan",
    WAITING_REVIEW: "👀 Submit untuk Review",
    COMPLETED: "✅ Selesaikan Pesanan",
    CANCELLED: "✕ Batalkan Pesanan",
  };
  return labels[next] || `Update ke ${String(next).replace("_", " ")}`;
}

function openDemoPaymentModal(order, onSuccess) {
  const m = modal({
    title: "Pilih Metode Pembayaran",
    body: `
      <div>
        <div class="escrow-summary" style="display:flex;gap:12px;align-items:flex-start;border:1px solid rgba(10,102,194,.22);background:rgba(10,102,194,.06);border-radius:8px;padding:14px;margin-bottom:12px">
          <i class="fa-solid fa-shield-halved" style="color:var(--primary);font-size:22px"></i>
          <div><strong>Escrow Tolongin</strong><span style="display:block;color:var(--text-2);font-size:13px;margin-top:4px">Dana ditahan di escrow, bukan langsung ke penjual.</span></div>
        </div>
        <h3 style="margin:0 0 12px">Total: ${fmtIDR(order.totalAmount || order.amount)}</h3>
        <div class="pay-method-tabs" style="display:flex;gap:8px;margin-bottom:12px;flex-wrap:wrap">
          <button type="button" class="btn btn-sm btn-primary pay-tab active" data-tab="card"><i class="fa-solid fa-credit-card"></i> Kartu</button>
          <button type="button" class="btn btn-sm btn-secondary pay-tab" data-tab="bank"><i class="fa-solid fa-building-columns"></i> Transfer</button>
          <button type="button" class="btn btn-sm btn-secondary pay-tab" data-tab="ewallet"><i class="fa-solid fa-mobile-screen"></i> E-Wallet</button>
        </div>
        <div id="pay-panel-card" class="pay-panel">
          <div class="form-group"><label class="label">Nomor Kartu</label><input class="input" placeholder="4111 1111 1111 1111" inputmode="numeric"></div>
          <div class="form-group"><label class="label">Nama Pemilik</label><input class="input" placeholder="Nama di kartu"></div>
          <div class="grid grid-2">
            <div class="form-group"><label class="label">Expiry</label><input class="input" placeholder="MM/YY"></div>
            <div class="form-group"><label class="label">CVV</label><input class="input" placeholder="123" inputmode="numeric"></div>
          </div>
        </div>
        <div id="pay-panel-bank" class="pay-panel" style="display:none">
          <div class="form-group"><label class="label">Pilih Bank</label>
            <select class="select"><option>BCA</option><option>BNI</option><option>BRI</option><option>Mandiri</option></select>
          </div>
          <div class="form-group"><label class="label">Nomor Rekening</label><input class="input" placeholder="1234567890" inputmode="numeric"></div>
        </div>
        <div id="pay-panel-ewallet" class="pay-panel" style="display:none">
          <div class="form-group"><label class="label">Pilih E-Wallet</label>
            <select class="select"><option>OVO</option><option>GoPay</option><option>DANA</option><option>ShopeePay</option></select>
          </div>
          <div class="form-group"><label class="label">Nomor HP</label><input class="input" placeholder="08xxxxxxxxxx" inputmode="tel"></div>
        </div>
        <button class="btn btn-primary btn-block mt-2" id="pay-ok"><i class="fa-solid fa-lock"></i> Konfirmasi Pembayaran</button>
      </div>`,
  });

  m.el.querySelectorAll(".pay-tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      m.el.querySelectorAll(".pay-tab").forEach((t) => {
        t.classList.remove("btn-primary", "active");
        t.classList.add("btn-secondary");
      });
      tab.classList.add("btn-primary", "active");
      tab.classList.remove("btn-secondary");
      m.el.querySelectorAll(".pay-panel").forEach((p) => (p.style.display = "none"));
      const panel = m.el.querySelector("#pay-panel-" + tab.dataset.tab);
      if (panel) panel.style.display = "block";
    });
  });

  m.el.querySelector("#pay-ok").addEventListener("click", async () => {
    try {
      await api.post(`/payments/demo/confirm/${order.id}`);
      m.close();
      toast("💳 Pembayaran berhasil! Dana masuk escrow.", "success");
      onSuccess?.();
    } catch (err) {
      toast(err.message, "error");
    }
  });
  return m;
}

function renderEscrowSteps(status) {
  const s = String(status || "").toUpperCase();
  const steps = [
    { key: "WAITING_CONFIRMATION", label: "Konfirmasi", desc: "Menunggu penjual", icon: "fa-hourglass-half" },
    { key: "ACCEPTED", label: "Pembayaran", desc: "Siap dibayar", icon: "fa-credit-card" },
    { key: "PAID", label: "Escrow", desc: "Dana aman", icon: "fa-vault" },
    { key: "WAITING_REVIEW", label: "Review Bukti", desc: "Cek hasil kerja", icon: "fa-magnifying-glass-chart" },
    { key: "COMPLETED", label: "Selesai", desc: "Dana dirilis", icon: "fa-circle-check" },
  ];
  const statusRank = {
    WAITING_CONFIRMATION: 0,
    ACCEPTED: 1,
    PAID: 2,
    IN_PROGRESS: 2,
    REJECTED: 3,
    REVISION_REQUESTED: 3,
    WAITING_REVIEW: 3,
    IN_REVIEW: 3,
    COMPLETED: 4,
  };
  const activeIndex = statusRank[s] ?? 0;
  const isComplete = s === "COMPLETED";

  return `<div class="escrow-track" role="list" aria-label="Progress escrow">${steps
    .map(({ key, label, desc, icon }, i) => {
      const done = isComplete || i < activeIndex;
      const current = isComplete ? i === steps.length - 1 : i === activeIndex;
      return `<div class="escrow-track-step ${done ? "done" : ""} ${current ? "current" : ""}" role="listitem">
          <div class="escrow-track-node"><i class="fa-solid ${icon}"></i></div>
          <div class="escrow-track-copy"><strong>${label}</strong><span>${desc}</span></div>
        </div>`;
    })
    .join("")}</div>`;
}

function renderWorkProofGallery(attachments) {
  if (!attachments?.length) return "";
  return `<div class="work-proof-gallery">${attachments
    .map((a, i) => {
      const url = resolveAssetUrl(a);
      const isImg = /\.(jpe?g|png|webp|gif)(\?|$)/i.test(url) || url.includes("unsplash");
      const isPdf = /\.pdf(\?|$)/i.test(url);
      if (isImg) {
        return `<a class="work-proof-thumb" href="${escape(url)}" target="_blank" rel="noopener">
          <img src="${escape(url)}" alt="Bukti ${i + 1}" loading="lazy"/>
        </a>`;
      }
      if (isPdf) {
        return `<a class="work-proof-file" href="${escape(url)}" target="_blank" rel="noopener"><i class="fa-solid fa-file-pdf"></i> PDF ${i + 1}</a>`;
      }
      return `<a class="btn btn-secondary btn-sm" href="${escape(url)}" target="_blank" rel="noopener"><i class="fa-solid fa-paperclip"></i> Bukti ${i + 1}</a>`;
    })
    .join("")}</div>`;
}

function getWorkAttachments(o) {
  const sub = o.workSubmission;
  if (sub?.attachments?.length) return sub.attachments;
  if (Array.isArray(o.workProof) && o.workProof.length) return o.workProof;
  if (Array.isArray(o.workSubmissionFiles) && o.workSubmissionFiles.length)
    return o.workSubmissionFiles;
  return [];
}

function isSimulatedBuyerOrder(o) {
  return (o.timeline || []).some((t) =>
    String(t?.note || "").includes("Pesanan demo dibuat"),
  );
}

function isJobOrder(o) {
  return Boolean(o.jobId || o.applicationId);
}

function orderStepCallout({
  variant = "info",
  icon,
  title,
  description,
  pulse = false,
  compact = false,
}) {
  const iconClass =
    pulse && icon === "fa-spinner" ? `${icon} fa-spin` : icon;
  const cls = [
    "order-step-callout",
    `order-step-callout--${variant}`,
    pulse ? "order-step-callout--pulse" : "",
    compact ? "order-step-callout--compact" : "",
  ]
    .filter(Boolean)
    .join(" ");
  return `<div class="${cls}">
    <div class="order-step-callout-icon"><i class="fa-solid ${iconClass}"></i></div>
    <div class="order-step-callout-body">
      ${title ? `<strong>${title}</strong>` : ""}
      ${description ? `<p>${description}</p>` : ""}
    </div>
  </div>`;
}

function renderOrderActionHint(o, ctx) {
  const { isSeller, simBuyer, statusKey } = ctx;
  if (isSeller && statusKey === "WAITING_CONFIRMATION" && simBuyer) {
    return orderStepCallout({
      variant: "action",
      icon: "fa-hand-pointer",
      title: "Pesanan demo masuk",
      description:
        "Klik <strong>Terima Pesanan</strong> di bawah. Pembeli akan bayar otomatis dalam ±3–5 detik (refresh halaman).",
    });
  }
  if (isSeller && statusKey === "WAITING_CONFIRMATION" && !simBuyer) {
    return orderStepCallout({
      variant: "action",
      icon: "fa-bell",
      title: "Pesanan menunggu Anda",
      description: "Terima pesanan agar pembeli dapat melanjutkan pembayaran escrow.",
    });
  }
  return "";
}

function renderOrderSidebarHints(o, ctx) {
  const { isBuyer, isSeller, simBuyer, isJob, statusKey } = ctx;
  const hints = [];

  if (statusKey === "WAITING_CONFIRMATION" && isBuyer && !isJob) {
    hints.push(
      orderStepCallout({
        variant: "waiting",
        icon: "fa-clock",
        title: "Menunggu konfirmasi",
        description:
          "Penjual merespons ±3–5 detik (demo). Refresh halaman, lalu <strong>Bayar via Escrow</strong>.",
        pulse: true,
        compact: true,
      }),
    );
  }
  if (statusKey === "ACCEPTED" && isBuyer) {
    hints.push(
      orderStepCallout({
        variant: "info",
        icon: "fa-credit-card",
        title: "Siap dibayar",
        description: isJob
          ? "Anda (pemilik lowongan) dapat membayar via escrow menggunakan tombol di bawah."
          : "Lanjutkan pembayaran escrow menggunakan tombol di bawah.",
        compact: true,
      }),
    );
  }
  if (statusKey === "ACCEPTED" && isSeller && (simBuyer || isJob)) {
    hints.push(
      orderStepCallout({
        variant: "waiting",
        icon: "fa-spinner",
        title: "Menunggu pembayaran",
        description: `${isJob ? "Pemilik lowongan" : "Pembeli demo"} bayar ±3–5 detik. Refresh halaman lalu upload bukti kerja di bagian <strong>Bukti Pengerjaan</strong>.`,
        pulse: true,
        compact: true,
      }),
    );
  }
  if (statusKey === "COMPLETED") {
    hints.push(
      orderStepCallout({
        variant: "success",
        icon: "fa-circle-check",
        title: "Transaksi selesai",
        description: "Dana telah dirilis ke penjual.",
        compact: true,
      }),
    );
  }
  if (statusKey === "CANCELLED") {
    hints.push(
      orderStepCallout({
        variant: "danger",
        icon: "fa-ban",
        title: "Pesanan dibatalkan",
        description: o.cancellationReason
          ? escape(o.cancellationReason)
          : "Pesanan tidak dilanjutkan.",
        compact: true,
      }),
    );
  }
  return hints.join("");
}

function renderWorkSubmission(o, isBuyer, isSeller) {
  const sub = o.workSubmission;
  const attachments = getWorkAttachments(o);
  const st = String(o.status || "").toUpperCase();
  const isJobOrder = Boolean(o.jobId || o.applicationId);
  const workerLabel = isJobOrder ? "freelancer" : "penjual";
  const hasSubmittedWork =
    attachments.length > 0 ||
    Boolean(sub || o.workSubmittedAt) ||
    ["WAITING_REVIEW", "IN_REVIEW", "COMPLETED"].includes(st);
  const canUpload =
    isSeller &&
    ((["PAID", "IN_PROGRESS"].includes(st) && !hasSubmittedWork) ||
      ["REJECTED", "REVISION_REQUESTED"].includes(st));
  const isDigital =
    o.deliveryType !== "ONSITE" && o.deliveryType !== "PHYSICAL" && !o.jobId;
  const simBuyer = isSimulatedBuyerOrder(o);

  if (["WAITING_CONFIRMATION", "ACCEPTED", "CANCELLED"].includes(st)) return "";

  if (isBuyer && !hasSubmittedWork && ["PAID", "IN_PROGRESS"].includes(st)) {
    return `
      <div class="card card-pad-lg work-proof-card">
        <div class="work-proof-head">
          <div>
            <h3 class="order-section-title"><i class="fa-solid fa-file-circle-check"></i> Bukti Pengerjaan</h3>
            <p class="work-proof-sub">Anda menunggu ${workerLabel} mengupload bukti hasil kerja. Dana aman di escrow.</p>
          </div>
          ${workProofBadge(o, "buyer")}
        </div>
        ${orderStepCallout({
          variant: "waiting",
          icon: "fa-spinner",
          title: `Menunggu ${workerLabel}`,
          description: `Bukti pengerjaan akan muncul di sini. Simulasi demo: upload otomatis ±3–5 detik — refresh lalu klik <strong>Approve &amp; Rilis Dana</strong>.`,
          pulse: true,
        })}
      </div>`;
  }

  if (!hasSubmittedWork && !canUpload && !isBuyer) return "";

  const sellerUploadHint =
    canUpload && (simBuyer || isJobOrder)
      ? orderStepCallout({
          variant: "action",
          icon: "fa-upload",
          title: "Langkah selanjutnya",
          description:
            "Lengkapi formulir di bawah lalu kirim bukti kerja. Pembeli/pemilik akan otomatis menyetujui dalam ±3–5 detik (demo).",
        })
      : canUpload
        ? orderStepCallout({
            variant: "action",
            icon: "fa-upload",
            title: "Kirim bukti kerja",
            description:
              "Upload foto atau PDF hasil pekerjaan. Dana cair setelah pembeli menyetujui bukti.",
          })
        : "";

  const sellerReviewHint =
    isSeller && st === "WAITING_REVIEW" && (simBuyer || isJobOrder)
      ? orderStepCallout({
          variant: "waiting",
          icon: "fa-clock",
          title: "Menunggu persetujuan",
          description:
            "Pembeli/pemilik akan approve otomatis ±3–5 detik. Refresh halaman untuk melihat status selesai.",
          pulse: true,
        })
      : "";

  return `
    <div class="card card-pad-lg work-proof-card">
      <div class="work-proof-head">
        <div>
          <h3 class="order-section-title"><i class="fa-solid fa-file-circle-check"></i> Bukti Pengerjaan</h3>
          ${
            isSeller && !canUpload && !hasSubmittedWork
              ? `<p class="work-proof-sub">Upload foto/PDF hasil kerja. Dana cair setelah pembeli approve.</p>`
              : hasSubmittedWork && st !== "WAITING_REVIEW"
                ? `<p class="work-proof-sub">Review bukti di bawah, lalu setujui untuk melepas dana escrow.</p>`
                : st === "WAITING_REVIEW" && isBuyer
                  ? `<p class="work-proof-sub">Penjual telah mengirim bukti — silakan tinjau sebelum approve.</p>`
                  : isSeller && canUpload
                    ? `<p class="work-proof-sub">Lengkapi detail pekerjaan yang sudah selesai.</p>`
                    : ""
          }
        </div>
        ${workProofBadge(o, isSeller ? "seller" : isBuyer ? "buyer" : null)}
      </div>
      ${sellerUploadHint}
      ${
        hasSubmittedWork
          ? `<div class="work-proof mt-2">
              ${sub?.note ? `<p>${escape(sub.note)}</p>` : ""}
              ${renderWorkProofGallery(attachments)}
            </div>`
          : ""
      }
      ${sellerReviewHint}
      ${canUpload ? `<form id="work-form" class="work-proof-form">
              <div class="form-group">
                <label class="label">Catatan hasil kerja *</label>
                <textarea class="textarea" id="work-note" required minlength="10" placeholder="Jelaskan pekerjaan yang sudah selesai..."></textarea>
              </div>
              <div class="form-group">
                <label class="label">Bukti kerja * (JPG, PNG, WebP, atau PDF)</label>
                <input class="input" type="file" id="work-files" accept="image/jpeg,image/png,image/webp,application/pdf" multiple required>
                <div id="work-files-preview" class="flex gap-sm mt-2 flex-wrap"></div>
                <div id="work-upload-progress" class="text-sm text-muted mt-1">Maksimal 10 file, masing-masing 10 MB.</div>
              </div>
              <button class="btn btn-primary" type="submit"><i class="fa-solid fa-upload"></i> Kirim Bukti untuk Approval</button>
            </form>` : ""}
      ${
        isBuyer && st === "WAITING_REVIEW"
          ? `<div class="order-work-callout">
              <div class="order-work-callout-icon"><i class="fa-solid fa-file-circle-check"></i></div>
              <div class="order-work-callout-body">
                <strong>Bukti sudah diupload</strong>
                <p>Review bukti di atas, lalu klik <strong>Approve &amp; Rilis Dana</strong> untuk melepas pembayaran escrow ke penjual.</p>
              </div>
            </div>
            <div class="order-work-actions flex gap-sm mt-3 flex-wrap">
              <button class="btn btn-success" id="approve-work"><i class="fa-solid fa-circle-check"></i> Approve & Rilis Dana</button>
              ${isDigital ? `<button class="btn btn-secondary" id="reject-work"><i class="fa-solid fa-rotate-left"></i> Minta Revisi</button>` : ""}
              <button class="btn btn-danger" id="dispute-work"><i class="fa-solid fa-scale-balanced"></i> Sengketa</button>
            </div>`
          : ""
      }
    </div>`;
}

let _snapLoading = null;
function loadSnapJs(clientKey, isProduction) {
  if (window.snap) return Promise.resolve();
  if (_snapLoading) return _snapLoading;
  _snapLoading = new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = isProduction
      ? "https://app.midtrans.com/snap/snap.js"
      : "https://app.sandbox.midtrans.com/snap/snap.js";
    s.setAttribute("data-client-key", clientKey);
    s.onload = () => resolve();
    s.onerror = () => {
      _snapLoading = null;
      reject(new Error("Gagal load Midtrans Snap"));
    };
    document.body.appendChild(s);
  });
  return _snapLoading;
}

export async function OrdersListPage({ mount }) {
  const u = store.getState().user;
  mount.innerHTML = `
    <div class="container page orders-page">
      <div class="orders-page-head">
        <div>
          <h1 class="page-title orders-page-title">Pesanan Saya</h1>
          <p class="page-subtitle orders-page-sub">Kelola pesanan jasa & pekerjaan</p>
        </div>
        <div class="chips orders-role-tabs" id="role-tabs">
          <span class="chip active" data-role="all">Semua</span>
          <span class="chip" data-role="BUYER">Pembeli</span>
          <span class="chip" data-role="SELLER">Penjual</span>
        </div>
      </div>
      <div id="orders" class="orders-compact-grid"></div>
    </div>`;
  const load = async (role) => {
    const list = document.getElementById("orders");
    list.innerHTML = '<div class="spinner orders-spinner"></div>';
    try {
      const items = await api.get(
        "/orders" + (role && role !== "all" ? `?role=${role}` : ""),
      );
      if (!items.length) {
        list.innerHTML = empty(
          "Belum ada pesanan",
          "Mulai pesan jasa dari marketplace",
          "fa-receipt",
        );
        return;
      }
      list.innerHTML = items
        .map((o) => {
          const st = String(o.status || "").toUpperCase();
          const isBuyer = u?.id === o.buyerId;
          const isSeller = u?.id === o.sellerId;
          const roleHint = isBuyer ? "buyer" : isSeller ? "seller" : null;
          const counterparty = isBuyer ? o.seller : isSeller ? o.buyer : null;
          const counterLabel = isBuyer ? "Penjual" : isSeller ? "Pembeli" : "Pihak";
          const step = ["WAITING_CONFIRMATION", "PAID", "WAITING_REVIEW", "COMPLETED"].findIndex(
            (k) => k === st || (st === "REJECTED" && k === "WAITING_REVIEW"),
          );
          const stepPct = step >= 0 ? Math.round(((step + 1) / 4) * 100) : 25;
          return `
        <a href="#/orders/${o.id}" class="order-row card card-hover" data-testid="order-${o.id}">
          <div class="order-row-main">
            <div class="order-row-top">
              ${statusPill(o.status, { compact: true, role: roleHint })}
              <span class="order-row-id">#${o.id.slice(0, 8)}</span>
              <span class="order-row-date"><i class="fa-regular fa-clock"></i> ${fmtDate(o.createdAt)}</span>
            </div>
            <h3 class="order-row-title">${escape(o.title)}</h3>
            <div class="order-row-meta">
              ${counterparty ? `<span><i class="fa-solid fa-user"></i> ${counterLabel}: ${escape(counterparty.name || "-")}</span>` : `<span>Pembeli: ${escape(o.buyer?.name || "-")}</span><span>Penjual: ${escape(o.seller?.name || "-")}</span>`}
              ${o.applicationId ? '<span class="order-type-tag"><i class="fa-solid fa-briefcase"></i> Lowongan</span>' : o.serviceId ? '<span class="order-type-tag"><i class="fa-solid fa-store"></i> Jasa</span>' : ""}
            </div>
            <div class="order-row-progress" aria-hidden="true"><span style="width:${stepPct}%"></span></div>
          </div>
          <div class="order-row-side">
            <div class="order-row-amount">${fmtIDR(o.totalAmount || o.amount)}</div>
            <i class="fa-solid fa-chevron-right order-row-chevron"></i>
          </div>
        </a>`;
        })
        .join("");
    } catch (e) {
      list.innerHTML = empty(
        "Gagal memuat",
        e.message,
        "fa-triangle-exclamation",
      );
    }
  };
  document.querySelectorAll("#role-tabs .chip").forEach((c) =>
    c.addEventListener("click", () => {
      document
        .querySelectorAll("#role-tabs .chip")
        .forEach((x) => x.classList.remove("active"));
      c.classList.add("active");
      load(c.dataset.role);
    }),
  );
  load("all");
}

function renderRevisionBanner(o) {
  if (String(o.status).toUpperCase() !== "REJECTED") return "";
  const reason = o.workRejectionReason || o.revisionReason || "";
  return `
    <div class="alert alert-warning mt-3">
      <i class="fa-solid fa-rotate-left"></i>
      <div>
        <strong>Revisi diminta oleh pembeli</strong>
        ${reason ? `<p style="margin:.35rem 0 0">${escape(reason)}</p>` : `<p style="margin:.35rem 0 0">Silakan perbaiki pekerjaan lalu kirim ulang bukti.</p>`}
      </div>
    </div>`;
}

function renderAutoCompleteCountdown() {
  return "";
}

function startAutoCompleteCountdown(o) {
  if (!o.workSubmittedAt) return;
  const el = document.getElementById("auto-complete-timer");
  if (!el) return;
  const deadline =
    new Date(o.workSubmittedAt).getTime() + 7 * 24 * 60 * 60 * 1000;
  const tick = () => {
    const node = document.getElementById("auto-complete-timer");
    if (!node) {
      clearInterval(timer);
      return;
    }
    const diff = deadline - Date.now();
    if (diff <= 0) {
      node.textContent = "segera";
      clearInterval(timer);
      return;
    }
    const d = Math.floor(diff / (24 * 60 * 60 * 1000));
    const h = Math.floor((diff % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
    const m = Math.floor((diff % (60 * 60 * 1000)) / (60 * 1000));
    const s = Math.floor((diff % (60 * 1000)) / 1000);
    node.textContent = `${d}h ${h}j ${m}m ${s}d`;
  };
  tick();
  const timer = setInterval(tick, 1000);
}

function renderOrderReviews(o, reviews) {
  if (!reviews || !reviews.length) return "";
  const dirLabel = (r) =>
    r.reviewType === "SELLER_TO_BUYER"
      ? "Penjual menilai Pembeli"
      : "Pembeli menilai Penjual";
  return `
    <div class="order-reviews-card card card-pad-lg">
      <h3 class="order-section-title"><i class="fa-solid fa-star"></i> Ulasan (${reviews.length})</h3>
      <div class="order-review-list">
        ${reviews
          .map(
            (r) => {
              const reviewer = r.isAnonymous ? null : r.reviewer;
              const rid = reviewer?.id || r.reviewerId;
              const headClass = rid && !r.isAnonymous ? "order-review-head profile-link" : "order-review-head";
              const headAttrs = rid && !r.isAnonymous ? ` data-user-id="${escape(String(rid))}" role="link" tabindex="0"` : "";
              return `
          <article class="order-review-item">
            <div class="${headClass}"${headAttrs}>
              ${avatar(r.isAnonymous ? { name: "Anonim" } : reviewer || { name: "Pengguna" })}
              <div class="order-review-meta">
                <div class="order-review-row">
                  <strong>${escape(r.isAnonymous ? "Anonim" : reviewer?.name || "Pengguna")}</strong>
                  <span class="order-review-stars">${[1, 2, 3, 4, 5].map((i) => `<i class="fa-${i <= r.rating ? "solid" : "regular"} fa-star"></i>`).join("")}</span>
                </div>
                <span class="order-review-sub">${dirLabel(r)} · ${fmtDate(r.createdAt, true)}</span>
              </div>
            </div>
            ${r.comment ? `<p class="order-review-comment">${escape(r.comment)}</p>` : ""}
          </article>`;
            },
          )
          .join("")}
      </div>
    </div>`;
}

export async function OrderDetailPage({ mount, params }) {
  const u = store.getState().user;
  mount.innerHTML = `<div class="container page"><div class="spinner"></div></div>`;
  try {
    const o = await api.get("/orders/" + params.id);

    let reviews = [];
    try {
      reviews = await api.get(`/reviews/order/${o.id}`);
      if (!Array.isArray(reviews)) reviews = [];
    } catch {
      reviews = [];
    }

    const isBuyer = u.id === o.buyerId;
    const isSeller = u.id === o.sellerId;
    const myReview = reviews.find((r) => r.reviewerId === u.id);
    const canReview =
      (isBuyer || isSeller) &&
      String(o.status).toUpperCase() === "COMPLETED" &&
      !myReview;

    // ========== PERBAIKAN STATE TRANSITION ==========
    // Jangan tampilkan tombol "Terima Pesanan" jika status sudah WAITING_REVIEW atau COMPLETED
    const statusKey = String(o.status || "").toUpperCase();
    const isCompleted = statusKey === "COMPLETED";
    const isCancelled = statusKey === "CANCELLED";
    const isInReview = statusKey === "WAITING_REVIEW";
    const isInProgress = statusKey === "IN_PROGRESS";
    const isAccepted = statusKey === "ACCEPTED";
    const isWaiting = statusKey === "WAITING_CONFIRMATION";

    let next = null;
    // Hanya tentukan next jika belum selesai dan belum dibatalkan
    // DAN jangan tampilkan tombol advance jika status sudah WAITING_REVIEW atau COMPLETED
    if (!isCompleted && !isCancelled && !isInReview) {
      if (isWaiting && isSeller) next = "ACCEPTED";
      else if (isAccepted && isSeller) next = "IN_PROGRESS";
      else if (isInProgress && isSeller) next = "WAITING_REVIEW";
    }

    // showAdvanceBtn: jangan duplikasi dengan seller-accept-btn saat menunggu konfirmasi
    const showAdvanceBtn =
      next !== null &&
      !isCompleted &&
      !isCancelled &&
      !isInReview &&
      !(isWaiting && isSeller);
    // ========== END PERBAIKAN ==========

    const isJob = isJobOrder(o);
    const simBuyer = isSimulatedBuyerOrder(o);
    const workAttachments = getWorkAttachments(o);
    const hasWorkProof =
      workAttachments.length > 0 ||
      Boolean(o.workSubmission || o.workSubmittedAt) ||
      isInReview ||
      isCompleted;

    const orderCtx = {
      isBuyer,
      isSeller,
      simBuyer,
      isJob,
      statusKey,
      hasWorkProof,
    };

    mount.innerHTML = `
      <div class="container page order-detail-page">
        <a href="#/orders" class="order-back-link"><i class="fa-solid fa-arrow-left"></i> Kembali</a>
        <div class="order-detail-layout">
          <div class="order-detail-main">
            <div class="order-detail-card card card-pad-lg">
              <header class="order-detail-header">
                <div class="order-detail-header-meta">
                  ${statusPill(o.status, { role: isBuyer ? "buyer" : isSeller ? "seller" : null })}
                  <span class="order-detail-id">Order #${o.id.slice(0, 12)} · ${fmtDate(o.createdAt, true)}</span>
                </div>
                <h1 class="order-detail-title">${escape(o.title)}</h1>
              </header>

              ${renderEscrowSteps(o.status)}

              <div class="order-parties">
                <div class="order-party">
                  <span class="order-party-label">Pembeli</span>
                  ${userChip(o.buyer, "sm")}
                </div>
                <div class="order-party">
                  <span class="order-party-label">Penjual</span>
                  ${userChip(o.seller, "sm")}
                </div>
              </div>

              ${o.note ? `<div class="order-note"><span class="order-party-label">Catatan pembeli</span><p>${escape(o.note)}</p></div>` : ""}

              <div class="order-actions-bar">
                ${renderOrderActionHint(o, orderCtx)}
                ${myReview ? `<div class="order-actions-note"><i class="fa-solid fa-circle-check"></i> Anda sudah memberi ulasan</div>` : ""}
                <div class="order-actions-buttons">
                  ${isSeller && isWaiting ? `<button class="btn btn-primary" id="seller-accept-btn"><i class="fa-solid fa-check"></i> Terima Pesanan</button>` : ""}
                  ${isSeller && isWaiting ? `<button class="btn btn-danger" id="seller-reject-btn"><i class="fa-solid fa-xmark"></i> Tolak</button>` : ""}
                  ${showAdvanceBtn ? `<button class="btn btn-primary" id="advance-btn"><i class="fa-solid fa-arrow-right"></i> ${getActionLabel(next)}</button>` : ""}
                  ${isBuyer && isWaiting ? `<button class="btn btn-secondary" id="cancel-btn">Batalkan</button>` : ""}
                  ${canReview ? `<button class="btn btn-success" id="review-btn"><i class="fa-solid fa-star"></i> Beri Ulasan</button>` : ""}
                  <button class="btn btn-secondary" id="chat-btn"><i class="fa-solid fa-comment"></i> Chat ${isBuyer ? "Penjual" : "Pembeli"}</button>
                  <button class="btn btn-secondary" id="dispute-btn"><i class="fa-solid fa-flag"></i> Laporkan</button>
                </div>
              </div>
            </div>

            ${renderRevisionBanner(o)}
            ${renderAutoCompleteCountdown(o)}
            ${renderWorkSubmission(o, isBuyer, isSeller)}
            ${renderOrderReviews(o, reviews)}

            <div class="order-timeline-card card card-pad-lg">
              <h3 class="order-section-title"><i class="fa-solid fa-clock-rotate-left"></i> Riwayat Status</h3>
              <div class="timeline">
                ${(o.timeline || []).map((t) => `<div class="tl-step done"><strong>${escape(t.status.replace(/_/g, " "))}</strong><div class="tl-time">${fmtDate(t.at, true)}</div></div>`).join("")}
              </div>
            </div>
          </div>

          <aside class="order-detail-sidebar card card-pad-lg">
            <div class="order-payment-head">
              <span class="order-payment-label">Total Pembayaran</span>
              <div class="order-payment-total">${fmtIDR(o.totalAmount || o.amount)}</div>
            </div>
            <div class="order-payment-breakdown">
              <div class="order-payment-row"><span>Subtotal</span><span>${fmtIDR(o.amount)}</span></div>
              <div class="order-payment-row"><span>Biaya platform</span><span>${fmtIDR(o.fee || 0)}</span></div>
            </div>
            ${o.status === "ACCEPTED" && isBuyer ? `<button class="btn btn-primary btn-block mt-2" id="pay-btn"><i class="fa-solid fa-credit-card"></i> Bayar via Escrow</button>` : ""}
            <div class="order-sidebar-hints">${renderOrderSidebarHints(o, orderCtx)}</div>
            <p class="order-escrow-trust"><i class="fa-solid fa-shield-halved"></i> Pembayaran aman dengan escrow</p>
          </aside>
        </div>
      </div>`;

    startAutoCompleteCountdown(o);

    document.getElementById("seller-accept-btn")?.addEventListener("click", async () => {
      try {
        await api.post(`/orders/${o.id}/seller-accept`, {});
        toast("✅ Pesanan diterima! Buyer akan melakukan pembayaran.", "success");
        router.render();
      } catch (err) {
        toast(err.message, "error");
      }
    });

    document.getElementById("seller-reject-btn")?.addEventListener("click", () => {
      const formHtml = `
        <form id="reject-form">
          <p class="text-sm text-muted" style="margin-top:0">Berikan alasan penolakan agar pembeli memahami keputusan Anda.</p>
          <div class="form-group">
            <label class="label">Alasan Penolakan *</label>
            <textarea id="reject-reason" class="textarea" rows="4" required minlength="5" placeholder="Contoh: Kapasitas penuh / di luar keahlian saya"></textarea>
            <div class="text-xs text-muted">Minimal 5 karakter</div>
          </div>
          <button class="btn btn-danger btn-block" type="submit"><i class="fa-solid fa-xmark"></i> Tolak Pesanan</button>
        </form>`;
      const m = modal({ title: "Tolak Pesanan", body: formHtml });
      m.el.querySelector("#reject-form")?.addEventListener("submit", async (e) => {
        e.preventDefault();
        const reason = m.el.querySelector("#reject-reason")?.value.trim() || "";
        if (reason.length < 5) {
          toast("Alasan penolakan minimal 5 karakter", "error");
          return;
        }
        try {
          await api.post(`/orders/${o.id}/cancel`, { reason });
          m.close();
          toast("Pesanan ditolak", "success");
          router.render();
        } catch (err) {
          toast(err.message, "error");
        }
      });
    });

    // Event listener untuk advance button dengan validasi tambahan
    const advanceBtn = document.getElementById("advance-btn");
    if (advanceBtn && next) {
      advanceBtn.addEventListener("click", async () => {
        // Validasi tambahan di frontend
        if (isCompleted) {
          toast("Pesanan sudah selesai", "warning");
          return;
        }
        if (isCancelled) {
          toast("Pesanan sudah dibatalkan", "warning");
          return;
        }
        if (isInReview) {
          toast(
            "Pesanan sedang dalam review, tidak bisa mengubah status",
            "warning",
          );
          return;
        }
        // Validasi khusus untuk ACCEPTED
        if (next === "ACCEPTED" && statusKey !== "WAITING_CONFIRMATION") {
          toast("Pesanan tidak dalam status menunggu konfirmasi", "error");
          return;
        }
        try {
          await api.post(`/orders/${o.id}/status`, { status: next });
          toast("Status diperbarui", "success");
          router.render();
        } catch (err) {
          toast(err.message, "error");
        }
      });
    }

    const cancelBtn = document.getElementById("cancel-btn");
    if (cancelBtn) {
      cancelBtn.addEventListener("click", () =>
        confirmModal("Yakin batalkan pesanan?", async () => {
          try {
            await api.post(`/orders/${o.id}/status`, { status: "CANCELLED" });
            toast("Dibatalkan", "success");
            router.render();
          } catch (err) {
            toast(err.message, "error");
          }
        }),
      );
    }

    const reviewBtn = document.getElementById("review-btn");
    if (reviewBtn) {
      reviewBtn.addEventListener("click", () => {
        let rating = 5;
        const formHtml = `
        <form id="rev-form">
          <div class="form-group"><label class="label">Rating</label>
            <div id="stars-pick" style="font-size:2rem;cursor:pointer;color:var(--warning)">${[1, 2, 3, 4, 5].map((i) => `<i class="fa-solid fa-star" data-r="${i}"></i>`).join(" ")}</div>
          </div>
          <div class="form-group"><label class="label">Komentar</label><textarea id="rev-cm" class="textarea" required></textarea></div>
          <button class="btn btn-primary btn-block" type="submit">Kirim Review</button>
        </form>`;
        const m = modal({ title: "Beri Ulasan", body: formHtml });
        m.el.querySelectorAll("[data-r]").forEach((s) =>
          s.addEventListener("click", () => {
            rating = parseInt(s.dataset.r);
            m.el
              .querySelectorAll("[data-r]")
              .forEach((x, i) => (x.style.opacity = i < rating ? "1" : ".3"));
          }),
        );
        m.el
          .querySelector("#rev-form")
          .addEventListener("submit", async (e) => {
            e.preventDefault();
            try {
              await api.post("/reviews", {
                orderId: o.id,
                rating,
                comment: m.el.querySelector("#rev-cm").value,
              });
              m.close();
              await refreshUserReviewsSnapshot();
              toast(
                "Ulasan terkirim! Anda akan mendapat notifikasi saat lawan transaksi juga memberi ulasan.",
                "success",
              );
              router.render();
            } catch (err) {
              toast(err.message, "error");
            }
          });
      });
    }

    const workFilesInput = document.getElementById("work-files");
    if (workFilesInput) {
      workFilesInput.addEventListener("change", () => {
        const preview = document.getElementById("work-files-preview");
        if (!preview) return;
        preview.querySelectorAll("img[data-object-url]").forEach((img) => {
          URL.revokeObjectURL(img.dataset.objectUrl);
        });
        preview.innerHTML = "";
        Array.from(workFilesInput.files || []).forEach((file) => {
          const item = document.createElement("div");
          item.style.cssText =
            "border:1px solid var(--border);border-radius:8px;padding:8px;text-align:center;max-width:140px";
          if (file.type.startsWith("image/")) {
            const url = URL.createObjectURL(file);
            const img = document.createElement("img");
            img.src = url;
            img.alt = file.name;
            img.dataset.objectUrl = url;
            img.style.cssText =
              "max-width:120px;max-height:120px;object-fit:cover;border-radius:4px;display:block;margin:0 auto 4px";
            item.appendChild(img);
            const label = document.createElement("div");
            label.className = "text-xs text-muted";
            label.textContent = file.name;
            item.appendChild(label);
          } else if (file.type === "application/pdf") {
            item.innerHTML = `<i class="fa-solid fa-file-pdf" style="font-size:2rem;color:var(--danger)"></i><div class="text-xs text-muted mt-1">${escape(file.name)}</div>`;
          } else {
            item.innerHTML = `<i class="fa-solid fa-file"></i><div class="text-xs text-muted mt-1">${escape(file.name)}</div>`;
          }
          preview.appendChild(item);
        });
      });
    }

    const workForm = document.getElementById("work-form");
    if (workForm) {
      workForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const note = document.getElementById("work-note")?.value.trim() || "";
        const files = Array.from(
          document.getElementById("work-files")?.files || [],
        );
        if (!files.length)
          return toast("Upload minimal satu bukti kerja", "error");
        if (files.length > 10)
          return toast("Maksimal 10 lampiran", "error");
        if (note.length < 10)
          return toast("Catatan bukti minimal 10 karakter", "error");
        try {
          const attachments = [];
          const progress = document.getElementById("work-upload-progress");
          for (let index = 0; index < files.length; index += 1) {
            const result = await uploadFile(files[index], "work-proofs", (pct) => {
              if (progress)
                progress.textContent =
                  "Mengunggah " + (index + 1) + "/" + files.length + " · " + pct + "%";
            });
            attachments.push(result.url);
          }
          await api.post(`/orders/${o.id}/work-submission`, {
            note,
            attachments,
          });
          toast(
            "Bukti pengerjaan dikirim. Menunggu approval client.",
            "success",
          );
          router.render();
        } catch (err) {
          toast(err.message, "error");
        }
      });
    }

    const approveWorkBtn = document.getElementById("approve-work");
    if (approveWorkBtn) {
      approveWorkBtn.addEventListener("click", () =>
        confirmModal(
          "Approve pekerjaan ini dan rilis dana escrow ke pekerja?",
          async () => {
            try {
              await api.post(`/orders/${o.id}/status`, { status: "COMPLETED" });
              toast("Pekerjaan disetujui. Dana dirilis ke pekerja.", "success");
              router.render();
            } catch (err) {
              toast(err.message, "error");
            }
          },
        ),
      );
    }

    const rejectWorkBtn = document.getElementById("reject-work");
    if (rejectWorkBtn) {
      rejectWorkBtn.addEventListener("click", () => {
        const m = modal({
          title: "Minta Revisi",
          body: `<form id="revision-form"><div class="form-group"><label class="label">Alasan revisi yang jelas</label><textarea class="textarea" id="revision-reason" required minlength="5" placeholder="Contoh: bagian X belum sesuai brief, mohon perbaiki..."></textarea></div><button class="btn btn-primary btn-block" type="submit">Kirim Revisi</button></form>`,
        });
        m.el
          .querySelector("#revision-form")
          .addEventListener("submit", async (e) => {
            e.preventDefault();
            const reason = m.el.querySelector("#revision-reason").value.trim();
            try {
              await api.post(`/orders/${o.id}/work-revision`, { reason });
              m.close();
              toast("Revisi dikirim ke pekerja.", "success");
              router.render();
            } catch (err) {
              toast(err.message, "error");
            }
          });
      });
    }

    const disputeWorkBtn = document.getElementById("dispute-work");
    if (disputeWorkBtn) {
      disputeWorkBtn.addEventListener("click", () => {
        toast(
          "Gunakan tombol Laporkan untuk membuka sengketa dengan bukti lengkap.",
          "info",
        );
        document.getElementById("dispute-btn")?.click();
      });
    }

    const disputeBtn = document.getElementById("dispute-btn");
    if (disputeBtn) {
      disputeBtn.addEventListener("click", () => {
        const m = modal({
          title: "Laporkan Masalah",
          body: `
        <form id="d-form">
          <div class="form-group"><label class="label">Alasan</label><textarea class="textarea" id="d-reason" required minlength="20"></textarea></div>
          <button class="btn btn-danger btn-block" type="submit">Kirim Laporan</button>
        </form>`,
        });
        m.el.querySelector("#d-form").addEventListener("submit", async (e) => {
          e.preventDefault();
          const description = m.el.querySelector("#d-reason").value.trim();
          if (description.length < 20) {
            toast("Jelaskan masalah minimal 20 karakter", "error");
            return;
          }
          try {
            await api.post("/disputes", {
              orderId: o.id,
              reason: description.slice(0, 120),
              description,
            });
            m.close();
            toast("Laporan terkirim ke admin", "success");
          } catch (err) {
            toast(err.message, "error");
          }
        });
      });
    }

    const payBtn = document.getElementById("pay-btn");
    if (payBtn) {
      payBtn.addEventListener("click", async () => {
        try {
          const cfg = await api.get("/payments/midtrans/config");
          if (!cfg.configured) {
            openDemoPaymentModal(o, () => router.render());
            return;
          }
          toast("Membuka Midtrans...", "info");
          const tokenRes = await api.post(
            `/payments/midtrans/token?orderId=${o.id}`,
          );
          await loadSnapJs(tokenRes.clientKey, tokenRes.isProduction);
          window.snap.pay(tokenRes.token, {
            onSuccess: () => {
              toast("Pembayaran berhasil!", "success");
              setTimeout(() => router.render(), 1200);
            },
            onPending: () =>
              toast("Pembayaran pending - selesaikan di Midtrans", "warning"),
            onError: (r) =>
              toast("Pembayaran gagal: " + (r?.status_message || ""), "error"),
            onClose: () => toast("Anda menutup halaman pembayaran", "info"),
          });
        } catch (err) {
          toast(err.message, "error");
        }
      });
    }

    const chatBtn = document.getElementById("chat-btn");
    if (chatBtn) {
      chatBtn.addEventListener("click", async () => {
        const otherUserId = isBuyer ? o.sellerId : o.buyerId;
        try {
          const conv = await api.post("/chat/conversations", {
            recipientId: otherUserId,
            orderId: o.id,
          });
          toast("Membuka chat...", "info");
          router.navigate(`/chat/${conv.id}`);
        } catch (err) {
          toast(err.message, "error");
        }
      });
    }
  } catch (err) {
    console.error("OrderDetailPage error:", err);
    mount.innerHTML = empty("Tidak ditemukan", err.message);
  }
}
