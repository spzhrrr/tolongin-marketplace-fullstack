// frontend/src/shared/ui/components.js
// Shared UI builders (return HTML strings)

import { escape, fmtIDR, toast, timeAgo, fmtDate } from "../utils/helpers.js";
import { resolveAssetUrl, api } from "../utils/api.js";
import { store } from "../../app/store.js";

export function loading() {
  return '<div class="spinner" data-testid="loading-spinner"></div>';
}

export function empty(title, sub, icon = "fa-folder-open", cta) {
  return `<div class="empty" data-testid="empty-state">
    <i class="fa-solid ${icon}"></i>
    <h3>${escape(title)}</h3>
    <p>${escape(sub || "")}</p>
    ${cta ? cta : ""}
  </div>`;
}

export function avatarUrl(user) {
  const safeUser = user || { name: "User" };
  const validAvatar =
    typeof safeUser.avatar === "string" &&
    safeUser.avatar.trim() &&
    !["null", "undefined"].includes(safeUser.avatar.trim());

  if (validAvatar) return resolveAssetUrl(safeUser.avatar.trim());

  const seed = safeUser.id || safeUser.email || safeUser.name || "user";
  let hash = 0;
  for (const ch of String(seed)) hash = (hash * 31 + ch.charCodeAt(0)) >>> 0;
  const imgNum = (hash % 70) + 1;
  return `https://i.pravatar.cc/256?img=${imgNum}`;
}

export function avatar(user, size = "") {
  const safeUser = user || { name: "User" };
  const cls =
    size === "sm"
      ? "avatar avatar-sm"
      : size === "lg"
        ? "avatar avatar-lg"
        : size === "xl"
          ? "avatar avatar-xl"
          : size === "md"
            ? "avatar avatar-lg"
            : "avatar";
  const userName = safeUser.name || "User";
  const src = avatarUrl(safeUser);
  const fallbackSeed = encodeURIComponent(
    String(safeUser.id || safeUser.email || userName || "fallback"),
  );
  const fallback = `https://picsum.photos/seed/tolongin-${fallbackSeed}/256/256`;

  return `<img class="${cls}" src="${escape(src)}" alt="${escape(userName)}" loading="lazy" onerror="this.onerror=null;this.src='${fallback}'" />`;
}

export function userChip(user, size = "sm") {
  const name = user?.name || "Pengguna";
  const id = user?.id;
  if (!id) {
    return `<span class="user-chip">${avatar(user, size)}<span class="user-chip-name">${escape(name)}</span></span>`;
  }
  return `<span class="profile-link user-chip" data-user-id="${escape(String(id))}" role="link" tabindex="0">${avatar(user, size)}<span class="user-chip-name">${escape(name)}</span></span>`;
}

export function statusPill(status, opts = {}) {
  if (!status) status = "unknown";
  const { compact = false } = opts;

  const statusMap = {
    OPEN: "status-open",
    IN_PROGRESS: "status-in_progress",
    COMPLETED: "status-completed",
    CANCELLED: "status-cancelled",
    PENDING: "status-pending",
    ACCEPTED: "status-accepted",
    REJECTED: "status-rejected",
    RESOLVED: "status-resolved",
    WAITING_CONFIRMATION: "status-pending",
    PAID: "status-accepted",
    WAITING_REVIEW: "status-in_progress",
    IN_REVIEW: "status-in_progress",
    REVISION_REQUESTED: "status-pending",
    DISPUTED: "status-rejected",
    CLOSED: "status-cancelled",
  };

  const labelMap = {
    OPEN: "Dibuka",
    IN_PROGRESS: "Dikerjakan",
    COMPLETED: "Selesai",
    CANCELLED: "Dibatalkan",
    PENDING: "Menunggu",
    ACCEPTED: "Diterima",
    REJECTED: "Ditolak",
    RESOLVED: "Selesai",
    WAITING_CONFIRMATION: "Menunggu Pembayaran",
    PAID: "Dibayar · Escrow Aktif",
    WAITING_REVIEW: "Menunggu Review",
    IN_REVIEW: "Ditinjau",
    REVISION_REQUESTED: "Minta Revisi",
    DISPUTED: "Sengketa",
    CLOSED: "Ditutup",
  };

  const key = String(status).toUpperCase();
  const statusClass = statusMap[key] || "status-pending";
  const label =
    labelMap[key] || String(status).replace(/_/g, " ").toLowerCase();
  const pillCls = compact
    ? `status-pill status-pill--compact ${statusClass}`
    : `status-pill ${statusClass}`;

  return `<span class="${pillCls}" data-testid="status-pill">${escape(label)}</span>`;
}

