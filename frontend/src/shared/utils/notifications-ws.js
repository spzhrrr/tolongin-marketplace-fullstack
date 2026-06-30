// Realtime notifications — persistent Socket.IO hub (mirrors chat ws.js pattern).
import { io } from "socket.io-client";
import { API } from "./api.js";
import { store } from "../../app/store.js";
import { toast, refreshUserReviewsSnapshot } from "./helpers.js";

const BACKEND = API.endsWith("/api") ? API.slice(0, -4) : API;
const DEBUG = import.meta.env.DEV;

function toastType(notification) {
  const nType = String(notification?.type || "").toUpperCase();
  const title = notification?.title || "";
  if (nType === "REVIEW") return "success";
  if (nType === "ORDER" && /diterima|disetujui|selesai|dirilis|berhasil|dicairkan/i.test(title))
    return "success";
  if (nType === "PAYMENT") return "success";
  if (nType === "APPLICATION") return "info";
  return "info";
}

function parseNotifData(notification) {
  let data = notification?.data;
  if (typeof data === "string") {
    try {
      data = JSON.parse(data);
    } catch {
      data = {};
    }
  }
  return data && typeof data === "object" ? data : {};
}

class NotificationsHub {
  constructor() {
    this.socket = null;
    this.uiListeners = new Set();
    this.seenIds = new Set();
    this.tokenUsed = null;
  }

  connect() {
    const token = store.getState().token;
    if (!token) return;

    if (this.socket?.connected && this.tokenUsed === token) return;

    if (this.socket) {
      this.socket.auth = { token };
      this.tokenUsed = token;
      if (!this.socket.connected) this.socket.connect();
      return;
    }

    this.tokenUsed = token;
    this.socket = io(`${BACKEND}/notifications`, {
      path: "/api/socket.io",
      transports: ["websocket", "polling"],
      auth: { token },
      query: { token },
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: Infinity,
    });

    this.socket.on("connect", () => {
      if (DEBUG) console.log("[notif-ws] connected");
    });

    this.socket.on("disconnect", (reason) => {
      if (DEBUG) console.log("[notif-ws] disconnected:", reason);
    });

    this.socket.on("connect_error", (err) => {
      if (DEBUG) console.warn("[notif-ws] connect_error", err.message);
    });

    this.socket.on("notification", (notification) => this.handleIncoming(notification));

    this.socket.on("unread-count", ({ count }) => {
      window.dispatchEvent(
        new CustomEvent("notification-count", { detail: Number(count) || 0 }),
      );
    });
  }

  handleIncoming(notification) {
    if (!notification) return;

    const id = notification.id;
    if (id) {
      if (this.seenIds.has(id)) return;
      this.seenIds.add(id);
      if (this.seenIds.size > 300) {
        const [first] = this.seenIds;
        this.seenIds.delete(first);
      }
    }

    this.uiListeners.forEach((fn) => {
      try {
        fn(notification);
      } catch (e) {
        if (DEBUG) console.warn("[notif-ws] listener error", e);
      }
    });

    window.dispatchEvent(
      new CustomEvent("app-notification", { detail: notification }),
    );

    const title = notification.title || "Notifikasi baru";
    const body = notification.body || "";
    toast(body ? `${title} — ${body}` : title, toastType(notification), 9000);

    const nType = String(notification?.type || "").toUpperCase();
    if (nType === "REVIEW") {
      const data = parseNotifData(notification);
      const me = store.getState().user;
      if (!data.revieweeId || data.revieweeId === me?.id) {
        void refreshUserReviewsSnapshot();
      }
    }
  }

  onNotification(listener) {
    this.uiListeners.add(listener);
    return () => this.uiListeners.delete(listener);
  }

  disconnect() {
    this.socket?.disconnect();
    this.socket = null;
    this.tokenUsed = null;
    this.seenIds.clear();
  }
}

export const notificationsSocket = new NotificationsHub();

store.subscribe((state) => {
  if (state.token) notificationsSocket.connect();
  else notificationsSocket.disconnect();
});

if (store.getState().token) {
  setTimeout(() => notificationsSocket.connect(), 150);
}
