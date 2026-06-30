// frontend/src/features/dashboard/DashboardPages.js

import { api } from "../../shared/utils/api.js";
import {
  escape,
  fmtIDR,
  toast,
  modal,
  confirmModal,
  bindRupiahInput,
  parseIDRInput,
} from "../../shared/utils/helpers.js";
import { statusPill, serviceCard, empty, avatar, bindFavoriteButtons, stars } from "../../shared/ui/components.js";
import {
  serviceImagesFieldHtml,
  initServiceImagesField,
  getServiceImagesValue,
} from "../../shared/utils/service-image-upload.js";
import { resolveAssetUrl } from "../../shared/utils/api.js";
import { store } from "../../app/store.js";
import { router } from "../../app/router.js";
import {
  postTypeLocationFieldsHtml,
  initPostTypeLocationForm,
  readPostTypeLocation,
  validatePostTypeLocation,
  resolveInitialServiceType,
  matchPostCityValue,
} from "../../shared/utils/post-type-location.js";

function getServiceCoverUrl(service) {
  if (!service) return "";
  if (service.image) return service.image;
  if (!service.images) return "";
  try {
    const imgs =
      typeof service.images === "string" ? JSON.parse(service.images) : service.images;
    return Array.isArray(imgs) && imgs.length ? imgs[0] : "";
  } catch {
    return "";
  }
}

function getServiceAllImages(service) {
  if (!service) return [];
  try {
    const imgs =
      typeof service.images === "string" ? JSON.parse(service.images) : service.images;
    if (Array.isArray(imgs) && imgs.length) return imgs.filter(Boolean);
  } catch {
    /* fall through */
  }
  const one = getServiceCoverUrl(service);
  return one ? [one] : [];
}

function serviceThumbUrl(s) {
  const first = getServiceAllImages(s)[0];
  return first ? resolveAssetUrl(first) : "https://placehold.co/400x200/0a66c2/fff?text=No+Image";
}

// Status order yang masih dianggap aktif (bukan selesai/batal/sengketa)
const ACTIVE_STATUSES = [
  "WAITING_CONFIRMATION",
  "PAID",
  "WAITING_REVIEW",
  "REJECTED",
  "ACCEPTED",
  "IN_PROGRESS",
  "IN_REVIEW",
  "REVISION_REQUESTED",
];

// Container untuk konten dashboard
let dashboardContentContainer = null;

// Bar chart sederhana berbasis inline SVG
function svgBarChart(data, opts = {}) {
  const {
    width = 520,
    height = 200,
    barColor = "#0a66c2",
    valueFormatter = (v) => v,
  } = opts;
  if (!data || !data.length) {
    return `<p class="text-muted" style="text-align:center;padding:24px">Belum ada data untuk ditampilkan.</p>`;
  }
  const pad = { top: 16, right: 12, bottom: 32, left: 12 };
  const chartW = width - pad.left - pad.right;
  const chartH = height - pad.top - pad.bottom;
  const maxVal = Math.max(...data.map((d) => d.value), 1);
  const n = data.length;
  const slot = chartW / n;
  const barW = Math.min(slot * 0.6, 48);
  const bars = data
    .map((d, i) => {
      const h = Math.round((d.value / maxVal) * chartH);
      const x = pad.left + i * slot + (slot - barW) / 2;
      const y = pad.top + (chartH - h);
      const labelY = height - pad.bottom + 18;
      const valY = y - 6;
      return `
        <g>
          <rect x="${x}" y="${y}" width="${barW}" height="${h}" rx="4" fill="${barColor}">
            <title>${escape(String(d.label))}: ${escape(String(valueFormatter(d.value)))}</title>
          </rect>
          ${d.value > 0 ? `<text x="${x + barW / 2}" y="${valY}" text-anchor="middle" font-size="10" fill="#666">${escape(String(valueFormatter(d.value)))}</text>` : ""}
          <text x="${x + barW / 2}" y="${labelY}" text-anchor="middle" font-size="11" fill="#888">${escape(String(d.label))}</text>
        </g>`;
    })
    .join("");
  return `
    <svg viewBox="0 0 ${width} ${height}" width="100%" height="${height}" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Grafik batang">
      <line x1="${pad.left}" y1="${pad.top + chartH}" x2="${width - pad.right}" y2="${pad.top + chartH}" stroke="#e0e0e0" stroke-width="1"/>
      ${bars}
    </svg>`;
}

// Bangun data 6 bulan terakhir
function buildMonthlySeries(orders, valueKey) {
  const now = new Date();
  const months = [];
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    months.push({
      key: `${d.getFullYear()}-${d.getMonth()}`,
      label: d.toLocaleDateString("id-ID", { month: "short" }),
      value: 0,
    });
  }
  const idx = {};
  months.forEach((m) => (idx[m.key] = m));
  orders.forEach((o) => {
    const ref = o.completedAt || o.createdAt;
    if (!ref) return;
    const d = new Date(ref);
    const key = `${d.getFullYear()}-${d.getMonth()}`;
    if (idx[key]) {
      idx[key].value += valueKey === "earnings" ? o.amount || 0 : 1;
    }
  });
  return months;
}

// SIDEBAR — anchor tags trigger hashchange so router stays in sync
function sidebar(active) {
  const u = store.getState().user;
  const link = (key, icon, label, testid) =>
    `<a class="side-link ${active === key ? "active" : ""}" href="#/dashboard/${key}" data-nav="${key}" data-testid="${testid}">
       <i class="fa-solid ${icon}"></i> ${label}
     </a>`;
  return `<aside class="dash-side">
    <div class="who">
      ${avatar(u, "sm")}
      <div class="who-text"><div class="name">${escape(u.name.split(" ")[0])}</div><div class="role">${u.role === "ADMIN" ? "Admin" : "Member"}</div></div>
    </div>
    <div class="side-group side-group--tight">
      ${link("overview", "fa-gauge", "Overview", "side-overview")}
    </div>
    <div class="side-group side-group--tight">
      <div class="side-label">Aktivitas Saya</div>
      ${link("transactions", "fa-receipt", "Transaksi", "side-transactions")}
      ${link("my-applications", "fa-file-circle-check", "Lamaran Saya", "side-applications")}
      ${link("favorites", "fa-heart", "Favorit", "side-favorites")}
    </div>
    <div class="side-group side-group--tight">
      <div class="side-label">Saya Menawarkan</div>
      ${link("manage-services", "fa-box", "Kelola Jasa", "side-manage-services")}
      ${link("manage-jobs", "fa-folder-open", "Kelola Lowongan", "side-manage-jobs")}
    </div>
    <div class="side-group side-group--tight">
      <div class="side-label">Keuangan</div>
      ${link("earnings", "fa-coins", "Keuangan", "side-earnings")}
    </div>
    <div class="dash-side-footer">
      <a class="dash-side-mini" href="#/users/${u.id}" data-testid="dash-link-profile"><i class="fa-solid fa-user"></i> Profil</a>
      <a class="dash-side-mini" href="#/settings" data-testid="dash-link-settings"><i class="fa-solid fa-gear"></i> Atur</a>
      <a class="dash-side-mini" href="#/verification" data-testid="dash-link-verify"><i class="fa-solid fa-shield-halved"></i> Verifikasi</a>
    </div>
  </aside>`;
}

