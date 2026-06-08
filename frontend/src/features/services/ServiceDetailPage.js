import { api } from "../../shared/utils/api.js";
import { escape, fmtIDR, timeAgo, toast } from "../../shared/utils/helpers.js";
import { avatar, stars, loading } from "../../shared/ui/components.js";
import { store } from "../../app/store.js";
import { router } from "../../app/router.js";

export async function ServiceDetailPage({ mount, params }) {
  const { user } = store.getState();
  mount.innerHTML = `<div class="container page"><div class="spinner"></div></div>`;

  try {
    const service = await api.get("/services/" + params.id);

    if (!service) {
      throw new Error("Service tidak ditemukan");
    }

    const seller = service.seller || {};
    const isOwner = user && seller.id === user.id;
    const deliveryTime = service.deliveryTime
      ? `${service.deliveryTime} hari pengerjaan`
      : "Fleksibel";
    const serviceTitle = service.title || "Layanan";
    const serviceDescription = service.description || "Tidak ada deskripsi";
    const sellerName = seller.name || "Penjual";
    const sellerCity = seller.city || "";
    const sellerRating = seller.rating || 0;
    const sellerReviewCount = seller.reviewCount || 0;
    const servicePrice = service.price || 0;
    const serviceRating = service.rating || 0;
    const serviceReviewCount = service.reviewCount || 0;

    mount.innerHTML = `
      <div class="service-detail-page" style="max-width:1200px; margin:0 auto; padding:20px;">
        <!-- Back Button -->
        <a href="#/marketplace" class="back-link" style="display:inline-flex; align-items:center; gap:8px; margin-bottom:20px; text-decoration:none; color:#0a66c2; font-size:14px;">
          <i class="fa-solid fa-arrow-left"></i> Kembali ke Cari Jasa
        </a>
        
        <!-- DESAIN: Gambar panjang vertikal, sidebar menyatu -->
        <div style="display:flex; gap:0; background:#fff; border-radius:16px; overflow:hidden; box-shadow:0 2px 12px rgba(0,0,0,0.08);">
          
          <!-- KOLOM KIRI: Gambar panjang vertikal (full height) -->
          <div style="flex: 1.2; min-width:0;">
            ${renderVerticalImage(service.images)}
          </div>
          
          <!-- KOLOM KANAN: Konten (tidak ada jarak dengan gambar) -->
          <div style="flex: 1; background:#fff; display:flex; flex-direction:column;">
            
            <!-- Header konten -->
            <div style="padding:24px 24px 16px 24px; border-bottom:1px solid #f0f0f0;">
              <div style="margin-bottom:8px;">
                <span class="badge" style="display:inline-block; background:#e8f0fe; color:#0a66c2; padding:4px 12px; border-radius:20px; font-size:12px;">
                  ${escape(service.category?.name || "Layanan")}
                </span>
              </div>
              <h1 style="font-size:1.8rem; margin:12px 0 8px 0; line-height:1.3;">${escape(serviceTitle)}</h1>
              
              <!-- Meta info -->
              <div style="display:flex; flex-wrap:wrap; gap:16px; margin-top:12px;">
                <span style="display:flex; align-items:center; gap:6px; font-size:13px; color:#666;">
                  <i class="fa-solid fa-star" style="color:#f5b042;"></i>
                  <strong>${serviceRating.toFixed(1)}</strong>
                  <span>(${serviceReviewCount} ulasan)</span>
                </span>
                <span style="display:flex; align-items:center; gap:6px; font-size:13px; color:#666;">
                  <i class="fa-solid fa-location-dot"></i> ${escape(sellerCity || "Remote")}
                </span>
                <span style="display:flex; align-items:center; gap:6px; font-size:13px; color:#666;">
                  <i class="fa-solid fa-clock"></i> ${escape(deliveryTime)}
                </span>
              </div>
            </div>
            
            <!-- Harga - LANGSUNG di bawah header (tanpa jarak besar) -->
            <div style="background:linear-gradient(135deg, #0a66c2 0%, #004182 100%); padding:20px 24px; color:#fff;">
              <div style="display:flex; align-items:baseline; justify-content:space-between; flex-wrap:wrap; gap:16px;">
                <div>
                  <div style="font-size:12px; opacity:0.8; text-transform:uppercase; letter-spacing:1px;">Mulai dari harga ini</div>
                  <div style="font-size:2rem; font-weight:700; margin-top:4px;">${fmtIDR(servicePrice)}</div>
                </div>
                <div style="display:flex; gap:12px;">
                  ${
                    !isOwner && user
                      ? `
                    <button class="order-btn" id="order-btn" style="background:#fff; color:#0a66c2; border:none; padding:10px 24px; border-radius:8px; font-size:14px; font-weight:600; cursor:pointer;">
                      <i class="fa-solid fa-bag-shopping"></i> Pesan Sekarang
                    </button>
                    <button class="chat-btn" id="chat-btn" style="background:transparent; color:#fff; border:1px solid #fff; padding:10px 24px; border-radius:8px; font-size:14px; font-weight:600; cursor:pointer;">
                      <i class="fa-solid fa-comment"></i> Chat
                    </button>
                  `
                      : isOwner
                        ? `
                    <div style="background:rgba(255,255,255,0.2); padding:10px 20px; border-radius:8px; font-size:14px;">
                      <i class="fa-solid fa-user-tie"></i> Jasa Anda
                    </div>
                  `
                        : `
                    <a href="#/login" style="background:#fff; color:#0a66c2; text-decoration:none; padding:10px 24px; border-radius:8px; font-size:14px; font-weight:600;">
                      <i class="fa-solid fa-sign-in-alt"></i> Login
                    </a>
                  `
                  }
                </div>
              </div>
            </div>
            
            <!-- Scrollable content area -->
            <div style="flex:1; overflow-y:auto; padding:20px 24px;">
              
              <!-- Deskripsi -->
              <div style="margin-bottom:24px;">
                <h3 style="font-size:1rem; margin:0 0 12px 0; color:#333; display:flex; align-items:center; gap:8px;">
                  <i class="fa-solid fa-align-left"></i> Deskripsi
                </h3>
                <p style="font-size:0.9rem; line-height:1.6; color:#555; margin:0;">${escape(serviceDescription)}</p>
              </div>
              
              <!-- Seller Info -->
              <div style="background:#f8f9fa; border-radius:12px; padding:16px; margin-bottom:24px;">
                <h3 style="font-size:0.8rem; margin:0 0 12px 0; color:#666; text-transform:uppercase; letter-spacing:0.5px;">Tentang Penjual</h3>
                <div style="display:flex; align-items:center; gap:12px;">
                  ${avatar(seller, "md")}
                  <div>
                    <div style="font-weight:700; font-size:1rem; display:flex; align-items:center; gap:6px;">
                      ${escape(sellerName)}
                      ${seller.verified ? '<i class="fa-solid fa-circle-check" style="color:#0a66c2; font-size:14px;"></i>' : ""}
                    </div>
                    <div style="font-size:0.8rem; color:#666; margin-top:4px;">
                      ⭐ ${sellerRating.toFixed(1)} (${sellerReviewCount} ulasan)
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Reviews Section -->
              <div>
                <h3 style="font-size:1rem; margin:0 0 16px 0; display:flex; align-items:center; gap:8px;">
                  <i class="fa-solid fa-comment"></i> Ulasan (${serviceReviewCount})
                </h3>
                <div id="reviews-list" style="max-height:300px; overflow-y:auto;"></div>
              </div>
            </div>
            
            <!-- Footer -->
            <div style="padding:12px 24px; border-top:1px solid #f0f0f0; background:#fafafa;">
              <div style="font-size:11px; color:#999; text-align:center;">
                <i class="fa-solid fa-shield-halved"></i> Pembayaran aman dengan escrow protection
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style>
        .order-btn:hover { background:#f0f0f0 !important; transform:translateY(-1px); transition:all 0.2s; }
        .chat-btn:hover { background:rgba(255,255,255,0.2) !important; transform:translateY(-1px); transition:all 0.2s; }
        .service-detail-page * { box-sizing:border-box; }
      </style>
    `;

    // Load reviews
    try {
      const reviews = await api.get(`/services/${service.id}/reviews`);
      const reviewsList = document.getElementById("reviews-list");
      if (reviews && reviews.length > 0) {
        reviewsList.innerHTML = reviews
          .map((r) => {
            const reviewerName = r.reviewer?.name || "User";
            const reviewComment = r.comment || "Tidak ada komentar";
            const reviewRating = r.rating || 0;

            return `
            <div class="review-item" style="padding:12px 0; border-bottom:1px solid #eee;">
              <div style="display:flex; align-items:center; gap:10px; margin-bottom:8px;">
                ${avatar(r.reviewer, "sm")}
                <div>
                  <div style="font-weight:600; font-size:0.85rem;">${escape(reviewerName)}</div>
                  <div style="font-size:0.7rem; color:#f5b042; margin-top:2px;">${stars(reviewRating)}</div>
                </div>
                <div style="font-size:0.7rem; color:#999; margin-left:auto;">${timeAgo(r.createdAt)}</div>
              </div>
              <p style="font-size:0.85rem; color:#555; line-height:1.5; margin:0;">${escape(reviewComment)}</p>
            </div>
          `;
          })
          .join("");
      } else {
        reviewsList.innerHTML = `
          <div style="text-align:center; padding:30px; color:#999;">
            <i class="fa-solid fa-comment-slash" style="font-size:2rem; margin-bottom:8px;"></i>
            <p style="margin:0;">Belum ada ulasan</p>
          </div>
        `;
      }
    } catch (e) {
      const reviewsList = document.getElementById("reviews-list");
      if (reviewsList) {
        reviewsList.innerHTML = `
          <div style="text-align:center; padding:30px; color:#999;">
            <i class="fa-solid fa-comment-slash" style="font-size:2rem; margin-bottom:8px;"></i>
            <p style="margin:0;">Belum ada ulasan</p>
          </div>
        `;
      }
    }

    // Order button handler
    const orderBtn = document.getElementById("order-btn");
    if (orderBtn) {
      orderBtn.addEventListener("click", async () => {
        if (!user) {
          toast("Silakan login terlebih dahulu", "warning");
          return router.navigate("/login");
        }
        try {
          const order = await api.post("/orders", { serviceId: service.id });
          toast("Pesanan berhasil dibuat!", "success");
          router.navigate(`/orders/${order.id}`);
        } catch (err) {
          toast(err.message, "error");
        }
      });
    }

    // Chat button handler
    const chatBtn = document.getElementById("chat-btn");
    if (chatBtn) {
      chatBtn.addEventListener("click", async () => {
        if (!user) {
          toast("Silakan login terlebih dahulu", "warning");
          return router.navigate("/login");
        }
        try {
          const conv = await api.post("/chat/conversations", {
            recipientId: seller.id,
          });
          router.navigate(`/chat/${conv.id}`);
        } catch (err) {
          toast(err.message, "error");
        }
      });
    }
  } catch (err) {
    console.error("Service detail error:", err);
    mount.innerHTML = `<div class="container page">
      <div class="empty" style="text-align:center; padding:60px 20px;">
        <i class="fa-solid fa-circle-exclamation" style="font-size:3rem; color:#ccc; margin-bottom:16px;"></i>
        <h3 style="margin-bottom:8px;">Jasa tidak ditemukan</h3>
        <p style="color:#999; margin-bottom:24px;">${escape(err.message)}</p>
        <a href="#/marketplace" class="btn btn-primary" style="display:inline-block; padding:10px 20px; background:#0a66c2; color:#fff; text-decoration:none; border-radius:8px;">Kembali ke Marketplace</a>
      </div>
    </div>`;
  }
}