function orderWorkAttachments(order) {
  const sub = order?.workSubmission;
  if (sub?.attachments?.length) return sub.attachments;
  if (Array.isArray(order?.workProof) && order.workProof.length)
    return order.workProof;
  if (
    Array.isArray(order?.workSubmissionFiles) &&
    order.workSubmissionFiles.length
  )
    return order.workSubmissionFiles;
  return [];
}

export function workProofBadge(order, role) {
  if (!order || !role) return "";

  const st = String(order.status || "").toUpperCase();
  const attachments = orderWorkAttachments(order);
  const hasWork =
    attachments.length > 0 ||
    Boolean(order.workSubmission || order.workSubmittedAt) ||
    ["WAITING_REVIEW", "IN_REVIEW", "COMPLETED"].includes(st);

  if (st === "COMPLETED") {
    return `<span class="work-status-chip work-status-chip--done"><i class="fa-solid fa-circle-check"></i> Disetujui</span>`;
  }
  if (st === "CANCELLED") {
    return `<span class="work-status-chip work-status-chip--cancel"><i class="fa-solid fa-ban"></i> Dibatalkan</span>`;
  }
  if (st === "REVISION_REQUESTED" || st === "REJECTED") {
    return `<span class="work-status-chip work-status-chip--revision"><i class="fa-solid fa-rotate-left"></i> Minta Revisi</span>`;
  }
  if (st === "WAITING_REVIEW" || st === "IN_REVIEW") {
    if (role === "buyer") {
      return `<span class="work-status-chip work-status-chip--action"><i class="fa-solid fa-magnifying-glass"></i> Perlu Review</span>`;
    }
    return `<span class="work-status-chip work-status-chip--wait"><i class="fa-solid fa-hourglass-half"></i> Menunggu Review</span>`;
  }
  if (["PAID", "IN_PROGRESS"].includes(st)) {
    if (!hasWork) {
      if (role === "seller") {
        return `<span class="work-status-chip work-status-chip--action"><i class="fa-solid fa-upload"></i> Upload Bukti</span>`;
      }
      return `<span class="work-status-chip work-status-chip--wait"><i class="fa-solid fa-clock"></i> Menunggu Bukti</span>`;
    }
    if (role === "seller") {
      return `<span class="work-status-chip work-status-chip--wait"><i class="fa-solid fa-hourglass-half"></i> Menunggu Review</span>`;
    }
  }

  return `<span class="work-status-chip work-status-chip--idle"><i class="fa-solid fa-upload"></i> Belum Dikirim</span>`;
}

export function stars(rating) {
  const r = Math.round(Number(rating) || 0);
  let out = '<span class="stars">';
  for (let i = 1; i <= 5; i++) {
    out += `<i class="fa-${i <= r ? "solid" : "regular"} fa-star"></i>`;
  }
  out += "</span>";
  return out;
}

