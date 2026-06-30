// frontend/src/features/profile/ProfilePages.js

import { api, resolveAssetUrl } from "../../shared/utils/api.js";
import { escape, toast } from "../../shared/utils/helpers.js";
import { avatar } from "../../shared/ui/components.js";
import { store } from "../../app/store.js";
import { router } from "../../app/router.js";

const SETTINGS_SECTIONS = [
  { key: "profile", icon: "fa-user-pen", label: "Profil Publik", desc: "Info yang tampil di profil Anda" },
  { key: "security", icon: "fa-lock", label: "Keamanan", desc: "Password & akses akun" },
  { key: "notifications", icon: "fa-bell", label: "Notifikasi", desc: "Preferensi pemberitahuan" },
  { key: "verification", icon: "fa-shield-halved", label: "Verifikasi", desc: "Status kepercayaan akun" },
];

function settingsNav(active, userId) {
  const links = SETTINGS_SECTIONS.map(
    (s) =>
      `<a class="settings-nav-link ${active === s.key ? "active" : ""}" href="#/settings/${s.key}" data-testid="settings-nav-${s.key}">
        <i class="fa-solid ${s.icon}"></i>
        <span><strong>${s.label}</strong><small>${s.desc}</small></span>
      </a>`,
  ).join("");
  return `<aside class="settings-nav card">
    <div class="settings-nav-head">
      <h1 class="settings-nav-title">Pengaturan</h1>
      <p class="settings-nav-sub">Kelola akun & preferensi Anda</p>
    </div>
    <nav class="settings-nav-list">${links}</nav>
    <div class="settings-nav-footer">
      <a class="settings-nav-external" href="#/users/${userId}" data-testid="settings-view-public">
        <i class="fa-solid fa-arrow-up-right-from-square"></i> Lihat profil publik
      </a>
      <a class="settings-nav-external" href="#/dashboard">
        <i class="fa-solid fa-gauge"></i> Kembali ke dashboard
      </a>
    </div>
  </aside>`;
}

function settingsShell(active, bodyHtml) {
  const u = store.getState().user;
  return `<div class="container page settings-page">
    <div class="settings-wrap">
      ${settingsNav(active, u.id)}
      <section class="settings-main">${bodyHtml}</section>
    </div>
  </div>`;
}

async function renderProfileSection() {
  const u = store.getState().user;
  return `<div class="settings-panel card card-pad-lg">
    <header class="settings-panel-head">
      <h2>Profil Publik</h2>
      <p>Informasi ini tampil di halaman profil Anda untuk pengguna lain.</p>
    </header>
    <div class="alert alert-info settings-tip">
      <i class="fa-solid fa-eye"></i>
      <div><strong>Profil = tampilan publik</strong><p style="margin:.2rem 0 0">Yang Anda edit di sini akan terlihat di profil publik. Verifikasi & keamanan ada di menu terpisah.</p></div>
    </div>
    <form id="s-form" data-testid="settings-form">
      <div class="form-group text-center settings-avatar-block">
        <label class="label">Foto Profil</label>
        <div class="settings-avatar-wrap">
          <img id="avatar-preview"
               src="${u.avatar && u.avatar !== "null" ? escape(resolveAssetUrl(u.avatar)) : "/logotolongin.svg"}"
               alt="avatar"
               class="settings-avatar-preview"
               data-testid="avatar-preview" />
          <label for="avatar-file" class="settings-avatar-btn" data-testid="avatar-upload-btn">
            <i class="fa-solid fa-camera"></i>
          </label>
          <input type="file" id="avatar-file" accept="image/jpeg,image/png,image/webp" hidden data-testid="avatar-file-input" />
        </div>
        <div class="text-xs text-muted mt-1">JPG, PNG atau WebP · maks 2 MB</div>
        <div id="avatar-upload-status" class="settings-upload-status" hidden></div>
      </div>
      <div class="grid grid-2">
        <div class="form-group">
          <label class="label">Nama tampilan</label>
          <input class="input" id="name" value="${escape(u.name)}" data-testid="set-name">
        </div>
        <div class="form-group">
          <label class="label">Kota</label>
          <input class="input" id="city" value="${escape(u.city || "")}" placeholder="Jakarta Selatan" data-testid="set-city">
        </div>
      </div>
      <div class="form-group">
        <label class="label">Bio</label>
        <textarea class="textarea" id="bio" rows="4" maxlength="500" data-testid="set-bio" placeholder="Ceritakan keahlian, pengalaman, atau layanan Anda…">${escape(u.bio || "")}</textarea>
      </div>
      <div class="form-group">
        <label class="label">Nomor telepon</label>
        <input class="input" id="phone" value="${escape(u.phone || "")}" placeholder="0812xxxxxxxx" data-testid="set-phone">
        <div class="text-xs text-muted mt-1">Untuk verifikasi HP, gunakan menu <a href="#/verification">Verifikasi</a>.</div>
      </div>
      <div class="settings-form-actions">
        <button class="btn btn-primary" type="submit" data-testid="settings-save-btn">
          <i class="fa-solid fa-floppy-disk"></i> Simpan Profil
        </button>
        <a class="btn btn-secondary" href="#/users/${u.id}"><i class="fa-solid fa-eye"></i> Pratinjau profil</a>
      </div>
    </form>
  </div>`;
}