// Fungsi untuk load konten berdasarkan navigasi
async function loadDashboardContent(section, mountEl) {
  if (!dashboardContentContainer) {
    dashboardContentContainer = mountEl.querySelector("section");
  }
  const container = dashboardContentContainer;
  if (!container) return;
  container.innerHTML = '<div class="spinner"></div>';
  try {
    // sub-routes: manage-services/new, manage-services/edit/:id, manage-jobs/new, manage-jobs/edit/:id
    const hashRest = location.hash.replace(/^#?\/dashboard\/?/, "");
    const parts = hashRest.split("/").filter(Boolean);
    const sub = parts[1]; // "new" | "edit"
    const id = parts[2];

    switch (section) {
      case "overview":
        await loadOverview(container);
        break;
      case "transactions":
        await loadTransactions(container);
        break;
      case "manage-services":
        if (sub === "new") {
          await loadManageServices(container, { openForm: "create" });
        } else if (sub === "edit" && id) {
          await loadManageServices(container, { openForm: "edit", id });
        } else {
          await loadManageServices(container);
        }
        break;
      case "manage-jobs":
        if (sub === "new") {
          await loadManageJobs(container, { openForm: "create" });
        } else if (sub === "edit" && id) {
          await loadManageJobs(container, { openForm: "edit", id });
        } else {
          await loadManageJobs(container);
        }
        break;
      case "my-applications":
        await loadMyApplications(container);
        break;
      case "favorites":
        await loadFavorites(container);
        break;
      case "earnings":
        await loadEarnings(container);
        break;
      case "account":
        router.navigate("/settings");
        break;
      default:
        await loadOverview(container);
    }
  } catch (err) {
    console.error("Load dashboard content error:", err);
    container.innerHTML = empty("Gagal memuat", err.message);
  }
}

// ==================== MY APPLICATIONS ====================
async function loadMyApplications(container) {
  try {
    const apps = await api.get("/applications/seller");
    const list = Array.isArray(apps) ? apps : apps?.data || [];
    container.innerHTML = `
      <div class="dash-page">
      <div class="dash-page-head">
        <h1 class="dash-page-title">Lamaran Saya</h1>
        <p class="dash-page-sub">Lacak status lamaran kerja yang Anda kirim</p>
      </div>
      ${list.length === 0 ? empty("Belum ada lamaran", "Mulai lamar pekerjaan di halaman Cari Kerja.", "fa-file-circle-check") : ""}
      <div class="grid" style="grid-template-columns:1fr; gap:12px;">
        ${list.map((a) => `
          <div class="card card-pad" data-testid="application-${a.id}">
            <div class="flex-between" style="align-items:flex-start; gap:1rem;">
              <div style="flex:1; min-width:0;">
                <div class="flex gap-sm mb-1">${statusPill(a.status)}<span class="text-xs text-muted">${a.createdAt ? new Date(a.createdAt).toLocaleDateString("id-ID") : ""}</span></div>
                <h3 style="margin:.2rem 0;"><a href="#/jobs/${a.jobId}" style="color:inherit; text-decoration:none;">${escape(a.job?.title || "Pekerjaan")}</a></h3>
                <div class="text-sm text-muted" style="margin-bottom:.5rem;">${escape((a.coverLetter || "").slice(0, 160))}${(a.coverLetter || "").length > 160 ? "…" : ""}</div>
                <div class="flex gap-md text-sm">
                  <span><i class="fa-solid fa-money-bill-wave"></i> ${fmtIDR(a.proposedPrice)}</span>
                  <span><i class="fa-solid fa-clock"></i> ${a.proposedDuration} hari</span>
                </div>
              </div>
              <div class="flex gap-sm" style="flex-direction:column; align-items:stretch;">
                <a class="btn btn-secondary btn-sm" href="#/jobs/${a.jobId}">Lihat Pekerjaan</a>
                ${a.status === "ACCEPTED" ? `<a class="btn btn-primary btn-sm" href="#/orders?role=SELLER">Upload Bukti Kerja</a>` : ""}
              </div>
            </div>
          </div>`).join("")}
      </div>
      </div>`;
  } catch (e) {
    container.innerHTML = empty("Gagal memuat lamaran", e.message);
  }
}

async function loadOverview(container) {
  const u = store.getState().user;
  try {
    const [orders, stats, reviewsData] = await Promise.all([
      api.get("/orders"),
      api.get(`/users/${u.id}/stats`).catch(() => null),
      api.get(`/reviews/user/${u.id}`).catch(() => ({ all: [], asSeller: [], asBuyer: [] })),
    ]);
    const asBuyer = orders.filter((o) => o.buyerId === u.id);
    const asSeller = orders.filter((o) => o.sellerId === u.id);
    const completedBuyer = asBuyer.filter((o) => o.status === "COMPLETED");
    const completedSeller = asSeller.filter((o) => o.status === "COMPLETED");
    const buyerSpent = completedBuyer.reduce((s, o) => s + (o.amount || 0), 0);
    const sellerEarned = completedSeller.reduce((s, o) => s + (o.amount || 0) * 0.95, 0);
    const pendingBuyer = asBuyer.filter((o) =>
      ACTIVE_STATUSES.includes(String(o.status).toUpperCase()),
    ).length;
    const pendingSeller = asSeller.filter((o) =>
      ACTIVE_STATUSES.includes(String(o.status).toUpperCase()),
    ).length;
    const rating = Number(stats?.averageRating ?? u.rating ?? 0).toFixed(1);
    const reviewCount = Number(stats?.reviewCount ?? u.reviewCount ?? 0);
    const recentReviews = (reviewsData?.all || []).slice(0, 4);

    const earningSeries = buildMonthlySeries(completedSeller, "earnings");
    const buyerOrderSeries = buildMonthlySeries(asBuyer, "count");
    const hasEarnings = earningSeries.some((m) => m.value > 0);
    const hasBuyerOrders = buyerOrderSeries.some((m) => m.value > 0);

    container.innerHTML = `
      <div class="dash-page dash-page--overview">
      <div class="dash-page-head">
        <h1 class="dash-page-title">Halo, ${escape(u.name.split(" ")[0])}! <span aria-hidden="true">👋</span></h1>
        <p class="dash-page-sub">Ringkasan aktivitas Anda</p>
      </div>
      <div class="kpis kpis--overview kpis--compact">
        <div class="kpi-row kpi-row--primary">
          <div class="kpi kpi--highlight" data-testid="kpi-spent">
            <div class="ic kpi-ic-green"><i class="fa-solid fa-money-bill-wave"></i></div>
            <div class="v">${fmtIDR(buyerSpent)}</div>
            <div class="l">Total Belanja</div>
          </div>
          <div class="kpi kpi--highlight" data-testid="kpi-earned">
            <div class="ic kpi-ic-purple"><i class="fa-solid fa-coins"></i></div>
            <div class="v">${fmtIDR(sellerEarned)}</div>
            <div class="l">Penghasilan (Penjual)</div>
          </div>
        </div>
        <div class="kpi-row kpi-row--secondary">
          <div class="kpi" data-testid="kpi-completed-buyer">
            <div class="ic kpi-ic-blue"><i class="fa-solid fa-bag-shopping"></i></div>
            <div class="v">${completedBuyer.length}</div>
            <div class="l">Selesai (Pembeli)</div>
          </div>
          <div class="kpi" data-testid="kpi-rating">
            <div class="ic kpi-ic-gold"><i class="fa-solid fa-star"></i></div>
            <div class="v">${rating}</div>
            <div class="l">Rating · ${reviewCount} ulasan</div>
          </div>
          <div class="kpi" data-testid="kpi-pending">
            <div class="ic kpi-ic-amber"><i class="fa-solid fa-hourglass-half"></i></div>
            <div class="v">${pendingBuyer + pendingSeller}</div>
            <div class="l">Pesanan Aktif</div>
          </div>
        </div>
      </div>
      <div class="dash-charts-grid">
        <div class="card card-pad dash-chart-card">
          <h3 class="dash-chart-title"><i class="fa-solid fa-chart-column"></i> Pendapatan 6 Bulan</h3>
          ${hasEarnings ? svgBarChart(earningSeries, { height: 140, barColor: "#2e7d32", valueFormatter: (v) => (v >= 1000 ? Math.round(v / 1000) + "k" : v) }) : `<p class="dash-chart-empty">Belum ada pendapatan</p>`}
        </div>
        <div class="card card-pad dash-chart-card">
          <h3 class="dash-chart-title"><i class="fa-solid fa-chart-simple"></i> Pesanan 6 Bulan</h3>
          ${hasBuyerOrders ? svgBarChart(buyerOrderSeries, { height: 140, barColor: "#0a66c2" }) : `<p class="dash-chart-empty">Belum ada pesanan</p>`}
        </div>
      </div>
      <div class="card card-pad dash-recent-card">
        <div class="dash-recent-head">
          <h3 class="dash-chart-title">Pesanan Terbaru</h3>
          <a class="btn btn-secondary btn-sm" href="#/dashboard/transactions">Lihat semua</a>
        </div>
        ${
          orders.slice(0, 4).length
            ? `<div class="dash-recent-list">${orders
            .slice(0, 4)
            .map(
              (o) => `
            <a class="dash-recent-item" href="#/orders/${o.id}" data-testid="recent-order-${o.id}">
              <div class="dash-recent-item-main">
                <strong>${escape(o.title)}</strong>
                <span class="text-sm text-muted">${o.buyerId === u.id ? "Pembeli" : "Penjual"} · ${fmtIDR(o.amount)}</span>
              </div>
              ${statusPill(o.status)}
            </a>`,
            )
            .join("")}</div>`
            : empty("Belum ada pesanan", "Mulai dari Cari Jasa atau Cari Kerja", "fa-receipt")
        }
      </div>
      <div class="card card-pad dash-recent-card" id="dash-reviews-card">
        <div class="dash-recent-head">
          <h3 class="dash-chart-title"><i class="fa-solid fa-star"></i> Ulasan untuk Anda</h3>
          <a class="btn btn-secondary btn-sm" href="#/profile">Lihat profil</a>
        </div>
        ${
          recentReviews.length
            ? `<div class="dash-reviews-list">${recentReviews
                .map((r) => {
                  const reviewer = r.reviewer || { name: "Pengguna" };
                  const comment = (r.comment || "").trim();
                  return `<article class="dash-review-item">
                    <div class="dash-review-head">
                      ${avatar(reviewer, "sm")}
                      <div>
                        <strong>${escape(reviewer.name || "Pengguna")}</strong>
                        <div class="dash-review-stars">${stars(r.rating || 5)}</div>
                      </div>
                    </div>
                    ${comment ? `<p class="dash-review-comment">${escape(comment.slice(0, 140))}${comment.length > 140 ? "…" : ""}</p>` : ""}
                  </article>`;
                })
                .join("")}</div>`
            : empty("Belum ada ulasan", "Selesaikan transaksi dan terima ulasan dari lawan transaksi.", "fa-star")
        }
      </div>
      </div>
    `;

    const onReviewsUpdated = (e) => {
      if (e.detail?.userId === u.id) loadOverview(container);
    };
    window.addEventListener("reviews-updated", onReviewsUpdated);
  } catch (e) {
    container.innerHTML = empty("Gagal memuat", e.message);
  }
}

async function loadTransactions(container) {
  const u = store.getState().user;
  try {
    const [buyerOrders, sellerOrders] = await Promise.all([
      api.get("/orders?role=buyer"),
      api.get("/orders?role=seller"),
    ]);

    container.innerHTML = `
      <div class="dash-page">
      <div class="dash-page-head">
        <h1 class="dash-page-title">Transaksi</h1>
        <p class="dash-page-sub">Semua pesanan sebagai pembeli dan penjual</p>
      </div>
      <div class="dash-tabs">
          <button class="dash-tab active" data-tab="buyer">
            <i class="fa-solid fa-shopping-cart"></i> Pembeli (${buyerOrders.length})
          </button>
          <button class="dash-tab" data-tab="seller">
            <i class="fa-solid fa-store"></i> Penjual (${sellerOrders.length})
          </button>
        </div>
        <div id="buyer-orders" class="trans-content">
          ${
            buyerOrders.length
              ? `
            <div class="scroll-x"><table class="tbl">
              <thead><tr><th>Order</th><th>Status</th><th>Total</th><th></th></tr></thead>
              <tbody>${buyerOrders
                .map(
                  (x) => `
                <tr>
                  <td>${escape(x.title)}</td>
                  <td>${statusPill(x.status)}</td>
                  <td>${fmtIDR(x.amount)}</td>
                  <td><a class="btn btn-secondary btn-sm" href="#/orders/${x.id}">Detail</a></td>
                </tr>
              `,
                )
                .join("")}</tbody>
            </table></div>
          `
              : empty("Belum ada pesanan sebagai pembeli")
          }
        </div>
        <div id="seller-orders" class="trans-content" hidden>
          ${
            sellerOrders.length
              ? `
            <div class="scroll-x"><table class="tbl">
              <thead><tr><th>Order</th><th>Pembeli</th><th>Status</th><th>Total</th><th></th></tr></thead>
              <tbody>${sellerOrders
                .map(
                  (x) => `
                <tr>
                  <td>${escape(x.title)}</td>
                  <td>${escape(x.buyer?.name)}</td>
                  <td>${statusPill(x.status)}</td>
                  <td>${fmtIDR(x.amount)}</td>
                  <td><a class="btn btn-secondary btn-sm" href="#/orders/${x.id}">Kelola</a></td>
                </tr>
              `,
                )
                .join("")}</tbody>
            </table></div>
          `
              : empty("Belum ada pesanan sebagai penjual")
          }
        </div>
      </div>
    `;

    const tabs = container.querySelectorAll(".dash-tab");
    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const target = tab.dataset.tab;
        tabs.forEach((t) => t.classList.remove("active"));
        tab.classList.add("active");
        const buyerDiv = container.querySelector("#buyer-orders");
        const sellerDiv = container.querySelector("#seller-orders");
        if (buyerDiv) buyerDiv.hidden = target !== "buyer";
        if (sellerDiv) sellerDiv.hidden = target !== "seller";
      });
    });
  } catch (e) {
    container.innerHTML = empty("Gagal", e.message);
  }
}