/** Digital vs physical badge for cards and detail pages */
export function serviceTypeBadge(item, kind = "service") {
  if (!item) return "";

  const catType =
    item.category && typeof item.category === "object"
      ? item.category.serviceType
      : null;

  let isPhysical = false;
  if (kind === "job") {
    isPhysical =
      catType === "PHYSICAL" ||
      (catType !== "DIGITAL" && item.isOnline === false);
  } else {
    isPhysical =
      catType === "PHYSICAL" ||
      (catType !== "DIGITAL" && item.isRemote === false);
  }

  const icon = isPhysical ? "fa-person-digging" : "fa-laptop-code";
  const mod = isPhysical ? "physical" : "digital";
  const hint = isPhysical
    ? "Jasa/kerja fisik (on-site)"
    : "Jasa/kerja digital (remote)";

  return `<span class="type-mode-chip type-mode-chip--${mod}" title="${escape(hint)}" aria-label="${escape(hint)}"><i class="fa-solid ${icon}"></i><span class="type-mode-chip-label">${isPhysical ? "Fisik" : "Digital"}</span></span>`;
}

export function categoryPlaceholder(category, opts = {}) {
  const name = category?.name || "Umum";
  const type =
    opts.serviceType || category?.serviceType || "DIGITAL";
  const isPhysical = type === "PHYSICAL";
  const mod = isPhysical ? "physical" : "digital";
  const icon = isPhysical ? "fa-person-digging" : "fa-laptop-code";

  return `<div class="category-thumb-placeholder category-thumb-placeholder--${mod}" aria-hidden="true">
    <i class="fa-solid ${icon}"></i>
    <span>${escape(name)}</span>
  </div>`;
}

export function parseServiceImages(service) {
  if (!service) return [];

  let raw = service.images;
  if ((!raw || (Array.isArray(raw) && !raw.length)) && service.image) {
    return [service.image].filter(Boolean);
  }

  try {
    const arr = typeof raw === "string" ? JSON.parse(raw) : raw;
    if (!Array.isArray(arr)) return [];
    return arr.filter(
      (u) =>
        u &&
        String(u).trim() &&
        !["null", "undefined"].includes(String(u).trim()),
    );
  } catch {
    return [];
  }
}

export function resolveServiceImageUrl(url) {
  if (!url || typeof url !== "string") return "";
  const trimmed = url.trim();
  if (!trimmed || ["null", "undefined"].includes(trimmed)) return "";
  if (/^(https?:|data:|blob:)/i.test(trimmed)) return trimmed;
  return resolveAssetUrl(trimmed);
}

export function serviceGalleryHtml(images, opts = {}) {
  const urls = (Array.isArray(images) ? images : [])
    .map(resolveServiceImageUrl)
    .filter(Boolean);

  if (!urls.length) return opts.placeholderHtml || "";

  const alt = escape(opts.alt || "Galeri jasa");

  if (urls.length === 1) {
    return `<div class="service-gallery service-gallery--single">
      <div class="service-gallery-viewport">
        <img src="${escape(urls[0])}" alt="${alt}" data-gallery-main loading="lazy" />
      </div>
    </div>`;
  }

  const thumbs = urls
    .map(
      (u, i) =>
        `<button type="button" class="service-gallery-thumb${i === 0 ? " active" : ""}" data-index="${i}" aria-label="Gambar ${i + 1}">
          <img src="${escape(u)}" alt="" loading="lazy" />
        </button>`,
    )
    .join("");

  return `<div class="service-gallery">
    <div class="service-gallery-viewport">
      <button type="button" class="service-gallery-nav service-gallery-prev" aria-label="Sebelumnya"><i class="fa-solid fa-chevron-left"></i></button>
      <img src="${escape(urls[0])}" alt="${alt}" data-gallery-main loading="lazy" />
      <button type="button" class="service-gallery-nav service-gallery-next" aria-label="Berikutnya"><i class="fa-solid fa-chevron-right"></i></button>
      <span class="service-gallery-counter" data-gallery-counter>1 / ${urls.length}</span>
    </div>
    <div class="service-gallery-thumbs">${thumbs}</div>
  </div>`;
}

