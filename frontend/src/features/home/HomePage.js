import { api } from "../../shared/utils/api.js";
import { serviceCard, jobCard, avatar } from "../../shared/ui/components.js";
import { escape, fmtIDR } from "../../shared/utils/helpers.js";
import { router } from "../../app/router.js";

const FACE_DEMO = [
  { name: "Rina Pratiwi", avatar: "https://i.pravatar.cc/256?img=47" },
  { name: "Citra Kirana", avatar: "https://i.pravatar.cc/256?img=45" },
  { name: "Andi Pratama", avatar: "https://i.pravatar.cc/256?img=12" },
];

const TRUSTED_LOGOS = [
  "Batik Nusantara",
  "Kopi Senja",
  "Warung Digital",
  "Les Privat Jogja",
  "AC Bersih",
  "Studio Foto UMKM",
];

const CATEGORY_META = {
  "desain-grafis": { tag: "Sedang populer", freelancers: 520, projects: 1200, rating: 4.9 },
  "web-development": { tag: "Paling dicari", freelancers: 420, projects: 870, rating: 4.8 },
  "mobile-development": { tag: "Mobile app", freelancers: 310, projects: 640, rating: 4.9 },
  "data-entry": { tag: "Admin & input", freelancers: 195, projects: 410, rating: 4.6 },
  penulisan: { tag: "Konten & copy", freelancers: 280, projects: 510, rating: 4.7 },
  "video-editing": { tag: "Video & reels", freelancers: 340, projects: 680, rating: 4.8 },
  "digital-marketing": { tag: "Digital marketing", freelancers: 350, projects: 720, rating: 4.8 },
  "les-privat": { tag: "Les privat", freelancers: 460, projects: 980, rating: 4.9 },
  "service-reparasi": { tag: "Servis & AC", freelancers: 380, projects: 840, rating: 4.7 },
  pindahan: { tag: "Jasa pindahan", freelancers: 220, projects: 390, rating: 4.8 },
  fotografi: { tag: "Foto & video", freelancers: 290, projects: 520, rating: 4.8 },
  kebersihan: { tag: "Kebersihan", freelancers: 180, projects: 340, rating: 4.7 },
  "event-catering": { tag: "Event", freelancers: 150, projects: 280, rating: 4.6 },
  "tukang-rumah": { tag: "Renovasi", freelancers: 210, projects: 450, rating: 4.7 },
};

const FLOW_STEPS = [
  { role: "Buyer", action: "Post / Pesan", icon: "fa-cart-shopping", tone: "" },
  { role: "Seller", action: "Terima & Kerjakan", icon: "fa-handshake", tone: "" },
  { role: "Escrow", action: "Dana Aman", icon: "fa-shield-halved", tone: "accent" },
  { role: "Chat", action: "Kolaborasi", icon: "fa-comments", tone: "" },
  { role: "Seller", action: "Upload Bukti", icon: "fa-cloud-arrow-up", tone: "" },
  { role: "Buyer", action: "Approve", icon: "fa-circle-check", tone: "" },
  { role: "Selesai", action: "Review & Dana Cair", icon: "fa-star", tone: "success" },
];

const LIVE_ACTIVITIES = [
  { time: "2 menit lalu", who: "Dewi dari Surabaya", action: "baru mendapatkan", highlight: "Rp850.000" },
  { time: "12 detik lalu", who: "Andi Pratama", action: "baru menerima project", highlight: "Desain Logo UMKM" },
  { time: "Hari ini", who: "182 project", action: "selesai di Tolongin", highlight: "98% on-time" },
  { time: "5 menit lalu", who: "Maya dari Bandung", action: "memasang lowongan", highlight: "Editor Video" },
  { time: "Baru saja", who: "Budi dari Makassar", action: "menerima pesanan", highlight: "Servis AC" },
];

const TESTIMONIALS = [
  {
    name: "Rina Pratiwi",
    role: "Owner UMKM Batik",
    city: "Bandung",
    avatar: "https://i.pravatar.cc/256?img=47",
    q: "Saya posting kebutuhan desain jam 9 pagi. Jam 9.15 sudah ada 8 freelancer yang melamar. Jam 11 malam project selesai — banner toko online saya langsung dipakai.",
  },
  {
    name: "Aditya Wirawan",
    role: "Mahasiswa Freelancer",
    city: "Yogyakarta",
    avatar: "https://i.pravatar.cc/256?img=52",
    q: "Sebagai mahasiswa, Tolongin jadi sumber penghasilan tanpa harus cari klien sendiri. Escrow-nya bikin saya tenang — dana cair setelah buyer approve.",
  },
  {
    name: "Maya Sari",
    role: "Founder Coffee Shop",
    city: "Surabaya",
    avatar: "https://i.pravatar.cc/256?img=23",
    q: "Butuh fotografer produk dan desain menu dalam 3 hari. Semua lewat satu platform, chat langsung, bayar aman. Cocok banget buat UMKM yang belum punya tim internal.",
  },
];

