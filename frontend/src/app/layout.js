// frontend/src/layout.js

// Layout: header (navbar) + footer wrapper around page content
import { store } from "./store.js";
import { router } from "./router.js";
import { t } from "../shared/utils/i18n.js";
import { escape } from "../shared/utils/helpers.js";
import { avatar } from "../shared/ui/components.js";
import {
  initNotifications,
  stopNotificationPolling,
} from "../features/notifications/NotificationsPanel.js";

export function renderLayout(root) {
  root.innerHTML = `
    <div class="app-canvas" aria-hidden="true">
      <span class="app-canvas__blob app-canvas__blob--a"></span>
      <span class="app-canvas__blob app-canvas__blob--b"></span>
      <span class="app-canvas__blob app-canvas__blob--c"></span>
      <span class="app-canvas__blob app-canvas__blob--d"></span>
    </div>
    <header class="navbar" data-testid="navbar">
      <div class="navbar-veil" aria-hidden="true"></div>
      <div class="navbar-aurora" aria-hidden="true"></div>
      <div class="container navbar-stage">
        <div class="navbar-float">
          <div class="navbar-inner">
            <a class="brand" href="#/" data-testid="brand-logo">
              <span class="brand-glow" aria-hidden="true"></span>
              <img src="/logotolongin.png" alt="Tolongin" class="brand-logo-img" height="36">
            </a>
            <nav class="nav-links" id="nav-links"></nav>
            <div class="nav-right" id="nav-right"></div>
            <button class="menu-toggle" id="menu-toggle" data-testid="mobile-menu-btn" aria-label="menu"><i class="fa-solid fa-bars"></i></button>
          </div>
        </div>
      </div>
    </header>
    <div id="verify-banner"></div>
    <main id="page-mount" class="app-fade-in"></main>
    <footer class="footer" id="site-footer"></footer>
  `;

  renderNav();
  renderBanner();
  renderFooter();
  store.subscribe((state) => {
    renderBanner();
    const navKey = `${state.user?.id || ""}:${state.token ? "t" : "x"}:${state.lang}`;
    if (renderNav._lastKey !== navKey) {
      renderNav._lastKey = navKey;
      renderNav();
    }
  });
  window.addEventListener("route-change", () => {
    updateNavActiveState();
    renderFooter();
    initNavbarAdaptive();
  });

  initNavbarAdaptive();

  // ========== MOBILE MENU ==========
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

let navbarAdaptiveCleanup = null;

function initNavbarAdaptive() {
  if (navbarAdaptiveCleanup) {
    navbarAdaptiveCleanup();
    navbarAdaptiveCleanup = null;
  }

  const navbar = document.querySelector(".navbar");
  if (!navbar) return;

  const discoverHead = document.querySelector(".discover-head");
  const isDiscover = !!discoverHead;

  navbar.classList.remove(
    "navbar--discover",
    "navbar--discover-services",
    "navbar--discover-jobs",
    "navbar--past-hero",
    "navbar--scrolled",
    "navbar--hero-blend",
    "navbar--hero-blend-services",
    "navbar--hero-blend-jobs",
    "navbar--hero-scrolled",
  );

  if (isDiscover) {
    navbar.classList.add("navbar--discover");
    navbar.classList.add(
      discoverHead.classList.contains("discover-head--jobs")
        ? "navbar--discover-jobs"
        : "navbar--discover-services",
    );
  }

  let ticking = false;
  const update = () => {
    ticking = false;
    const headerH =
      parseInt(
        getComputedStyle(document.documentElement).getPropertyValue("--header-h"),
        10,
      ) || 72;
    const y = window.scrollY;
    navbar.classList.toggle("navbar--scrolled", y > 10);
    if (isDiscover) {
      const pastHero = discoverHead.getBoundingClientRect().bottom <= headerH + 4;
      navbar.classList.toggle("navbar--past-hero", pastHero);
    }
  };

  const onScroll = () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
  update();

  navbarAdaptiveCleanup = () => {
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", onScroll);
    navbar.classList.remove(
      "navbar--discover",
      "navbar--discover-services",
      "navbar--discover-jobs",
      "navbar--past-hero",
      "navbar--scrolled",
    );
  };
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
          window.dispatchEvent(
            new CustomEvent("toast", {
              detail: {
                type: "info",
                html: `<span>Kode OTP: <strong>${r.demoOtp}</strong>. Masukkan di halaman verifikasi.</span>`,
                timeout: 10000,
              },
            }),
          );
          window.location.hash = "#/verification";
        } else {
          window.dispatchEvent(
            new CustomEvent("toast", {
              detail: {
                type: "success",
                text: "OTP terkirim! Cek email Anda.",
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

function positionNavIndicator() {
  const nav = document.getElementById("nav-links");
  if (!nav) return;

  let indicator = nav.querySelector(".nav-active-indicator");
  if (!indicator) {
    indicator = document.createElement("span");
    indicator.className = "nav-active-indicator";
    indicator.setAttribute("aria-hidden", "true");
    nav.prepend(indicator);
  }

  const active = nav.querySelector(".nav-link.active");
  if (!active || window.innerWidth <= 768) {
    indicator.style.opacity = "0";
    return;
  }

  indicator.dataset.accent = (active.dataset.testid || "").replace("nav-", "");

  requestAnimationFrame(() => {
    indicator.style.left = `${active.offsetLeft}px`;
    indicator.style.top = `${active.offsetTop}px`;
    indicator.style.width = `${active.offsetWidth}px`;
    indicator.style.height = `${active.offsetHeight}px`;
    indicator.style.opacity = "1";
  });
}

if (!window.__navIndicatorResizeBound) {
  window.__navIndicatorResizeBound = true;
  window.addEventListener("resize", () => positionNavIndicator());
}

if (!window.__profileDropdownOutsideBound) {
  window.__profileDropdownOutsideBound = true;
  document.addEventListener("click", (e) => {
    const menu = document.getElementById("profile-dropdown-menu");
    const trigger = document.getElementById("profile-dropdown-trigger");
    if (!menu?.classList.contains("is-open")) return;
    if (trigger?.contains(e.target) || menu.contains(e.target)) return;
    menu.classList.remove("is-open");
    trigger?.setAttribute("aria-expanded", "false");
  });
}

function updateNavActiveState() {
  const nav = document.getElementById("nav-links");
  if (!nav) return;

  const cur = location.hash.replace(/^#/, "").split("?")[0] || "/";
  nav.querySelectorAll(".nav-link").forEach((link) => {
    const path =
      (link.getAttribute("href") || "#/").replace(/^#/, "").split("?")[0] || "/";
    const active = cur === path || (path !== "/" && cur.startsWith(path));
    link.classList.toggle("active", active);
  });
  positionNavIndicator();
}

function bindProfileDropdown(right) {
  const trigger = right.querySelector("#profile-dropdown-trigger");
  const menu = right.querySelector("#profile-dropdown-menu");
  if (!trigger || !menu) return;

  trigger.setAttribute("aria-haspopup", "true");
  trigger.setAttribute("aria-expanded", "false");

  trigger.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    const opening = !menu.classList.contains("is-open");
    menu.classList.toggle("is-open", opening);
    trigger.setAttribute("aria-expanded", String(opening));
  });

  menu.querySelectorAll(".dropdown-item[href]").forEach((item) => {
    item.addEventListener("click", () => {
      menu.classList.remove("is-open");
      trigger.setAttribute("aria-expanded", "false");
    });
  });
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

  // ✅ NAVBAR BARU: Hanya 4 menu utama untuk user biasa
  const baseLinks = isAdmin
    ? `<a class="nav-link ${isActive("/")}" href="#/" data-testid="nav-home">${t("nav.home")}</a>
       <a class="nav-link ${isActive("/admin")}" href="#/admin" data-testid="nav-admin"><i class="fa-solid fa-shield-halved"></i> Admin</a>`
    : `
    <a class="nav-link ${isActive("/marketplace")}" href="#/marketplace" data-testid="nav-marketplace">
      <i class="fa-solid fa-magnifying-glass"></i> Cari Jasa
    </a>
    <a class="nav-link ${isActive("/jobs")}" href="#/jobs" data-testid="nav-jobs">
      <i class="fa-solid fa-briefcase"></i> Cari Kerja
    </a>
    <a class="nav-link ${isActive("/chat")}" href="#/chat" data-testid="nav-chat">
      <i class="fa-solid fa-comment"></i> Chat
    </a>
    ${user ? `<a class="nav-link ${isActive("/dashboard")}" href="#/dashboard" data-testid="nav-dashboard">
      <i class="fa-solid fa-gauge"></i> Dashboard
    </a>` : ""}
  `;

  nav.innerHTML = baseLinks;
  positionNavIndicator();

  if (user && store.getState().token) {
    const hadProfile = !!right.querySelector("#profile-dropdown-trigger");
    if (!hadProfile) {
      right.innerHTML = `
      <button class="nav-icon-btn" id="notif-btn" data-testid="notif-bell" title="Notifikasi">
        <i class="fa-regular fa-bell"></i>
      </button>
      <div class="profile-dropdown" id="profile-dropdown">
        <button class="profile-dropdown-trigger" id="profile-dropdown-trigger" data-testid="nav-profile" type="button">
          <span class="profile-ring">${avatar(user, "sm")}</span>
          <span class="profile-dropdown-name">${escape(user.name.split(" ")[0])}</span>
          <i class="fa-solid fa-chevron-down profile-dropdown-chevron"></i>
        </button>
        <div class="profile-dropdown-menu" id="profile-dropdown-menu">
          <div class="profile-dropdown-head">
            <strong>${escape(user.name)}</strong>
            <span>${escape(user.email)}</span>
          </div>
          <a href="#/dashboard" class="dropdown-item">
            <i class="fa-solid fa-gauge-high"></i> Dashboard
          </a>
          <a href="#/users/${user.id}" class="dropdown-item">
            <i class="fa-solid fa-user"></i> Profil Saya
          </a>
          <a href="#/orders" class="dropdown-item">
            <i class="fa-solid fa-receipt"></i> Transaksi
          </a>
          <a href="#/settings" class="dropdown-item">
            <i class="fa-solid fa-gear"></i> Pengaturan
          </a>
          <a href="#/verification" class="dropdown-item">
            <i class="fa-solid fa-shield-halved"></i> Verifikasi
          </a>
          <div class="profile-dropdown-foot">
            <button type="button" id="logout-btn-dropdown" class="dropdown-item dropdown-item--danger">
              <i class="fa-solid fa-right-from-bracket"></i> Keluar
            </button>
          </div>
        </div>
      </div>
    `;

      bindProfileDropdown(right);

      const logoutBtnDropdown = right.querySelector("#logout-btn-dropdown");
      if (logoutBtnDropdown) {
        logoutBtnDropdown.addEventListener("click", () => {
          store.logout();
          window.dispatchEvent(
            new CustomEvent("toast", {
              detail: { type: "success", text: "Berhasil keluar" },
            }),
          );
          router.navigate("/");
        });
      }

      initNotifications(right);
    } else {
      const nameEl = right.querySelector(".profile-dropdown-name");
      const headStrong = right.querySelector(".profile-dropdown-head strong");
      const headEmail = right.querySelector(".profile-dropdown-head span");
      const ring = right.querySelector(".profile-ring");
      const profileLink = right.querySelector('.dropdown-item[href^="#/users/"]');
      if (nameEl) nameEl.textContent = user.name.split(" ")[0];
      if (headStrong) headStrong.textContent = user.name;
      if (headEmail) headEmail.textContent = user.email;
      if (ring) ring.innerHTML = avatar(user, "sm");
      if (profileLink) profileLink.setAttribute("href", `#/users/${user.id}`);
      if (!right.dataset.notifReady) initNotifications(right);
    }
  } else {
    // Pengguna keluar -> hentikan polling notifikasi
    stopNotificationPolling();
    right.innerHTML = `
      <div class="navbar-auth">
        <a class="btn btn-ghost btn-sm" href="#/login" data-testid="login-link">${t("nav.login")}</a>
        <a class="btn btn-primary btn-sm" href="#/register" data-testid="register-link">${t("nav.register")}</a>
      </div>
    `;
  }
}

function renderFooter() {
  const f = document.getElementById("site-footer");
  if (!f) return;
  const cur = location.hash.replace(/^#/, "").split("?")[0] || "/";
  const authRoutes = ["/login", "/register", "/forgot-password", "/reset-password"];
  const minimal = authRoutes.includes(cur);

  if (minimal) {
    f.className = "footer footer--minimal";
    f.innerHTML = `
      <div class="container footer-minimal-inner">
        <span>© ${new Date().getFullYear()} Tolongin</span>
        <div class="footer-minimal-links">
          <a href="#/">Beranda</a>
          <a href="#/">Syarat &amp; Ketentuan</a>
          <a href="#/">Privasi</a>
        </div>
      </div>`;
    return;
  }

  f.className = "footer";
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
            <a href="#" aria-label="tiktok"><i class="fa-brands fa-tiktok"></i></a>
          </div>
          <p class="footer-trust"><i class="fa-solid fa-shield-halved"></i> Escrow aman · Seller terverifikasi · 34 provinsi</p>
        </div>
        <div><h4>Marketplace</h4>
          <a href="#/marketplace">Cari Jasa</a>
          <a href="#/jobs">Cari Kerja</a>
          <a href="#/dashboard/manage-services/new">Tawarkan Jasa</a>
          <a href="#/jobs/create">Posting Lowongan</a>
        </div>
        <div><h4>Resources</h4>
          <a href="#/">Panduan Buyer</a>
          <a href="#/">Panduan Seller</a>
          <a href="#/">Blog</a>
          <a href="#/">FAQ</a>
        </div>
        <div><h4>Perusahaan</h4>
          <a href="#/">Tentang Kami</a>
          <a href="#/">Karir</a>
          <a href="#/">Hubungi Kami</a>
        </div>
        <div><h4>Legal</h4>
          <a href="#/">Syarat &amp; Ketentuan</a>
          <a href="#/">Kebijakan Privasi</a>
          <a href="#/">Kebijakan Escrow</a>
        </div>
        <div><h4>Newsletter</h4>
          <p style="font-size:.85rem;color:rgba(255,255,255,.65);margin:0 0 .5rem">Tips freelancer &amp; update fitur.</p>
          <form class="footer-newsletter" onsubmit="event.preventDefault()">
            <input type="email" placeholder="Email Anda" aria-label="Email newsletter">
            <button class="btn btn-sm btn-white" type="submit">Langganan</button>
          </form>
          <p style="font-size:.75rem;color:rgba(255,255,255,.5);margin-top:.5rem">App mobile — segera hadir</p>
        </div>
      </div>
      <div class="footer-bottom">© ${new Date().getFullYear()} Tolongin Indonesia · Marketplace jasa untuk Indonesia</div>
    </div>
  `;
}
