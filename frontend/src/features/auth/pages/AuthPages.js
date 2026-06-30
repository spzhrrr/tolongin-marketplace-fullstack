import { api } from "../../../shared/utils/api.js";
import { store } from "../../../app/store.js";
import { router } from "../../../app/router.js";
import { toast, isEmail, bindPasswordToggles } from "../../../shared/utils/helpers.js";
import { renderAuthPanel } from "../auth-panel.js";

export function RegisterPage({ mount }) {
  mount.innerHTML = `
    <div class="auth-wrap auth-wrap--register">
      ${renderAuthPanel("register")}
      <div class="auth-form-wrap">
        <form class="auth-form auth-form--compact auth-form--register" id="reg-form" data-testid="register-form">
          <h1>Daftar Akun</h1>
          <p class="sub">Sudah punya akun? <a href="#/login" data-testid="goto-login">Masuk di sini</a></p>
          <div class="auth-form-grid">
            <div class="form-group auth-form-grid__full">
              <label class="label">Nama Lengkap</label>
              <div class="input-icon"><i class="fa-solid fa-user"></i><input class="input" id="name" placeholder="Nama Anda" data-testid="reg-name" required minlength="3"></div>
            </div>
            <div class="form-group">
              <label class="label">Email</label>
              <div class="input-icon"><i class="fa-solid fa-envelope"></i><input class="input" type="email" id="email" placeholder="email@anda.com" data-testid="reg-email" required></div>
            </div>
            <div class="form-group">
              <label class="label">No. Telepon</label>
              <div class="input-icon"><i class="fa-solid fa-phone"></i><input class="input" type="tel" id="phone" placeholder="0812xxxxxxxx" data-testid="reg-phone"></div>
            </div>
            <div class="form-group">
              <label class="label">Password</label>
              <div class="auth-pw-wrap">
                <div class="input-icon"><i class="fa-solid fa-lock"></i><input class="input" type="password" id="password" placeholder="Min 8 karakter" data-testid="reg-password" required minlength="8"></div>
                <button type="button" class="toggle-password" data-target="password" aria-label="Tampilkan password">
                  <i class="fa-regular fa-eye"></i>
                </button>
              </div>
            </div>
            <div class="form-group">
              <label class="label">Konfirmasi Password</label>
              <div class="auth-pw-wrap">
                <div class="input-icon"><i class="fa-solid fa-lock"></i><input class="input" type="password" id="confirm" placeholder="Ulangi password" data-testid="reg-confirm" required minlength="8"></div>
                <button type="button" class="toggle-password" data-target="confirm" aria-label="Tampilkan password">
                  <i class="fa-regular fa-eye"></i>
                </button>
              </div>
            </div>
          </div>
          <p class="auth-pw-hint" id="pw-hint">Min 8 karakter · huruf besar &amp; kecil · angka · simbol</p>
          <label class="auth-tnc"><input type="checkbox" required data-testid="register-tnc"> Saya setuju <a href="#/">Syarat &amp; Ketentuan</a></label>
          <button class="btn btn-primary btn-block auth-submit" type="submit" data-testid="register-submit-btn">Daftar Sekarang</button>
        </form>
      </div>
    </div>`;

  bindPasswordToggles(mount);

  document.getElementById("reg-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();

    const phone = document.getElementById("phone").value.trim();

    const password = document.getElementById("password").value;
    const confirm = document.getElementById("confirm").value;
    if (name.length < 3) return toast("Nama minimal 3 karakter", "error");
    if (!isEmail(email)) return toast("Email tidak valid", "error");
    const strongPw =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
    if (!strongPw.test(password))
      return toast(
        "Password harus min 8 karakter dengan huruf besar, kecil, angka & simbol",
        "error",
      );
    if (password !== confirm)
      return toast("Konfirmasi password tidak cocok", "error");
    const btn = e.target.querySelector("button[type=submit]");
    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Memproses...';
    try {
      const body = { name, email, password };
      if (phone) body.phone = phone;
      const { token, user } = await api.post("/auth/register", body);
      store.setState({ token, user });
      toast("Akun berhasil dibuat! Selamat datang 🎉", "success");
      router.navigate("/dashboard");
    } catch (err) {
      toast(err.message, "error");
      btn.disabled = false;
      btn.innerHTML = "Daftar Sekarang";
    }
  });
}