const FAQ_ITEMS = [
  {
    q: "Apa bedanya jasa digital dan jasa fisik?",
    a: "Jasa digital (desain, coding, konten) dikerjakan remote — tanpa filter lokasi. Jasa fisik (les tatap muka, servis AC, pindahan) membutuhkan kehadiran on-site — Anda bisa filter berdasarkan kota.",
  },
  {
    q: "Apa bedanya Tolongin dengan platform freelance internasional?",
    a: "Tolongin fokus ke kebutuhan Indonesia — les privat, servis AC, jasa pindahan, fotografer UMKM, dan pekerjaan lokal. Pembayaran rupiah, chat Bahasa Indonesia, dan escrow yang melindungi buyer & seller.",
  },
  {
    q: "Bagaimana cara kerja escrow?",
    a: "Dana ditahan di escrow setelah buyer bayar. Seller kerjakan proyek, upload bukti, buyer review & approve — baru dana dicairkan ke seller.",
  },
  {
    q: "Bisa cari jasa dan cari kerja pakai satu akun?",
    a: "Ya. Satu akun untuk cari bantuan, pasang lowongan, atau tawarkan jasa Anda sendiri.",
  },
  {
    q: "Apakah seller diverifikasi?",
    a: "Seller bisa verifikasi identitas (KYC) agar profil tampil badge terverifikasi dan meningkatkan kepercayaan buyer.",
  },
];

function getCategoryMeta(c) {
  if (CATEGORY_META[c.slug]) return CATEGORY_META[c.slug];
  const seed = [...String(c.slug || c.name || "")].reduce((a, ch) => a + ch.charCodeAt(0), 0);
  return {
    tag: "⭐ Aktif",
    freelancers: 150 + (seed % 400),
    projects: 200 + (seed % 900),
    rating: Math.round((4.5 + (seed % 5) / 10) * 10) / 10,
  };
}

function starsHtml(rating) {
  const r = Math.round(rating);
  return Array.from({ length: 5 }, (_, i) =>
    `<i class="fa-${i < r ? "solid" : "regular"} fa-star"></i>`,
  ).join("");
}

function renderCategoryCard(c) {
  const meta = getCategoryMeta(c);
  const icon = (c.icon || "fa-folder").startsWith("fa-") ? c.icon : "fa-" + c.icon;
  const st = c.serviceType || "DIGITAL";
  const typeIcon = st === "PHYSICAL" ? "fa-person-digging" : "fa-laptop-code";
  const href = `#/marketplace?serviceType=${encodeURIComponent(st)}&category=${encodeURIComponent(c.slug)}`;
  return `
    <a class="cat-card-rich" href="${href}" data-testid="cat-${c.slug}" data-category-slug="${escape(c.slug)}">
      <span class="cat-type-icon cat-type-icon--${st.toLowerCase()}" title="${st === "PHYSICAL" ? "Jasa fisik" : "Jasa digital"}"><i class="fa-solid ${typeIcon}"></i></span>
      <span class="cat-card-tag">${meta.tag}</span>
      <div class="cat-icon"><i class="fa-solid ${icon}"></i></div>
      <div class="cat-name">${escape(c.name)}</div>
      <div class="cat-stats">
        <span><strong>${meta.freelancers.toLocaleString("id-ID")}</strong> freelancer</span>
        <span><strong>${meta.projects.toLocaleString("id-ID")}</strong> project</span>
      </div>
      <div class="cat-rating">${starsHtml(meta.rating)} <span>${meta.rating}</span></div>
    </a>`;
}

function initHorizontalCarousel(trackId, prevId, nextId) {
  const track = document.getElementById(trackId);
  const prev = document.getElementById(prevId);
  const next = document.getElementById(nextId);
  if (!track || !prev || !next) return;

  const scrollAmount = () => Math.min(track.clientWidth * 0.75, 320);
  prev.addEventListener("click", () =>
    track.scrollBy({ left: -scrollAmount(), behavior: "smooth" }),
  );
  next.addEventListener("click", () =>
    track.scrollBy({ left: scrollAmount(), behavior: "smooth" }),
  );

  const updateBtns = () => {
    prev.disabled = track.scrollLeft <= 8;
    next.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 8;
  };
  track.addEventListener("scroll", updateBtns, { passive: true });
  window.addEventListener("resize", updateBtns);
  updateBtns();
}

