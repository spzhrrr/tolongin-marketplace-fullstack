// frontend/src/features/notifications/NotificationsPanel.js
import { api } from "../../shared/utils/api.js";
import { timeAgo, escape, toast } from "../../shared/utils/helpers.js";
import { router } from "../../app/router.js";
import { store } from "../../app/store.js";
import { notificationsSocket } from "../../shared/utils/notifications-ws.js";

const POLL_VISIBLE_MS = 8000;
const POLL_HIDDEN_MS = 30000;

let pollInterval = null;
let panelEl = null;
let outsideHandler = null;
let unsubscribeRealtime = null;
const countHandler = (event) => setBadge(event.detail);

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

export async function initNotifications(hostEl) {
  if (!hostEl || !store.getState().user) return;

  stopNotificationUI();

  const bellBtn = hostEl.querySelector("#notif-btn");
  if (!bellBtn) return;

  if (!bellBtn.querySelector(".notif-badge")) {
    bellBtn.insertAdjacentHTML(
      "beforeend",
      `<span class="notif-badge">0</span>`,
    );
  }

  bellBtn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    togglePanel(bellBtn);
  });

  notificationsSocket.connect();
  await refreshBadge();

  unsubscribeRealtime = notificationsSocket.onNotification(() => {
    refreshBadge();
    if (panelEl) loadList();
  });

  window.addEventListener("notification-count", countHandler);

  const schedulePoll = () => {
    if (pollInterval) clearInterval(pollInterval);
    const ms = document.hidden ? POLL_HIDDEN_MS : POLL_VISIBLE_MS;
    pollInterval = setInterval(refreshBadge, ms);
  };
  schedulePoll();
  document.addEventListener("visibilitychange", schedulePoll);
  hostEl.dataset.notifReady = "1";
}

async function refreshBadge() {
  try {
    const list = await api.get("/notifications?unreadOnly=true");
    const items = Array.isArray(list) ? list : list?.data || [];
    setBadge(items.length);
  } catch (err) {
    if (import.meta.env.DEV) console.warn("[notif] poll gagal", err);
  }
}

function setBadge(count) {
  const badge = document.querySelector("#notif-btn .notif-badge");
  if (!badge) return;
  if (count > 0) {
    badge.textContent = count > 99 ? "99+" : String(count);
    badge.style.display = "flex";
  } else {
    badge.style.display = "none";
  }
}

function closePanel() {
  if (panelEl) {
    panelEl.remove();
    panelEl = null;
  }
  if (outsideHandler) {
    document.removeEventListener("click", outsideHandler);
    outsideHandler = null;
  }
}

async function togglePanel(bellBtn) {
  if (panelEl) {
    closePanel();
    return;
  }

  const wrap = bellBtn.parentElement;
  if (getComputedStyle(wrap).position === "static") {
    wrap.style.position = "relative";
  }

  panelEl = document.createElement("div");
  panelEl.className = "notif-panel";
  panelEl.innerHTML = `
    <div class="notif-panel__head">
      <strong>Notifikasi</strong>
      <button class="btn btn-ghost btn-sm" id="notif-read-all"><i class="fa-solid fa-check-double"></i> Tandai semua dibaca</button>
    </div>
    <div id="notif-list" class="notif-panel__list">
      <div class="spinner"></div>
    </div>
    <div class="notif-panel__foot">
      <a href="#/notifications" id="notif-see-all" class="notif-panel__see-all">Lihat semua notifikasi</a>
    </div>`;

  bellBtn.parentElement.appendChild(panelEl);

  outsideHandler = (e) => {
    if (panelEl && !panelEl.contains(e.target) && !bellBtn.contains(e.target)) {
      closePanel();
    }
  };
  setTimeout(() => document.addEventListener("click", outsideHandler), 0);

  panelEl.querySelector("#notif-read-all")?.addEventListener("click", async (e) => {
    e.stopPropagation();
    try {
      await api.patch("/notifications/read-all");
      toast("Semua notifikasi ditandai dibaca", "success");
      setBadge(0);
      await loadList();
    } catch (err) {
      toast(err.message || "Gagal menandai", "error");
    }
  });

  panelEl.querySelector("#notif-see-all")?.addEventListener("click", (e) => {
    e.preventDefault();
    closePanel();
    router.navigate("/notifications");
  });

  await loadList();
}

async function loadList() {
  const listEl = panelEl?.querySelector("#notif-list");
  if (!listEl) return;

  try {
    const resp = await api.get("/notifications");
    const items = Array.isArray(resp) ? resp : resp?.data || [];

    if (!items.length) {
      listEl.innerHTML = `<div class="notif-empty"><i class="fa-regular fa-bell-slash"></i><p>Belum ada notifikasi</p></div>`;
      return;
    }

    listEl.innerHTML = items
      .map(
        (n) => `
        <div class="notif-item${n.isRead ? "" : " notif-item--unread"}" data-id="${n.id}" data-url="${escape(n.actionUrl || "")}">
          <div class="notif-item__icon"><i class="fa-solid ${iconForType(n.type)}"></i></div>
          <div class="notif-item__body">
            <div class="notif-item__title">${escape(n.title || "")}</div>
            <div class="notif-item__text">${escape(n.body || "")}</div>
            <div class="notif-item__time">${timeAgo(n.createdAt)}</div>
          </div>
          ${n.isRead ? "" : '<div class="notif-item__dot"></div>'}
        </div>`,
      )
      .join("");

    listEl.querySelectorAll(".notif-item").forEach((item) => {
      item.addEventListener("click", async (event) => {
        event.stopPropagation();
        const id = item.dataset.id;
        const url = item.dataset.url;
        if (!id) return;
        try {
          await api.patch(`/notifications/${id}/read`);
        } catch (_) {}
        await refreshBadge();
        closePanel();
        if (url?.trim()) {
          let navUrl = url.trim();
          if (!navUrl.startsWith("/")) navUrl = `/${navUrl}`;
          if (navUrl.startsWith("#")) navUrl = navUrl.substring(1);
          router.navigate(navUrl);
        }
      });
    });
  } catch (err) {
    listEl.innerHTML = `<div class="notif-empty"><p>Gagal memuat notifikasi</p></div>`;
  }
}

/** Cleanup UI only — keeps WebSocket hub alive (managed by notifications-ws.js). */
export function stopNotificationPolling() {
  stopNotificationUI();
}

function stopNotificationUI() {
  if (pollInterval) {
    clearInterval(pollInterval);
    pollInterval = null;
  }
  unsubscribeRealtime?.();
  unsubscribeRealtime = null;
  window.removeEventListener("notification-count", countHandler);
  closePanel();
}