function renderSecuritySection() {
  return `<div class="settings-panel card card-pad-lg">
    <header class="settings-panel-head">
      <h2>Keamanan Akun</h2>
      <p>Ubah password secara berkala untuk menjaga keamanan akun.</p>
    </header>
    <form id="password-form" class="settings-narrow-form">
      <div class="form-group">
        <label class="label">Password saat ini</label>
        <input class="input" type="password" id="old-password" autocomplete="current-password" required data-testid="old-password">
      </div>
      <div class="form-group">
        <label class="label">Password baru</label>
        <input class="input" type="password" id="new-password" autocomplete="new-password" required minlength="8" data-testid="new-password">
        <div class="text-xs text-muted mt-1">Min. 8 karakter, harus ada angka & simbol.</div>
      </div>
      <div class="form-group">
        <label class="label">Konfirmasi password baru</label>
        <input class="input" type="password" id="confirm-password" autocomplete="new-password" required data-testid="confirm-password">
      </div>
      <button class="btn btn-primary" type="submit" data-testid="change-password-btn">
        <i class="fa-solid fa-key"></i> Ubah Password
      </button>
    </form>
  </div>`;
}

function renderNotificationsSection() {
  const prefs = getNotifPrefs();
  return `<div class="settings-panel card card-pad-lg">
    <header class="settings-panel-head">
      <h2>Notifikasi</h2>
      <p>Pilih jenis pemberitahuan yang ingin Anda terima.</p>
    </header>
    <form id="notif-form" class="settings-toggle-list">
      ${notifToggle("notif_orders", "Pesanan & escrow", "Status pesanan, pembayaran, dan bukti kerja.", prefs.notif_orders)}
      ${notifToggle("notif_chat", "Pesan chat", "Pesan baru dari pembeli, penjual, atau klien.", prefs.notif_chat)}
      ${notifToggle("notif_jobs", "Lamaran & lowongan", "Update lamaran kerja dan pelamar lowongan.", prefs.notif_jobs)}
      ${notifToggle("notif_promo", "Tips & promosi", "Rekomendasi fitur dan promo platform (opsional).", prefs.notif_promo)}
      <div class="settings-form-actions">
        <button class="btn btn-primary" type="submit" data-testid="notif-save-btn"><i class="fa-solid fa-floppy-disk"></i> Simpan Preferensi</button>
      </div>
    </form>
  </div>`;
}

function notifToggle(key, title, desc, checked) {
  return `<label class="settings-toggle-item">
    <div><strong>${title}</strong><p>${desc}</p></div>
    <input type="checkbox" name="${key}" ${checked ? "checked" : ""} data-testid="${key}">
  </label>`;
}

