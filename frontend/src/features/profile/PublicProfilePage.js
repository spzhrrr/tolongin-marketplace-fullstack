// frontend/src/features/profile/PublicProfilePage.js

import { api } from "../../shared/utils/api.js";
import { escape, fmtIDR, toast, timeAgo } from "../../shared/utils/helpers.js";
import { avatar, serviceCard, empty, stars, jobCard } from "../../shared/ui/components.js";
import { store } from "../../app/store.js";
import { router } from "../../app/router.js";

// Render daftar ulasan (dipakai untuk tab "sebagai penjual" & "sebagai klien")
function renderReviewList(list, emptyText, isOwn = false) {
  if (!list || !list.length) {
    return `<div class="empty-state-inline">
      <i class="fa-solid fa-comment-slash"></i>
      <h3>Belum ada ulasan</h3>
      <p>${isOwn ? "Selesaikan pesanan untuk mendapatkan ulasan dari klien." : "Pengguna ini belum memiliki ulasan."}</p>
    </div>`;
  }
  return `<div class="profile-review-list">${list
    .map((r) => {
      const reviewer = r.isAnonymous
        ? null
        : r.reviewer || { name: "User", id: r.reviewerId };
      const rid = reviewer?.id || r.reviewerId;
      const headClass =
        rid && !r.isAnonymous
          ? "profile-review-head profile-link"
          : "profile-review-head";
      const headAttrs =
        rid && !r.isAnonymous
          ? ` data-user-id="${escape(String(rid))}" role="link" tabindex="0"`
          : "";
      const comment = (r.comment || "").trim();
      return `
    <article class="profile-review-item">
      <div class="${headClass}"${headAttrs}>
        ${avatar(r.isAnonymous ? { name: "Anonim" } : reviewer || { name: "User" })}
        <div class="profile-review-meta">
          <div class="profile-review-row">
            <strong class="profile-review-name">${escape(r.isAnonymous ? "Anonim" : reviewer?.name || "User")}</strong>
            <div class="profile-review-stars">${stars(r.rating || 5)}</div>
          </div>
          <time class="profile-review-date">${timeAgo(r.createdAt)}</time>
        </div>
      </div>
      ${comment ? `<p class="profile-review-comment">${escape(comment)}</p>` : ""}
    </article>`;
    })
    .join("")}</div>`;
}

function profileEmptyState({ icon, title, text, ctaHtml = "" }) {
  return `<div class="profile-empty">
    <i class="fa-solid ${icon}"></i>
    <h3>${escape(title)}</h3>
    <p>${text}</p>
    ${ctaHtml ? `<div class="profile-empty-cta">${ctaHtml}</div>` : ""}
  </div>`;
}

function renderHistoryList(history) {
  if (!history.length) return "";
  return `<div class="profile-history-list">${history
    .map((h) => {
      const done = String(h.status).toUpperCase() === "COMPLETED";
      return `<article class="profile-history-item">
        <div class="profile-history-main">
          <div class="profile-history-top">
            <span class="profile-history-badge ${done ? "is-done" : ""}">${done ? "Selesai" : escape(String(h.status).replace(/_/g, " "))}</span>
            ${h.label ? `<span class="profile-history-label">${escape(h.label)}</span>` : ""}
          </div>
          <h4 class="profile-history-title">${escape(h.title || "Pekerjaan")}</h4>
          <div class="profile-history-meta">
            ${h.client?.name ? `<span><i class="fa-solid fa-user"></i> ${escape(h.client.name)}</span>` : ""}
            ${h.completedAt ? `<span><i class="fa-solid fa-calendar-check"></i> ${new Date(h.completedAt).toLocaleDateString("id-ID")}</span>` : ""}
            ${h.review ? `<span class="profile-history-rating"><i class="fa-solid fa-star"></i> ${h.review.rating}</span>` : ""}
          </div>
        </div>
        <div class="profile-history-amount">${fmtIDR(h.amount || 0)}</div>
      </article>`;
    })
    .join("")}</div>`;
}