async function loadManageServices(container, opts = {}) {
  await loadSellerServices(container, opts);
}

async function loadManageJobs(container, opts = {}) {
  await loadBuyerJobs(container, opts);
}

async function loadFavorites(container) {
  try {
    const favs = await api.get("/favorites");
    container.innerHTML = `
      <div class="dash-page">
      <div class="dash-page-head">
        <h1 class="dash-page-title">Favorit</h1>
        <p class="dash-page-sub">Jasa yang Anda simpan dari marketplace</p>
      </div>
      ${favs.length ? `<div class="marketplace-grid" id="fav-grid">${favs.map((s) => serviceCard(s, { favorited: true })).join("")}</div>` : empty("Belum ada favorit", "Tambahkan jasa ke favorit dari marketplace")}
      </div>
    `;
    const grid = container.querySelector("#fav-grid");
    if (grid) {
      bindFavoriteButtons(grid, favs.map((s) => s.id));
      grid.addEventListener("fav-changed", (e) => {
        const { serviceId, favorited } = e.detail || {};
        if (favorited) return;
        grid.querySelector(`[data-testid="service-card-${serviceId}"]`)?.remove();
        if (!grid.querySelector(".service-card")) {
          grid.outerHTML = empty("Belum ada favorit", "Tambahkan jasa ke favorit dari marketplace");
        }
      });
    }
  } catch (e) {
    container.innerHTML = empty("Gagal", e.message);
  }
}

