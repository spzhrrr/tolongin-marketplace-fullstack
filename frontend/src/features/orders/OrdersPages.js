<<<<<<< HEAD
<<<<<<< HEAD
import { api } from "../../shared/utils/api.js";
=======
=======
>>>>>>> ec26484 (implementasi demo)
// frontend/src/features/orders/OrdersPages.js

import { api, resolveAssetUrl } from "../../shared/utils/api.js";
import { uploadFile } from "../../shared/utils/uploads.js";
<<<<<<< HEAD
>>>>>>> 961a4cc (Update: Menyinkronkan perubahan lokal dengan repositori remote)
=======
>>>>>>> ec26484 (implementasi demo)
import {
  escape,
  fmtIDR,
  fmtDate,
  toast,
  modal,
  confirmModal,
} from "../../shared/utils/helpers.js";
import { statusPill, avatar, empty } from "../../shared/ui/components.js";
import { store } from "../../app/store.js";
import { router } from "../../app/router.js";

<<<<<<< HEAD
// Helper function untuk label tombol advance order
=======
>>>>>>> ec26484 (implementasi demo)
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

<<<<<<< HEAD
<<<<<<< HEAD
// Lazy-load Midtrans Snap JS (only when needed)
=======
=======
>>>>>>> ec26484 (implementasi demo)
function renderEscrowSteps(status) {
  const s = String(status || "").toUpperCase();
  const steps = [
    ["WAITING_CONFIRMATION", "Menunggu pembayaran"],
    ["PAID", "Dana di escrow"],
    ["WAITING_REVIEW", "Review bukti"],
    ["COMPLETED", "Dana dirilis"],
  ];
  const displayStatus = s === "REJECTED" ? "WAITING_REVIEW" : s;
  const activeIndex = Math.max(
    0,
    steps.findIndex(([key]) => key === displayStatus),
  );
  return `<div class="escrow-steps">${steps
    .map(
      ([key, label], i) =>
        `<div class="escrow-step ${i <= activeIndex ? "done" : ""} ${key === displayStatus ? "current" : ""}">
          <span>${i + 1}</span><small>${label}</small>
        </div>`,
    )
    .join("")}</div>`;
}

