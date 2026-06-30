// Main App entry: mounts the router (routes are pre-registered in router.js)
import { router } from "./router.js";
import { renderLayout } from "./layout.js";
import { store } from "./store.js";
import { tryRefresh } from "../shared/utils/api.js";

function setupProfileLinks(mount) {
  if (!mount || mount.dataset.profileLinksReady) return;
  mount.dataset.profileLinksReady = "1";
  mount.addEventListener("click", (e) => {
    if (e.target.closest(".fav-btn, button, input, textarea, select, label")) return;
    const el = e.target.closest(".profile-link[data-user-id]");
    if (!el) return;
    const uid = el.dataset.userId;
    if (!uid) return;
    e.preventDefault();
    e.stopPropagation();
    router.navigate("/users/" + uid);
  });
  mount.addEventListener("keydown", (e) => {
    if (e.key !== "Enter" && e.key !== " ") return;
    const el = e.target.closest(".profile-link[data-user-id]");
    if (!el) return;
    e.preventDefault();
    router.navigate("/users/" + el.dataset.userId);
  });
}

async function silentRefresh() {
  const s = store.getState();
  if (!s.user || s.token) return;
  try {
    await tryRefresh();
  } catch (_) {
    // Keep persisted user; guarded routes will retry refresh on 401.
  }
}

// ========== NOT FOUND PAGE COMPONENT ==========
export function NotFoundPage(mount) {
  mount.innerHTML = `
    <div class="container page" style="text-align:center; padding:60px 20px;" data-testid="not-found-page">
      <i class="fa-solid fa-circle-exclamation" style="font-size:4rem; color:#ccc;"></i>
      <h1 style="margin:16px 0 8px;">404 — Halaman Tidak Ditemukan</h1>
      <p style="color:#666;">Maaf, halaman yang Anda cari tidak tersedia.</p>
      <a href="#/" class="btn btn-primary" style="display:inline-block; margin-top:20px;" data-testid="back-home-btn">Kembali ke Beranda</a>
    </div>
  `;
}

export async function bootstrap() {
  const root = document.getElementById("app");
  await silentRefresh();
  const mount = renderLayout(root);

  router.setNotFound(NotFoundPage).mount(mount);
  setupProfileLinks(mount);
}
