// Hash-based router with route params, guards & lazy loading
import { store } from "./store.js";
import { escape } from "../shared/utils/helpers.js";

// Gunakan lazy loading untuk menghindari error jika file belum ada
let ServiceDetailPage = null;

// Fungsi untuk load module secara dinamis
async function loadServiceDetailPage() {
  if (!ServiceDetailPage) {
    try {
      const module = await import("../features/services/ServiceDetailPage.js");
      ServiceDetailPage = module.ServiceDetailPage;
    } catch (err) {
      console.error("Failed to load ServiceDetailPage:", err);
      // Fallback: buat fungsi dummy
      ServiceDetailPage = async ({ mount }) => {
        mount.innerHTML = `<div class="container page">
          <div class="empty">
            <i class="fa-solid fa-circle-exclamation"></i>
            <h3>Halaman tidak tersedia</h3>
            <p>Service detail page sedang dalam pengembangan</p>
            <a href="#/marketplace" class="btn btn-primary mt-2">Kembali ke Marketplace</a>
          </div>
        </div>`;
      };
    }
  }
  return ServiceDetailPage;
}

const routes = [];
let notFound = null;
let mountEl = null;
let currentCleanup = null;

export const router = {
  add(path, handler, opts = {}) {
    routes.push({
      path,
      handler,
      opts,
      regex: pathToRegex(path),
      keys: extractKeys(path),
    });
    return this;
  },
  setNotFound(fn) {
    notFound = fn;
    return this;
  },
  mount(el) {
    mountEl = el;
    window.addEventListener("hashchange", () => this.render());
    this.render();
  },
  navigate(to) {
    if (location.hash === `#${to}`) {
      this.render();
      return;
    }
    location.hash = `#${to}`;
  },
  current() {
    return location.hash.replace(/^#/, "") || "/";
  },
  async render() {
    const path = this.current();
    const [pathname, qstr = ""] = path.split("?");
    const query = Object.fromEntries(new URLSearchParams(qstr));
    const match = findMatch(pathname);
    runCleanup();
    if (!match) return renderNotFound();
    if (!checkGuards(match.r)) return;

    // Untuk route service detail, load module secara dinamis
    let handler = match.r.handler;
    if (match.r.path === "/service/:id") {
      handler = await loadServiceDetailPage();
    }

    await runHandler(match.r, handler, match.params, query, pathname);
  },
};

// ---- helpers ----
function findMatch(pathname) {
  for (const r of routes) {
    const m = pathname.match(r.regex);
    if (m) return { r, params: paramsFrom(m, r.keys) };
  }
  return null;
}

function runCleanup() {
  if (!currentCleanup) return;
  try {
    currentCleanup();
  } catch (err) {
    if (import.meta.env.DEV) console.warn("[router] cleanup failed", err);
  }
  currentCleanup = null;
}

function renderNotFound() {
  mountEl.innerHTML = "";
  if (notFound) notFound(mountEl);
  window.scrollTo(0, 0);
}

function emitToast(type, text) {
  window.dispatchEvent(new CustomEvent("toast", { detail: { type, text } }));
}

function checkGuards(r, pathname) {
  if (r.opts.auth && !store.getState().token) {
    emitToast("warning", "Silakan login terlebih dahulu");
    router.navigate("/login");
    return false;
  }
  const currentUser = store.getState().user;
  if (
    r.opts.auth &&
    currentUser &&
    currentUser.role !== "ADMIN" &&
    !currentUser.avatar &&
    pathname !== "/settings"
  ) {
    emitToast("warning", "Upload foto profil untuk melanjutkan");
    router.navigate("/settings");
    return false;
  }
  if (r.opts.role) {
    const u = store.getState().user;
    const allowed = Array.isArray(r.opts.role) ? r.opts.role : [r.opts.role];
    if (!u || !allowed.includes(u.role)) {
      emitToast("error", "Anda tidak memiliki akses ke halaman ini");
      router.navigate("/");
      return false;
    }
  }
  return true;
}

async function runHandler(r, handler, params, query, pathname) {
  mountEl.innerHTML =
    '<div class="container app-fade-in"><div class="spinner"></div></div>';
  try {
    const cleanup = await handler({ params, query, mount: mountEl });
    if (typeof cleanup === "function") currentCleanup = cleanup;
  } catch (e) {
    console.error("Handler error:", e);
    mountEl.innerHTML = `<div class="container"><div class="empty"><i class="fa-solid fa-triangle-exclamation"></i><h3>Gagal memuat halaman</h3><p>${escape(e.message)}</p><a href="#/" class="btn btn-primary mt-2">Kembali ke Beranda</a></div></div>`;
  }
  window.scrollTo(0, 0);
  window.dispatchEvent(
    new CustomEvent("route-change", { detail: { path: pathname } }),
  );
}

function pathToRegex(path) {
  return new RegExp("^" + path.replace(/:[^/]+/g, "([^/]+)") + "$");
}

<<<<<<< HEAD
function extractKeys(path) {
  return [...path.matchAll(/:([^/]+)/g)].map((m) => m[1]);
}
=======
export const router = {
  add(path, handler, opts = {}) {
    routes.push({
      path,
      handler,
      opts,
      regex: pathToRegex(path),
      keys: extractKeys(path),
    });
    return this;
  },
  setNotFound(fn) {
    notFound = fn;
    return this;
  },
  mount(el) {
    mountEl = el;
    window.addEventListener("hashchange", () => this.render());
    this.render();
  },
  navigate(to) {
    let normalizedTo = to;
    if (normalizedTo !== "/" && normalizedTo.endsWith("/")) {
      normalizedTo = normalizedTo.slice(0, -1);
    }
    if (location.hash === `#${normalizedTo}`) {
      this.render();
      return;
    }
    location.hash = `#${normalizedTo}`;
  },
  current() {
    let path = location.hash.replace(/^#/, "") || "/";
    if (path !== "/" && path.endsWith("/")) {
      path = path.slice(0, -1);
    }
    return path;
  },
  async render() {
    let path = this.current();
    const [pathname, qstr = ""] = path.split("?");
    const query = Object.fromEntries(new URLSearchParams(qstr));
    const match = findMatch(pathname);
    runCleanup();
    if (!match) return renderNotFound();
    if (!checkGuards(match.r, pathname)) return;
>>>>>>> 961a4cc (Update: Menyinkronkan perubahan lokal dengan repositori remote)

function paramsFrom(match, keys) {
  const o = {};
  keys.forEach((k, i) => (o[k] = decodeURIComponent(match[i + 1])));
  return o;
}
