<<<<<<< HEAD
// Shared UI builders (return HTML strings or elements)
=======
// frontend/src/shared/ui/components.js

>>>>>>> ec26484 (implementasi demo)
import { escape, fmtIDR } from "../utils/helpers.js";
import { resolveAssetUrl } from "../utils/api.js";

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

export function avatar(user, size = "") {
<<<<<<< HEAD
<<<<<<< HEAD
  // Pastikan user ada
  if (!user) {
    user = { name: "User", id: "default" };
  }

=======
  const safeUser = user || { name: "User" };
>>>>>>> 961a4cc (Update: Menyinkronkan perubahan lokal dengan repositori remote)
=======
  const safeUser = user || { name: "User" };
>>>>>>> ec26484 (implementasi demo)
  const cls =
    size === "sm"
      ? "avatar avatar-sm"
      : size === "lg"
        ? "avatar avatar-lg"
        : size === "xl"
          ? "avatar avatar-xl"
          : "avatar";
  const userName = safeUser.name || "User";
  const validAvatar =
    typeof safeUser.avatar === "string" &&
    safeUser.avatar.trim() &&
    !["null", "undefined"].includes(safeUser.avatar.trim());

<<<<<<< HEAD
<<<<<<< HEAD
  // Handle avatar URL dengan aman
  let avatarUrl = "https://i.pravatar.cc/150?u=default";

  if (
    user.avatar &&
    user.avatar !== "null" &&
    user.avatar !== "undefined" &&
    user.avatar !== ""
  ) {
    avatarUrl = user.avatar;
  } else if (user.id) {
    avatarUrl = `https://i.pravatar.cc/150?u=${user.id}`;
  } else if (user.email) {
    avatarUrl = `https://i.pravatar.cc/150?u=${user.email}`;
  }

  const userName = user.name ? user.name : "User";

  return `<img class="${cls}" src="${avatarUrl}" alt="${escape(userName)}" onerror="this.onerror=null;this.src='https://i.pravatar.cc/150?u=fallback'" />`;
=======
=======
>>>>>>> ec26484 (implementasi demo)
  if (!validAvatar) {
    const initials = userName
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0] || "")
      .join("")
      .toUpperCase();
    return (
      '<span class="' +
      cls +
      ' avatar-placeholder" role="img" aria-label="' +
      escape(userName) +
      '">' +
      escape(initials || "U") +
      "</span>"
    );
  }

  return (
    '<img class="' +
    cls +
    '" src="' +
    escape(resolveAssetUrl(safeUser.avatar.trim())) +
    '" alt="' +
    escape(userName) +
    '" loading="lazy" />'
  );
<<<<<<< HEAD
>>>>>>> 961a4cc (Update: Menyinkronkan perubahan lokal dengan repositori remote)
=======
>>>>>>> ec26484 (implementasi demo)
}
export function statusPill(status) {
  if (!status) status = "unknown";
  const statusMap = {
    OPEN: "status-open",
    IN_PROGRESS: "status-in_progress",
    COMPLETED: "status-completed",
    CANCELLED: "status-cancelled",
    PENDING: "status-pending",
    ACCEPTED: "status-accepted",
    REJECTED: "status-rejected",
    RESOLVED: "status-resolved",
<<<<<<< HEAD
<<<<<<< HEAD
  };
  const statusClass = statusMap[status] || "status-pending";
  return `<span class="status-pill ${statusClass}" data-testid="status-pill">${escape(status.replace(/_/g, " ").toLowerCase())}</span>`;
=======
=======
>>>>>>> ec26484 (implementasi demo)
    WAITING_CONFIRMATION: "status-pending",
    PAID: "status-accepted",
    WAITING_REVIEW: "status-in_progress",
    IN_REVIEW: "status-in_progress",
    REVISION_REQUESTED: "status-pending",
    DISPUTED: "status-rejected",
  };
  // Label dalam Bahasa Indonesia untuk semua status
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
  return `<span class="status-pill ${statusClass}" data-testid="status-pill">${escape(label)}</span>`;
<<<<<<< HEAD
>>>>>>> 961a4cc (Update: Menyinkronkan perubahan lokal dengan repositori remote)
=======
>>>>>>> ec26484 (implementasi demo)
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

