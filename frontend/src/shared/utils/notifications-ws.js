import { io } from "socket.io-client";
import { API } from "./api.js";
import { store } from "../../app/store.js";

const BACKEND = API.endsWith("/api") ? API.slice(0, -4) : API;
let socket = null;
const listeners = new Set();

export const notificationsSocket = {
  connect() {
    const token = store.getState().token;
    if (!token || socket?.connected) return;
    socket = io(BACKEND + "/notifications", {
      path: "/api/socket.io",
      transports: ["websocket", "polling"],
      auth: { token },
      withCredentials: true,
    });
    socket.on("notification", (notification) => {
      listeners.forEach((listener) => listener(notification));
    });
    socket.on("unread-count", ({ count }) => {
      window.dispatchEvent(
        new CustomEvent("notification-count", { detail: Number(count) || 0 }),
      );
    });
  },
  onNotification(listener) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
  disconnect() {
    socket?.disconnect();
    socket = null;
  },
};