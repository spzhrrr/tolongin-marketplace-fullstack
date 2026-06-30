// Misc helpers: formatters, dom, validation, toast, modal, storage
import DOMPurify from "dompurify";

/**
 * Sanitize an HTML string before injecting via innerHTML. Use this whenever
 * raw HTML *must* be rendered (e.g. opt-in toast/modal bodies). Strips
 * <script>, on* event attributes, javascript: URLs, etc.
 */
export function sanitize(html) {
  return DOMPurify.sanitize(String(html ?? ""), {
    ADD_ATTR: ["target"],
  });
}
export function fmtIDR(n) {
  return "Rp " + (Number(n) || 0).toLocaleString("id-ID");
}

/** Parse typed/display Rupiah input to integer (empty → ""). */
export function parseIDRInput(v) {
  const digits = String(v ?? "").replace(/\D/g, "");
  return digits ? parseInt(digits, 10) : "";
}

/** Format number or digit string for budget filter inputs. */
export function formatIDRInput(v) {
  const digits = String(v ?? "").replace(/\D/g, "");
  if (!digits) return "";
  return "Rp " + Number(digits).toLocaleString("id-ID");
}

/** Bind Rupiah auto-format to a text input; optional onChange(digits). */
export function bindRupiahInput(el, onChange) {
  if (!el) return;
  el.setAttribute("inputmode", "numeric");
  el.setAttribute("autocomplete", "off");
  const sync = () => {
    const raw = parseIDRInput(el.value);
    el.value = raw === "" ? "" : formatIDRInput(raw);
    onChange?.(raw);
  };
  el.addEventListener("input", sync);
  el.addEventListener("blur", sync);
}
export function fmtDate(iso, withTime = false) {
  if (!iso) return "-";
  const d = new Date(iso);
  const opts = { year: "numeric", month: "short", day: "numeric" };
  if (withTime) {
    opts.hour = "2-digit";
    opts.minute = "2-digit";
  }
  return d.toLocaleDateString("id-ID", opts);
}
export function timeAgo(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  const s = Math.floor((Date.now() - d.getTime()) / 1000);
  if (s < 60) return "baru saja";
  if (s < 3600) return `${Math.floor(s / 60)} mnt lalu`;
  if (s < 86400) return `${Math.floor(s / 3600)} jam lalu`;
  if (s < 604800) return `${Math.floor(s / 86400)} hari lalu`;
  return fmtDate(iso);
}
export function fmtTime(iso) {
  if (!iso) return "";
  return new Date(iso).toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });
}
export function isEmail(v) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v || "");
}
export function escape(s) {
  return String(s ?? "").replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
}
export function $(sel, root = document) {
  return root.querySelector(sel);
}
export function $$(sel, root = document) {
  return [...root.querySelectorAll(sel)];
}

// Toast
const TOAST_ICONS = {
  success: "fa-circle-check",
  error: "fa-circle-xmark",
  warning: "fa-triangle-exclamation",
  info: "fa-circle-info",
};

function buildToastMarkup(text, icon) {
  if (typeof text === "object" && text && text.html) {
    return `<div class="toast__inner"><span class="toast__icon" aria-hidden="true"><i class="fa-solid ${icon}"></i></span><div class="toast__content"><span class="toast__body">${sanitize(text.html)}</span></div></div>`;
  }

  const raw = String(text ?? "");
  const splitAt = raw.indexOf(" — ");
  if (splitAt > 0) {
    const title = raw.slice(0, splitAt);
    const body = raw.slice(splitAt + 3);
    return `<div class="toast__inner"><span class="toast__icon" aria-hidden="true"><i class="fa-solid ${icon}"></i></span><div class="toast__content"><span class="toast__title">${escape(title)}</span><span class="toast__body">${escape(body)}</span></div></div>`;
  }

  return `<div class="toast__inner"><span class="toast__icon" aria-hidden="true"><i class="fa-solid ${icon}"></i></span><div class="toast__content"><span class="toast__body">${escape(raw)}</span></div></div>`;
}