// VerifyEmailPage — handles ?token=... from email link
export function VerifyEmailPage({ mount, query }) {
  mount.innerHTML = `
    <div class="container-sm" style="padding:4rem 1rem">
      <div class="card card-pad-lg text-center" id="ve-card">
        <div class="spinner"></div>
        <p>Memverifikasi email...</p>
      </div>
    </div>`;
  const card = document.getElementById("ve-card");
  (async () => {
    if (!query.token) {
      card.innerHTML = `<i class="fa-solid fa-circle-xmark" style="font-size:3rem;color:var(--danger)"></i><h2>Token tidak ditemukan</h2><a class="btn btn-primary mt-2" href="#/">Beranda</a>`;
      return;
    }
    try {
      await api.get(
        "/auth/verify-email?token=" + encodeURIComponent(query.token),
      );
      const u = store.getState().user;
      if (u) store.setState({ user: { ...u, emailVerified: true } });
      card.innerHTML = `<i class="fa-solid fa-circle-check" style="font-size:3rem;color:var(--success)"></i><h2>Email Terverifikasi!</h2><p class="text-muted">Akun Anda sekarang sudah aktif sepenuhnya.</p><a class="btn btn-primary mt-2" href="#/dashboard" data-testid="ve-go-dashboard">Ke Dashboard</a>`;
    } catch (err) {
      card.innerHTML = `<i class="fa-solid fa-circle-xmark" style="font-size:3rem;color:var(--danger)"></i><h2>Verifikasi Gagal</h2><p class="text-muted">${escape(err.message)}</p><a class="btn btn-secondary mt-2" href="#/">Beranda</a>`;
    }
  })();
}

export function ForgotPasswordPage({ mount }) {
  mount.innerHTML = `
    <div class="container-sm" style="padding:4rem 1rem">
      <div class="card card-pad-lg">
        <h1>Lupa Password</h1>
        <p class="text-muted">Masukkan email Anda, kami akan kirim tautan reset kata sandi.</p>
        <form id="forgot-form">
          <div class="form-group">
            <label class="label">Email</label>
            <input class="input" type="email" id="email" placeholder="email@anda.com" data-testid="forgot-email" required>
          </div>
          <button class="btn btn-primary btn-block" type="submit" data-testid="forgot-submit-btn">Kirim Link Reset</button>
        </form>
        <p class="text-center mt-2"><a href="#/login">Kembali ke Login</a></p>
      </div>
    </div>`;
  document
    .getElementById("forgot-form")
    .addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = document.getElementById("email").value.trim();
      try {
        const r = await api.post("/auth/forgot-password", { email });
        if (r.resetToken) {
          toast("Token reset dibuat. Mengarahkan...", "success");
          setTimeout(
            () => router.navigate(`/reset-password?token=${r.resetToken}`),
            800,
          );
        } else {
          toast("Jika email terdaftar, link reset akan dikirim", "info");
        }
      } catch (err) {
        toast(err.message, "error");
      }
    });
}

export function ResetPasswordPage({ mount, query }) {
  mount.innerHTML = `
    <div class="container-sm" style="padding:4rem 1rem">
      <div class="card card-pad-lg">
        <h1>Reset Password</h1>
        <p class="text-muted">Masukkan password baru Anda.</p>
        <form id="reset-form">
          <input type="hidden" id="token" value="${query.token || ""}">
          <div class="form-group">
            <label class="label">Password Baru</label>
            <div style="position: relative;">
              <input class="input" type="password" id="password" placeholder="Min 8 karakter, 1 angka, 1 simbol" data-testid="reset-password" required minlength="8" style="padding-right: 40px;">
              <button type="button" class="toggle-password" data-target="password" aria-label="Tampilkan password">
                <i class="fa-regular fa-eye"></i>
              </button>
            </div>
            <div class="text-xs text-muted">Minimal 8 karakter, mengandung 1 angka dan 1 simbol (!@#$%^&*)</div>
          </div>
          <button class="btn btn-primary btn-block" type="submit" data-testid="reset-submit-btn">Reset Password</button>
        </form>
      </div>
    </div>`;

  bindPasswordToggles(mount);

  document
    .getElementById("reset-form")
    .addEventListener("submit", async (e) => {
      e.preventDefault();
      const token = document.getElementById("token").value;
      const password = document.getElementById("password").value;

      // Validasi password sama dengan register
      const strongPw =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
      if (!strongPw.test(password)) {
        toast(
          "Password harus min 8 karakter dengan huruf besar, kecil, angka & simbol",
          "error",
        );
        return;
      }

      try {
        await api.post("/auth/reset-password", { token, password });
        toast("Password berhasil direset, silakan login", "success");
        router.navigate("/login");
      } catch (err) {
        toast(err.message, "error");
      }
    });
}
