// Layout: header (navbar) + footer wrapper around page content
import { store } from "./store.js";
import { router } from "./router.js";
import { t } from "../shared/utils/i18n.js";
import { escape } from "../shared/utils/helpers.js";
import { avatar } from "../shared/ui/components.js";

export function renderLayout(root) {
  root.innerHTML = `
    <header class="navbar" data-testid="navbar">
      <div class="container navbar-inner">
        <a class="brand" href="#/" data-testid="brand-logo">
          <img src="/logotolongin.png" alt="Tolongin" class="brand-logo-img" height="36">
        </a>
        <button class="menu-toggle" id="menu-toggle" data-testid="mobile-menu-btn" aria-label="menu"><i class="fa-solid fa-bars"></i></button>
        <nav class="nav-links" id="nav-links"></nav>
        <div class="nav-right" id="nav-right"></div>
      </div>
    </header>
    <div id="verify-banner"></div>
    <main id="page-mount" class="app-fade-in"></main>
    <footer class="footer" id="site-footer"></footer>
  `;

  renderNav();
  renderBanner();
  renderFooter();
  store.subscribe(() => {
    renderNav();
    renderBanner();
  });
  window.addEventListener("route-change", () => renderNav());

  // ========== MOBILE MENU - PERBAIKAN UNTUK HP ==========
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");

  // Buat overlay element
  let overlay = document.querySelector(".nav-overlay");
  if (!overlay) {
    overlay = document.createElement("div");
    overlay.className = "nav-overlay";
    document.body.appendChild(overlay);
  }

  if (menuToggle && navLinks) {
    // Toggle menu saat tombol diklik
    menuToggle.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      navLinks.classList.toggle("open");
      overlay.classList.toggle("active");
    });

    // Tutup menu saat klik link di dalam menu
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        overlay.classList.remove("active");
      });
    });

    // Tutup menu saat klik overlay
    overlay.addEventListener("click", () => {
      navLinks.classList.remove("open");
      overlay.classList.remove("active");
    });

    // Tutup menu saat window di-resize ke desktop
    window.addEventListener("resize", () => {
      if (window.innerWidth > 768 && navLinks.classList.contains("open")) {
        navLinks.classList.remove("open");
        overlay.classList.remove("active");
      }
    });
  }
  // ========== END MOBILE MENU ==========

  return document.getElementById("page-mount");
}

function renderBanner() {
  const host = document.getElementById("verify-banner");
  if (!host) return;
  const { user } = store.getState();
  if (!user || user.emailVerified || user.role === "ADMIN") {
    host.innerHTML = "";
    return;
  }
  host.innerHTML = `
    <div class="verify-banner" data-testid="verify-banner">
      <div class="container flex-between" style="gap:.75rem;flex-wrap:wrap">
        <div style="display:flex;align-items:center;gap:.5rem"><i class="fa-solid fa-envelope-circle-check"></i><span>Email Anda belum terverifikasi. Verifikasi sekarang untuk membuka semua fitur.</span></div>
        <div style="display:flex;gap:.5rem">
          <button class="btn btn-secondary btn-sm" id="vb-send" data-testid="verify-banner-send">Kirim Ulang</button>
          <button class="btn btn-ghost btn-sm" id="vb-close" data-testid="verify-banner-close" aria-label="tutup"><i class="fa-solid fa-xmark"></i></button>
          <a class="btn btn-primary btn-sm" href="#/verification" data-testid="verify-banner-cta">Verifikasi Sekarang</a>
        </div>
      </div>
    </div>`;

  const sendBtn = host.querySelector("#vb-send");
  if (sendBtn) {
    sendBtn.addEventListener("click", async () => {
      try {
        const { api } = await import("../shared/utils/api.js");
        const r = await api.post("/verification/email/request", {});
        if (r.demoOtp) {
          console.log(`🔗 Kode OTP: ${r.demoOtp}`);
          const detail = {
            type: "info",
            html: `<span>Demo mode — Kode OTP: <strong>${r.demoOtp}</strong>. Masukkan di halaman verifikasi.</span>`,
            timeout: 10000,
          };
          window.dispatchEvent(new CustomEvent("toast", { detail }));
          window.location.hash = "#/verification";
        } else {
          window.dispatchEvent(
            new CustomEvent("toast", {
              detail: {
                type: "success",
                text: "OTP terkirim! Cek console untuk demo.",
              },
            }),
          );
        }
      } catch (e) {
        window.dispatchEvent(
          new CustomEvent("toast", {
            detail: { type: "error", text: e.message },
          }),
        );
      }
    });
  }

  const closeBtn = host.querySelector("#vb-close");
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      host.innerHTML = "";
    });
  }
}