export function initServiceGallery(rootEl, images) {
  if (!rootEl) return;

  const urls = (Array.isArray(images) ? images : [])
    .map(resolveServiceImageUrl)
    .filter(Boolean);
  if (!urls.length) return;

  let idx = 0;
  const mainImg = rootEl.querySelector("[data-gallery-main]");
  const counter = rootEl.querySelector("[data-gallery-counter]");
  const thumbs = rootEl.querySelectorAll(".service-gallery-thumb");

  const show = (next) => {
    idx = (next + urls.length) % urls.length;
    if (mainImg) mainImg.src = urls[idx];
    if (counter) counter.textContent = `${idx + 1} / ${urls.length}`;
    thumbs.forEach((t, i) => t.classList.toggle("active", i === idx));
  };

  rootEl.querySelector(".service-gallery-prev")?.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    show(idx - 1);
  });
  rootEl.querySelector(".service-gallery-next")?.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    show(idx + 1);
  });
  thumbs.forEach((thumb, i) => {
    thumb.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      show(i);
    });
  });
}

export function bindFavoriteButtons(container, favs = []) {
  if (!container) return;

  const favSet = new Set(Array.isArray(favs) ? favs : []);

  container.querySelectorAll(".fav-btn").forEach((btn) => {
    if (btn.dataset.favBound === "1") return;
    btn.dataset.favBound = "1";

    btn.addEventListener("click", async (e) => {
      e.preventDefault();
      e.stopPropagation();

      if (!store.getState().token) {
        toast("Login dulu untuk menyimpan favorit", "warning");
        return;
      }

      const serviceId = btn.dataset.fav;
      const icon = btn.querySelector("i");
      const wasFav = btn.classList.contains("active");
      btn.disabled = true;
      btn.style.opacity = "0.6";

      try {
        const response = await api.post("/favorites/" + serviceId);
        const newStatus =
          response?.favorited !== undefined
            ? response.favorited
            : response?.message?.toLowerCase?.().includes("removed")
              ? false
              : !wasFav;

        if (newStatus) {
          favSet.add(serviceId);
          btn.classList.add("active");
          if (icon) icon.className = "fa-solid fa-heart";
        } else {
          favSet.delete(serviceId);
          btn.classList.remove("active");
          if (icon) icon.className = "fa-regular fa-heart";
        }

        container.dispatchEvent(
          new CustomEvent("fav-changed", {
            detail: { serviceId, favorited: newStatus },
            bubbles: true,
          }),
        );
        toast(
          newStatus ? "Ditambahkan ke favorit" : "Dihapus dari favorit",
          "success",
        );
      } catch (err) {
        toast(err.message || "Gagal memperbarui favorit", "error");
      } finally {
        btn.disabled = false;
        btn.style.opacity = "";
      }
    });
  });
}

/** Compact discover hero — background/decoration handled by .discover-head CSS */
export function discoverPageHero(opts = {}) {
  const {
    variant = "services",
    title = "",
    subtitle = "",
    eyebrowIcon = "fa-store",
    eyebrowLabel = "Marketplace",
    ctaHtml = "",
  } = opts;

  return `
    <section class="discover-hero discover-hero--${escape(variant)}" data-testid="discover-hero">
      <div class="container discover-hero__inner">
        <div class="discover-hero__copy">
          <span class="discover-hero__eyebrow"><i class="fa-solid ${escape(eyebrowIcon)}"></i> ${escape(eyebrowLabel)}</span>
          <h1 class="discover-hero__title">${escape(title)}</h1>
          ${subtitle ? `<p class="discover-hero__subtitle">${escape(subtitle)}</p>` : ""}
        </div>
        ${ctaHtml ? `<div class="discover-hero__actions">${ctaHtml}</div>` : ""}
      </div>
    </section>`;
}