async function loadEarnings(container) {
  try {
    const o = await api.get("/orders?role=seller");
    const done = o.filter((x) => x.status === "COMPLETED");
    const pending = o.filter((x) =>
      ACTIVE_STATUSES.includes(String(x.status).toUpperCase()),
    );
    const total = done.reduce((s, x) => s + (x.amount || 0) * 0.95, 0);
    container.innerHTML = `
      <div class="dash-page">
      <div class="dash-page-head">
        <h1 class="dash-page-title">Keuangan</h1>
        <p class="dash-page-sub">Saldo penghasilan dan penarikan dana</p>
      </div>
      <div class="kpis kpis--compact kpi-row kpi-row--secondary" style="grid-template-columns:repeat(3,1fr)">
        <div class="kpi">
          <div class="ic kpi-ic-green"><i class="fa-solid fa-wallet"></i></div>
          <div class="v">${fmtIDR(total)}</div>
          <div class="l">Saldo Tersedia</div>
        </div>
        <div class="kpi">
          <div class="ic kpi-ic-amber"><i class="fa-solid fa-hourglass"></i></div>
          <div class="v">${fmtIDR(pending.reduce((s, x) => s + (x.amount || 0) * 0.95, 0))}</div>
          <div class="l">Pending</div>
        </div>
        <div class="kpi">
          <div class="ic kpi-ic-blue"><i class="fa-solid fa-trophy"></i></div>
          <div class="v">${done.length}</div>
          <div class="l">Pesanan Selesai</div>
        </div>
      </div>
      <div class="card card-pad-lg dash-withdraw-card">
        <div><h3>Tarik Penghasilan</h3><p class="text-muted text-sm">Withdraw ke rekening bank terverifikasi</p></div>
        <button class="btn btn-primary" onclick="window.dispatchEvent(new CustomEvent('toast', {detail: {type: 'info', text: 'Permintaan penarikan sedang diproses — hubungi support jika perlu bantuan'}}))">
          <i class="fa-solid fa-money-bill-transfer"></i> Tarik Sekarang
        </button>
      </div>
      </div>
    `;
  } catch (e) {
    container.innerHTML = empty("Gagal", e.message);
  }
}