function renderNav() {
  const { user, lang } = store.getState();
  const cur = location.hash.replace(/^#/, "").split("?")[0] || "/";
  const isActive = (p) =>
    cur === p || (p !== "/" && cur.startsWith(p)) ? "active" : "";
  const nav = document.getElementById("nav-links");
  const right = document.getElementById("nav-right");
  if (!nav || !right) return;

  const isAdmin = user && user.role === "ADMIN";

  const baseLinks = isAdmin
    ? `<a class="nav-link ${isActive("/")}" href="#/" data-testid="nav-home">${t("nav.home")}</a>`
    : `
    <a class="nav-link ${isActive("/")}" href="#/" data-testid="nav-home">${t("nav.home")}</a>
    <a class="nav-link ${isActive("/marketplace")}" href="#/marketplace" data-testid="nav-marketplace"><i class="fa-solid fa-magnifying-glass"></i> Cari Jasa</a>
    <a class="nav-link ${isActive("/jobs")}" href="#/jobs" data-testid="nav-jobs"><i class="fa-solid fa-briefcase"></i> Cari Kerja</a>
  `;

  const authedLinks = user
    ? isAdmin
      ? `<a class="nav-link ${isActive("/admin")}" href="#/admin" data-testid="nav-admin"><i class="fa-solid fa-shield-halved"></i> Admin Dashboard</a>`
      : `
    <a class="nav-link ${isActive("/orders")}" href="#/orders" data-testid="nav-orders">${t("nav.orders")}</a>
    <a class="nav-link ${isActive("/chat")}" href="#/chat" data-testid="nav-chat">${t("nav.chat")}</a>
    <a class="nav-link ${isActive("/dashboard")}" href="#/dashboard" data-testid="nav-dashboard">${t("nav.dashboard")}</a>
    `
    : "";

  nav.innerHTML = baseLinks + authedLinks;

  const langToggle = `
    <div class="lang-toggle" data-testid="lang-toggle">
      <button class="${lang === "id" ? "active" : ""}" data-lang="id" data-testid="lang-id">ID</button>
      <button class="${lang === "en" ? "active" : ""}" data-lang="en" data-testid="lang-en">EN</button>
    </div>`;

  if (user) {
    right.innerHTML = `
      ${langToggle}
      <button class="btn btn-ghost btn-sm" id="notif-btn" data-testid="notif-bell" title="Notifikasi" style="position:relative">
        <i class="fa-regular fa-bell"></i>
      </button>
      <a class="nav-link" href="#/profile" data-testid="nav-profile" style="display:flex;align-items:center;gap:.5rem;padding:.3rem .6rem">
        ${avatar(user, "sm")}
        <span style="font-size:.85rem;font-weight:600">${escape(user.name.split(" ")[0])}</span>
      </a>
      <button class="btn btn-secondary btn-sm" id="logout-btn" data-testid="logout-btn"><i class="fa-solid fa-right-from-bracket"></i></button>
    `;
    right.querySelector("#logout-btn").addEventListener("click", () => {
      store.logout();
      window.dispatchEvent(
        new CustomEvent("toast", {
          detail: { type: "success", text: "Berhasil keluar" },
        }),
      );
      router.navigate("/");
    });
    right.querySelector("#notif-btn").addEventListener("click", () => {
      window.dispatchEvent(
        new CustomEvent("toast", {
          detail: {
            type: "info",
            text: "Fitur notifikasi sedang dalam pengembangan",
          },
        }),
      );
    });
  } else {
    right.innerHTML = `
      ${langToggle}
      <a class="btn btn-ghost btn-sm" href="#/login" data-testid="login-link">${t("nav.login")}</a>
      <a class="btn btn-primary btn-sm" href="#/register" data-testid="register-link">${t("nav.register")}</a>
    `;
  }

  // lang switcher
  right.querySelectorAll("[data-lang]").forEach((b) => {
    b.addEventListener("click", () => {
      store.setState({ lang: b.getAttribute("data-lang") });
      router.render();
    });
  });
}

function renderFooter() {
  const f = document.getElementById("site-footer");
  if (!f) return;
  f.innerHTML = `
    <div class="container">
      <div class="footer-grid">
        <div>
          <div class="brand" style="color:#fff;margin-bottom:1rem">
            <img src="/logotolongin.png" alt="Tolongin" class="brand-logo-img" height="38" style="filter:brightness(0) invert(1)">
          </div>
          <p style="color:rgba(255,255,255,.7);font-size:.9rem">${t("footer.tag")}</p>
          <div class="flex gap-sm" style="margin-top:1rem">
            <a href="#" aria-label="instagram"><i class="fa-brands fa-instagram"></i></a>
            <a href="#" aria-label="twitter"><i class="fa-brands fa-x-twitter"></i></a>
            <a href="#" aria-label="linkedin"><i class="fa-brands fa-linkedin"></i></a>
          </div>
        </div>
        <div><h4>Marketplace</h4>
          <a href="#/marketplace">Cari Jasa</a>
          <a href="#/jobs">Cari Kerja</a>
          <a href="#/register">Mulai Jual Jasa</a>
        </div>
        <div><h4>Perusahaan</h4>
          <a href="#/">Tentang Kami</a>
          <a href="#/">Karir</a>
          <a href="#/">Blog</a>
        </div>
        <div><h4>Bantuan</h4>
          <a href="#/">FAQ</a>
          <a href="#/">Pusat Bantuan</a>
          <a href="#/">Syarat &amp; Ketentuan</a>
        </div>
      </div>
      <div class="footer-bottom">© ${new Date().getFullYear()} Tolongin Indonesia. Made with <i class="fa-solid fa-heart" style="color:#ef4444"></i> for sustainable growth.</div>
    </div>
  `;
}