// Fungsi render gambar dengan height penuh (vertical panjang)
function renderVerticalImage(images) {
  // Gambar akan mengisi full height kolom kiri

  if (!images) {
    return `
      <div style="height:100%; min-height:600px; background:linear-gradient(135deg, #667eea 0%, #764ba2 100%); display:flex; align-items:center; justify-content:center;">
        <i class="fa-solid fa-image" style="font-size:4rem; color:#fff; opacity:0.5;"></i>
      </div>
    `;
  }

  try {
    const imgArray = typeof images === "string" ? JSON.parse(images) : images;
    if (Array.isArray(imgArray) && imgArray.length > 0 && imgArray[0]) {
      return `
        <img src="${imgArray[0]}" 
             alt="Service" 
             style="width:100%; height:100%; min-height:600px; object-fit:cover; display:block;"
             onerror="this.onerror=null;this.src='https://placehold.co/800x800/0a66c2/ffffff?text=No+Image'" />
      `;
    }
  } catch (e) {
    // Not JSON
  }

  if (typeof images === "string" && images.startsWith("http")) {
    return `
      <img src="${images}" 
           alt="Service" 
           style="width:100%; height:100%; min-height:600px; object-fit:cover; display:block;"
           onerror="this.onerror=null;this.src='https://placehold.co/800x800/0a66c2/ffffff?text=No+Image'" />
    `;
  }

  return `
    <div style="height:100%; min-height:600px; background:linear-gradient(135deg, #667eea 0%, #764ba2 100%); display:flex; align-items:center; justify-content:center;">
      <i class="fa-solid fa-image" style="font-size:4rem; color:#fff; opacity:0.5;"></i>
    </div>
  `;
}
