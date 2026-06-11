import { api } from "../../shared/utils/api.js";
import { escape, fmtIDR, toast, timeAgo } from "../../shared/utils/helpers.js";
import {
  avatar,
  serviceCard,
  empty,
  stars,
} from "../../shared/ui/components.js";
import { store } from "../../app/store.js";
import { router } from "../../app/router.js";

export async function PublicProfilePage({ mount, params }) {
  mount.innerHTML = `<div class="container page"><div class="spinner"></div></div>`;
  const userId = params.id;

  try {
    // Ambil semua data sekaligus
    const [u, services, reviewsData, jobs, workHistory] = await Promise.all([
      api.get("/users/" + userId),
      api.get(`/users/${userId}/services`).catch(() => []),
      api
        .get(`/users/${userId}/reviews`)
        .catch(() => ({ reviews: [], rating: 0, reviewCount: 0 })),
      api.get(`/users/${userId}/jobs`).catch(() => []),
      api.get(`/users/${userId}/work-history`).catch(() => []),
    ]);

    const me = store.getState().user;
    const isOwn = me && me.id === u.id;

    // Data reviews
    const reviews = Array.isArray(reviewsData)
      ? reviewsData
      : reviewsData.reviews || [];
    const avgRating = u.rating || reviewsData.rating || 0;
    const reviewCount =
      u.reviewCount || reviewsData.reviewCount || reviews.length;

    // Hitung statistik
    const totalServices = services.length;
    const totalJobs = jobs.length;
    const activeJobs = jobs.filter(
      (j) => j.status === "OPEN" || j.status === "open",
    ).length;
    const completedWork = workHistory.filter(
      (w) => String(w.status).toUpperCase() === "COMPLETED",
    ).length;

    mount.innerHTML = `
      <div class="container page" style="max-width:1200px; margin:0 auto; padding:20px;">
        <a href="#/marketplace" class="text-sm" data-testid="public-profile-back" style="display:inline-block; margin-bottom:20px; text-decoration:none; color:#0a66c2;">
          <i class="fa-solid fa-arrow-left"></i> Kembali ke Marketplace
        </a>

        <!-- Profile Header Card -->
        <div class="card card-pad-lg" style="background:#fff; border-radius:16px; padding:24px; margin-bottom:24px; box-shadow:0 1px 3px rgba(0,0,0,0.1);">
          <div style="display:flex; gap:24px; align-items:center; flex-wrap:wrap;">
            ${avatar(u, "xl")}
            <div style="flex:1; min-width:240px;">
              <div style="display:flex; gap:8px; align-items:center; flex-wrap:wrap;">
                <h1 style="margin:0; font-size:1.8rem;" data-testid="public-profile-name">${escape(u.name || "User")}</h1>
                ${u.verified ? '<i class="fa-solid fa-circle-check" style="color:#0a66c2; font-size:20px;" title="Terverifikasi"></i>' : ""}
                ${u.role === "ADMIN" ? '<span class="badge" style="background:#f5b042; color:#fff;">Admin</span>' : ""}
              </div>
              <p class="text-muted" style="margin:8px 0 12px 0; color:#666;" data-testid="public-profile-bio">
                ${escape(u.bio || "Belum ada bio")}
              </p>
              <div style="display:flex; gap:20px; flex-wrap:wrap; font-size:14px; color:#666;">
                <span><i class="fa-solid fa-star" style="color:#f5b042;"></i> <strong>${avgRating.toFixed(1)}</strong> (${reviewCount} ulasan)</span>
                <span><i class="fa-solid fa-bag-shopping"></i> ${u.completedOrders || 0} pesanan selesai</span>
                ${u.city ? `<span><i class="fa-solid fa-location-dot"></i> ${escape(u.city)}</span>` : ""}
                <span><i class="fa-solid fa-calendar"></i> Bergabung ${timeAgo(u.createdAt)}</span>
              </div>
            </div>
            <div style="display:flex; gap:12px; flex-wrap:wrap;">
              ${
                !isOwn
                  ? `
                <button class="btn btn-primary" id="chat-user-btn" data-testid="public-profile-chat-btn" style="background:#0a66c2; color:#fff; border:none; padding:10px 20px; border-radius:8px; cursor:pointer;">
                  <i class="fa-solid fa-message"></i> Chat
                </button>
                <button class="btn btn-secondary" id="report-user-btn" data-testid="public-profile-report-btn" style="background:#f0f0f0; border:none; padding:10px 20px; border-radius:8px; cursor:pointer;">
                  <i class="fa-solid fa-flag"></i> Laporkan
                </button>
              `
                  : `<a class="btn btn-secondary" href="#/settings" data-testid="public-profile-edit-btn" style="background:#f0f0f0; text-decoration:none; padding:10px 20px; border-radius:8px;"><i class="fa-solid fa-pen"></i> Edit Profil</a>`
              }
            </div>
          </div>
        </div>

        <!-- Statistik Ringkasan -->
        <div style="display:grid; grid-template-columns:repeat(auto-fit,minmax(150px,1fr)); gap:16px; margin-bottom:24px;">
          <div class="stat-card" style="background:#fff; text-align:center; padding:16px; border-radius:12px; box-shadow:0 1px 3px rgba(0,0,0,0.1);">
            <div style="font-size:2rem; font-weight:700; color:#0a66c2;">${totalServices}</div>
            <div style="font-size:13px; color:#666;">Jasa Ditawarkan</div>
          </div>
          <div class="stat-card" style="background:#fff; text-align:center; padding:16px; border-radius:12px; box-shadow:0 1px 3px rgba(0,0,0,0.1);">
            <div style="font-size:2rem; font-weight:700; color:#0a66c2;">${totalJobs}</div>
            <div style="font-size:13px; color:#666;">Pekerjaan Diposting</div>
          </div>
          <div class="stat-card" style="background:#fff; text-align:center; padding:16px; border-radius:12px; box-shadow:0 1px 3px rgba(0,0,0,0.1);">
            <div style="font-size:2rem; font-weight:700; color:#0a66c2;">${activeJobs}</div>
            <div style="font-size:13px; color:#666;">Pekerjaan Aktif</div>
          </div>
          <div class="stat-card" style="background:#fff; text-align:center; padding:16px; border-radius:12px; box-shadow:0 1px 3px rgba(0,0,0,0.1);">
            <div style="font-size:2rem; font-weight:700; color:#0a66c2;">${completedWork}</div>
            <div style="font-size:13px; color:#666;">CV Pekerjaan</div>
          </div>
        </div>

        <!-- Tab Navigation -->
        <div style="display:flex; gap:8px; border-bottom:1px solid #e0e0e0; margin-bottom:24px;">
          <button class="tab-btn active" data-tab="services" style="padding:12px 20px; background:none; border:none; cursor:pointer; font-weight:600; color:#0a66c2; border-bottom:2px solid #0a66c2;">Jasa Ditawarkan (${totalServices})</button>
          <button class="tab-btn" data-tab="work" style="padding:12px 20px; background:none; border:none; cursor:pointer; font-weight:600; color:#666;">CV / Riwayat (${workHistory.length})</button>
          <button class="tab-btn" data-tab="jobs" style="padding:12px 20px; background:none; border:none; cursor:pointer; font-weight:600; color:#666;">Pekerjaan Diposting (${totalJobs})</button>
          <button class="tab-btn" data-tab="reviews" style="padding:12px 20px; background:none; border:none; cursor:pointer; font-weight:600; color:#666;">Ulasan (${reviews.length})</button>
        </div>

        <!-- Tab Content: Services -->
        <div id="tab-services" class="tab-content active">
          <div id="services-list" data-testid="public-profile-services">
            ${
              services.length
                ? `<div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(280px,1fr)); gap:20px;">
                    ${services.map((s) => serviceCard(s)).join("")}
                  </div>`
                : `<div style="text-align:center; padding:60px 20px; background:#fafafa; border-radius:12px;">
                    <i class="fa-solid fa-box-open" style="font-size:3rem; color:#ccc;"></i>
                    <h3 style="margin:12px 0 8px;">Belum ada jasa</h3>
                    <p style="color:#999;">User ini belum memposting jasa.</p>
                  </div>`
            }
          </div>
        </div>

        <!-- Tab Content: Work CV -->
        <div id="tab-work" class="tab-content" style="display:none;">
          ${
            workHistory.length
              ? `<div style="display:flex; flex-direction:column; gap:14px;">
                  ${workHistory.map((w) => `
                    <div class="job-card" style="background:#fff;border-radius:12px;padding:18px;box-shadow:0 1px 3px rgba(0,0,0,.1)">
                      <div style="display:flex;justify-content:space-between;gap:1rem;flex-wrap:wrap">
                        <div>
                          <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:8px">
                            <span class="badge">${escape(w.label)}</span>
                            <span class="badge ${String(w.status).toUpperCase() === "COMPLETED" ? "badge-success" : "badge-warning"}">${escape(w.status)}</span>
                          </div>
                          <h3 style="margin:.25rem 0">${escape(w.title)}</h3>
                          <div class="text-sm text-muted">Client: ${escape(w.client?.name || "-")} · ${timeAgo(w.createdAt)}</div>
                        </div>
                        <strong style="color:#0a66c2">${fmtIDR(w.amount || 0)}</strong>
                      </div>
                      ${w.review ? `<div style="margin-top:12px;padding:12px;border-radius:8px;background:#f8f9fa"><span style="color:#f5b042">${"★".repeat(w.review.rating)}${"☆".repeat(5 - w.review.rating)}</span><p style="margin:.35rem 0 0">${escape(w.review.comment || "")}</p></div>` : ""}
                    </div>
                  `).join("")}
                </div>`
              : `<div style="text-align:center; padding:60px 20px; background:#fafafa; border-radius:12px;"><i class="fa-solid fa-clipboard-check" style="font-size:3rem; color:#ccc;"></i><h3>Belum ada riwayat kerja</h3><p style="color:#999;">Riwayat akan muncul setelah user mengerjakan pesanan atau job.</p></div>`
          }
        </div>

        <!-- Tab Content: Jobs -->
        <div id="tab-jobs" class="tab-content" style="display:none;">
          <div id="jobs-list" data-testid="public-profile-jobs">
            ${
              jobs.length
                ? `<div style="display:flex; flex-direction:column; gap:16px;">
                    ${jobs
                      .map(
                        (j) => `
                      <div class="job-card" data-job-id="${j.id}" style="background:#fff; border-radius:12px; padding:20px; cursor:pointer; box-shadow:0 1px 3px rgba(0,0,0,0.1); transition:box-shadow 0.2s;">
                        <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap;">
                          <div style="flex:1;">
                            <div style="display:flex; gap:8px; margin-bottom:8px; flex-wrap:wrap;">
                              <span class="badge" style="background:${j.status === "OPEN" || j.status === "open" ? "#4caf50" : "#999"}; color:#fff; padding:4px 12px; border-radius:20px; font-size:12px;">
                                ${j.status === "OPEN" || j.status === "open" ? "Aktif" : "Ditutup"}
                              </span>
                              <span style="font-size:12px; color:#999;">${timeAgo(j.createdAt)}</span>
                            </div>
                            <h3 style="margin:8px 0; font-size:1.1rem;">${escape(j.title)}</h3>
                            <p style="color:#666; font-size:14px; line-height:1.5; margin:8px 0; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden;">
                              ${escape(j.description?.substring(0, 120) || "")}${(j.description?.length || 0) > 120 ? "..." : ""}
                            </p>
                            <div style="display:flex; gap:16px; margin-top:12px; font-size:13px; color:#666; flex-wrap:wrap;">
                              <span><i class="fa-solid fa-money-bill-wave"></i> ${fmtIDR(j.budget)}</span>
                              <span><i class="fa-solid fa-location-dot"></i> ${escape(j.city || "Remote")}</span>
                              ${j.deadline ? `<span><i class="fa-solid fa-calendar"></i> Deadline: ${new Date(j.deadline).toLocaleDateString()}</span>` : ""}
                            </div>
                          </div>
                          <div style="text-align:right; margin-top:8px;">
                            <span style="background:#f0f0f0; padding:4px 12px; border-radius:20px; font-size:12px;">${j.applicationsCount || j.applicationCount || 0} pelamar</span>
                          </div>
                        </div>
                      </div>
                    `,
                      )
                      .join("")}
                  </div>`
                : `<div style="text-align:center; padding:60px 20px; background:#fafafa; border-radius:12px;">
                    <i class="fa-solid fa-briefcase" style="font-size:3rem; color:#ccc;"></i>
                    <h3 style="margin:12px 0 8px;">Belum ada pekerjaan</h3>
                    <p style="color:#999;">User ini belum memposting pekerjaan.</p>
                  </div>`
            }
          </div>
        </div>

        <!-- Tab Content: Reviews -->
        <div id="tab-reviews" class="tab-content" style="display:none;">
          <div style="background:#fff; border-radius:12px; padding:20px; box-shadow:0 1px 3px rgba(0,0,0,0.1);">
            ${
              reviews.length
                ? reviews
                    .map(
                      (r) => `
                  <div class="review-item" style="padding:16px 0; border-bottom:1px solid #eee;">
                    <div style="display:flex; gap:12px; align-items:center;">
                      ${avatar(r.reviewer || { name: "User", id: r.reviewerId }, "sm")}
                      <div style="flex:1;">
                        <strong>${escape(r.reviewer?.name || "User")}</strong>
                        <div style="font-size:11px; color:#999; margin-top:2px;">${timeAgo(r.createdAt)}</div>
                      </div>
                      <div style="color:#f5b042; font-size:14px;">${"★".repeat(r.rating || 5)}${"☆".repeat(5 - (r.rating || 5))}</div>
                    </div>
                    <p style="margin:12px 0 0 52px; color:#555; font-size:14px; line-height:1.5;">${escape(r.comment || "")}</p>
                    ${r.serviceTitle ? `<p style="margin:8px 0 0 52px; font-size:12px; color:#999;"><i class="fa-solid fa-briefcase"></i> Jasa: ${escape(r.serviceTitle)}</p>` : ""}
                  </div>
                `,
                    )
                    .join("")
                : '<p style="text-align:center; padding:40px; color:#999;">Belum ada ulasan</p>'
            }
          </div>
        </div>
      </div>
      
      <style>
        .job-card:hover { box-shadow:0 4px 12px rgba(0,0,0,0.15); transform:translateY(-2px); transition:all 0.2s; }
        .tab-btn:hover { color:#0a66c2; }
        .service-card { transition:transform 0.2s, box-shadow 0.2s; }
        .service-card:hover { transform:translateY(-4px); box-shadow:0 4px 12px rgba(0,0,0,0.15); }
      </style>
    `;

    // Tab switching
    const tabs = mount.querySelectorAll(".tab-btn");
    const contents = {
      services: mount.querySelector("#tab-services"),
      work: mount.querySelector("#tab-work"),
      jobs: mount.querySelector("#tab-jobs"),
      reviews: mount.querySelector("#tab-reviews"),
    };

    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const target = tab.dataset.tab;
        tabs.forEach((t) => {
          t.classList.remove("active");
          t.style.color = "#666";
          t.style.borderBottom = "none";
        });
        tab.classList.add("active");
        tab.style.color = "#0a66c2";
        tab.style.borderBottom = "2px solid #0a66c2";

        Object.values(contents).forEach((c) => {
          if (c) c.style.display = "none";
        });
        if (contents[target]) contents[target].style.display = "block";
      });
    });

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

    // Click job card to navigate
    document.querySelectorAll(".job-card").forEach((card) => {
      card.addEventListener("click", (e) => {
        if (e.target.closest(".job-card")) {
          const jobId = card.dataset.jobId;
          router.navigate(`/jobs/${jobId}`);
        }
      });
    });

    // Seller links in service cards
    document.querySelectorAll(".seller-link").forEach((el) => {
      el.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        const uid = el.dataset.userId;
        if (uid) router.navigate("/users/" + uid);
      });
    });

    // Service card click (already handled by serviceCard component)
    document.querySelectorAll(".service-card").forEach((card) => {
      card.addEventListener("click", (e) => {
        if (e.target.closest(".seller-link") || e.target.closest(".btn-fav"))
          return;
        const serviceId = card.getAttribute("href")?.split("/").pop();
        if (serviceId) router.navigate(`/services/${serviceId}`);
      });
    });
  } catch (err) {
    console.error("PublicProfilePage error:", err);
    mount.innerHTML = `<div class="container page">
      <div style="text-align:center; padding:60px 20px;">
        <i class="fa-solid fa-user-slash" style="font-size:3rem; color:#ccc;"></i>
        <h3>User tidak ditemukan</h3>
        <p style="color:#999;">${escape(err.message)}</p>
        <a href="#/marketplace" class="btn btn-primary" style="display:inline-block; margin-top:16px; padding:10px 20px; background:#0a66c2; color:#fff; text-decoration:none; border-radius:8px;">Kembali ke Marketplace</a>
      </div>
    </div>`;
  }
}