function getNotifPrefs() {
  try {
    const raw = localStorage.getItem("tolongin_notif_prefs");
    const parsed = raw ? JSON.parse(raw) : {};
    return {
      notif_orders: parsed.notif_orders !== false,
      notif_chat: parsed.notif_chat !== false,
      notif_jobs: parsed.notif_jobs !== false,
      notif_promo: parsed.notif_promo === true,
    };
  } catch {
    return { notif_orders: true, notif_chat: true, notif_jobs: true, notif_promo: false };
  }
}

async function renderVerificationSection() {
  let vs = {};
  try {
    vs = (await api.get("/verification/status")) || {};
  } catch {
    vs = {};
  }
  const emailOk = Boolean(store.getState().user?.emailVerified);
  const phoneOk = vs.phone?.status === "VERIFIED" || Boolean(store.getState().user?.phoneVerified);
  const ktpOk = vs.ktp?.status === "VERIFIED";
  const bankOk = vs.bank?.status === "VERIFIED";
  const done = [emailOk, phoneOk, ktpOk, bankOk].filter(Boolean).length;

  return `<div class="settings-panel card card-pad-lg">
    <header class="settings-panel-head">
      <h2>Status Verifikasi</h2>
      <p>Verifikasi meningkatkan kepercayaan saat jual jasa atau lamar pekerjaan.</p>
    </header>
    <div class="settings-verify-progress">
      <div class="settings-verify-progress-bar"><span style="width:${(done / 4) * 100}%"></span></div>
      <span class="text-sm text-muted">${done} dari 4 langkah selesai</span>
    </div>
    <div class="settings-verify-grid">
      ${verifyCard("Email", emailOk ? "Terverifikasi" : "Belum", emailOk, "fa-envelope")}
      ${verifyCard("Telepon", phoneOk ? "Terverifikasi" : "Belum", phoneOk, "fa-mobile-screen")}
      ${verifyCard("KTP", ktpOk ? "Terverifikasi" : vs.ktp?.status === "PENDING" ? "Menunggu" : "Belum", ktpOk, "fa-id-card")}
      ${verifyCard("Rekening bank", bankOk ? "Terverifikasi" : "Belum", bankOk, "fa-building-columns")}
    </div>
    <div class="settings-form-actions">
      <a class="btn btn-primary" href="#/verification" data-testid="goto-verification-center">
        <i class="fa-solid fa-shield-halved"></i> Buka Pusat Verifikasi
      </a>
    </div>
  </div>`;
}

function verifyCard(label, status, done, icon) {
  return `<div class="settings-verify-card ${done ? "is-done" : ""}">
    <div class="settings-verify-card-icon"><i class="fa-solid ${icon}"></i></div>
    <div><strong>${label}</strong><span>${status}</span></div>
    ${done ? '<i class="fa-solid fa-circle-check settings-verify-check"></i>' : ""}
  </div>`;
}

