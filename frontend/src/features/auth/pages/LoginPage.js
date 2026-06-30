import { api } from "../../../shared/utils/api.js";
import { store } from "../../../app/store.js";
import { router } from "../../../app/router.js";
import { toast, isEmail, bindPasswordToggles } from "../../../shared/utils/helpers.js";
import { renderAuthPanel } from "../auth-panel.js";

export function LoginPage({ mount }) {
  mount.innerHTML = `
    <div class="auth-wrap auth-wrap--login">
      ${renderAuthPanel("login")}
      <div class="auth-form-wrap">
        <form class="auth-form auth-form--compact" id="login-form" data-testid="login-form">
          <h1>Masuk</h1>
          <p class="sub">Belum punya akun? <a href="#/register" data-testid="goto-register">Daftar sekarang</a></p>
          <div class="form-group">
            <label class="label">Email</label>
            <div class="input-icon">
              <i class="fa-solid fa-envelope"></i>
              <input class="input" type="email" id="email" placeholder="email@anda.com" data-testid="login-email" required>
            </div>
          </div>
          <div class="form-group">
            <label class="label">Password</label>
            <div class="auth-pw-wrap">
              <div class="input-icon">
                <i class="fa-solid fa-lock"></i>
                <input class="input" type="password" id="password" placeholder="••••••" data-testid="login-password" required>
              </div>
              <button type="button" class="toggle-password" data-target="password" aria-label="Tampilkan password">
                <i class="fa-regular fa-eye"></i>
              </button>
            </div>
          </div>
          <div class="auth-form-meta">
            <span class="auth-form-meta__hint"><i class="fa-solid fa-lock"></i> Sesi aman dengan cookie httpOnly</span>
            <a href="#/forgot-password" data-testid="forgot-link">Lupa password?</a>
          </div>
          <button class="btn btn-primary btn-block auth-submit" type="submit" data-testid="login-submit-btn">Masuk</button>
        </form>
      </div>
    </div>`;

  bindPasswordToggles(mount);

  document
    .getElementById("login-form")
    .addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value;

      if (!isEmail(email)) return toast("Email tidak valid", "error");
      if (password.length < 6)
        return toast("Password minimal 6 karakter", "error");

      const btn = e.target.querySelector("button[type=submit]");
      btn.disabled = true;
      btn.innerHTML =
        '<i class="fa-solid fa-spinner fa-spin"></i> Memproses...';

      try {
        const { token, user } = await api.post("/auth/login", {
          email,
          password,
        });
        store.setState({ token, user });
        toast(`Halo, ${user.name}! 👋`, "success");
        router.navigate(user.role === "ADMIN" ? "/admin" : "/dashboard");
      } catch (err) {
        toast(err.message, "error");
        btn.disabled = false;
        btn.innerHTML = "Masuk";
      }
    });
}