function renderWorkSubmission(o, isBuyer, isSeller) {
  const sub = o.workSubmission;
  const attachments = sub?.attachments || [];
  if (!sub && !isSeller) {
    return `<div class="alert alert-info mt-3"><i class="fa-solid fa-shield-halved"></i> Menunggu pekerja mengirim bukti pengerjaan. Dana tetap ditahan di escrow sampai Anda approve.</div>`;
  }
  return `
    <div class="card card-pad-lg mt-3">
      <div class="flex-between" style="align-items:flex-start;gap:1rem;flex-wrap:wrap">
        <div>
          <h3 style="margin:0"><i class="fa-solid fa-file-circle-check"></i> Bukti Pengerjaan</h3>
          <p class="text-muted text-sm" style="margin:.35rem 0 0">Upload catatan, link file, foto hasil kerja, atau bukti lapangan. Dana seller hanya cair setelah approve.</p>
        </div>
        ${(() => {
          const st = String(o.status).toUpperCase();
          if (st === "COMPLETED") return `<span class="badge badge-success"><i class="fa-solid fa-circle-check"></i> Disetujui</span>`;
          if (st === "CANCELLED") return `<span class="badge badge-danger"><i class="fa-solid fa-ban"></i> Dibatalkan</span>`;
          if (o.workSubmittedAt) return `<span class="badge badge-warning">Menunggu approval</span>`;
          return `<span class="badge">Belum dikirim</span>`;
        })()}
      </div>
      ${
        sub
          ? `<div class="work-proof mt-2">
              <p>${escape(sub.note || "")}</p>
              ${
                attachments.length
                  ? `<div class="proof-links">${attachments.map((a, i) => `<a class="btn btn-secondary btn-sm" href="${escape(resolveAssetUrl(a))}" target="_blank" rel="noopener"><i class="fa-solid fa-paperclip"></i> Bukti ${i + 1}</a>`).join("")}</div>`
                  : `<div class="text-sm text-muted">Tidak ada lampiran, hanya catatan.</div>`
              }
            </div>`
          : ""
      }
      ${
        isSeller &&
<<<<<<< HEAD
        ["PAID", "REJECTED"].includes(
=======
        ["PAID", "IN_PROGRESS", "REJECTED", "REVISION_REQUESTED"].includes(
>>>>>>> ec26484 (implementasi demo)
          String(o.status).toUpperCase(),
        )
          ? `<form id="work-form" class="mt-3">
              <div class="form-group">
                <label class="label">Catatan hasil kerja *</label>
                <textarea class="textarea" id="work-note" required minlength="10" placeholder="Jelaskan pekerjaan yang sudah selesai, lokasi file, atau bukti lapangan..."></textarea>
              </div>
              <div class="form-group">
                <label class="label">Bukti kerja * (JPG, PNG, WebP, atau PDF)</label>
                <input class="input" type="file" id="work-files" accept="image/jpeg,image/png,image/webp,application/pdf" multiple required>
<<<<<<< HEAD
                <div id="work-upload-progress" class="text-sm text-muted mt-1">Maksimal 10 file, masing-masing 10 MB.</div>
              </div>
              <button class="btn btn-primary" type="submit"><i class="fa-solid fa-upload"></i> Kirim Bukti untuk Approval</button>
=======
                <div id="work-files-preview" class="work-files-preview"></div>
                <div id="work-upload-progress" class="text-sm text-muted mt-1">Maksimal 10 file, masing-masing 10 MB.</div>
              </div>
              <button class="btn btn-primary" type="submit"><i class="fa-solid fa-upload"></i> Kirim Bukti</button>
>>>>>>> ec26484 (implementasi demo)
            </form>`
          : ""
      }
      ${
        isBuyer && String(o.status).toUpperCase() === "WAITING_REVIEW"
          ? `<div class="flex gap-sm mt-3 flex-wrap">
              <button class="btn btn-success" id="approve-work"><i class="fa-solid fa-circle-check"></i> Approve & Rilis Dana</button>
              <button class="btn btn-secondary" id="reject-work"><i class="fa-solid fa-rotate-left"></i> Minta Revisi</button>
              <button class="btn btn-danger" id="dispute-work"><i class="fa-solid fa-scale-balanced"></i> Sengketa</button>
            </div>`
          : ""
      }
    </div>`;
}

<<<<<<< HEAD
>>>>>>> 961a4cc (Update: Menyinkronkan perubahan lokal dengan repositori remote)
=======
>>>>>>> ec26484 (implementasi demo)
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
    <div class="container page">
      <div class="page-header">
        <div><h1 class="page-title">Pesanan Saya</h1><p class="page-subtitle">Kelola semua pesanan Anda</p></div>
        <div class="chips" id="role-tabs">
          <span class="chip active" data-role="all">Semua</span>
          <span class="chip" data-role="BUYER">Sebagai Pembeli</span>
          <span class="chip" data-role="SELLER">Sebagai Penjual</span>
        </div>
      </div>
      <div id="orders" class="flex-col"></div>
    </div>`;
  const load = async (role) => {
    const list = document.getElementById("orders");
    list.innerHTML = '<div class="spinner"></div>';
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
        .map(
          (o) => `
        <a href="#/orders/${o.id}" class="card card-pad card-hover" data-testid="order-${o.id}">
          <div class="flex-between" style="align-items:flex-start">
            <div style="flex:1">
              <div class="flex gap-sm mb-1">${statusPill(o.status)}<span class="text-xs text-muted">#${o.id.slice(0, 8)}</span></div>
              <h3 style="margin:.25rem 0">${escape(o.title)}</h3>
              <div class="flex gap-md text-sm text-muted">
                <span>Pembeli: ${escape(o.buyer?.name)}</span>
                <span>Penjual: ${escape(o.seller?.name)}</span>
                <span><i class="fa-solid fa-clock"></i> ${fmtDate(o.createdAt)}</span>
              </div>
            </div>
            <div class="text-right"><div class="text-xs text-muted">Total</div><div style="font-family:var(--font-head);font-weight:700;color:var(--primary-dark);font-size:1.15rem">${fmtIDR(o.amount)}</div></div>
          </div>
        </a>`,
        )
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

<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> ec26484 (implementasi demo)
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
    <div class="card card-pad-lg mt-3">
      <h3 style="margin:0 0 .75rem"><i class="fa-solid fa-star"></i> Ulasan (${reviews.length})</h3>
      <div class="flex-col gap-md">
        ${reviews
          .map(
            (r) => `
          <div class="review-item" style="border:1px solid var(--border);border-radius:12px;padding:1rem">
            <div class="flex-between" style="align-items:flex-start;gap:.75rem;flex-wrap:wrap">
              <div class="flex gap-sm" style="align-items:center">
                ${avatar(r.isAnonymous ? { name: "Anonim" } : r.reviewer, "sm")}
                <div>
                  <strong>${escape(r.isAnonymous ? "Anonim" : r.reviewer?.name || "Pengguna")}</strong>
                  <div class="text-xs text-muted">${dirLabel(r)}</div>
                </div>
              </div>
              <div style="color:var(--warning);white-space:nowrap">
                ${[1, 2, 3, 4, 5].map((i) => `<i class="fa-${i <= r.rating ? "solid" : "regular"} fa-star"></i>`).join("")}
              </div>
            </div>
            ${r.comment ? `<p style="margin:.6rem 0 0">${escape(r.comment)}</p>` : ""}
            <div class="text-xs text-muted mt-1">${fmtDate(r.createdAt, true)}</div>
          </div>`,
          )
          .join("")}
      </div>
    </div>`;
}