function initCategoryCarousel() {
  initHorizontalCarousel("cat-grid", "cat-prev", "cat-next");
}

function initHomeInteractions() {
  let heroMode = "services";
  document.querySelectorAll(".hero-mode-pill").forEach((pill) => {
    pill.addEventListener("click", () => {
      heroMode = pill.dataset.mode || "services";
      document.querySelectorAll(".hero-mode-pill").forEach((p) => {
        p.classList.toggle("active", p.dataset.mode === heroMode);
      });
    });
  });

  const heroSearch = document.getElementById("hero-search-form");
  heroSearch?.addEventListener("submit", (e) => {
    e.preventDefault();
    const q = document.getElementById("hero-search-q")?.value.trim() || "";
    if (heroMode === "jobs") {
      router.navigate(q ? `/jobs?q=${encodeURIComponent(q)}` : "/jobs");
    } else {
      router.navigate(q ? `/marketplace?q=${encodeURIComponent(q)}` : "/marketplace");
    }
  });

  const tickerEl = document.getElementById("live-ticker-text");
  if (tickerEl) {
    let idx = 0;
    const tick = () => {
      const item = LIVE_ACTIVITIES[idx % LIVE_ACTIVITIES.length];
      tickerEl.innerHTML = `
        <span class="live-dot" aria-hidden="true"></span>
        <span class="live-time">${escape(item.time)}</span>
        <strong>${escape(item.who)}</strong> ${escape(item.action)}
        <span class="live-highlight">${escape(item.highlight)}</span>`;
      idx += 1;
    };
    tick();
    setInterval(tick, 4500);
  }

  document.querySelectorAll(".faq-item").forEach((item) => {
    const btn = item.querySelector(".faq-q");
    btn?.addEventListener("click", () => {
      const open = item.classList.contains("open");
      document.querySelectorAll(".faq-item").forEach((i) => i.classList.remove("open"));
      if (!open) item.classList.add("open");
    });
  });

  const counters = document.querySelectorAll("[data-count-to]");
  if (counters.length && "IntersectionObserver" in window) {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          const target = parseInt(el.dataset.countTo, 10);
          const suffix = el.dataset.countSuffix || "";
          const duration = 1200;
          const start = performance.now();
          const step = (now) => {
            const p = Math.min((now - start) / duration, 1);
            el.textContent = Math.floor(target * p).toLocaleString("id-ID") + suffix;
            if (p < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
          obs.unobserve(el);
        });
      },
      { threshold: 0.3 },
    );
    counters.forEach((el) => obs.observe(el));
  }
}

function renderHeroShowcase() {
  return `
    <div class="hero-visual">
      <div class="hero-art" data-testid="hero-art">
        <div class="hero-art__wash" aria-hidden="true">
          <div class="hero-art__blob hero-art__blob--a"></div>
          <div class="hero-art__blob hero-art__blob--b"></div>
          <div class="hero-art__blob hero-art__blob--c"></div>
          <svg class="hero-art__sweep" viewBox="0 0 420 420" aria-hidden="true">
            <defs>
              <linearGradient id="heroSweepGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="#0a66c2" stop-opacity="0"/>
                <stop offset="45%" stop-color="#6366f1" stop-opacity="0.35"/>
                <stop offset="100%" stop-color="#f59e0b" stop-opacity="0.2"/>
              </linearGradient>
            </defs>
            <path d="M40 300 C120 80, 280 340, 380 140" fill="none" stroke="url(#heroSweepGrad)" stroke-width="2.5" stroke-linecap="round"/>
            <path d="M80 340 Q210 180 340 260" fill="none" stroke="rgba(10,102,194,0.12)" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
          <span class="hero-art__grain"></span>
        </div>

        <a href="#/marketplace" class="hero-tile hero-tile--service hero-tile--digital hero-mock-card--service" data-testid="hero-mock-service">
          <span class="hero-tile__accent" aria-hidden="true"></span>
          <span class="hero-tile__kind">Desain Grafis</span>
          <span class="hero-mock-title hero-tile__title">Desain Logo Profesional</span>
          <span class="hero-mock-price hero-tile__price">Rp 250.000</span>
        </a>

        <a href="#/jobs" class="hero-tile hero-tile--job hero-tile--digital hero-mock-card--job" data-testid="hero-mock-job">
          <span class="hero-tile__accent" aria-hidden="true"></span>
          <span class="hero-tile__kind">Lowongan</span>
          <span class="hero-mock-title hero-tile__title">Desain Logo Brand Fashion</span>
          <span class="hero-mock-meta hero-tile__meta"><i class="fa-solid fa-wifi"></i> Remote · <strong>Rp 500.000</strong></span>
        </a>

        <div class="hero-bubble hero-bubble--a" aria-hidden="true">
          <span class="hero-bubble__icon"><i class="fa-solid fa-circle-check"></i></span>
          <span class="hero-bubble__text">Terverifikasi</span>
        </div>
        <div class="hero-bubble hero-bubble--b" aria-hidden="true">
          <span class="hero-bubble__icon"><i class="fa-solid fa-shield-halved"></i></span>
          <span class="hero-bubble__text">Escrow aman</span>
        </div>

        <div class="hero-bubble hero-bubble--c" aria-hidden="true">
          <span class="hero-bubble__icon hero-bubble__icon--amber"><i class="fa-solid fa-bolt"></i></span>
          <span class="hero-bubble__text">Live 24/7</span>
        </div>

        <div class="hero-spark hero-spark--a" aria-hidden="true"></div>
        <div class="hero-spark hero-spark--b" aria-hidden="true"></div>
        <div class="hero-spark hero-spark--c" aria-hidden="true"></div>

        <p class="hero-art__places" aria-hidden="true">
          <span>Bandung</span><span>Jakarta</span><span>Malang</span>
        </p>
      </div>
    </div>`;
}