// ==================== LOAD BUYER JOBS ====================
async function loadBuyerJobs(container, opts = {}) {
  const u = store.getState().user;

  container.innerHTML = `
    <div class="dash-page">
    <div class="dash-page-head dash-page-head--row">
      <div><h1 class="dash-page-title">Kelola Lowongan</h1><p class="dash-page-sub">Lowongan kerja yang Anda pasang</p></div>
      <button class="btn btn-primary" id="dash-post-job-btn" data-testid="dash-post-job"><i class="fa-solid fa-plus"></i> Pasang Lowongan</button>
    </div>
    <div id="jobs-list" class="flex-col"></div>
    <div id="job-form-container" style="display:none; margin-top:24px;"></div>
    </div>
  `;

  const listEl = container.querySelector("#jobs-list");
  const formContainer = container.querySelector("#job-form-container");
  const addBtn = container.querySelector("#dash-post-job-btn");
  let isFormVisible = false;

  const closeForm = () => {
    if (formContainer) {
      formContainer.style.display = "none";
      formContainer.innerHTML = "";
    }
    if (listEl) listEl.style.display = "";
    if (addBtn) addBtn.style.display = "";
    isFormVisible = false;
    if (location.hash.includes("/dashboard/manage-jobs/")) {
      history.replaceState(null, "", "#/dashboard/manage-jobs");
    }
  };

  const openJobForm = async (mode = "create", existingId = null) => {
    if (isFormVisible) return;
    const cats = await api.get("/categories");
    let existing = null;
    if (mode === "edit" && existingId) {
      try { existing = await api.get(`/jobs/${existingId}`); } catch (_) {
        toast("Lowongan tidak ditemukan", "error");
        return;
      }
    }
    const today = new Date().toISOString().split("T")[0];
    const deadlineISO = existing?.deadline ? new Date(existing.deadline).toISOString().split("T")[0] : "";
    const jobInitialType = existing
      ? resolveInitialServiceType(cats, {
          categoryId: existing.categoryId,
          isOnline: existing.isOnline,
          location: existing.location,
        })
      : "";
    const jobInitialLocation =
      jobInitialType === "PHYSICAL" ? matchPostCityValue(existing?.location) : "";

    formContainer.innerHTML = `
      <div class="card card-pad-lg" style="background:#fff;">
        <div class="flex-between" style="margin-bottom:20px;">
          <h3 style="margin:0;"><i class="fa-solid ${mode === "edit" ? "fa-pen" : "fa-plus-circle"}"></i> ${mode === "edit" ? "Edit Lowongan" : "Pasang Lowongan Baru"}</h3>
          <button class="btn btn-ghost btn-sm" id="close-job-form" data-testid="close-job-form"><i class="fa-solid fa-xmark"></i> Batal</button>
        </div>
        <form id="job-form" data-testid="dash-job-form">
          <div class="form-group"><label class="label">Judul Lowongan *</label><input class="input" id="j-title" required minlength="5" value="${escape(existing?.title || "")}" placeholder="Contoh: Desainer Grafis untuk Brosur" data-testid="dash-job-title"></div>
          ${postTypeLocationFieldsHtml({
            typeFieldId: "j-serviceType",
            categoryFieldId: "j-category",
            locationFieldId: "j-loc",
            remoteFieldId: "j-remote",
            categoryTestId: "dash-job-category",
            typeLabel: "Jenis Pekerjaan",
            categoryLabel: "Sub-kategori",
            locationLabel: "Lokasi",
            initialType: jobInitialType,
            initialLocation: jobInitialLocation,
          })}
          <div class="form-group"><label class="label">Deskripsi Lengkap *</label><textarea class="textarea" id="j-desc" rows="5" required minlength="20" placeholder="Jelaskan kebutuhan, deliverable, dan ekspektasi…" data-testid="dash-job-desc">${escape(existing?.description || "")}</textarea></div>
          <div class="grid grid-2">
            <div class="form-group"><label class="label">Budget *</label><input class="input" id="j-budget" type="text" required inputmode="numeric" value="${existing?.budget ? "Rp " + Number(existing.budget).toLocaleString("id-ID") : ""}" placeholder="Rp 500.000" data-testid="dash-job-budget"></div>
            <div class="form-group"><label class="label">Deadline</label><input class="input" id="j-deadline" type="date" min="${today}" value="${deadlineISO}" data-testid="dash-job-deadline"></div>
          </div>
          <div style="display:flex; gap:12px; justify-content:flex-end; margin-top:24px;">
            <button type="button" class="btn btn-secondary" id="cancel-job-form">Batal</button>
            <button class="btn btn-primary" type="submit" data-testid="dash-job-submit"><i class="fa-solid fa-paper-plane"></i> ${mode === "edit" ? "Update Lowongan" : "Pasang Sekarang"}</button>
          </div>
        </form>
      </div>
    `;
    formContainer.style.display = "block";
    if (listEl) listEl.style.display = "none";
    if (addBtn) addBtn.style.display = "none";
    isFormVisible = true;

    formContainer.querySelector("#close-job-form")?.addEventListener("click", closeForm);
    formContainer.querySelector("#cancel-job-form")?.addEventListener("click", closeForm);

    bindRupiahInput(formContainer.querySelector("#j-budget"));
    initPostTypeLocationForm(formContainer, {
      categories: cats,
      typeFieldId: "j-serviceType",
      categoryFieldId: "j-category",
      locationFieldId: "j-loc",
      initial: {
        serviceType: jobInitialType,
        categoryId: existing?.categoryId || "",
        location: existing?.location || "",
      },
    });

    formContainer.querySelector("#job-form").addEventListener("submit", async (e) => {
      e.preventDefault();
      const title = formContainer.querySelector("#j-title").value.trim();
      const typeLoc = readPostTypeLocation(formContainer, {
        typeFieldId: "j-serviceType",
        categoryFieldId: "j-category",
        locationFieldId: "j-loc",
      });
      const categoryId = typeLoc.categoryId;
      const description = formContainer.querySelector("#j-desc").value.trim();
      const budget = parseIDRInput(formContainer.querySelector("#j-budget").value);
      const deadline = formContainer.querySelector("#j-deadline").value || null;

      const typeErr = validatePostTypeLocation(typeLoc, "pekerjaan");
      if (typeErr) return toast(typeErr, "error");

      if (title.length < 5) return toast("Judul minimal 5 karakter", "error");
      if (!categoryId) return toast("Pilih sub-kategori", "error");
      if (description.length < 20) return toast("Deskripsi minimal 20 karakter", "error");
      if (!budget || budget < 10000) return toast("Budget minimal Rp 10.000", "error");

      const submitBtn = formContainer.querySelector("[type=submit]");
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Menyimpan…';

      try {
        const payload = {
          title,
          categoryId,
          description,
          budget,
          location: typeLoc.location,
          isOnline: typeLoc.isOnline,
          deadline,
        };
        if (mode === "edit" && existingId) {
          await api.put(`/jobs/${existingId}`, payload);
          toast("Lowongan diperbarui", "success");
        } else {
          await api.post("/jobs", payload);
          toast("Lowongan terpasang", "success");
        }
        closeForm();
        await reloadList();
      } catch (err) {
        toast(err.message || "Gagal menyimpan lowongan", "error");
        submitBtn.disabled = false;
        submitBtn.innerHTML = mode === "edit" ? "Update Lowongan" : "Pasang Sekarang";
      }
    });
  };

  const reloadList = async () => {
    try {
      const jr = await api.get("/jobs?buyerId=" + u.id);
      const j = Array.isArray(jr) ? jr : jr.data || [];
      listEl.innerHTML = j.length
        ? j.map((x) => `
          <div class="card card-pad" data-testid="job-${x.id}">
            <div class="flex-between">
              <div style="flex:1; min-width:0;">
                <div class="flex gap-sm mb-1">${statusPill(x.status)}<span class="text-xs text-muted">${x.createdAt ? new Date(x.createdAt).toLocaleDateString("id-ID") : ""}</span></div>
                <h3 style="margin:0">${escape(x.title)}</h3>
                <div class="text-sm text-muted">${escape(typeof x.category === "object" ? x.category?.name : x.category || "")} · ${fmtIDR(x.budget)}</div>
              </div>
            </div>
            <div class="flex gap-sm mt-2">
              <a class="btn btn-secondary btn-sm" href="#/jobs/${x.id}?tab=applications" data-testid="view-job-${x.id}"><i class="fa-solid fa-eye"></i> Lihat (${x.applicationsCount || x.applicationCount || 0} pelamar)</a>
              <a class="btn btn-ghost btn-sm" href="#/dashboard/manage-jobs/edit/${x.id}" data-testid="edit-job-${x.id}"><i class="fa-solid fa-pen"></i> Edit</a>
              <button class="btn btn-danger btn-sm" data-del-job="${x.id}" data-testid="del-job-${x.id}"><i class="fa-solid fa-trash"></i> Hapus</button>
            </div>
          </div>`).join("")
        : empty("Belum ada lowongan", "Buat lowongan baru dan tunggu lamaran dari freelancer.", "fa-folder-open");

      listEl.querySelectorAll("[data-del-job]").forEach((b) =>
        b.addEventListener("click", () =>
          confirmModal("Hapus lowongan ini? Lamaran terkait akan ikut hilang.", async () => {
            try {
              await api.del("/jobs/" + b.dataset.delJob);
              toast("Lowongan dihapus", "success");
              await reloadList();
            } catch (err) { toast(err.message, "error"); }
          })),
      );
    } catch (e) {
      listEl.innerHTML = empty("Gagal memuat", e.message);
    }
  };

  if (addBtn) {
    addBtn.addEventListener("click", (e) => {
      e.preventDefault();
      history.pushState(null, "", "#/dashboard/manage-jobs/new");
      openJobForm("create");
    });
  }

  await reloadList();

  // Auto-open form when sub-route matches
  if (opts.openForm === "create") {
    await openJobForm("create");
  } else if (opts.openForm === "edit" && opts.id) {
    await openJobForm("edit", opts.id);
  }
}