<<<<<<< HEAD
>>>>>>> 961a4cc (Update: Menyinkronkan perubahan lokal dengan repositori remote)
=======
>>>>>>> ec26484 (implementasi demo)
export async function OrderDetailPage({ mount, params }) {
  const u = store.getState().user;
  mount.innerHTML = `<div class="container page"><div class="spinner"></div></div>`;
  try {
    const o = await api.get("/orders/" + params.id);
<<<<<<< HEAD
    const isBuyer = u.id === o.buyerId;
    const isSeller = u.id === o.sellerId;
<<<<<<< HEAD
    const statusKey = String(o.status || "").toLowerCase();
    const next = {
      pending: isSeller ? "ACCEPTED" : null,
      waiting_confirmation: isSeller ? "ACCEPTED" : null,
      accepted: isSeller ? "IN_PROGRESS" : null,
      in_progress: isSeller ? "IN_REVIEW" : null,
      in_review: isBuyer ? "COMPLETED" : null,
    }[statusKey];
=======
=======

    let reviews = [];
    try {
      reviews = await api.get(`/reviews/order/${o.id}`);
      if (!Array.isArray(reviews)) reviews = [];
    } catch {
      reviews = [];
    }

    const isBuyer = u.id === o.buyerId;
    const isSeller = u.id === o.sellerId;
>>>>>>> ec26484 (implementasi demo)
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

    // showAdvanceBtn: hanya tampilkan jika next tidak null dan status belum di WAITING_REVIEW atau COMPLETED
    const showAdvanceBtn =
      next !== null && !isCompleted && !isCancelled && !isInReview;
    // ========== END PERBAIKAN ==========

<<<<<<< HEAD
>>>>>>> 961a4cc (Update: Menyinkronkan perubahan lokal dengan repositori remote)
=======
>>>>>>> ec26484 (implementasi demo)
    mount.innerHTML = `
      <div class="container page">
        <a href="#/orders"><i class="fa-solid fa-arrow-left"></i> Kembali</a>
        <div class="grid" style="grid-template-columns: 1fr 320px;gap:1.5rem;margin-top:1rem">
          <div>
            <div class="card card-pad-lg">
              <div class="flex-between mb-2"><h1 style="margin:0">${escape(o.title)}</h1>${statusPill(o.status)}</div>
              <div class="text-sm text-muted">Order #${o.id.slice(0, 12)} · ${fmtDate(o.createdAt, true)}</div>
<<<<<<< HEAD
=======
              ${renderEscrowSteps(o.status)}
>>>>>>> ec26484 (implementasi demo)
              <div class="divider"></div>
              <div class="grid grid-2">
                <div>
                  <div class="text-xs text-muted">Pembeli</div>
                  <div class="flex gap-md" style="align-items:center;margin-top:.25rem">${avatar(o.buyer, "sm")}<strong>${escape(o.buyer?.name)}</strong></div>
                </div>
                <div>
                  <div class="text-xs text-muted">Penjual</div>
                  <div class="flex gap-md" style="align-items:center;margin-top:.25rem">${avatar(o.seller, "sm")}<strong>${escape(o.seller?.name)}</strong></div>
                </div>
              </div>
              ${o.note ? `<div class="mt-2"><div class="text-xs text-muted">Catatan</div><p>${escape(o.note)}</p></div>` : ""}
<<<<<<< HEAD
              <div class="flex gap-sm mt-3 flex-wrap">
<<<<<<< HEAD
                ${next ? `<button class="btn btn-primary" id="advance-btn" data-testid="advance-order-btn"><i class="fa-solid fa-arrow-right"></i> ${getActionLabel(next)}</button>` : ""}
                ${(isBuyer || isSeller) && !["COMPLETED", "CANCELLED", "completed", "cancelled"].includes(o.status) ? `<button class="btn btn-danger" id="cancel-btn" data-testid="cancel-order-btn">Batalkan</button>` : ""}
                ${isBuyer && (o.status === "COMPLETED" || o.status === "completed") ? `<button class="btn btn-success" id="review-btn" data-testid="review-order-btn"><i class="fa-solid fa-star"></i> Beri Review</button>` : ""}
                <button class="btn btn-secondary" id="chat-btn" data-testid="chat-order-btn">
=======
=======
              
              <div class="flex gap-sm mt-3 flex-wrap">
>>>>>>> ec26484 (implementasi demo)
                ${showAdvanceBtn ? `<button class="btn btn-primary" id="advance-btn"><i class="fa-solid fa-arrow-right"></i> ${getActionLabel(next)}</button>` : ""}
                ${isBuyer && isWaiting ? `<button class="btn btn-danger" id="cancel-btn">Batalkan</button>` : ""}
                ${canReview ? `<button class="btn btn-success" id="review-btn"><i class="fa-solid fa-star"></i> Beri Review ${isSeller ? "untuk Pembeli" : "untuk Penjual"}</button>` : ""}
                ${myReview ? `<span class="badge badge-success" style="align-self:center"><i class="fa-solid fa-circle-check"></i> Anda sudah memberi ulasan</span>` : ""}
<<<<<<< HEAD
                
                ${!isCompleted && !isCancelled ? `<button class="btn btn-success" id="demo-auto-btn"><i class="fa-solid fa-wand-magic-sparkles"></i> Demo Auto</button>` : ""}
                <button class="btn btn-secondary" id="chat-btn">
>>>>>>> 961a4cc (Update: Menyinkronkan perubahan lokal dengan repositori remote)
                  <i class="fa-solid fa-comment"></i> Chat dengan ${isBuyer ? "Penjual" : "Pembeli"}
                </button>
                <button class="btn btn-secondary" id="dispute-btn" data-testid="dispute-btn"><i class="fa-solid fa-flag"></i> Laporkan</button>
              </div>
            </div>
=======
                <button class="btn btn-secondary" id="chat-btn">
                  <i class="fa-solid fa-comment"></i> Chat dengan ${isBuyer ? "Penjual" : "Pembeli"}
                </button>
                <button class="btn btn-secondary" id="dispute-btn"><i class="fa-solid fa-flag"></i> Laporkan</button>
              </div>
            </div>
            
            ${renderRevisionBanner(o)}
            ${renderAutoCompleteCountdown(o)}
            ${renderWorkSubmission(o, isBuyer, isSeller)}
            ${renderOrderReviews(o, reviews)}
            
>>>>>>> ec26484 (implementasi demo)
            <div class="card card-pad-lg mt-3">
              <h3>Timeline</h3>
              <div class="timeline">
                ${(o.timeline || []).map((t) => `<div class="tl-step done"><strong>${escape(t.status.replace("_", " "))}</strong><div class="tl-time">${fmtDate(t.at, true)}</div></div>`).join("")}
              </div>
            </div>
          </div>
          <aside class="card card-pad-lg" style="position:sticky;top:calc(var(--header-h) + 1rem);align-self:flex-start">
            <div class="text-center">
              <div class="text-xs text-muted">Total Pembayaran</div>
              <div style="font-family:var(--font-head);font-size:2rem;font-weight:700;color:var(--primary-dark)">${fmtIDR(o.totalAmount || o.amount)}</div>
            </div>
            <div class="divider"></div>
            <div class="text-sm">
              <div class="flex-between"><span class="text-muted">Subtotal</span><span>${fmtIDR(o.amount)}</span></div>
              <div class="flex-between"><span class="text-muted">Platform fee</span><span>${fmtIDR(o.fee || 0)}</span></div>
              <div class="divider"></div>
              <div class="flex-between"><strong>Total</strong><strong>${fmtIDR(o.totalAmount || o.amount)}</strong></div>
            </div>
<<<<<<< HEAD
<<<<<<< HEAD
            <button class="btn btn-primary btn-block mt-2" id="pay-btn" data-testid="pay-now-btn"${o.status === "WAITING_CONFIRMATION" || o.status === "pending" ? "" : " disabled"}><i class="fa-solid fa-credit-card"></i> Bayar Sekarang</button>
=======
            ${o.status === "WAITING_CONFIRMATION" && isBuyer ? `<button class="btn btn-primary btn-block mt-2" id="pay-btn"><i class="fa-solid fa-credit-card"></i> Bayar Sekarang</button>` : ""}
            ${o.status === "COMPLETED" ? `<div class="alert alert-success mt-2" style="margin:0"><i class="fa-solid fa-circle-check"></i> Pembayaran selesai, dana telah dirilis.</div>` : ""}
            ${o.status === "CANCELLED" ? `<div class="alert alert-danger mt-2" style="margin:0"><i class="fa-solid fa-ban"></i> Pesanan dibatalkan${o.cancellationReason ? ": " + escape(o.cancellationReason) : "."}</div>` : ""}
>>>>>>> 961a4cc (Update: Menyinkronkan perubahan lokal dengan repositori remote)
=======
            ${o.status === "WAITING_CONFIRMATION" && isBuyer ? `<button class="btn btn-primary btn-block mt-2" id="pay-btn"><i class="fa-solid fa-credit-card"></i> Bayar Sekarang</button>` : ""}
            ${o.status === "COMPLETED" ? `<div class="alert alert-success mt-2" style="margin:0"><i class="fa-solid fa-circle-check"></i> Pembayaran selesai, dana telah dirilis.</div>` : ""}
            ${o.status === "CANCELLED" ? `<div class="alert alert-danger mt-2" style="margin:0"><i class="fa-solid fa-ban"></i> Pesanan dibatalkan${o.cancellationReason ? ": " + escape(o.cancellationReason) : "."}</div>` : ""}
>>>>>>> ec26484 (implementasi demo)
            <div class="text-xs text-muted text-center mt-1"><i class="fa-solid fa-shield-halved"></i> Pembayaran aman dengan escrow</div>
          </aside>
        </div>
      </div>`;
<<<<<<< HEAD
    const adv = document.getElementById("advance-btn");
    if (adv)
      adv.addEventListener("click", async () => {
=======

    startAutoCompleteCountdown(o);

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
>>>>>>> ec26484 (implementasi demo)
        try {
          await api.post(`/orders/${o.id}/status`, { status: next });
          toast("Status diperbarui", "success");
          router.render();
        } catch (err) {
          toast(err.message, "error");
        }
      });
<<<<<<< HEAD
    const can = document.getElementById("cancel-btn");
    if (can)
      can.addEventListener("click", () =>
=======
    }

    const cancelBtn = document.getElementById("cancel-btn");
    if (cancelBtn) {
      cancelBtn.addEventListener("click", () =>
>>>>>>> ec26484 (implementasi demo)
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
<<<<<<< HEAD
    const rev = document.getElementById("review-btn");
    if (rev)
      rev.addEventListener("click", () => {
=======
    }

    const reviewBtn = document.getElementById("review-btn");
    if (reviewBtn) {
      reviewBtn.addEventListener("click", () => {
>>>>>>> ec26484 (implementasi demo)
        let rating = 5;
        const formHtml = `
        <form id="rev-form">
          <div class="form-group"><label class="label">Rating</label>
<<<<<<< HEAD
            <div id="stars-pick" style="font-size:2rem;cursor:pointer;color:var(--warning)" data-testid="review-stars">${[1, 2, 3, 4, 5].map((i) => `<i class="fa-solid fa-star" data-r="${i}"></i>`).join(" ")}</div>
          </div>
          <div class="form-group"><label class="label">Komentar</label><textarea id="rev-cm" class="textarea" required data-testid="review-comment"></textarea></div>
          <button class="btn btn-primary btn-block" type="submit" data-testid="review-submit-btn">Kirim Review</button>
=======
            <div id="stars-pick" style="font-size:2rem;cursor:pointer;color:var(--warning)">${[1, 2, 3, 4, 5].map((i) => `<i class="fa-solid fa-star" data-r="${i}"></i>`).join(" ")}</div>
          </div>
          <div class="form-group"><label class="label">Komentar</label><textarea id="rev-cm" class="textarea" required></textarea></div>
          <button class="btn btn-primary btn-block" type="submit">Kirim Review</button>
>>>>>>> ec26484 (implementasi demo)
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
<<<<<<< HEAD
              await api.post(`/orders/${o.id}/review`, {
=======
              await api.post("/reviews", {
                orderId: o.id,
>>>>>>> ec26484 (implementasi demo)
                rating,
                comment: m.el.querySelector("#rev-cm").value,
              });
              m.close();
              toast("Review terkirim", "success");
              router.render();
            } catch (err) {
              toast(err.message, "error");
            }
          });
      });
<<<<<<< HEAD
<<<<<<< HEAD
    const disp = document.getElementById("dispute-btn");
    if (disp)
      disp.addEventListener("click", () => {
=======
=======
    }

    const workFilesInput = document.getElementById("work-files");
    const workFilesPreview = document.getElementById("work-files-preview");
    if (workFilesInput && workFilesPreview) {
      workFilesInput.addEventListener("change", () => {
        workFilesPreview.innerHTML = "";
        Array.from(workFilesInput.files || []).forEach((file, index) => {
          const item = document.createElement("div");
          item.className = "work-preview-item";
          if (file.type.startsWith("image/")) {
            const img = document.createElement("img");
            img.src = URL.createObjectURL(file);
            img.alt = file.name;
            item.appendChild(img);
          } else {
            item.innerHTML = `<i class="fa-solid fa-file-pdf"></i><span>${escape(file.name)}</span>`;
          }
          const label = document.createElement("small");
          label.textContent = `File ${index + 1}`;
          item.appendChild(label);
          workFilesPreview.appendChild(item);
        });
      });
>>>>>>> ec26484 (implementasi demo)
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
          return toast("Maksimal 10 lampiran", "error");        if (note.length < 10)
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
<<<<<<< HEAD
>>>>>>> 961a4cc (Update: Menyinkronkan perubahan lokal dengan repositori remote)
=======
>>>>>>> ec26484 (implementasi demo)
        const m = modal({
          title: "Laporkan Masalah",
          body: `
        <form id="d-form">
<<<<<<< HEAD
          <div class="form-group"><label class="label">Alasan</label><textarea class="textarea" id="d-reason" required data-testid="dispute-reason"></textarea></div>
          <button class="btn btn-danger btn-block" type="submit" data-testid="dispute-submit-btn">Kirim Laporan</button>
=======
          <div class="form-group"><label class="label">Alasan</label><textarea class="textarea" id="d-reason" required minlength="20"></textarea></div>
          <button class="btn btn-danger btn-block" type="submit">Kirim Laporan</button>
>>>>>>> ec26484 (implementasi demo)
        </form>`,
        });
        m.el.querySelector("#d-form").addEventListener("submit", async (e) => {
          e.preventDefault();
<<<<<<< HEAD
          try {
            await api.post("/disputes", {
              orderId: o.id,
              reason: m.el.querySelector("#d-reason").value,
=======
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
>>>>>>> ec26484 (implementasi demo)
            });
            m.close();
            toast("Laporan terkirim ke admin", "success");
          } catch (err) {
            toast(err.message, "error");
          }
        });
      });
<<<<<<< HEAD
    const pay = document.getElementById("pay-btn");
    if (pay)
      pay.addEventListener("click", async () => {
=======
    }

    const payBtn = document.getElementById("pay-btn");
    if (payBtn) {
      payBtn.addEventListener("click", async () => {
>>>>>>> ec26484 (implementasi demo)
        try {
          const cfg = await api.get("/payments/midtrans/config");
          if (!cfg.configured) {
            const m = modal({
<<<<<<< HEAD
              title: "Pembayaran (Demo)",
              body: `
            <div class="text-center">
              <i class="fa-solid fa-credit-card" style="font-size:3rem;color:var(--primary)"></i>
              <h3 class="mt-2">Total: ${fmtIDR(o.amount)}</h3>
              <p class="text-muted">Midtrans belum dikonfigurasi. Mode demo aktif.</p>
              <button class="btn btn-primary btn-block" id="pay-ok" data-testid="confirm-pay-btn">Konfirmasi Pembayaran (Demo)</button>
=======
              title: "Konfirmasi Pembayaran",
              body: `
            <div class="pay-checkout">
              <div class="escrow-summary">
                <i class="fa-solid fa-shield-halved"></i>
                <div><strong>Escrow Tolongin</strong><span>Dana ditahan sampai bukti kerja Anda setujui.</span></div>
              </div>
              <h3 class="mt-2">Total: ${fmtIDR(o.totalAmount || o.amount)}</h3>
              <div class="pay-methods">
                ${["Virtual Account BCA", "QRIS", "GoPay", "OVO", "DANA", "Kartu Kredit"].map((x, i) => `<label class="pay-method ${i === 0 ? "active" : ""}"><input type="radio" name="pay-method" ${i === 0 ? "checked" : ""}><span><i class="fa-solid ${i === 1 ? "fa-qrcode" : i === 5 ? "fa-credit-card" : "fa-building-columns"}"></i>${x}</span><small>Konfirmasi instan</small></label>`).join("")}
              </div>
              <div class="alert alert-info mt-2"><i class="fa-solid fa-circle-info"></i> Dana akan ditahan di escrow hingga Anda menyetujui bukti pengerjaan.</div>
              <button class="btn btn-primary btn-block" id="pay-ok">Bayar & Aktifkan Escrow</button>
>>>>>>> ec26484 (implementasi demo)
            </div>`,
            });
            m.el
              .querySelector("#pay-ok")
              .addEventListener("click", async () => {
                try {
                  await api.post(`/payments/demo/confirm/${o.id}`);
                  m.close();
                  toast("Pembayaran berhasil!", "success");
                  router.render();
                } catch (err) {
                  toast(err.message, "error");
                }
              });
            return;
          }
          toast("Membuka Midtrans...", "info");
          const tokenRes = await api.post(
            `/payments/midtrans/token?orderId=${o.id}`,
          );
          await loadSnapJs(tokenRes.clientKey, tokenRes.isProduction);
          window.snap.pay(tokenRes.token, {
<<<<<<< HEAD
            onSuccess: (r) => {
              toast("Pembayaran berhasil!", "success");
              setTimeout(() => router.render(), 1200);
            },
            onPending: (r) =>
=======
            onSuccess: () => {
              toast("Pembayaran berhasil!", "success");
              setTimeout(() => router.render(), 1200);
            },
            onPending: () =>
>>>>>>> ec26484 (implementasi demo)
              toast("Pembayaran pending - selesaikan di Midtrans", "warning"),
            onError: (r) =>
              toast("Pembayaran gagal: " + (r?.status_message || ""), "error"),
            onClose: () => toast("Anda menutup halaman pembayaran", "info"),
          });
        } catch (err) {
          toast(err.message, "error");
        }
      });
<<<<<<< HEAD

<<<<<<< HEAD
    // Chat button handler
=======
    const demoAutoBtn = document.getElementById("demo-auto-btn");
    if (demoAutoBtn) {
      demoAutoBtn.addEventListener("click", async () => {
        demoAutoBtn.disabled = true;
        demoAutoBtn.innerHTML =
          '<i class="fa-solid fa-spinner fa-spin"></i> Menjalankan flow...';
        try {
          await api.post("/orders/" + o.id + "/demo-auto", {});
          toast("Demo selesai: bayar, kirim bukti, approve, dana cair.", "success");
          router.render();
        } catch (err) {
          demoAutoBtn.disabled = false;
          demoAutoBtn.innerHTML =
            '<i class="fa-solid fa-wand-magic-sparkles"></i> Demo Auto';
          toast(err.message, "error");
        }
      });
    }
>>>>>>> 961a4cc (Update: Menyinkronkan perubahan lokal dengan repositori remote)
=======
    }

>>>>>>> ec26484 (implementasi demo)
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
<<<<<<< HEAD
=======
    console.error("OrderDetailPage error:", err);
>>>>>>> ec26484 (implementasi demo)
    mount.innerHTML = empty("Tidak ditemukan", err.message);
  }
}
