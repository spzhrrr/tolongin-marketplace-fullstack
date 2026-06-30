// frontend/src/features/marketplace/MarketplacePages.js

import { api, resolveAssetUrl } from "../../shared/utils/api.js";
import {
  toast,
  escape,
  fmtIDR,
  timeAgo,
  bindRupiahInput,
  parseIDRInput,
} from "../../shared/utils/helpers.js";
import { store } from "../../app/store.js";
import { router } from "../../app/router.js";
import { avatar, serviceCard, empty, bindFavoriteButtons, categoryPlaceholder, serviceTypeBadge, parseServiceImages, resolveServiceImageUrl, serviceGalleryHtml, initServiceGallery, discoverPageHero } from "../../shared/ui/components.js";
import { initSearchFilterBar, getAdvSelectValue } from "../../shared/utils/search-filter-bar.js";

function interleaveByKey(items, keyFn) {
  const buckets = new Map();
  for (const item of items) {
    const k = keyFn(item) || "x";
    if (!buckets.has(k)) buckets.set(k, []);
    buckets.get(k).push(item);
  }
  const queues = [...buckets.values()];
  const out = [];
  while (queues.some((q) => q.length)) {
    for (const q of queues) {
      if (q.length) out.push(q.shift());
    }
  }
  return out;
}