// ==================== LOAD SELLER SERVICES (DIPERBAIKI) ====================
// ==================== LOAD SELLER SERVICES (FIXED) ====================
async function loadSellerServices(container, opts = {}) {
  const u = store.getState().user;

  // Render directly into the live container so event listeners are preserved.
  container.innerHTML = `
    <div class="dash-page">
    <div class="dash-page-head dash-page-head--row">
      <div><h1 class="dash-page-title">Kelola Jasa</h1><p class="dash-page-sub">Jasa yang Anda tawarkan di marketplace</p></div>
      <button class="btn btn-primary" id="add-svc" data-testid="add-service-btn"><i class="fa-solid fa-plus"></i> Tambah Jasa</button>
    </div>
    <div id="svc-list" class="marketplace-grid"></div>
    <div id="service-form-container" style="display:none; margin-top:24px;"></div>
    </div>
  `;

  const svcListContainer = container.querySelector("#svc-list");
  const formContainer = container.querySelector("#service-form-container");
  const addBtn = container.querySelector("#add-svc");

  let isFormVisible = false;

  const closeForm = () => {
    if (formContainer) {
      formContainer.style.display = "none";
      formContainer.innerHTML = "";
    }
    if (svcListContainer) svcListContainer.style.display = "grid";
    if (addBtn) addBtn.style.display = "";
    isFormVisible = false;
    if (location.hash.includes("/dashboard/manage-services/")) {
      history.replaceState(null, "", "#/dashboard/manage-services");
    }
  };

  const showEditServiceForm = async (serviceId, currentData) => {
    const cats = await api.get("/categories");
    const svcInitialType = resolveInitialServiceType(cats, {
      categoryId: currentData.categoryId,
      isRemote: currentData.isRemote,
      location: currentData.location,
    });
    const svcInitialLocation =
      svcInitialType === "PHYSICAL" ? matchPostCityValue(currentData.location) : "";

    formContainer.innerHTML = `
      <div class="card card-pad-lg" style="background:#fff; border-radius:20px; padding:24px;">
        <div class="flex-between" style="margin-bottom:20px;">
          <h3 style="margin:0"><i class="fa-solid fa-pen"></i> Edit Jasa</h3>
          <button class="btn btn-ghost btn-sm" id="close-service-form" data-testid="close-edit-service"><i class="fa-solid fa-xmark"></i> Batal</button>
        </div>
        <form id="service-form">
          <div class="form-group"><label class="label">Judul Jasa *</label><input class="input" id="title" required value="${escape(currentData.title || "")}" data-testid="edit-svc-title"></div>
          ${postTypeLocationFieldsHtml({
            categoryFieldId: "categoryId",
            categoryTestId: "edit-svc-category",
            typeLabel: "Jenis Jasa",
            categoryLabel: "Sub-kategori",
            locationLabel: "Lokasi",
            initialType: svcInitialType,
            initialLocation: svcInitialLocation,
          })}
          <div class="form-group"><label class="label">Deskripsi *</label><textarea class="textarea" id="description" rows="5" required data-testid="edit-svc-desc">${escape(currentData.description || "")}</textarea></div>
          <div class="grid grid-2">
            <div class="form-group"><label class="label">Harga *</label><input class="input" id="price" type="text" required inputmode="numeric" value="${currentData.price ? "Rp " + Number(currentData.price).toLocaleString("id-ID") : ""}" placeholder="Rp 150.000" data-testid="edit-svc-price"></div>
            <div class="form-group"><label class="label">Hari Pengerjaan *</label><input class="input" id="deliveryTime" type="number" required min="1" max="30" value="${currentData.deliveryTime || ""}" data-testid="edit-svc-days"></div>
          </div>
          <div class="form-group">
            <label class="label">Foto Portofolio Jasa *</label>
            ${serviceImagesFieldHtml(getServiceAllImages(currentData))}
          </div>
          <div style="display:flex; gap:12px; justify-content:flex-end;">
            <button type="button" class="btn btn-secondary" id="cancel-service-form">Batal</button>
            <button class="btn btn-primary" type="submit" data-testid="submit-edit-service">Update Jasa</button>
          </div>
        </form>
      </div>
    `;

    formContainer.style.display = "block";
    svcListContainer.style.display = "none";
    if (addBtn) addBtn.style.display = "none";
    isFormVisible = true;

    initServiceImagesField(formContainer, getServiceAllImages(currentData));
    bindRupiahInput(formContainer.querySelector("#price"));
    initPostTypeLocationForm(formContainer, {
      categories: cats,
      initial: {
        serviceType: svcInitialType,
        categoryId: currentData.categoryId || "",
        location: currentData.location || "",
      },
    });

    const serviceForm = formContainer.querySelector("#service-form");
    formContainer.querySelector("#cancel-service-form")?.addEventListener("click", closeForm);
    formContainer.querySelector("#close-service-form")?.addEventListener("click", closeForm);

    serviceForm?.addEventListener("submit", async (e) => {
      e.preventDefault();
      const title = formContainer.querySelector("#title")?.value.trim();
      const typeLoc = readPostTypeLocation(formContainer);
      const categoryId = typeLoc.categoryId;
      const description = formContainer.querySelector("#description")?.value.trim();
      const price = parseIDRInput(formContainer.querySelector("#price")?.value);
      const deliveryTime = parseInt(formContainer.querySelector("#deliveryTime")?.value);
      const images = getServiceImagesValue(formContainer);
      if (!images.length) return toast("Upload minimal 1 foto portofolio", "error");

      const typeErr = validatePostTypeLocation(typeLoc, "jasa");
      if (typeErr) return toast(typeErr, "error");

      if (!title || title.length < 5) return toast("Judul minimal 5 karakter", "error");
      if (!description || description.length < 20) return toast("Deskripsi minimal 20 karakter", "error");
      if (!price || isNaN(price) || price < 10000) return toast("Harga minimal Rp 10.000", "error");
      if (!deliveryTime || isNaN(deliveryTime) || deliveryTime < 1 || deliveryTime > 30)
        return toast("Hari pengerjaan harus 1-30 hari", "error");

      const submitBtn = serviceForm.querySelector("[type=submit]");
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Mengupdate...';
      }

      try {
        await api.put(`/services/${serviceId}`, {
          title, categoryId, description, price, deliveryTime, images,
          location: typeLoc.location,
        });
        toast("Jasa berhasil diupdate", "success");
        closeForm();
        await load();
      } catch (err) {
        toast(err.message || "Gagal mengupdate jasa", "error");
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = "Update Jasa";
        }
      }
    });
  };

  const showCreateServiceForm = async () => {
    if (isFormVisible) {
      closeForm();
      return;
    }

    const cats = await api.get("/categories");

    formContainer.innerHTML = `
      <div class="card card-pad-lg" style="background:#fff; border-radius:20px; padding:24px;">
        <div class="flex-between" style="margin-bottom:20px;">
          <h3 style="margin:0"><i class="fa-solid fa-plus-circle"></i> Buat Jasa Baru</h3>
          <button class="btn btn-ghost btn-sm" id="close-service-form" data-testid="close-create-service"><i class="fa-solid fa-xmark"></i> Batal</button>
        </div>
        <form id="service-form">
          <div class="form-group"><label class="label">Judul Jasa *</label><input class="input" id="title" required placeholder="Contoh: Desain Logo Profesional" data-testid="create-svc-title"></div>
          ${postTypeLocationFieldsHtml({
            categoryFieldId: "categoryId",
            categoryTestId: "create-svc-category",
            typeLabel: "Jenis Jasa",
            categoryLabel: "Sub-kategori",
            locationLabel: "Lokasi",
          })}
          <div class="form-group"><label class="label">Deskripsi Jasa *</label><textarea class="textarea" id="description" rows="5" required placeholder="Jelaskan detail jasa yang Anda tawarkan..." data-testid="create-svc-desc"></textarea></div>
          <div class="grid grid-2">
            <div class="form-group"><label class="label">Harga *</label><input class="input" id="price" type="text" required inputmode="numeric" placeholder="Rp 150.000" data-testid="create-svc-price"></div>
            <div class="form-group"><label class="label">Hari Pengerjaan *</label><input class="input" id="deliveryTime" type="number" required min="1" max="30" placeholder="3" data-testid="create-svc-days"></div>
          </div>
          <div class="form-group">
            <label class="label">Foto Portofolio Jasa *</label>
            ${serviceImagesFieldHtml()}
          </div>
          <div style="display:flex; gap:12px; justify-content:flex-end;">
            <button type="button" class="btn btn-secondary" id="cancel-service-form">Batal</button>
            <button class="btn btn-primary" type="submit" data-testid="submit-create-service">Simpan Jasa</button>
          </div>
        </form>
      </div>
    `;

    formContainer.style.display = "block";
    svcListContainer.style.display = "none";
    if (addBtn) addBtn.style.display = "none";
    isFormVisible = true;

    initServiceImagesField(formContainer);
    bindRupiahInput(formContainer.querySelector("#price"));
    initPostTypeLocationForm(formContainer, { categories: cats });

    const serviceForm = formContainer.querySelector("#service-form");
    formContainer.querySelector("#cancel-service-form")?.addEventListener("click", closeForm);
    formContainer.querySelector("#close-service-form")?.addEventListener("click", closeForm);

    serviceForm?.addEventListener("submit", async (e) => {
      e.preventDefault();
      const title = formContainer.querySelector("#title")?.value.trim();
      const typeLoc = readPostTypeLocation(formContainer);
      const categoryId = typeLoc.categoryId;
      const description = formContainer.querySelector("#description")?.value.trim();
      const price = parseIDRInput(formContainer.querySelector("#price")?.value);
      const deliveryTime = parseInt(formContainer.querySelector("#deliveryTime")?.value);
      const images = getServiceImagesValue(formContainer);
      if (!images.length) return toast("Upload minimal 1 foto portofolio", "error");

      const typeErr = validatePostTypeLocation(typeLoc, "jasa");
      if (typeErr) return toast(typeErr, "error");

      if (!title || title.length < 5) return toast("Judul minimal 5 karakter", "error");
      if (!description || description.length < 20) return toast("Deskripsi minimal 20 karakter", "error");
      if (!price || isNaN(price) || price < 10000) return toast("Harga minimal Rp 10.000", "error");
      if (!deliveryTime || isNaN(deliveryTime) || deliveryTime < 1 || deliveryTime > 30)
        return toast("Hari pengerjaan harus 1-30 hari", "error");

      const submitBtn = serviceForm.querySelector("[type=submit]");
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Menyimpan...';
      }

      try {
        await api.post("/services", {
          title, categoryId, description, price, deliveryTime, images,
          location: typeLoc.location,
        });
        toast("Jasa berhasil dibuat", "success");
        closeForm();
        await load();
      } catch (err) {
        toast(err.message || "Gagal membuat jasa", "error");
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = "Simpan Jasa";
        }
      }
    });
  };

  const load = async () => {
    try {
      const svcsResp = await api.get("/services?sellerId=" + u.id);
      const svcs = Array.isArray(svcsResp) ? svcsResp : svcsResp.data || [];
      svcListContainer.innerHTML = svcs.length
        ? svcs.map((s) => `
          <div class="service-card" data-testid="service-card-${s.id}" style="background:#fff; border-radius:12px; overflow:hidden; box-shadow:0 1px 3px rgba(0,0,0,0.1);">
            <div class="thumb" style="height:160px;"><img src="${escape(serviceThumbUrl(s))}" style="width:100%; height:100%; object-fit:cover;"></div>
            <div class="body" style="padding:12px;">
              <div class="title" style="font-weight:600;">${escape(s.title)}</div>
              <div class="meta" style="display:flex; justify-content:space-between; margin:8px 0;">
                <span class="price" style="font-weight:700; color:#0a66c2;">${fmtIDR(s.price)}</span>
                <span>${s.isActive !== false ? '<span class="badge badge-success">Aktif</span>' : '<span class="badge">Nonaktif</span>'}</span>
              </div>
              <div class="flex gap-sm">
                <button class="btn btn-secondary btn-sm" data-edit="${s.id}" data-testid="edit-svc-${s.id}">Edit</button>
                <button class="btn btn-ghost btn-sm" data-toggle="${s.id}" data-testid="toggle-svc-${s.id}">${s.isActive !== false ? "Nonaktifkan" : "Aktifkan"}</button>
                <button class="btn btn-danger btn-sm" data-del="${s.id}" data-testid="delete-svc-${s.id}">Hapus</button>
              </div>
            </div>
          </div>
        `).join("")
        : empty("Belum ada jasa", "Klik 'Tambah Jasa' untuk memulai", "fa-box");

      svcListContainer.querySelectorAll("[data-del]").forEach((b) =>
        b.addEventListener("click", () =>
          confirmModal("Hapus jasa ini?", async () => {
            try {
              await api.del("/services/" + b.dataset.del);
              toast("Jasa dihapus", "success");
              await load();
            } catch (err) {
              toast(err.message, "error");
            }
          }),
        ),
      );

      svcListContainer.querySelectorAll("[data-toggle]").forEach((b) =>
        b.addEventListener("click", async () => {
          try {
            await api.post("/services/" + b.dataset.toggle + "/toggle-active");
            toast("Status jasa berubah", "success");
            await load();
          } catch (err) {
            toast(err.message, "error");
          }
        }),
      );

      svcListContainer.querySelectorAll("[data-edit]").forEach((b) =>
        b.addEventListener("click", async () => {
          try {
            const service = await api.get("/services/" + b.dataset.edit);
            history.pushState(null, "", "#/dashboard/manage-services/edit/" + b.dataset.edit);
            await showEditServiceForm(b.dataset.edit, service);
          } catch (err) {
            toast("Gagal memuat data jasa", "error");
          }
        }),
      );
    } catch (e) {
      svcListContainer.innerHTML = empty("Gagal memuat", e.message);
    }
  };

  // Add service button - attached directly to live DOM (listeners preserved)
  if (addBtn) {
    addBtn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      history.pushState(null, "", "#/dashboard/manage-services/new");
      showCreateServiceForm();
    });
  }

  await load();

  // Auto-open form when sub-route says so
  if (opts.openForm === "create") {
    await showCreateServiceForm();
  } else if (opts.openForm === "edit" && opts.id) {
    try {
      const svc = await api.get("/services/" + opts.id);
      await showEditServiceForm(opts.id, svc);
    } catch (err) {
      toast("Gagal memuat data jasa", "error");
    }
  }
}