export function serviceCard(s, opts = {}) {
  if (!s) return "";

  const seller = s.seller || {};
  const imageList = parseServiceImages(s);
  const resolvedImg = resolveServiceImageUrl(imageList[0]);
  const imgSeed = encodeURIComponent(String(s.id || s.title || "service"));
  const img = resolvedImg || `https://picsum.photos/seed/svc-${imgSeed}/600/400`;

  const catName =
    (s.category && typeof s.category === "object" ? s.category.name : s.category) ||
    s.categoryName ||
    "Jasa";
  const isPhysical = s.isRemote === false;
  const modeCls = isPhysical ? "service-card--physical" : "service-card--digital";
  const city = isPhysical
    ? s.city || s.location || ""
    : s.isRemote !== false
      ? "Remote"
      : s.city || s.location || "Remote";
  const locationIcon =
    !isPhysical || String(city).toLowerCase() === "remote"
      ? "fa-wifi"
      : "fa-location-dot";
  const locationClass =
    city === "Remote" || !isPhysical
      ? "service-location service-location--remote"
      : "service-location";

  const sellerName = seller.name || "Penjual";
  const sellerVerified = seller.verified === true;
  const sellerId = seller.id || s.sellerId || null;
  const rating =
    typeof s.rating === "number" && !isNaN(s.rating) ? s.rating : 0;
  const reviewCount =
    typeof s.reviewCount === "number" && !isNaN(s.reviewCount)
      ? s.reviewCount
      : 0;
  const price = typeof s.price === "number" && !isNaN(s.price) ? s.price : 0;
  const title = s.title || "Untitled";
  const serviceId = s.id || "unknown";
  const deliveryLabel = s.deliveryTime ? `${s.deliveryTime} hari` : "Fleksibel";
  const postedAgo = s.createdAt ? timeAgo(s.createdAt) : "";

  return `<a class="service-card service-card--market ${modeCls}" href="#/services/${serviceId}" data-testid="service-card-${serviceId}">
    <div class="thumb">
      <img src="${escape(img)}" alt="${escape(title)}" loading="lazy" onerror="this.onerror=null;this.src='https://picsum.photos/seed/svc-fallback-${imgSeed}/600/400'" />
      ${opts.featured ? '<span class="service-featured-chip"><i class="fa-solid fa-star"></i> Unggulan</span>' : ""}
      <button class="fav-btn ${opts.favorited ? "active" : ""}" data-fav="${serviceId}" data-testid="fav-btn-${serviceId}" aria-label="favorite">
        <i class="fa-${opts.favorited ? "solid" : "regular"} fa-heart"></i>
      </button>
    </div>
    <div class="body">
      <div class="seller">
        ${avatar(seller, "sm")}
        ${sellerId ? `<span class="seller-link profile-link" data-user-id="${sellerId}" data-testid="seller-link-${sellerId}">${escape(sellerName)}</span>` : `<span>${escape(sellerName)}</span>`}
        ${sellerVerified ? '<i class="fa-solid fa-circle-check" style="color:var(--primary)" title="Verified"></i>' : ""}
      </div>
      <div class="title">${escape(title)}</div>
      <div class="service-card-meta">
        <div class="service-card-tags-row">
          ${serviceTypeBadge(s, "service")}
          <span class="service-cat-chip service-cat-chip--card">${escape(catName)}</span>
        </div>
        <div class="service-card-location-row">
          ${city ? `<span class="${locationClass}"><i class="fa-solid ${locationIcon}"></i> ${escape(city)}</span>` : ""}
          ${postedAgo ? `<span class="service-card-time"><i class="fa-regular fa-clock"></i> ${escape(postedAgo)}</span>` : ""}
        </div>
      </div>
      <div class="meta">
        <div class="rating"><i class="fa-solid fa-star" style="color:var(--warning)"></i> ${rating.toFixed(1)} <span class="rating-count">(${reviewCount})</span></div>
        <div class="service-delivery"><i class="fa-regular fa-clock"></i> ${escape(deliveryLabel)}</div>
      </div>
      <div class="price">${fmtIDR(price)}</div>
    </div>
  </a>`;
}

