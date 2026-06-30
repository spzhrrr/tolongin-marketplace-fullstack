import { api } from "../../shared/utils/api.js";
import { escape, timeAgo, toast } from "../../shared/utils/helpers.js";
import { router } from "../../app/router.js";
import { store } from "../../app/store.js";

function iconForType(type) {
  const map = {
    ORDER: "fa-receipt",
    PAYMENT: "fa-credit-card",
    MESSAGE: "fa-comment-dots",
    REVIEW: "fa-star",
    SYSTEM: "fa-circle-info",
    DISPUTE: "fa-scale-balanced",
    APPLICATION: "fa-paper-plane",
    WITHDRAWAL: "fa-money-bill-transfer",
    KYC: "fa-id-card",
  };
  return map[String(type || "").toUpperCase()] || "fa-bell";
}

export async function NotificationsPage({ mount }) {
  const user = store.getState().user;
  if (!user) {
    router.navigate("/login");
    return;
  }

  mount.innerHTML = `
    <div class="container page notif-page">
      <div class="notif-page__head">
        <div>
          <h1 class="page-title"><i class="fa-regular fa-bell"></i> Notifikasi</h1>
          <p class="page-subtitle">Semua aktivitas dan update terbaru Anda</p>
        </div>
        <button class="btn btn-secondary btn-sm notif-page__read-all" id="page-read-all">
          <i class="fa-solid fa-check-double"></i> Tandai semua dibaca
        </button>
      </div>
      
      <div id="notif-list" class="notif-page__list">
        <div class="spinner"></div>
      </div>
    </div>
  `;

  const listEl = mount.querySelector("#notif-list");

  const render = async () => {
    try {
      const resp = await api.get("/notifications");
      const items = Array.isArray(resp) ? resp : resp?.data || [];

      if (!items.length) {
        listEl.innerHTML = `
          <div class="empty notif-page__empty">
            <i class="fa-regular fa-bell-slash"></i>
            <h3>Belum ada notifikasi</h3>
            <p>Notifikasi akan muncul di sini saat ada aktivitas</p>
            <a href="#/marketplace" class="btn btn-primary">Jelajahi Marketplace</a>
          </div>
        `;
        return;
      }

      listEl.innerHTML = items
        .map(
          (n) => `
        <div class="notif-card${n.isRead ? "" : " notif-card--unread"}" data-id="${n.id}" data-url="${escape(n.actionUrl || "")}">
          <div class="notif-card__icon"><i class="fa-solid ${iconForType(n.type)}"></i></div>
          <div class="notif-card__body">
            <div class="notif-card__row">
              <div class="notif-card__title">${escape(n.title || "")}</div>
              <div class="notif-card__time">${timeAgo(n.createdAt)}</div>
            </div>
            <div class="notif-card__text">${escape(n.body || "")}</div>
            ${!n.isRead ? '<span class="notif-card__badge badge badge-info">Baru</span>' : ""}
          </div>
          <div class="notif-card__chevron"><i class="fa-solid fa-chevron-right"></i></div>
        </div>
      `,
        )
        .join("");

      // Click handler
      listEl.querySelectorAll(".notif-card").forEach((card) => {
        card.addEventListener("click", async () => {
          const id = card.dataset.id;
          const url = card.dataset.url;
          try {
            await api.patch(`/notifications/${id}/read`);
          } catch (err) {
            if (import.meta.env.DEV)
              console.warn("[notif] mark read gagal", err);
          }
          if (url) {
            router.navigate(url.startsWith("/") ? url : `/${url}`);
          } else {
            render();
          }
        });
      });
    } catch (err) {
      listEl.innerHTML = `<div class="empty"><h3>Gagal memuat notifikasi</h3><p>${escape(err.message || "")}</p></div>`;
    }
  };

  mount.querySelector("#page-read-all")?.addEventListener("click", async () => {
    try {
      await api.patch("/notifications/read-all");
      toast("✅ Semua notifikasi ditandai dibaca", "success");
      render();
    } catch (err) {
      toast(err.message || "Gagal menandai", "error");
    }
  });

  render();
}