// frontend/src/features/dashboard/DashboardPages.js

// Ganti DashboardOverview dengan ini:
// frontend/src/features/dashboard/DashboardPages.js

// ... semua import dan fungsi helper tetap sama sampai sebelum DashboardOverview ...

// ==================== DASHBOARD OVERVIEW (HANYA SATU) ====================

export async function DashboardOverview({ mount }) {
  // Always re-read section from URL hash — never rely on stale state
  let activeSection = "overview";
  const hashMatch = location.hash.match(/\/dashboard(?:\/([^/?]+))?(?:\/([^?]+))?/);
  if (hashMatch && hashMatch[1]) {
    activeSection = hashMatch[1];
  }

  mount.innerHTML = `<div class="container page dashboard-page"><div class="dash-wrap">${sidebar(activeSection)}<section class="dash-main"><div class="spinner"></div></section></div></div>`;
  dashboardContentContainer = mount.querySelector("section");
  await loadDashboardContent(activeSection, mount);
}

// Export untuk kompatibilitas router
export async function BuyerOrders({ mount }) {
  mount.innerHTML = `<div class="container page dashboard-page"><div class="dash-wrap">${sidebar("transactions")}<section class="dash-main"><div class="spinner"></div></section></div></div>`;
  await loadTransactions(mount.querySelector("section"));
}