export function serviceCard(s, opts = {}) {
<<<<<<< HEAD
  // Pastikan s ada
=======
>>>>>>> ec26484 (implementasi demo)
  if (!s) return "";

  const seller = s.seller || {};

<<<<<<< HEAD
  // Handle images dengan aman
=======
>>>>>>> ec26484 (implementasi demo)
  let img = "";
  if (s.images) {
    try {
      const images =
        typeof s.images === "string" ? JSON.parse(s.images) : s.images;
      img = Array.isArray(images) && images.length > 0 ? images[0] : "";
    } catch (e) {
      img = "";
    }
  }

<<<<<<< HEAD
  // Fallback image jika tidak ada
=======
>>>>>>> ec26484 (implementasi demo)
  if (!img || img === "null" || img === "undefined") {
    const titleSlug = (s.title || "Service").slice(0, 20);
    img = `https://placehold.co/600x400/0a66c2/ffffff?text=${encodeURIComponent(titleSlug)}`;
  }

<<<<<<< HEAD
  // Pastikan seller name tidak undefined
=======
>>>>>>> ec26484 (implementasi demo)
  const sellerName = seller.name || "Penjual";
  const sellerVerified = seller.verified === true;
  const sellerId = seller.id || s.sellerId || null;

<<<<<<< HEAD
  // Pastikan angka valid
=======
>>>>>>> ec26484 (implementasi demo)
  const rating =
    typeof s.rating === "number" && !isNaN(s.rating) ? s.rating : 0;
  const reviewCount =
    typeof s.reviewCount === "number" && !isNaN(s.reviewCount)
      ? s.reviewCount
      : 0;
  const price = typeof s.price === "number" && !isNaN(s.price) ? s.price : 0;
  const title = s.title || "Untitled";
  const serviceId = s.id || "unknown";
<<<<<<< HEAD

  return `<a class="service-card" href="#/service/${serviceId}" data-testid="service-card-${serviceId}">
    <div class="thumb">
      <img src="${img}" alt="${escape(title)}" loading="lazy" onerror="this.onerror=null;this.src='https://placehold.co/600x400/0a66c2/ffffff?text=No+Image'" />
=======
  const categoryName = s.category?.name || s.categoryName || "";
  const deliveryLabel = s.deliveryTime ? `${s.deliveryTime} hari` : "Fleksibel";

  return `<a class="service-card" href="#/services/${serviceId}" data-testid="service-card-${serviceId}">
    <div class="thumb">
      <img src="${img}" alt="${escape(title)}" loading="lazy" onerror="this.onerror=null;this.src='https://placehold.co/600x400/0a66c2/ffffff?text=No+Image'" />
      ${categoryName ? `<span class="service-cat-badge">${escape(categoryName)}</span>` : ""}
>>>>>>> ec26484 (implementasi demo)
      <button class="fav-btn ${opts.favorited ? "active" : ""}" data-fav="${serviceId}" data-testid="fav-btn-${serviceId}" aria-label="favorite">
        <i class="fa-${opts.favorited ? "solid" : "regular"} fa-heart"></i>
      </button>
    </div>
    <div class="body">
      <div class="seller">
        ${avatar(seller, "sm")}
        ${sellerId ? `<span class="seller-link" data-user-id="${sellerId}" data-testid="seller-link-${sellerId}" style="cursor:pointer;color:var(--text-2)">${escape(sellerName)}</span>` : `<span>${escape(sellerName)}</span>`}
        ${sellerVerified ? '<i class="fa-solid fa-circle-check" style="color:var(--primary)" title="Verified"></i>' : ""}
      </div>
      <div class="title">${escape(title)}</div>
      <div class="meta">
        <div class="rating"><i class="fa-solid fa-star" style="color:var(--warning)"></i> ${rating.toFixed(1)} <span class="text-muted">(${reviewCount})</span></div>
<<<<<<< HEAD
        <div class="price">${fmtIDR(price)}</div>
=======
        <div class="text-xs text-muted"><i class="fa-regular fa-clock"></i> ${deliveryLabel}</div>
      </div>
      <div class="price-row">
        <div class="price">${fmtIDR(price)}</div>
        <span class="btn btn-secondary btn-sm service-detail-cta">Lihat Detail</span>
>>>>>>> ec26484 (implementasi demo)
      </div>
    </div>
  </a>`;
}