export async function HomePage({ mount }) {
  mount.innerHTML = `
    <div class="home-page">
    <section class="hero hero-premium">
      <div class="hero-premium__bg" aria-hidden="true"></div>
      <div class="container hero-inner">
        <div class="hero-inner__ambient" aria-hidden="true">
          <div class="hero-inner__blob hero-inner__blob--left"></div>
          <div class="hero-inner__blob hero-inner__blob--center"></div>
          <div class="hero-inner__blob hero-inner__blob--right"></div>
          <svg class="hero-inner__flow" viewBox="0 0 960 420" preserveAspectRatio="none" aria-hidden="true">
            <defs>
              <linearGradient id="heroFlowGrad" x1="0%" y1="50%" x2="100%" y2="50%">
                <stop offset="0%" stop-color="#0a66c2" stop-opacity="0"/>
                <stop offset="35%" stop-color="#6366f1" stop-opacity="0.18"/>
                <stop offset="65%" stop-color="#0a66c2" stop-opacity="0.14"/>
                <stop offset="100%" stop-color="#f59e0b" stop-opacity="0"/>
              </linearGradient>
            </defs>
            <path d="M0 300 C220 80, 420 360, 640 200 S880 120, 960 260" fill="none" stroke="url(#heroFlowGrad)" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </div>
        <div class="hero-copy">
          <div class="hero-copy__glow" aria-hidden="true"></div>
          <div class="hero-copy__inner">
            <span class="hero-eyebrow">Marketplace jasa &amp; kerja · Indonesia</span>
            <h1>
              <span class="hero-headline-top">Cari jasa. Cari kerja.</span>
              <span class="hero-headline-brand"><span class="hero-brand-word"><span class="hero-brand-tolong">Tolong</span><span class="hero-brand-in">in</span></span> aja.</span>
            </h1>
            <p class="lead">Dari desain remote sampai servis AC di kotamu — escrow aman, seller terverifikasi, chat langsung.</p>

            <form class="hero-search-lite" id="hero-search-form" data-testid="hero-search">
              <div class="hero-search-lite-row">
                <i class="fa-solid fa-magnifying-glass hero-search-lite-icon"></i>
                <input class="hero-search-lite-input" id="hero-search-q" placeholder="Contoh: desain logo, servis AC, editor video…" autocomplete="off">
                <div class="hero-mode-pills" role="group" aria-label="Jenis pencarian">
                  <button type="button" class="hero-mode-pill active" data-mode="services">Jasa</button>
                  <button type="button" class="hero-mode-pill" data-mode="jobs">Kerja</button>
                </div>
                <button class="hero-search-go btn btn-primary btn-icon" type="submit" aria-label="Cari"><i class="fa-solid fa-arrow-right"></i></button>
              </div>
            </form>

            <div class="hero-copy-foot">
              <div class="hero-actions">
                <a class="btn btn-primary btn-lg hero-btn-organic" href="#/marketplace" data-testid="hero-cta-marketplace"><i class="fa-solid fa-store"></i> Cari Jasa</a>
                <a class="btn btn-outline btn-lg hero-btn-organic" href="#/jobs" data-testid="hero-cta-jobs"><i class="fa-solid fa-briefcase"></i> Cari Kerja</a>
              </div>
              <div class="hero-social-proof hero-social-proof--premium">
                <div class="hero-faces">
                  ${FACE_DEMO.map((u) => avatar({ ...u }, "sm")).join("")}
                </div>
                <div class="hero-social-text"><strong>10.324+</strong> freelancer aktif <span class="hero-social-sep">·</span> <span class="text-muted">34 provinsi</span></div>
              </div>
              <div class="hero-trust-strip" aria-label="Keunggulan platform">
                <span><i class="fa-solid fa-shield-halved"></i> Escrow aman</span>
                <span><i class="fa-solid fa-circle-check"></i> Terverifikasi</span>
                <span><i class="fa-solid fa-map-location-dot"></i> Digital &amp; fisik</span>
              </div>
            </div>
          </div>
        </div>
        ${renderHeroShowcase()}
      </div>
      <div class="live-ticker hero-premium__ticker" aria-live="polite">
        <div class="container live-ticker-inner">
          <span class="live-ticker-label"><i class="fa-solid fa-signal"></i> Live</span>
          <div class="live-ticker-text" id="live-ticker-text"></div>
        </div>
      </div>
    </section>

    <section class="section section-tone-blue section-compact section-trusted">
      <div class="container">
        <p class="trusted-label">Dipercaya UMKM &amp; bisnis lokal di seluruh Indonesia</p>
        <div class="trusted-logos trusted-logos--premium">
          ${TRUSTED_LOGOS.map((name) => `<span class="trusted-logo"><i class="fa-solid fa-building"></i> ${escape(name)}</span>`).join("")}
        </div>
      </div>
    </section>

    <section class="section section-service-modes">
      <div class="container">
        <div class="section-head section-head-xl section-head-center">
          <span class="section-eyebrow">Dua Cara Kerja</span>
          <h2>Remote atau on-site — pilih yang cocok</h2>
          <p>Digital tanpa batas kota. Fisik dengan filter lokasi. Satu platform untuk semua kebutuhan.</p>
        </div>
        <div class="mode-dual-grid">
          <a class="mode-dual-card mode-dual-card--digital" href="#/marketplace?serviceType=DIGITAL">
            <div class="mode-dual-icon"><i class="fa-solid fa-laptop-code"></i></div>
            <h3>Jasa Digital</h3>
            <p>Desain, coding, konten, editing — dikerjakan remote dari mana saja.</p>
            <ul>
              <li><i class="fa-solid fa-wifi"></i> Tanpa filter lokasi</li>
              <li><i class="fa-solid fa-clock"></i> Turnaround cepat</li>
            </ul>
            <span class="mode-dual-cta">Jelajahi digital <i class="fa-solid fa-arrow-right"></i></span>
          </a>
          <a class="mode-dual-card mode-dual-card--physical" href="#/marketplace?serviceType=PHYSICAL">
            <div class="mode-dual-icon"><i class="fa-solid fa-person-digging"></i></div>
            <h3>Jasa Fisik</h3>
            <p>Les tatap muka, servis AC, pindahan, fotografer event — di kota Anda.</p>
            <ul>
              <li><i class="fa-solid fa-location-dot"></i> Filter per kota</li>
              <li><i class="fa-solid fa-handshake"></i> On-site &amp; terpercaya</li>
            </ul>
            <span class="mode-dual-cta">Jelajahi fisik <i class="fa-solid fa-arrow-right"></i></span>
          </a>
        </div>
      </div>
    </section>

    <section class="section section-categories">
      <div class="container">
        <div class="section-head section-head-xl section-head-center">
          <span class="section-eyebrow">Kategori Populer</span>
          <h2>Jasa yang paling dicari di Indonesia</h2>
          <p>Ikon <i class="fa-solid fa-laptop-code"></i> = digital · <i class="fa-solid fa-person-digging"></i> = fisik — klik untuk filter langsung.</p>
        </div>
        <div class="cat-mode-tabs" role="tablist">
          <button type="button" class="cat-mode-tab active" data-cat-filter="all" role="tab">Semua</button>
          <button type="button" class="cat-mode-tab" data-cat-filter="DIGITAL" role="tab"><i class="fa-solid fa-laptop-code"></i> Digital</button>
          <button type="button" class="cat-mode-tab" data-cat-filter="PHYSICAL" role="tab"><i class="fa-solid fa-person-digging"></i> Fisik</button>
        </div>
        <div class="cat-carousel-wrap">
          <button type="button" class="cat-carousel-btn" id="cat-prev" aria-label="Kategori sebelumnya"><i class="fa-solid fa-chevron-left"></i></button>
          <div class="cat-carousel-track" id="cat-grid"></div>
          <button type="button" class="cat-carousel-btn" id="cat-next" aria-label="Kategori berikutnya"><i class="fa-solid fa-chevron-right"></i></button>
        </div>
      </div>
    </section>

    <section class="section section-featured">
      <div class="container">
        <div class="section-head section-head-xl section-head-center">
          <span class="section-eyebrow">Rekomendasi</span>
          <h2>Jasa Pilihan Terbaik</h2>
          <p>Dari Surabaya, Bandung, Makassar — seller lokal siap membantu proyek Anda.</p>
        </div>
        <div class="home-carousel-wrap featured-carousel-wrap">
          <button type="button" class="home-carousel-btn" id="feat-prev" aria-label="Jasa sebelumnya"><i class="fa-solid fa-chevron-left"></i></button>
          <div class="home-carousel-track featured-carousel-track" id="feat-services"></div>
          <button type="button" class="home-carousel-btn" id="feat-next" aria-label="Jasa berikutnya"><i class="fa-solid fa-chevron-right"></i></button>
        </div>
        <div class="section-cta-row">
          <a class="btn btn-outline btn-lg" href="#/marketplace" data-testid="see-all-services">Lihat Semua Jasa <i class="fa-solid fa-arrow-right"></i></a>
        </div>
      </div>
    </section>

    <section class="section section-jobs-home">
      <div class="container">
        <div class="section-head section-head-xl section-head-center">
          <span class="section-eyebrow">Lowongan Terbaru</span>
          <h2>Cari kerja digital &amp; fisik</h2>
          <p>Lowongan remote maupun on-site dari klien di seluruh Indonesia — lamaran langsung dari platform.</p>
        </div>
        <div class="home-carousel-wrap jobs-home-carousel-wrap">
          <button type="button" class="home-carousel-btn" id="jobs-prev" aria-label="Lowongan sebelumnya"><i class="fa-solid fa-chevron-left"></i></button>
          <div class="home-carousel-track jobs-home-carousel-track" id="home-jobs"></div>
          <button type="button" class="home-carousel-btn" id="jobs-next" aria-label="Lowongan berikutnya"><i class="fa-solid fa-chevron-right"></i></button>
        </div>
        <div class="section-cta-row">
          <a class="btn btn-outline btn-lg" href="#/jobs" data-testid="see-all-jobs">Lihat Semua Lowongan <i class="fa-solid fa-arrow-right"></i></a>
        </div>
      </div>
    </section>

    <section class="section section-flow">
      <div class="container">
        <div class="section-head section-head-xl section-head-center">
          <span class="section-eyebrow">Alur Kerja</span>
          <h2>Dari posting sampai selesai — transparan &amp; aman</h2>
          <p>Flow escrow Tolongin melindungi buyer dan seller di setiap langkah.</p>
        </div>
        <div class="flow-track" role="list">
          ${FLOW_STEPS.map(
            (step, i) => `
            ${i > 0 ? '<div class="flow-connector" aria-hidden="true"><i class="fa-solid fa-chevron-right"></i></div>' : ""}
            <div class="flow-node flow-node-${step.tone || "default"}" role="listitem">
              <div class="flow-node-icon"><i class="fa-solid ${step.icon}"></i></div>
              <span class="flow-role">${escape(step.role)}</span>
              <span class="flow-action">${escape(step.action)}</span>
            </div>`,
          ).join("")}
        </div>
      </div>
    </section>

    <section class="section section-stats-impact">
      <div class="container">
        <div class="section-head section-head-xl section-head-center">
          <span class="section-eyebrow">Dampak Nyata</span>
          <h2>Angka yang terus bertumbuh</h2>
          <p>Ekosistem Tolongin berkembang bersama freelancer dan UMKM di seluruh Indonesia.</p>
        </div>
        <div class="stats-rich-wrap">
          <div class="stats-rich stats-rich-lg">
          <div class="stat-rich stat-rich-lg">
            <div class="stat-rich-icon"><i class="fa-solid fa-store"></i></div>
            <div class="stat-rich-num" data-stat="services" data-count-to="120" data-count-suffix="+">0</div>
            <div class="stat-rich-label">Jasa tersedia</div>
            <div class="stat-rich-sub"><i class="fa-solid fa-laptop-code"></i> Digital &amp; fisik</div>
          </div>
          <div class="stat-rich stat-rich-lg">
            <div class="stat-rich-icon"><i class="fa-solid fa-briefcase"></i></div>
            <div class="stat-rich-num" data-stat="jobs" data-count-to="48">0</div>
            <div class="stat-rich-label">Lowongan aktif</div>
            <div class="stat-rich-sub">Remote &amp; on-site</div>
          </div>
          <div class="stat-rich stat-rich-lg">
            <div class="stat-rich-icon"><i class="fa-solid fa-star"></i></div>
            <div class="stat-rich-num">4.9</div>
            <div class="stat-rich-label">Rating rata-rata</div>
            <div class="stat-rich-sub">Ulasan terverifikasi</div>
          </div>
          <div class="stat-rich stat-rich-lg">
            <div class="stat-rich-icon"><i class="fa-solid fa-layer-group"></i></div>
            <div class="stat-rich-num" data-stat="categories" data-count-to="14">0</div>
            <div class="stat-rich-label">Kategori jasa</div>
            <div class="stat-rich-sub">34 provinsi</div>
          </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section section-testimonials">
      <div class="container">
        <div class="section-head section-head-xl section-head-center">
          <span class="section-eyebrow">Cerita Sukses</span>
          <h2>Apa Kata Mereka</h2>
          <p>Pengalaman nyata dari UMKM, mahasiswa, dan freelancer Indonesia.</p>
        </div>
        <div class="home-carousel-wrap testimonial-carousel-wrap">
          <button type="button" class="home-carousel-btn" id="testi-prev" aria-label="Testimoni sebelumnya"><i class="fa-solid fa-chevron-left"></i></button>
          <div class="home-carousel-track testimonial-carousel-track" id="testimonial-track">
          ${TESTIMONIALS.map(
            (tt) => `
            <div class="testimonial testimonial-premium testimonial-home">
              <div class="stars">${starsHtml(5)}</div>
              <p class="quote">"${escape(tt.q)}"</p>
              <div class="who">
                <img class="avatar avatar-lg" src="${escape(tt.avatar)}" alt="" loading="lazy">
                <div class="who-info">
                  <div class="name">${escape(tt.name)}</div>
                  <div class="role">${escape(tt.role)} · ${escape(tt.city)}</div>
                </div>
              </div>
            </div>`,
          ).join("")}
          </div>
          <button type="button" class="home-carousel-btn" id="testi-next" aria-label="Testimoni berikutnya"><i class="fa-solid fa-chevron-right"></i></button>
        </div>
      </div>
    </section>

    <section class="section section-faq">
      <div class="container">
        <div class="section-head section-head-xl section-head-center">
          <span class="section-eyebrow">FAQ</span>
          <h2>Pertanyaan yang sering ditanyakan</h2>
          <p>Jawaban singkat untuk buyer dan seller yang baru bergabung.</p>
        </div>
        <div class="faq-list faq-list-lg faq-list-center">
          ${FAQ_ITEMS.map(
            (f, i) => `
            <div class="faq-item" data-testid="faq-${i}">
              <button type="button" class="faq-q">${escape(f.q)} <i class="fa-solid fa-chevron-down"></i></button>
              <div class="faq-a"><p>${escape(f.a)}</p></div>
            </div>`,
          ).join("")}
        </div>
      </div>
    </section>

    <section class="section section-cta-final">
      <div class="section-cta-final__bg" aria-hidden="true"></div>
      <div class="container section-cta-inner">
        <span class="section-cta-eyebrow"><i class="fa-solid fa-rocket"></i> Mulai sekarang</span>
        <h2>Siap cari bantuan atau tawarkan skill Anda?</h2>
        <p>Daftar gratis — posting jasa, pasang lowongan, atau pesan dalam hitungan menit.</p>
        <div class="hero-actions hero-actions--center">
          <a class="btn btn-lg btn-white" href="#/register"><i class="fa-solid fa-user-plus"></i> Daftar Gratis</a>
          <a class="btn btn-lg btn-outline-white" href="#/marketplace">Jelajahi Marketplace</a>
        </div>
      </div>
    </section>
    </div>
  `;

  initHomeInteractions();

  try {
    const [cats, servicesResp, jobsResp] = await Promise.all([
      api.get("/categories"),
      api.get("/services/featured"),
      api.get("/jobs?status=OPEN&limit=12"),
    ]);
    const services = Array.isArray(servicesResp)
      ? servicesResp
      : servicesResp.data || [];
    const jobs = Array.isArray(jobsResp) ? jobsResp : jobsResp.data || [];
    const allCats = cats;

    const statServices = document.querySelector('[data-stat="services"]');
    const statJobs = document.querySelector('[data-stat="jobs"]');
    const statCats = document.querySelector('[data-stat="categories"]');
    if (statServices && services.length) {
      statServices.dataset.countTo = String(Math.max(services.length * 8, services.length));
    }
    if (statJobs && jobs.length) {
      statJobs.dataset.countTo = String(jobs.length);
    }
    if (statCats && allCats?.length) {
      statCats.dataset.countTo = String(allCats.length);
    }

    const grid = document.getElementById("cat-grid");
    const renderCats = (filter) => {
      if (!grid) return;
      const list =
        filter === "all"
          ? allCats
          : allCats.filter((c) => (c.serviceType || "DIGITAL") === filter);
      grid.innerHTML = list.map(renderCategoryCard).join("");
    };
    if (grid) {
      renderCats("all");
      initCategoryCarousel();
      document.querySelectorAll(".cat-mode-tab").forEach((tab) => {
        tab.addEventListener("click", () => {
          document.querySelectorAll(".cat-mode-tab").forEach((t) => t.classList.remove("active"));
          tab.classList.add("active");
          renderCats(tab.dataset.catFilter || "all");
        });
      });
    }
    const feat = document.getElementById("feat-services");
    if (feat) {
      feat.innerHTML = services.length
        ? services.map((s) => serviceCard(s, { featured: true })).join("")
        : `<p class="text-muted text-center" style="padding:2rem">Jelajahi marketplace untuk melihat jasa terbaru.</p>`;
      initHorizontalCarousel("feat-services", "feat-prev", "feat-next");
    }

    const mockSvc = document.querySelector('[data-testid="hero-mock-service"]');
    const mockJob = document.querySelector('[data-testid="hero-mock-job"]');
    if (mockSvc && services[0]) {
      const s = services[0];
      const catName =
        (s.category && typeof s.category === "object" ? s.category.name : s.category) || "Jasa";
      const isPhysical = s.isRemote === false;
      mockSvc.querySelector(".hero-mock-title").textContent = s.title || "Jasa unggulan";
      mockSvc.querySelector(".hero-mock-price").textContent = fmtIDR(s.price || 0);
      const kindEl = mockSvc.querySelector(".hero-tile__kind");
      if (kindEl) kindEl.textContent = catName;
      mockSvc.classList.remove("hero-tile--digital", "hero-tile--physical");
      mockSvc.classList.add(isPhysical ? "hero-tile--physical" : "hero-tile--digital");
    }
    if (mockJob && jobs[0]) {
      const j = jobs[0];
      const catName =
        (j.category && typeof j.category === "object" ? j.category.name : j.category) || "Lowongan";
      const loc = j.location || j.city || "Remote";
      const isRemote = String(loc).toLowerCase() === "remote" || j.isOnline;
      mockJob.querySelector(".hero-mock-title").textContent = String(j.title || "").replace(/^\s*\[URGENT\]\s*/i, "");
      const meta = mockJob.querySelector(".hero-mock-meta");
      if (meta) {
        meta.innerHTML = `<i class="fa-solid fa-${isRemote ? "wifi" : "location-dot"}"></i> ${escape(isRemote ? "Remote" : loc)} · <strong>${fmtIDR(j.budget || 0)}</strong>`;
      }
      const kindEl = mockJob.querySelector(".hero-tile__kind");
      if (kindEl) kindEl.textContent = catName;
      mockJob.classList.remove("hero-tile--digital", "hero-tile--physical");
      mockJob.classList.add(isRemote ? "hero-tile--digital" : "hero-tile--physical");
    }

    const jobsEl = document.getElementById("home-jobs");
    if (jobsEl) {
      jobsEl.innerHTML = jobs.length
        ? jobs.map((j) => jobCard(j)).join("")
        : `<p class="text-muted text-center" style="padding:2rem">Belum ada lowongan — cek lagi nanti.</p>`;
      initHorizontalCarousel("home-jobs", "jobs-prev", "jobs-next");
    }
    initHorizontalCarousel("testimonial-track", "testi-prev", "testi-next");
  } catch (e) {
    if (import.meta.env.DEV) console.warn("[home] failed to load", e);
  }
}
