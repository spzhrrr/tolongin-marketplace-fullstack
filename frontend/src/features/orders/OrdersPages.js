import { api } from "../../shared/utils/api.js";
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

// Helper function untuk label tombol advance order
function getActionLabel(next) {
  const labels = {
    ACCEPTED: "✓ Terima Pesanan",
    IN_PROGRESS: "🔧 Mulai Pengerjaan",
    IN_REVIEW: "👀 Submit untuk Review",
    COMPLETED: "✅ Selesaikan Pesanan",
    CANCELLED: "✕ Batalkan Pesanan",
  };
  return labels[next] || `Update ke ${String(next).replace("_", " ")}`;
}

// Lazy-load Midtrans Snap JS (only when needed)
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

export async function OrderDetailPage({ mount, params }) {
  const u = store.getState().user;
  mount.innerHTML = `<div class="container page"><div class="spinner"></div></div>`;
  try {
    const o = await api.get("/orders/" + params.id);
    const isBuyer = u.id === o.buyerId;
    const isSeller = u.id === o.sellerId;
    const statusKey = String(o.status || "").toLowerCase();
    const next = {
      pending: isSeller ? "ACCEPTED" : null,
      waiting_confirmation: isSeller ? "ACCEPTED" : null,
      accepted: isSeller ? "IN_PROGRESS" : null,
      in_progress: isSeller ? "IN_REVIEW" : null,
      in_review: isBuyer ? "COMPLETED" : null,
    }[statusKey];
    mount.innerHTML = `
      <div class="container page">
        <a href="#/orders"><i class="fa-solid fa-arrow-left"></i> Kembali</a>
        <div class="grid" style="grid-template-columns: 1fr 320px;gap:1.5rem;margin-top:1rem">
          <div>
            <div class="card card-pad-lg">
              <div class="flex-between mb-2"><h1 style="margin:0">${escape(o.title)}</h1>${statusPill(o.status)}</div>
              <div class="text-sm text-muted">Order #${o.id.slice(0, 12)} · ${fmtDate(o.createdAt, true)}</div>
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
              <div class="flex gap-sm mt-3 flex-wrap">
                ${next ? `<button class="btn btn-primary" id="advance-btn" data-testid="advance-order-btn"><i class="fa-solid fa-arrow-right"></i> ${getActionLabel(next)}</button>` : ""}
                ${(isBuyer || isSeller) && !["COMPLETED", "CANCELLED", "completed", "cancelled"].includes(o.status) ? `<button class="btn btn-danger" id="cancel-btn" data-testid="cancel-order-btn">Batalkan</button>` : ""}
                ${isBuyer && (o.status === "COMPLETED" || o.status === "completed") ? `<button class="btn btn-success" id="review-btn" data-testid="review-order-btn"><i class="fa-solid fa-star"></i> Beri Review</button>` : ""}
                <button class="btn btn-secondary" id="chat-btn" data-testid="chat-order-btn">
                  <i class="fa-solid fa-comment"></i> Chat dengan ${isBuyer ? "Penjual" : "Pembeli"}
                </button>
                <button class="btn btn-secondary" id="dispute-btn" data-testid="dispute-btn"><i class="fa-solid fa-flag"></i> Laporkan</button>
              </div>
            </div>
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
              <div style="font-family:var(--font-head);font-size:2rem;font-weight:700;color:var(--primary-dark)">${fmtIDR(o.amount)}</div>
            </div>
            <div class="divider"></div>
            <div class="text-sm">
              <div class="flex-between"><span class="text-muted">Subtotal</span><span>${fmtIDR(o.amount * 0.95)}</span></div>
              <div class="flex-between"><span class="text-muted">Platform fee</span><span>${fmtIDR(o.amount * 0.05)}</span></div>
              <div class="divider"></div>
              <div class="flex-between"><strong>Total</strong><strong>${fmtIDR(o.amount)}</strong></div>
            </div>
            <button class="btn btn-primary btn-block mt-2" id="pay-btn" data-testid="pay-now-btn"${o.status === "WAITING_CONFIRMATION" || o.status === "pending" ? "" : " disabled"}><i class="fa-solid fa-credit-card"></i> Bayar Sekarang</button>
            <div class="text-xs text-muted text-center mt-1"><i class="fa-solid fa-shield-halved"></i> Pembayaran aman dengan escrow</div>
          </aside>
        </div>
      </div>`;
    const adv = document.getElementById("advance-btn");
    if (adv)
      adv.addEventListener("click", async () => {
        try {
          await api.post(`/orders/${o.id}/status`, { status: next });
          toast("Status diperbarui", "success");
          router.render();
        } catch (err) {
          toast(err.message, "error");
        }
      });
    const can = document.getElementById("cancel-btn");
    if (can)
      can.addEventListener("click", () =>
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
    const rev = document.getElementById("review-btn");
    if (rev)
      rev.addEventListener("click", () => {
        let rating = 5;
        const formHtml = `
        <form id="rev-form">
          <div class="form-group"><label class="label">Rating</label>
            <div id="stars-pick" style="font-size:2rem;cursor:pointer;color:var(--warning)" data-testid="review-stars">${[1, 2, 3, 4, 5].map((i) => `<i class="fa-solid fa-star" data-r="${i}"></i>`).join(" ")}</div>
          </div>
          <div class="form-group"><label class="label">Komentar</label><textarea id="rev-cm" class="textarea" required data-testid="review-comment"></textarea></div>
          <button class="btn btn-primary btn-block" type="submit" data-testid="review-submit-btn">Kirim Review</button>
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
              await api.post(`/orders/${o.id}/review`, {
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
    const disp = document.getElementById("dispute-btn");
    if (disp)
      disp.addEventListener("click", () => {
        const m = modal({
          title: "Laporkan Masalah",
          body: `
        <form id="d-form">
          <div class="form-group"><label class="label">Alasan</label><textarea class="textarea" id="d-reason" required data-testid="dispute-reason"></textarea></div>
          <button class="btn btn-danger btn-block" type="submit" data-testid="dispute-submit-btn">Kirim Laporan</button>
        </form>`,
        });
        m.el.querySelector("#d-form").addEventListener("submit", async (e) => {
          e.preventDefault();
          try {
            await api.post("/disputes", {
              orderId: o.id,
              reason: m.el.querySelector("#d-reason").value,
            });
            m.close();
            toast("Laporan terkirim ke admin", "success");
          } catch (err) {
            toast(err.message, "error");
          }
        });
      });
    const pay = document.getElementById("pay-btn");
    if (pay)
      pay.addEventListener("click", async () => {
        try {
          const cfg = await api.get("/payments/midtrans/config");
          if (!cfg.configured) {
            const m = modal({
              title: "Pembayaran (Demo)",
              body: `
            <div class="text-center">
              <i class="fa-solid fa-credit-card" style="font-size:3rem;color:var(--primary)"></i>
              <h3 class="mt-2">Total: ${fmtIDR(o.amount)}</h3>
              <p class="text-muted">Midtrans belum dikonfigurasi. Mode demo aktif.</p>
              <button class="btn btn-primary btn-block" id="pay-ok" data-testid="confirm-pay-btn">Konfirmasi Pembayaran (Demo)</button>
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
            onSuccess: (r) => {
              toast("Pembayaran berhasil!", "success");
              setTimeout(() => router.render(), 1200);
            },
            onPending: (r) =>
              toast("Pembayaran pending - selesaikan di Midtrans", "warning"),
            onError: (r) =>
              toast("Pembayaran gagal: " + (r?.status_message || ""), "error"),
            onClose: () => toast("Anda menutup halaman pembayaran", "info"),
          });
        } catch (err) {
          toast(err.message, "error");
        }
      });

    // Chat button handler
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
    mount.innerHTML = empty("Tidak ditemukan", err.message);
  }
}