export async function PublicProfilePage({ mount, params }) {
  mount.innerHTML = `<div class="container page"><div class="spinner"></div></div>`;
  const userId = params.id;

  try {
    const [u, services, reviewsByUser, jobs, stats, workHistory] =
      await Promise.all([
        api.get("/users/" + userId),
        api.get(`/users/${userId}/services`).catch(() => []),
        api
          .get(`/reviews/user/${userId}`)
          .catch(() => ({ all: [], asSeller: [], asBuyer: [] })),
        api.get(`/users/${userId}/jobs`).catch(() => []),
        api.get(`/users/${userId}/stats`).catch(() => ({
          totalEarnings: 0,
          completedOrders: 0,
          totalOrders: 0,
          averageRating: 0,
          reviewCount: 0,
        })),
        api.get(`/users/${userId}/work-history`).catch(() => []),
      ]);

    const me = store.getState().user;
    const isOwn = me && me.id === u.id;

    const reviewsAsSeller = Array.isArray(reviewsByUser?.asSeller)
      ? reviewsByUser.asSeller
      : [];
    const reviewsAsBuyer = Array.isArray(reviewsByUser?.asBuyer)
      ? reviewsByUser.asBuyer
      : [];
    const reviews = Array.isArray(reviewsByUser?.all) ? reviewsByUser.all : [];
    const avgRating = Number(stats?.averageRating) || Number(u.rating) || 0;
    const reviewCount = Number(stats?.reviewCount) || reviews.length || 0;

    const history = Array.isArray(workHistory) ? workHistory : [];
    const totalServices = services.length;
    const totalJobs = jobs.length;
    const completedOrders =
      Number(stats?.completedOrders) || u.completedOrders || 0;
    const totalEarnings = Number(stats?.totalEarnings) || 0;

    const memberSince = new Date(u.createdAt).toLocaleDateString("id-ID", {
      month: "long",
      year: "numeric",
    });

    mount.innerHTML = `
      <div class="container page public-profile-page">
        <a href="#/marketplace" class="profile-back-link" data-testid="public-profile-back">
          <i class="fa-solid fa-arrow-left"></i> Kembali
        </a>

        <div class="profile-shell card">
          <div class="profile-cover" aria-hidden="true">
            <div class="profile-cover__mesh"></div>
            <div class="profile-cover__blob profile-cover__blob--a"></div>
            <div class="profile-cover__blob profile-cover__blob--b"></div>
            <div class="profile-cover__fade"></div>
          </div>
          <div class="profile-header">
            <div class="profile-header-row">
              <div class="profile-identity">
                <div class="profile-avatar-wrap">
                  ${avatar(u, "xl")}
                  ${
                    isOwn
                      ? `<label for="avatar-upload" class="profile-avatar-edit" title="Ubah foto">
                          <i class="fa-solid fa-camera"></i>
                        </label>
                        <input id="avatar-upload" type="file" accept="image/*" hidden>`
                      : ""
                  }
                </div>
                <div class="profile-identity-text">
                  <div class="profile-name-row">
                    <h1 class="profile-name">${escape(u.name || "User")}</h1>
                    ${u.verified ? '<i class="fa-solid fa-circle-check verified-icon verified-icon-lg" title="Terverifikasi"></i>' : ""}
                  </div>
                  ${u.city ? `<p class="profile-location"><i class="fa-solid fa-location-dot"></i> ${escape(u.city)}</p>` : ""}
                  <p class="profile-bio">${escape(
                    u.bio ||
                      (isOwn
                        ? "Tambahkan bio agar klien lebih percaya — edit di Pengaturan."
                        : "Belum ada deskripsi profil."),
                  )}</p>
                  <div class="profile-trust-chips">
                    ${u.verified ? '<span class="profile-trust-chip profile-trust-chip--verified"><i class="fa-solid fa-shield-halved"></i> Terverifikasi</span>' : ""}
                    <span class="profile-trust-chip"><i class="fa-solid fa-calendar"></i> Member sejak ${memberSince}</span>
                    ${completedOrders > 0 ? `<span class="profile-trust-chip"><i class="fa-solid fa-circle-check"></i> ${completedOrders} pesanan selesai</span>` : ""}
                  </div>
                </div>
              </div>
              <div class="profile-header-actions">
                ${
                  !isOwn
                    ? `<button class="btn btn-primary" id="chat-user-btn"><i class="fa-solid fa-message"></i> Chat</button>
                       <button class="btn btn-secondary" id="report-user-btn"><i class="fa-solid fa-flag"></i> Laporkan</button>`
                    : `<a class="btn btn-secondary" href="#/settings/profile"><i class="fa-solid fa-pen"></i> Edit Profil</a>
                       <a class="btn btn-secondary" href="#/settings"><i class="fa-solid fa-gear"></i> Pengaturan</a>
                       <a class="btn btn-primary" href="#/dashboard"><i class="fa-solid fa-gauge-high"></i> Dashboard</a>`
                }
              </div>
            </div>

            <div class="profile-metrics">
              <button type="button" class="profile-metric clickable-stat" data-target-tab="reviews">
                <span class="profile-metric-icon profile-metric-icon--gold" aria-hidden="true"><i class="fa-solid fa-star"></i></span>
                <span class="profile-metric-value">${avgRating.toFixed(1)}</span>
                <span class="profile-metric-label">${reviewCount} ulasan</span>
              </button>
              <button type="button" class="profile-metric clickable-stat" data-target-tab="history">
                <span class="profile-metric-icon profile-metric-icon--blue" aria-hidden="true"><i class="fa-solid fa-circle-check"></i></span>
                <span class="profile-metric-value">${completedOrders}</span>
                <span class="profile-metric-label">Pesanan selesai</span>
              </button>
              <button type="button" class="profile-metric clickable-stat" data-target-tab="services">
                <span class="profile-metric-icon profile-metric-icon--purple" aria-hidden="true"><i class="fa-solid fa-store"></i></span>
                <span class="profile-metric-value">${totalServices}</span>
                <span class="profile-metric-label">Jasa aktif</span>
              </button>
              <button type="button" class="profile-metric clickable-stat" data-target-tab="jobs">
                <span class="profile-metric-icon profile-metric-icon--green" aria-hidden="true"><i class="fa-solid fa-briefcase"></i></span>
                <span class="profile-metric-value">${totalJobs}</span>
                <span class="profile-metric-label">Lowongan</span>
              </button>
              ${totalEarnings > 0 && isOwn ? `<div class="profile-metric profile-metric--static">
                <span class="profile-metric-icon profile-metric-icon--green" aria-hidden="true"><i class="fa-solid fa-wallet"></i></span>
                <span class="profile-metric-value profile-metric-value--green">${fmtIDR(totalEarnings)}</span>
                <span class="profile-metric-label">Total penghasilan</span>
              </div>` : ""}
            </div>
          </div>
        </div>

        <div class="profile-content card">
          <nav class="profile-tabs" aria-label="Konten profil">
            <button class="profile-tab active" data-tab="services"><i class="fa-solid fa-store"></i> Jasa <span class="profile-tab-count">${totalServices}</span></button>
            <button class="profile-tab" data-tab="history"><i class="fa-solid fa-briefcase"></i> Riwayat <span class="profile-tab-count">${history.length}</span></button>
            <button class="profile-tab" data-tab="jobs"><i class="fa-solid fa-clipboard-list"></i> Lowongan <span class="profile-tab-count">${totalJobs}</span></button>
            <button class="profile-tab" data-tab="reviews"><i class="fa-solid fa-star"></i> Ulasan <span class="profile-tab-count">${reviews.length}</span></button>
          </nav>

          <div id="tab-services" class="profile-tab-panel active">
            <div id="services-list" data-testid="public-profile-services">
              ${
                services.length
                  ? `<div class="marketplace-grid profile-services-grid">${services.map((s) => serviceCard(s)).join("")}</div>`
                  : profileEmptyState({
                      icon: "fa-box-open",
                      title: "Belum ada jasa",
                      text: isOwn
                        ? "Mulai tawarkan kemampuan Anda di marketplace Tolongin."
                        : "Pengguna ini belum menawarkan jasa.",
                      ctaHtml: isOwn
                        ? `<a href="#/dashboard/manage-services/new" class="btn btn-primary"><i class="fa-solid fa-plus"></i> Tambah Jasa</a>`
                        : "",
                    })
              }
            </div>
          </div>

          <div id="tab-history" class="profile-tab-panel" hidden>
            ${
              history.length
                ? renderHistoryList(history)
                : profileEmptyState({
                    icon: "fa-clock-rotate-left",
                    title: "Belum ada riwayat",
                    text: isOwn
                      ? "Riwayat muncul setelah pesanan selesai."
                      : "Belum ada riwayat pekerjaan yang ditampilkan.",
                  })
            }
          </div>

          <div id="tab-jobs" class="profile-tab-panel" hidden>
            <div id="jobs-list" class="profile-jobs-grid" data-testid="public-profile-jobs">
              ${
                jobs.length
                  ? jobs.map((j) => jobCard(j)).join("")
                  : profileEmptyState({
                      icon: "fa-briefcase",
                      title: "Belum ada lowongan",
                      text: isOwn
                        ? "Pasang lowongan untuk menemukan freelancer."
                        : "Pengguna ini belum memposting lowongan.",
                      ctaHtml: isOwn
                        ? `<a href="#/dashboard/manage-jobs/new" class="btn btn-primary"><i class="fa-solid fa-plus"></i> Pasang Lowongan</a>`
                        : "",
                    })
              }
            </div>
          </div>

          <div id="tab-reviews" class="profile-tab-panel" hidden>
            <div class="profile-rev-subtabs">
              <button class="profile-rev-sub active" data-rev="seller">Sebagai Penjual <span>${reviewsAsSeller.length}</span></button>
              <button class="profile-rev-sub" data-rev="buyer">Sebagai Klien <span>${reviewsAsBuyer.length}</span></button>
            </div>
            <div id="rev-seller" class="profile-rev-panel">
              ${renderReviewList(reviewsAsSeller, "Belum ada ulasan dari klien", isOwn)}
            </div>
            <div id="rev-buyer" class="profile-rev-panel" hidden>
              ${renderReviewList(reviewsAsBuyer, "Belum ada ulasan sebagai klien", isOwn)}
            </div>
          </div>
        </div>
      </div>
    `;

    // Tab switching
    const tabs = mount.querySelectorAll(".profile-tab");
    const contents = {
      services: mount.querySelector("#tab-services"),
      history: mount.querySelector("#tab-history"),
      jobs: mount.querySelector("#tab-jobs"),
      reviews: mount.querySelector("#tab-reviews"),
    };

    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const target = tab.dataset.tab;
        tabs.forEach((t) => t.classList.remove("active"));
        tab.classList.add("active");
        Object.values(contents).forEach((c) => {
          if (c) {
            c.classList.remove("active");
            c.hidden = true;
          }
        });
        if (contents[target]) {
          contents[target].classList.add("active");
          contents[target].hidden = false;
        }
      });
    });

    // Clickable stats
    mount.querySelectorAll(".clickable-stat").forEach((el) => {
      el.addEventListener("click", () => {
        const target = el.dataset.targetTab;
        const tabBtn = mount.querySelector(`.profile-tab[data-tab="${target}"]`);
        if (tabBtn) tabBtn.click();
      });
    });

    // Sub-tab ulasan
    const revBtns = mount.querySelectorAll(".profile-rev-sub");
    revBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const which = btn.dataset.rev;
        revBtns.forEach((b) => b.classList.toggle("active", b === btn));
        const sEl = mount.querySelector("#rev-seller");
        const bEl = mount.querySelector("#rev-buyer");
        if (sEl) sEl.hidden = which !== "seller";
        if (bEl) bEl.hidden = which !== "buyer";
      });
    });

    // Avatar upload handler
    const avatarInput = mount.querySelector("#avatar-upload");
    if (avatarInput) {
      avatarInput.addEventListener("change", async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("avatar", file);

        try {
          const result = await api.upload("/users/avatar", formData);
          toast("Foto profil berhasil diupdate!", "success");
          setTimeout(() => window.location.reload(), 1000);
        } catch (err) {
          toast(err.message || "Gagal upload foto", "error");
        }
      });
    }

    // Chat button
    document
      .getElementById("chat-user-btn")
      ?.addEventListener("click", async () => {
        if (!me) {
          toast("Silakan login dulu", "warning");
          return router.navigate("/login");
        }
        try {
          const r = await api.post("/chat/conversations", {
            recipientId: u.id,
          });
          router.navigate("/chat/" + r.id);
        } catch (err) {
          toast(err.message, "error");
        }
      });

    // Report button
    document
      .getElementById("report-user-btn")
      ?.addEventListener("click", () => {
        if (!me) {
          toast("Silakan login dulu untuk melaporkan", "warning");
          return;
        }
        toast("Laporan terkirim. Tim Tolongin akan meninjau.", "success");
      });

    const profileUserId = u.id;
    const patchReviewsUI = async () => {
      try {
        const [freshReviews, freshStats] = await Promise.all([
          api.get(`/reviews/user/${profileUserId}`),
          api.get(`/users/${profileUserId}/stats`),
        ]);
        const asSeller = Array.isArray(freshReviews?.asSeller) ? freshReviews.asSeller : [];
        const asBuyer = Array.isArray(freshReviews?.asBuyer) ? freshReviews.asBuyer : [];
        const avg = Number(freshStats?.averageRating) || 0;
        const count = Number(freshStats?.reviewCount) || 0;

        const metricVal = mount.querySelector(
          '[data-target-tab="reviews"] .profile-metric-value--gold',
        );
        const metricLbl = mount.querySelector(
          '[data-target-tab="reviews"] .profile-metric-label',
        );
        if (metricVal)
          metricVal.innerHTML = `<i class="fa-solid fa-star"></i> ${avg.toFixed(1)}`;
        if (metricLbl) metricLbl.textContent = `${count} ulasan`;

        const revTabCount = mount.querySelector(
          '.profile-tab[data-tab="reviews"] .profile-tab-count',
        );
        if (revTabCount)
          revTabCount.textContent = String((freshReviews?.all || []).length);

        const revSubs = mount.querySelectorAll(".profile-rev-sub span");
        if (revSubs[0]) revSubs[0].textContent = String(asSeller.length);
        if (revSubs[1]) revSubs[1].textContent = String(asBuyer.length);

        const sEl = mount.querySelector("#rev-seller");
        const bEl = mount.querySelector("#rev-buyer");
        if (sEl)
          sEl.innerHTML = renderReviewList(asSeller, "Belum ada ulasan dari klien", isOwn);
        if (bEl)
          bEl.innerHTML = renderReviewList(asBuyer, "Belum ada ulasan sebagai klien", isOwn);
      } catch (err) {
        if (import.meta.env.DEV) console.warn("[profile] review refresh failed", err);
      }
    };

    const onReviewsUpdated = (e) => {
      if (e.detail?.userId === profileUserId) void patchReviewsUI();
    };
    window.addEventListener("reviews-updated", onReviewsUpdated);
  } catch (err) {
    console.error("PublicProfilePage error:", err);
    mount.innerHTML = `<div class="container page public-profile-page">
      ${empty("Profil tidak ditemukan", err.message, "fa-user-slash")}
      <div style="text-align:center;margin-top:1rem">
        <a href="#/marketplace" class="btn btn-primary">Kembali ke Marketplace</a>
      </div>
    </div>`;
  }
}