export function toast(text, type = "info", timeout = 3000) {
  const host = document.getElementById("toast-host");
  if (!host) return;
  const el = document.createElement("div");
  el.className = `toast toast--${type}`;
  el.setAttribute("role", "status");
  const icon = TOAST_ICONS[type] || TOAST_ICONS.info;
  el.innerHTML = buildToastMarkup(text, icon);
  host.appendChild(el);
  setTimeout(() => {
    el.classList.add("is-leaving");
    setTimeout(() => el.remove(), 320);
  }, timeout);
}
window.addEventListener("toast", (e) => {
  const d = e.detail || {};
  toast(d.html ? { html: d.html } : d.text, d.type, d.timeout || 3000);
});

// Modal
export function modal({ title, body, footer, onClose, size }) {
  const host = document.getElementById("modal-host");
  const back = document.createElement("div");
  back.className = "modal-backdrop";
  back.innerHTML = `
    <div class="modal" style="${size === "lg" ? "max-width:680px" : ""}" role="dialog" data-testid="modal">
      <div class="modal-head"><h3>${escape(title || "")}</h3><button class="btn btn-ghost btn-sm" data-close data-testid="modal-close-btn"><i class="fa-solid fa-xmark"></i></button></div>
      <div class="modal-body"></div>
      ${footer ? '<div class="modal-foot"></div>' : ""}
    </div>`;
  const close = () => {
    back.remove();
    onClose && onClose();
  };
  back.addEventListener("click", (e) => {
    if (e.target === back || e.target.closest("[data-close]")) close();
  });
  const mb = back.querySelector(".modal-body");
  if (typeof body === "string") mb.innerHTML = sanitize(body);
  else if (body instanceof Node) mb.appendChild(body);
  if (footer) {
    const mf = back.querySelector(".modal-foot");
    if (typeof footer === "string") mf.innerHTML = sanitize(footer);
    else if (footer instanceof Node) mf.appendChild(footer);
  }
  host.appendChild(back);
  return { close, el: back };
}

export function confirmModal(message, onYes) {
  const m = modal({
    title: "Konfirmasi",
    body: `<p>${escape(message)}</p>`,
    footer: `<button class="btn btn-secondary" data-close data-testid="confirm-cancel-btn">Batal</button><button class="btn btn-danger" data-testid="confirm-yes-btn" id="cf-yes">Ya, lanjutkan</button>`,
  });
  m.el.querySelector("#cf-yes").addEventListener("click", () => {
    m.close();
    onYes && onYes();
  });
}

export function debounce(fn, wait = 300) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), wait);
  };
}

/** Toggle password visibility — expects `.toggle-password` with `data-target` id */
export function bindPasswordToggles(root = document) {
  root.querySelectorAll(".toggle-password").forEach((btn) => {
    btn.addEventListener("click", () => {
      const input = document.getElementById(btn.dataset.target || "");
      if (!input) return;
      const icon = btn.querySelector("i");
      if (input.type === "password") {
        input.type = "text";
        icon?.classList.replace("fa-eye", "fa-eye-slash");
        btn.setAttribute("aria-label", "Sembunyikan password");
      } else {
        input.type = "password";
        icon?.classList.replace("fa-eye-slash", "fa-eye");
        btn.setAttribute("aria-label", "Tampilkan password");
      }
    });
  });
}

/** Sinkronkan rating & ulasan user ke store + broadcast ke profil/dashboard */
export async function refreshUserReviewsSnapshot() {
  const { store } = await import("../../app/store.js");
  const { api } = await import("./api.js");
  const u = store.getState().user;
  if (!u?.id) return null;
  try {
    const [stats, reviewsByUser] = await Promise.all([
      api.get(`/users/${u.id}/stats`),
      api.get(`/reviews/user/${u.id}`).catch(() => ({ all: [], asSeller: [], asBuyer: [] })),
    ]);
    store.setState({
      user: {
        ...u,
        rating: Number(stats?.averageRating) || 0,
        reviewCount: Number(stats?.reviewCount) || 0,
      },
    });
    window.dispatchEvent(
      new CustomEvent("reviews-updated", {
        detail: { userId: u.id, stats, reviews: reviewsByUser },
      }),
    );
    return { stats, reviews: reviewsByUser };
  } catch (err) {
    if (import.meta.env.DEV) console.warn("[reviews] sync failed", err);
    return null;
  }
}