export async function BuyerJobs({ mount }) {
  mount.innerHTML = `<div class="container page dashboard-page"><div class="dash-wrap">${sidebar("manage-jobs")}<section class="dash-main"><div class="spinner"></div></section></div></div>`;
  await loadManageJobs(mount.querySelector("section"));
}

export async function BuyerFavorites({ mount }) {
  mount.innerHTML = `<div class="container page dashboard-page"><div class="dash-wrap">${sidebar("favorites")}<section class="dash-main"><div class="spinner"></div></section></div></div>`;
  await loadFavorites(mount.querySelector("section"));
}

export async function SellerServices({ mount }) {
  mount.innerHTML = `<div class="container page dashboard-page"><div class="dash-wrap">${sidebar("manage-services")}<section class="dash-main"><div class="spinner"></div></section></div></div>`;
  await loadManageServices(mount.querySelector("section"));
}

export async function SellerOrders({ mount }) {
  mount.innerHTML = `<div class="container page dashboard-page"><div class="dash-wrap">${sidebar("transactions")}<section class="dash-main"><div class="spinner"></div></section></div></div>`;
  await loadTransactions(mount.querySelector("section"));
}

export async function SellerEarnings({ mount }) {
  mount.innerHTML = `<div class="container page dashboard-page"><div class="dash-wrap">${sidebar("earnings")}<section class="dash-main"><div class="spinner"></div></section></div></div>`;
  await loadEarnings(mount.querySelector("section"));
}