export async function MarketplacePage({ mount, query }) {
  const u = store.getState().user;

  mount.innerHTML = `
    <div class="discover-page discover-page--services">
      <div class="discover-head discover-head--services">
        ${discoverPageHero({
          variant: "services",
          title: "Cari Jasa",
          subtitle:
            "Temukan jasa terbaik dari freelancer profesional terverifikasi — dari proyek digital hingga layanan fisik di kotamu.",
          eyebrowIcon: "fa-store",
          eyebrowLabel: "Marketplace Tolongin",
          ctaHtml:
            u && u.role !== "ADMIN"
              ? `<a href="#/post-service" class="btn btn-light discover-hero__cta" id="post-service-btn" data-testid="post-service-btn"><i class="fa-solid fa-plus"></i> Posting Jasa</a>`
              : "",
        })}
        <div class="container discover-head__bar">
          <div class="filter-sticky-shell" id="filter-sticky-shell"></div>
        </div>
      </div>
      <div class="container page discover-page__main">
        <div id="results" class="marketplace-grid" data-testid="services-grid"></div>
      </div>
    </div>`;

  document.getElementById("post-service-btn")?.addEventListener("click", (e) => {
    e.preventDefault();
    if (!store.getState().user) {
      toast("Silakan login dulu", "warning");
      return router.navigate("/login");
    }
    router.navigate("/post-service");
  });

  const cats = await api.get("/categories");
  const filterShell = document.getElementById("filter-sticky-shell");

  const filterBar = initSearchFilterBar({
    shellEl: filterShell,
    categories: cats,
    context: "services",
    initial: query,
    sortDefault: "newest",
    sortOptions: [
      { value: "newest", icon: "fa-clock", label: "Terbaru" },
      { value: "rating_desc", icon: "fa-star", label: "Rating tertinggi" },
      { value: "price_asc", icon: "fa-arrow-up-wide-short", label: "Harga terendah" },
      { value: "price_desc", icon: "fa-arrow-down-wide-short", label: "Harga tertinggi" },
    ],
    advancedHtml: `
      <div class="filter-advanced">
        <div class="filter-advanced-field">
          <label class="label" for="min">Harga (Rp)</label>
          <div class="filter-advanced-range">
            <input class="input" id="min" type="text" placeholder="Min" inputmode="numeric">
            <span>—</span>
            <input class="input" id="max" type="text" placeholder="Max" inputmode="numeric">
          </div>
        </div>
        <div class="filter-advanced-field">
          <label class="label" for="adv-min-rating">Rating min</label>
          <select class="select" id="adv-min-rating">
            <option value="">Semua</option>
            <option value="4.5">4.5★ ke atas</option>
            <option value="4">4★ ke atas</option>
            <option value="3">3★ ke atas</option>
          </select>
        </div>
        <div class="filter-advanced-field">
          <label class="label" for="adv-delivery">Pengerjaan max</label>
          <select class="select" id="adv-delivery">
            <option value="">Semua</option>
            <option value="1">≤ 1 hari</option>
            <option value="3">≤ 3 hari</option>
            <option value="7">≤ 7 hari</option>
          </select>
        </div>
      </div>`,
    getExtraTags: () => {
      const tags = [];
      const min = parseIDRInput(document.getElementById("min")?.value);
      const max = parseIDRInput(document.getElementById("max")?.value);
      const minRating = getAdvSelectValue("adv-min-rating");
      const delivery = getAdvSelectValue("adv-delivery");
      if (min) tags.push({ key: "min", label: `Min ${fmtIDR(min)}`, icon: "fa-coins" });
      if (max) tags.push({ key: "max", label: `Max ${fmtIDR(max)}`, icon: "fa-coins" });
      if (minRating) tags.push({ key: "minRating", label: `Rating ${minRating}★+`, icon: "fa-star" });
      if (delivery) tags.push({ key: "delivery", label: `≤${delivery} hari`, icon: "fa-clock" });
      return tags;
    },
    onClearTag: (key) => {
      if (key === "min") document.getElementById("min").value = "";
      if (key === "max") document.getElementById("max").value = "";
      if (key === "minRating") document.getElementById("adv-min-rating").value = "";
      if (key === "delivery") document.getElementById("adv-delivery").value = "";
    },
    onClearExtra: () => {
      ["min", "max"].forEach((id) => {
        const el = document.getElementById(id);
        if (el) el.value = "";
      });
      document.getElementById("adv-min-rating").value = "";
      document.getElementById("adv-delivery").value = "";
    },
    onChange: () => load(),
  });

  bindRupiahInput(document.getElementById("min"));
  bindRupiahInput(document.getElementById("max"));

  let favs = [];
  try {
    if (store.getState().token) {
      const favResponse = await api.get("/favorites");
      favs = favResponse.map((s) => s.id);
    }
  } catch (err) {
    console.warn("[marketplace] favorites load failed", err);
  }

  const bindCardEvents = (container) => bindFavoriteButtons(container, favs);

  const load = async () => {
    const params = new URLSearchParams();
    params.set("limit", "100");
    const q = filterBar.getQueryEl()?.value.trim() || "";
    const min = parseIDRInput(document.getElementById("min")?.value);
    const max = parseIDRInput(document.getElementById("max")?.value);
    if (q) params.set("q", q);
    const typeParams = filterBar.getParams();
    if (typeParams.serviceType) params.set("serviceType", typeParams.serviceType);
    if (typeParams.categoryId) params.set("categoryId", typeParams.categoryId);
    if (typeParams.location) params.set("location", typeParams.location);
    if (min) params.set("minPrice", min);
    if (max) params.set("maxPrice", max);
    const minRating = getAdvSelectValue("adv-min-rating");
    const delivery = getAdvSelectValue("adv-delivery");
    const sortBy = filterBar.getSort() || "";
    if (minRating) params.set("minRating", minRating);
    if (delivery) params.set("maxDeliveryDays", delivery);
    if (sortBy) params.set("sortBy", sortBy);

    const res = document.getElementById("results");
    if (!res) return;
    filterBar.setResultBadge("Memuat…");
    res.innerHTML = '<div class="spinner" style="grid-column:1/-1"></div>';

    try {
      const resp = await api.get("/services?" + params.toString());
      const raw = Array.isArray(resp) ? resp : resp.data || [];
      const items = interleaveByKey(raw, (s) => s.sellerId || s.seller?.id);

      if (!items.length) {
        res.innerHTML = empty(
          "Tidak ada jasa ditemukan",
          "Coba kata kunci lain atau ubah filter pencarian",
          "fa-magnifying-glass",
          '<button class="btn btn-primary mt-2" id="reset-empty">Reset Filter</button>',
        );
        document.getElementById("reset-empty")?.addEventListener("click", () => {
          filterBar.reset();
          ["min", "max"].forEach((id) => {
            const el = document.getElementById(id);
            if (el) el.value = "";
          });
          document.getElementById("adv-min-rating").value = "";
          document.getElementById("adv-delivery").value = "";
          load();
        });
        filterBar.setResultBadge("0 jasa", "empty");
        filterBar.refreshTags();
        return;
      }

      res.innerHTML = items
        .map((s) => serviceCard(s, { favorited: favs.includes(s.id) }))
        .join("");

      filterBar.setResultBadge(`${items.length} jasa ditemukan`);

      bindCardEvents(res);
      filterBar.refreshTags();
    } catch (err) {
      console.error("Load error:", err);
      filterBar.setResultBadge("Gagal memuat", "empty");
      res.innerHTML = empty(
        "Gagal memuat jasa",
        err.message || "Periksa koneksi Anda",
        "fa-circle-exclamation",
        '<button class="btn btn-primary mt-2" id="retry-load">Coba Lagi</button>',
      );
      document.getElementById("retry-load")?.addEventListener("click", load);
    }
  };

  load();
}

