import{a as e,c as t,i as n,l as r,n as i,o as a,r as o,s,t as c}from"./index-CHCgWdNT.js";async function l({mount:l,params:d}){let{user:f}=r.getState();l.innerHTML=`<div class="container page"><div class="spinner"></div></div>`;try{let r=await c.get(`/services/`+d.id);if(!r)throw Error(`Service tidak ditemukan`);let p=r.seller||{},m=f&&p.id===f.id,h=r.deliveryTime?`${r.deliveryTime} hari pengerjaan`:`Fleksibel`,g=r.title||`Layanan`,_=r.description||`Tidak ada deskripsi`,v=p.name||`Penjual`,y=p.city||``,b=p.rating||0,x=p.reviewCount||0,S=r.price||0,C=r.rating||0,w=r.reviewCount||0;l.innerHTML=`
      <div class="service-detail-page" style="max-width:1200px; margin:0 auto; padding:20px;">
        <!-- Back Button -->
        <a href="#/marketplace" class="back-link" style="display:inline-flex; align-items:center; gap:8px; margin-bottom:20px; text-decoration:none; color:#0a66c2; font-size:14px;">
          <i class="fa-solid fa-arrow-left"></i> Kembali ke Cari Jasa
        </a>
        
        <!-- DESAIN: Gambar panjang vertikal, sidebar menyatu -->
        <div style="display:flex; gap:0; background:#fff; border-radius:16px; overflow:hidden; box-shadow:0 2px 12px rgba(0,0,0,0.08);">
          
          <!-- KOLOM KIRI: Gambar panjang vertikal (full height) -->
          <div style="flex: 1.2; min-width:0;">
            ${u(r.images)}
          </div>
          
          <!-- KOLOM KANAN: Konten (tidak ada jarak dengan gambar) -->
          <div style="flex: 1; background:#fff; display:flex; flex-direction:column;">
            
            <!-- Header konten -->
            <div style="padding:24px 24px 16px 24px; border-bottom:1px solid #f0f0f0;">
              <div style="margin-bottom:8px;">
                <span class="badge" style="display:inline-block; background:#e8f0fe; color:#0a66c2; padding:4px 12px; border-radius:20px; font-size:12px;">
                  ${e(r.category?.name||`Layanan`)}
                </span>
              </div>
              <h1 style="font-size:1.8rem; margin:12px 0 8px 0; line-height:1.3;">${e(g)}</h1>
              
              <!-- Meta info -->
              <div style="display:flex; flex-wrap:wrap; gap:16px; margin-top:12px;">
                <span style="display:flex; align-items:center; gap:6px; font-size:13px; color:#666;">
                  <i class="fa-solid fa-star" style="color:#f5b042;"></i>
                  <strong>${C.toFixed(1)}</strong>
                  <span>(${w} ulasan)</span>
                </span>
                <span style="display:flex; align-items:center; gap:6px; font-size:13px; color:#666;">
                  <i class="fa-solid fa-location-dot"></i> ${e(y||`Remote`)}
                </span>
                <span style="display:flex; align-items:center; gap:6px; font-size:13px; color:#666;">
                  <i class="fa-solid fa-clock"></i> ${e(h)}
                </span>
              </div>
            </div>
            
            <!-- Harga - LANGSUNG di bawah header (tanpa jarak besar) -->
            <div style="background:linear-gradient(135deg, #0a66c2 0%, #004182 100%); padding:20px 24px; color:#fff;">
              <div style="display:flex; align-items:baseline; justify-content:space-between; flex-wrap:wrap; gap:16px;">
                <div>
                  <div style="font-size:12px; opacity:0.8; text-transform:uppercase; letter-spacing:1px;">Mulai dari harga ini</div>
                  <div style="font-size:2rem; font-weight:700; margin-top:4px;">${a(S)}</div>
                </div>
                <div style="display:flex; gap:12px;">
                  ${!m&&f?`
                    <button class="order-btn" id="order-btn" style="background:#fff; color:#0a66c2; border:none; padding:10px 24px; border-radius:8px; font-size:14px; font-weight:600; cursor:pointer;">
                      <i class="fa-solid fa-bag-shopping"></i> Pesan Sekarang
                    </button>
                    <button class="chat-btn" id="chat-btn" style="background:transparent; color:#fff; border:1px solid #fff; padding:10px 24px; border-radius:8px; font-size:14px; font-weight:600; cursor:pointer;">
                      <i class="fa-solid fa-comment"></i> Chat
                    </button>
                  `:m?`
                    <div style="background:rgba(255,255,255,0.2); padding:10px 20px; border-radius:8px; font-size:14px;">
                      <i class="fa-solid fa-user-tie"></i> Jasa Anda
                    </div>
                  `:`
                    <a href="#/login" style="background:#fff; color:#0a66c2; text-decoration:none; padding:10px 24px; border-radius:8px; font-size:14px; font-weight:600;">
                      <i class="fa-solid fa-sign-in-alt"></i> Login
                    </a>
                  `}
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
                <p style="font-size:0.9rem; line-height:1.6; color:#555; margin:0;">${e(_)}</p>
              </div>
              
              <!-- Seller Info -->
              <div style="background:#f8f9fa; border-radius:12px; padding:16px; margin-bottom:24px;">
                <h3 style="font-size:0.8rem; margin:0 0 12px 0; color:#666; text-transform:uppercase; letter-spacing:0.5px;">Tentang Penjual</h3>
                <div style="display:flex; align-items:center; gap:12px;">
                  ${i(p,`md`)}
                  <div>
                    <div style="font-weight:700; font-size:1rem; display:flex; align-items:center; gap:6px;">
                      ${e(v)}
                      ${p.verified?`<i class="fa-solid fa-circle-check" style="color:#0a66c2; font-size:14px;"></i>`:``}
                    </div>
                    <div style="font-size:0.8rem; color:#666; margin-top:4px;">
                      ⭐ ${b.toFixed(1)} (${x} ulasan)
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Reviews Section -->
              <div>
                <h3 style="font-size:1rem; margin:0 0 16px 0; display:flex; align-items:center; gap:8px;">
                  <i class="fa-solid fa-comment"></i> Ulasan (${w})
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
    `;try{let t=await c.get(`/reviews/service/${r.id}`),n=document.getElementById(`reviews-list`);t&&t.length>0?n.innerHTML=t.map(t=>{let n=t.reviewer?.name||`User`,r=t.comment||`Tidak ada komentar`,a=t.rating||0;return`
            <div class="review-item" style="padding:12px 0; border-bottom:1px solid #eee;">
              <div style="display:flex; align-items:center; gap:10px; margin-bottom:8px;">
                ${i(t.reviewer,`sm`)}
                <div>
                  <div style="font-weight:600; font-size:0.85rem;">${e(n)}</div>
                  <div style="font-size:0.7rem; color:#f5b042; margin-top:2px;">${o(a)}</div>
                </div>
                <div style="font-size:0.7rem; color:#999; margin-left:auto;">${s(t.createdAt)}</div>
              </div>
              <p style="font-size:0.85rem; color:#555; line-height:1.5; margin:0;">${e(r)}</p>
            </div>
          `}).join(``):n.innerHTML=`
          <div style="text-align:center; padding:30px; color:#999;">
            <i class="fa-solid fa-comment-slash" style="font-size:2rem; margin-bottom:8px;"></i>
            <p style="margin:0;">Belum ada ulasan</p>
          </div>
        `}catch{let e=document.getElementById(`reviews-list`);e&&(e.innerHTML=`
          <div style="text-align:center; padding:30px; color:#999;">
            <i class="fa-solid fa-comment-slash" style="font-size:2rem; margin-bottom:8px;"></i>
            <p style="margin:0;">Belum ada ulasan</p>
          </div>
        `)}let T=document.getElementById(`order-btn`);T&&T.addEventListener(`click`,async()=>{if(!f)return t(`Silakan login terlebih dahulu`,`warning`),n.navigate(`/login`);try{let e=await c.post(`/orders`,{serviceId:r.id});t(`Pesanan berhasil dibuat!`,`success`),n.navigate(`/orders/${e.id}`)}catch(e){t(e.message,`error`)}});let E=document.getElementById(`chat-btn`);E&&E.addEventListener(`click`,async()=>{if(!f)return t(`Silakan login terlebih dahulu`,`warning`),n.navigate(`/login`);try{let e=await c.post(`/chat/conversations`,{recipientId:p.id});n.navigate(`/chat/${e.id}`)}catch(e){t(e.message,`error`)}})}catch(t){console.error(`Service detail error:`,t),l.innerHTML=`<div class="container page">
      <div class="empty" style="text-align:center; padding:60px 20px;">
        <i class="fa-solid fa-circle-exclamation" style="font-size:3rem; color:#ccc; margin-bottom:16px;"></i>
        <h3 style="margin-bottom:8px;">Jasa tidak ditemukan</h3>
        <p style="color:#999; margin-bottom:24px;">${e(t.message)}</p>
        <a href="#/marketplace" class="btn btn-primary" style="display:inline-block; padding:10px 20px; background:#0a66c2; color:#fff; text-decoration:none; border-radius:8px;">Kembali ke Marketplace</a>
      </div>
    </div>`}}function u(e){if(!e)return`
      <div style="height:100%; min-height:600px; background:linear-gradient(135deg, #667eea 0%, #764ba2 100%); display:flex; align-items:center; justify-content:center;">
        <i class="fa-solid fa-image" style="font-size:4rem; color:#fff; opacity:0.5;"></i>
      </div>
    `;try{let t=typeof e==`string`?JSON.parse(e):e;if(Array.isArray(t)&&t.length>0&&t[0])return`
        <img src="${t[0]}" 
             alt="Service" 
             style="width:100%; height:100%; min-height:600px; object-fit:cover; display:block;"
             onerror="this.onerror=null;this.src='https://placehold.co/800x800/0a66c2/ffffff?text=No+Image'" />
      `}catch{}return typeof e==`string`&&e.startsWith(`http`)?`
      <img src="${e}" 
           alt="Service" 
           style="width:100%; height:100%; min-height:600px; object-fit:cover; display:block;"
           onerror="this.onerror=null;this.src='https://placehold.co/800x800/0a66c2/ffffff?text=No+Image'" />
    `:`
    <div style="height:100%; min-height:600px; background:linear-gradient(135deg, #667eea 0%, #764ba2 100%); display:flex; align-items:center; justify-content:center;">
      <i class="fa-solid fa-image" style="font-size:4rem; color:#fff; opacity:0.5;"></i>
    </div>
  `}export{l as ServiceDetailPage};