export function jobCard(j, opts = {}) {
  if (!j) return "";

  const buyer = j.buyer || {};
  const catName =
    (j.category && typeof j.category === "object" ? j.category.name : j.category) ||
    "Umum";
  const cleanTitle = String(j.title || "").replace(/^\s*\[URGENT\]\s*/i, "");
  const deadlineDate = j.deadline ? new Date(j.deadline) : null;
  const daysLeft = deadlineDate
    ? Math.ceil((deadlineDate.getTime() - Date.now()) / 86400000)
    : null;
  const isUrgent =
    String(j.urgency || "").toUpperCase() === "URGENT" ||
    (daysLeft !== null && daysLeft >= 0 && daysLeft < 3);
  const isRemote =
    j.isOnline === true ||
    String(j.location || j.city || "").toLowerCase() === "remote";
  const locLabel = isRemote ? "Remote" : j.city || j.location || "On-site";
  const locIcon = isRemote ? "fa-wifi" : "fa-location-dot";
  const jobId = j.id || "unknown";
  const apps =
    j.applicationsCount ??
    j._count?.applications ??
    (Array.isArray(j.applications) ? j.applications.length : 0);

  const statusBadge = opts.isMine
    ? '<span class="job-badge job-badge-mine"><i class="fa-solid fa-user-tie"></i> Job Anda</span>'
    : opts.hasApplied
      ? '<span class="job-badge job-badge-applied"><i class="fa-solid fa-check"></i> Sudah Melamar</span>'
      : isUrgent
        ? '<span class="job-badge job-badge-urgent"><i class="fa-solid fa-fire"></i> Mendesak</span>'
        : "";

  const desc = String(j.description || "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 120);
  const deadlineLabel = deadlineDate ? fmtDate(j.deadline) : "";
  const postedAgo = j.createdAt ? timeAgo(j.createdAt) : "";
  const buyerId = j.buyerId || buyer.id || null;
  const buyerName = buyer.name || "Klien";
  const budget = typeof j.budget === "number" && !isNaN(j.budget) ? j.budget : 0;

  const cardCls = [
    "job-card",
    "job-card--market",
    isUrgent ? "job-card--urgent" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return `<a class="${cardCls}" href="#/jobs/${jobId}" data-testid="job-card-${jobId}">
    <div class="job-card-header">
      <div class="job-card-owner">
        ${avatar(buyer, "sm")}
        ${buyerId ? `<span class="job-card-owner-name profile-link" data-user-id="${buyerId}">${escape(buyerName)}</span>` : `<span class="job-card-owner-name">${escape(buyerName)}</span>`}
      </div>
      ${statusBadge ? `<div class="job-card-badges">${statusBadge}</div>` : ""}
    </div>
    <h3 class="job-card-title">${escape(cleanTitle)}</h3>
    <div class="service-card-meta">
      <div class="service-card-tags-row">
        ${serviceTypeBadge(j, "job")}
        <span class="service-cat-chip service-cat-chip--card">${escape(catName)}</span>
      </div>
      <div class="service-card-location-row">
        <span class="service-location${isRemote ? " service-location--remote" : ""}"><i class="fa-solid ${locIcon}"></i> ${escape(locLabel)}</span>
        ${postedAgo ? `<span class="service-card-time"><i class="fa-regular fa-clock"></i> ${escape(postedAgo)}</span>` : ""}
      </div>
    </div>
    ${desc ? `<p class="job-card-desc">${escape(desc)}${(j.description || "").length > 120 ? "…" : ""}</p>` : ""}
    <div class="job-card-footer">
      <div class="job-card-stat job-card-stat--budget">
        <span class="job-stat-label">Budget</span>
        <span class="job-stat-value">${fmtIDR(budget)}</span>
      </div>
      <div class="job-card-stat job-card-stat--deadline">
        <span class="job-stat-label">Deadline</span>
        <span class="job-stat-value">${deadlineLabel ? `<i class="fa-solid fa-calendar-day"></i> ${escape(deadlineLabel)}` : "—"}</span>
      </div>
      <div class="job-card-stat job-card-stat--apps">
        <span class="job-stat-label">Pelamar</span>
        <span class="job-stat-value"><i class="fa-solid fa-users"></i> ${apps}</span>
      </div>
    </div>
  </a>`;
}
