import { avatar } from "../../shared/ui/components.js";

export function renderAuthPanel(variant = "login") {
  const isLogin = variant === "login";

  const headline = isLogin
    ? "Selamat datang kembali!"
    : "Satu akun untuk semua";

  const sub = isLogin
    ? "Masuk untuk melanjutkan ke marketplace jasa & pekerjaan terbaik di Indonesia."
    : "Cari jasa, cari kerja, atau jual layanan — tanpa perlu pilih peran.";

  const bottomBlock = isLogin
    ? `<div class="auth-panel__quote">
        <i class="fa-solid fa-quote-left auth-panel__quote-icon" aria-hidden="true"></i>
        <p>"Tolongin membuat saya menemukan freelancer berkualitas dengan harga fair. Sangat membantu!"</p>
        <div class="auth-panel__quote-author">
          ${avatar({ name: "Rina Pratiwi" })}
          <div>
            <strong>Rina Pratiwi</strong>
            <span>Owner Brand Fashion</span>
          </div>
        </div>
      </div>`
    : `<ul class="auth-panel__features">
        <li><span class="auth-panel__feat-icon"><i class="fa-solid fa-gift"></i></span> Daftar gratis selamanya</li>
        <li><span class="auth-panel__feat-icon"><i class="fa-solid fa-shield-halved"></i></span> Pembayaran aman dengan escrow</li>
        <li><span class="auth-panel__feat-icon"><i class="fa-solid fa-badge-check"></i></span> Verifikasi bertahap saat dibutuhkan</li>
        <li><span class="auth-panel__feat-icon"><i class="fa-solid fa-users"></i></span> Komunitas freelancer Indonesia</li>
      </ul>`;

  return `
    <aside class="auth-panel" aria-hidden="false">
      <div class="auth-panel__bg" aria-hidden="true">
        <span class="auth-panel__blob auth-panel__blob--a"></span>
        <span class="auth-panel__blob auth-panel__blob--b"></span>
        <span class="auth-panel__blob auth-panel__blob--c"></span>
        <svg class="auth-panel__sweep" viewBox="0 0 400 400" preserveAspectRatio="none" aria-hidden="true">
          <path d="M-20 120 Q120 80 200 140 T420 100" fill="none" stroke="rgba(255,255,255,0.12)" stroke-width="2"/>
          <path d="M-10 260 Q150 220 280 280 T430 240" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="1.5"/>
        </svg>
      </div>

      <div class="auth-panel__floats" aria-hidden="true">
        <div class="auth-panel__chip auth-panel__chip--a"><i class="fa-solid fa-lock"></i> Escrow</div>
        <div class="auth-panel__chip auth-panel__chip--b"><i class="fa-solid fa-circle-check"></i> Terverifikasi</div>
        <div class="auth-panel__mini auth-panel__mini--service">
          <span class="auth-panel__mini-tag">Jasa Digital</span>
          <strong>Desain Logo</strong>
          <span>Rp 150rb</span>
        </div>
        <div class="auth-panel__mini auth-panel__mini--job">
          <span class="auth-panel__mini-tag">Lowongan</span>
          <strong>Admin Toko</strong>
          <span>Bandung</span>
        </div>
      </div>

      <div class="auth-panel__content">
        <div class="auth-panel__brand">
          <span class="auth-panel__brand-icon"><i class="fa-solid fa-handshake-angle"></i></span>
          <span class="auth-panel__brand-name">tolong<span>in</span></span>
        </div>
        <h2 class="auth-panel__title">${headline}</h2>
        <p class="auth-panel__sub">${sub}</p>
        ${bottomBlock}
      </div>
    </aside>`;
}