export async function ServiceDetailPage({ mount, params }) {
  mount.innerHTML = `<div class="container page"><div class="spinner"></div></div>`;

  try {
    const s = await api.get("/services/" + params.id);
    const u = store.getState().user;
    const isOwner = u && s.sellerId === u.id;
    const deliveryTime = s.deliveryTime
      ? `${s.deliveryTime} hari pengerjaan`
      : "Fleksibel";
    const rating = s.rating || 0;
    const reviewCount = s.reviewCount || 0;
    const imageUrls = parseServiceImages(s).map(resolveServiceImageUrl).filter(Boolean);
    const catName = s.category?.name || s.category || "Umum";
    const catObj = s.category && typeof s.category === "object" ? s.category : { name: catName };
    const placeholderHtml = categoryPlaceholder(catObj, {
      serviceType: s.isRemote === false ? "PHYSICAL" : "DIGITAL",
    });
    const galleryInner = serviceGalleryHtml(parseServiceImages(s), {
      alt: s.title,
      placeholderHtml,
    });
    const isRemote = s.isRemote === true || s.location === "Remote";

    let serviceOrders = [];
    if (u) {
      try {
        const endpoint = isOwner ? "/orders?role=SELLER" : "/orders/buyer";
        const raw = await api.get(endpoint);
        const list = Array.isArray(raw) ? raw : raw.data || [];
        serviceOrders = list.filter((ord) => ord.serviceId === s.id);
      } catch (_) {
        serviceOrders = [];
      }
    }
    const completedOrders = serviceOrders.filter(
      (ord) => String(ord.status).toUpperCase() === "COMPLETED",
    );
    const activeOrder = serviceOrders.find(
      (ord) => !["COMPLETED", "CANCELLED"].includes(String(ord.status).toUpperCase()),
    );
    const pendingDemoOrder =
      isOwner &&
      activeOrder &&
      String(activeOrder.status).toUpperCase() === "WAITING_CONFIRMATION";

    mount.innerHTML = `
      <div class="container page service-detail-page">
        <a href="#/marketplace" class="back-link" data-testid="back-marketplace">
          <i class="fa-solid fa-arrow-left"></i> Kembali ke Cari Jasa
        </a>
        ${
          pendingDemoOrder
            ? `<div class="alert alert-info mt-2" style="display:flex;align-items:center;gap:10px"><i class="fa-solid fa-bell"></i><span><strong>Pelanggan demo akan pesan ±3–5 detik.</strong> Refresh halaman, lalu klik <strong>Terima Pesanan</strong> di halaman pesanan.</span></div>`
            : isOwner && activeOrder
              ? `<div class="alert alert-warning mt-2"><i class="fa-solid fa-receipt"></i> Ada pesanan aktif untuk jasa ini — <a href="#/orders/${activeOrder.id}">Kelola pesanan</a></div>`
              : ""
        }

        <div class="service-detail-top card">
          <aside class="service-detail-media">
            <div class="service-detail-gallery${!imageUrls.length ? " service-detail-gallery--placeholder" : ""}" id="service-detail-gallery">
              ${galleryInner || placeholderHtml}
            </div>
          </aside>

          <div class="service-detail-info">
            <header class="service-detail-head">
              <div class="service-detail-badges">
                ${serviceTypeBadge(s, "service")}
                <span class="service-cat-chip service-cat-chip--lg">${escape(catName)}</span>
              </div>
              <h1 class="service-detail-title">${escape(s.title)}</h1>
              <div class="trust-chips-row">
                <span class="trust-chip"><i class="fa-solid fa-shield-halved"></i> Escrow aman</span>
                <span class="trust-chip"><i class="fa-solid fa-rotate-left"></i> Revisi ${s.revisionCount ?? 1}x</span>
                <span class="trust-chip"><i class="fa-solid ${isRemote ? "fa-wifi" : "fa-location-dot"}"></i> ${escape(isRemote ? "Remote" : s.city || s.location || "On-site")}</span>
              </div>
              <div class="service-detail-meta">
                <span>${starsHtml(rating)} <strong>${rating.toFixed(1)}</strong> (${reviewCount} ulasan)</span>
                <span><i class="fa-solid fa-clock"></i> ${escape(deliveryTime)}</span>
              </div>
            </header>

            <section class="service-detail-bento service-detail-desc">
              <h3>Deskripsi</h3>
              <p>${escape(s.description || "Tidak ada deskripsi")}</p>
            </section>

            <section class="service-detail-bento service-detail-seller">
              <h4>Tentang Penjual</h4>
              <div class="profile-link service-seller-row" data-user-id="${s.sellerId}" role="link" tabindex="0">
                ${avatar(s.seller, "lg")}
                <div class="service-seller-info">
                  <div class="service-seller-name">${escape(s.seller?.name || "Penjual")}
                    ${s.seller?.verified ? '<i class="fa-solid fa-circle-check verified-icon"></i>' : ""}
                  </div>
                  <div class="text-sm text-muted">⭐ ${(s.seller?.rating || rating || 0).toFixed(1)} · ${s.seller?.reviewCount ?? reviewCount ?? 0} ulasan</div>
                </div>
              </div>
            </section>

            <footer class="service-detail-cta">
              <div class="service-detail-cta-price">
                <div class="text-xs">Mulai dari</div>
                <div class="service-detail-price">${fmtIDR(s.price || 0)}</div>
              </div>
              ${
                activeOrder
                  ? `<div class="flex-col gap-sm" style="align-items:flex-end">
                      <span class="badge badge-warning"><i class="fa-solid fa-hourglass-half"></i> Pesanan aktif</span>
                      <a class="btn btn-light" href="#/orders/${activeOrder.id}"><i class="fa-solid fa-arrow-right"></i> Lanjutkan Pesanan</a>
                    </div>`
                  : !isOwner && u
                    ? `<div class="flex-col gap-sm" style="align-items:flex-end">
                        ${completedOrders.length ? `<span class="badge badge-success"><i class="fa-solid fa-rotate"></i> Pernah pesan ${completedOrders.length}x</span>` : ""}
                        <div class="flex gap-sm">
                          <button class="btn btn-light" id="order-btn"><i class="fa-solid fa-bag-shopping"></i> ${completedOrders.length ? "Pesan Lagi" : "Pesan Sekarang"}</button>
                          <button class="btn btn-outline-light" id="chat-btn"><i class="fa-solid fa-comment"></i> Chat</button>
                        </div>
                      </div>`
                    : isOwner
                      ? activeOrder
                        ? `<a class="btn btn-primary" href="#/orders/${activeOrder.id}"><i class="fa-solid fa-receipt"></i> Kelola Pesanan</a>`
                        : `<span class="badge badge-light">Jasa Anda — tunggu pelanggan demo</span>`
                      : `<a href="#/login" class="btn btn-light">Login untuk Pesan</a>`
              }
            </footer>
          </div>
        </div>

        <div class="service-detail-reviews-section card card-pad-lg">
          <h3>Ulasan Pembeli (${reviewCount})</h3>
          <div id="reviews-list" class="service-reviews-list"></div>
        </div>
      </div>`;

    initServiceGallery(document.getElementById("service-detail-gallery"), parseServiceImages(s));

    try {
      const reviewsRes = await api.get(`/reviews/service/${s.id}`);
      const reviews = Array.isArray(reviewsRes) ? reviewsRes : reviewsRes?.data || [];
      const reviewsList = document.getElementById("reviews-list");
      if (reviews.length && reviewsList) {
        reviewsList.innerHTML = reviews
          .map((r) => {
            const reviewer = r.reviewer || { name: r.buyerName || "Pengguna", id: r.reviewerId };
            const rid = reviewer.id || r.reviewerId;
            const headClass = rid && !r.isAnonymous ? "review-item-head profile-link" : "review-item-head";
            const headAttrs = rid && !r.isAnonymous ? ` data-user-id="${escape(String(rid))}" role="link" tabindex="0"` : "";
            return `
          <div class="review-item">
            <div class="${headClass}"${headAttrs}>
              ${avatar(r.isAnonymous ? { name: "Anonim" } : reviewer, "sm")}
              <div>
                <div class="review-item-name">${escape(r.isAnonymous ? "Anonim" : reviewer.name || "Pengguna")}</div>
                <div class="review-item-stars">${starsHtml(r.rating)}</div>
              </div>
              <span class="text-xs text-muted">${timeAgo(r.createdAt)}</span>
            </div>
            <p class="review-item-comment">${escape(r.comment || "")}</p>
          </div>`;
          })
          .join("");
      } else if (reviewsList) {
        reviewsList.innerHTML = '<p class="text-muted text-sm">Belum ada ulasan</p>';
      }
    } catch {
      document.getElementById("reviews-list").innerHTML =
        '<p class="text-muted text-sm">Belum ada ulasan</p>';
    }

    document.getElementById("order-btn")?.addEventListener("click", async () => {
      if (!u) return router.navigate("/login");
      try {
        const me = await api.get("/auth/me");
        if (!me.emailVerified || !me.phoneVerified || !me.ktpVerified) {
          toast("Selesaikan verifikasi identitas dulu", "warning", 6000);
          return router.navigate("/verification");
        }
      } catch (_) {}

      const fee = Math.round((s.price || 0) * 0.05);
      const total = (s.price || 0) + fee;
      const overlay = document.createElement("div");
      overlay.className = "modal-backdrop";
      overlay.innerHTML = `
        <div class="modal card card-pad-lg" style="max-width:480px;width:92%">
          <div class="flex-between mb-3">
            <h3 style="margin:0">Konfirmasi Pesanan</h3>
            <button class="btn btn-ghost btn-sm" id="mc-close" type="button">✕</button>
          </div>
          <div class="card card-pad mb-3" style="background:var(--surface-2)">
            <strong>${escape(s.title)}</strong>
            <div class="text-sm text-muted">oleh ${escape(s.seller?.name || "Penjual")}</div>
          </div>
          <textarea id="order-notes" class="textarea mb-3" rows="3" placeholder="Catatan untuk penjual (opsional)"></textarea>
          <div class="card card-pad mb-3" style="background:var(--surface-2)">
            <div class="flex-between text-sm mb-1"><span>Harga</span><span>${fmtIDR(s.price)}</span></div>
            <div class="flex-between text-sm mb-1"><span>Biaya (5%)</span><span>${fmtIDR(fee)}</span></div>
            <div class="flex-between"><strong>Total</strong><strong class="text-primary">${fmtIDR(total)}</strong></div>
          </div>
          <div class="flex gap-sm justify-end">
            <button class="btn btn-secondary" id="mc-cancel" type="button">Batal</button>
            <button class="btn btn-primary" id="mc-confirm" type="button"><i class="fa-solid fa-paper-plane"></i> Kirim Pesanan</button>
          </div>
        </div>`;
      document.body.appendChild(overlay);
      const close = () => overlay.remove();
      overlay.querySelector("#mc-close").addEventListener("click", close);
      overlay.querySelector("#mc-cancel").addEventListener("click", close);
      overlay.addEventListener("click", (e) => {
        if (e.target === overlay) close();
      });
      overlay.querySelector("#mc-confirm").addEventListener("click", async () => {
        const btn = overlay.querySelector("#mc-confirm");
        btn.disabled = true;
        try {
          const order = await api.post("/orders", {
            serviceId: s.id,
            note: document.getElementById("order-notes")?.value || "",
          });
          close();
          toast("📩 Pesanan terkirim! Penjual merespons ±3–5 detik — lalu Anda bayar via escrow.", "success");
          router.navigate("/orders/" + order.id);
        } catch (err) {
          toast(err.message, "error");
          btn.disabled = false;
        }
      });
    });

    document.getElementById("chat-btn")?.addEventListener("click", async () => {
      if (!u) return router.navigate("/login");
      if (u.id === s.sellerId) return toast("Tidak bisa chat dengan diri sendiri", "warning");
      try {
        const response = await api.post("/chat/conversations", { recipientId: s.sellerId });
        const conversationId = response?.id || response?.conversation?.id;
        if (conversationId) router.navigate("/chat/" + conversationId);
        else toast("Gagal memulai chat", "error");
      } catch (err) {
        toast(err.message || "Gagal memulai chat", "error");
      }
    });
  } catch (err) {
    mount.innerHTML = `<div class="container page">${empty(
      "Jasa tidak ditemukan",
      err.message,
      "fa-circle-exclamation",
      '<a href="#/marketplace" class="btn btn-primary mt-2">Kembali</a>',
    )}</div>`;
  }
}

function starsHtml(rating) {
  const r = Math.round(Number(rating) || 0);
  let out = "";
  for (let i = 1; i <= 5; i++) {
    out += `<i class="fa-${i <= r ? "solid" : "regular"} fa-star" style="color:var(--warning)"></i>`;
  }
  return out;
}