function bindProfileForm() {
  const u = store.getState().user;
  let avatarFileToUpload = null;
  const uploadStatus = document.getElementById("avatar-upload-status");

  document.getElementById("avatar-file")?.addEventListener("change", async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) return toast("File harus berupa gambar", "error");
    if (file.size > 2 * 1024 * 1024) return toast("Ukuran maksimal 2MB", "error");

    const reader = new FileReader();
    reader.onload = (ev) => {
      const preview = document.getElementById("avatar-preview");
      if (preview) preview.src = ev.target.result;
    };
    reader.readAsDataURL(file);

    if (uploadStatus) {
      uploadStatus.hidden = false;
      uploadStatus.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Mengupload…';
    }
    try {
      const formData = new FormData();
      formData.append("file", file);
      const uploadResult = await api.post("/uploads?folder=avatars", formData);
      avatarFileToUpload = resolveAssetUrl(uploadResult.url || uploadResult.secure_url || uploadResult.fileUrl);
      const preview = document.getElementById("avatar-preview");
      if (preview) preview.src = avatarFileToUpload;
      if (uploadStatus) uploadStatus.innerHTML = '<i class="fa-solid fa-circle-check"></i> Foto terupload — klik Simpan';
      toast("Foto terupload. Klik Simpan Profil.", "success");
    } catch (err) {
      if (uploadStatus) uploadStatus.innerHTML = '<i class="fa-solid fa-circle-xmark"></i> Gagal upload';
      toast("Gagal upload foto: " + (err.message || ""), "error");
    }
  });

  document.getElementById("s-form")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const btn = e.target.querySelector("button[type=submit]");
    if (btn) {
      btn.disabled = true;
      btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Menyimpan…';
    }
    try {
      const payload = {
        name: document.getElementById("name")?.value.trim() || "",
        bio: document.getElementById("bio")?.value.trim() || "",
        city: document.getElementById("city")?.value.trim() || "",
        phone: document.getElementById("phone")?.value.trim() || "",
      };
      if (avatarFileToUpload) payload.avatar = avatarFileToUpload;
      const updated = await api.put("/users/me", payload);
      store.setState({ user: updated });
      toast("Profil berhasil diperbarui", "success");
      avatarFileToUpload = null;
    } catch (err) {
      toast(err.message || "Gagal menyimpan", "error");
    } finally {
      if (btn) {
        btn.disabled = false;
        btn.innerHTML = '<i class="fa-solid fa-floppy-disk"></i> Simpan Profil';
      }
    }
  });
}

function bindPasswordForm() {
  document.getElementById("password-form")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const oldPassword = document.getElementById("old-password")?.value || "";
    const newPassword = document.getElementById("new-password")?.value || "";
    const confirm = document.getElementById("confirm-password")?.value || "";
    if (newPassword !== confirm) return toast("Konfirmasi password tidak cocok", "error");
    const btn = e.target.querySelector("button[type=submit]");
    if (btn) {
      btn.disabled = true;
      btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Menyimpan…';
    }
    try {
      await api.post("/auth/change-password", { oldPassword, newPassword });
      toast("Password berhasil diubah", "success");
      e.target.reset();
    } catch (err) {
      toast(err.message || "Gagal mengubah password", "error");
    } finally {
      if (btn) {
        btn.disabled = false;
        btn.innerHTML = '<i class="fa-solid fa-key"></i> Ubah Password';
      }
    }
  });
}

function bindNotifForm() {
  document.getElementById("notif-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const form = e.target;
    const prefs = {
      notif_orders: form.querySelector('[name="notif_orders"]')?.checked ?? true,
      notif_chat: form.querySelector('[name="notif_chat"]')?.checked ?? true,
      notif_jobs: form.querySelector('[name="notif_jobs"]')?.checked ?? true,
      notif_promo: form.querySelector('[name="notif_promo"]')?.checked ?? false,
    };
    localStorage.setItem("tolongin_notif_prefs", JSON.stringify(prefs));
    toast("Preferensi notifikasi disimpan", "success");
  });
}

/** Redirect /profile → public profile user sendiri */
export async function ProfileRedirectPage({ mount }) {
  const u = store.getState().user;
  if (u?.id) {
    router.navigate(`/users/${u.id}`);
    return;
  }
  mount.innerHTML = `<div class="container page"><div class="spinner"></div></div>`;
}

export async function SettingsPage({ mount, params }) {
  const section = params?.section || "profile";
  const valid = SETTINGS_SECTIONS.some((s) => s.key === section);
  const active = valid ? section : "profile";

  mount.innerHTML = settingsShell(active, '<div class="spinner"></div>');

  let panelHtml = "";
  switch (active) {
    case "security":
      panelHtml = renderSecuritySection();
      break;
    case "notifications":
      panelHtml = renderNotificationsSection();
      break;
    case "verification":
      panelHtml = await renderVerificationSection();
      break;
    default:
      panelHtml = await renderProfileSection();
  }

  mount.querySelector(".settings-main").innerHTML = panelHtml;

  if (active === "profile") bindProfileForm();
  if (active === "security") bindPasswordForm();
  if (active === "notifications") bindNotifForm();
}
