import { api, resolveAssetUrl } from "../../shared/utils/api.js";
import { uploadFile } from "../../shared/utils/uploads.js";
import { toast, escape } from "../../shared/utils/helpers.js";
import { store } from "../../app/store.js";
import { router } from "../../app/router.js";

async function refreshSessionUser() {
  try {
    const me = await api.get("/auth/me");
    if (me) {
      const prev = store.getState().user || {};
      store.setState({ user: { ...prev, ...me } });
    }
    return me;
  } catch {
    return null;
  }
}

async function waitForVerification(field, maxMs = 20000) {
  const start = Date.now();
  while (Date.now() - start < maxMs) {
    await new Promise((r) => setTimeout(r, 1200));
    try {
      const vs = await api.get("/verification/status");
      if (field === "ktp" && vs.ktp?.status === "VERIFIED") return true;
      if (field === "bank" && vs.bank?.status === "VERIFIED") return true;
    } catch (_) {}
  }
  return false;
}

function pendingAlert(label) {
  return `<div class="alert alert-info mt-3 verification-pending" data-pending="${escape(label)}">
    <i class="fa-solid fa-spinner fa-spin"></i> ${escape(label)} sedang diverifikasi otomatis…
    <div class="text-xs text-muted mt-1">Halaman akan diperbarui segera setelah selesai.</div>
  </div>`;
}

function getStatusLabel(status) {
  const labels = {
    VERIFIED:
      '<span class="badge badge-success"><i class="fa-solid fa-circle-check"></i> Terverifikasi</span>',
    PENDING:
      '<span class="badge badge-warning"><i class="fa-solid fa-clock"></i> Menunggu Review</span>',
    REJECTED:
      '<span class="badge badge-danger"><i class="fa-solid fa-xmark"></i> Ditolak</span>',
    NOT_SUBMITTED:
      '<span class="badge"><i class="fa-solid fa-upload"></i> Belum Disubmit</span>',
  };
  return labels[status] || `<span class="badge">${status}</span>`;
}

function stepIcon(done) {
  return done
    ? '<i class="fa-solid fa-circle-check verification-step-icon verification-step-icon--done"></i>'
    : '<i class="fa-regular fa-circle verification-step-icon"></i>';
}

function previewHtml(url, alt) {
  if (!url) {
    return `<div class="upload-placeholder verification-upload-placeholder">
      <i class="fa-solid fa-image"></i>
      Belum ada foto
    </div>`;
  }
  return `<img src="${escape(url)}" class="upload-preview" alt="${escape(alt)}"/>`;
}

function bindImagePicker({ inputEl, previewEl, folder, onChange }) {
  if (!inputEl || !previewEl) return;

  inputEl.addEventListener("change", async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast("File harus berupa gambar (JPG/PNG/WebP)", "error");
      inputEl.value = "";
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast("Ukuran file maksimal 5MB", "error");
      inputEl.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onload = (ev) => {
      previewEl.innerHTML = `<img src="${escape(ev.target.result)}" class="upload-preview" alt="preview"/>`;
    };
    reader.readAsDataURL(file);

    let statusEl = previewEl.nextElementSibling;
    if (!statusEl?.dataset?.uploadStatus) {
      statusEl = document.createElement("div");
      statusEl.dataset.uploadStatus = "1";
      statusEl.className = "text-xs text-muted mt-1";
      previewEl.after(statusEl);
    }
    statusEl.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Mengunggah...';

    try {
      const result = await uploadFile(file, folder);
      const url = resolveAssetUrl(result.url);
      previewEl.innerHTML = `<img src="${escape(url)}" class="upload-preview" alt="preview"/>`;
      statusEl.remove();
      onChange(url);
    } catch (err) {
      statusEl.remove();
      previewEl.innerHTML = previewHtml("", "preview");
      inputEl.value = "";
      onChange("");
      toast(err.message || "Gagal mengunggah foto", "error");
    }
  });
}

export async function VerificationPage({ mount }) {
  const { user } = store.getState();
  if (!user) {
    router.navigate("/login");
    return;
  }

  let vs = {};
  try {
    vs = await api.get("/verification/status");
  } catch (_) {
    // defaults used below
  }

  const emailDone = vs.emailVerified ?? user.emailVerified ?? false;
  const phoneDone = vs.phoneVerified ?? user.phoneVerified ?? false;
  const ktpStatus = vs.ktp?.status || user.ktpStatus || "NOT_SUBMITTED";
  const bankStatus = vs.bank?.status || user.bankStatus || "NOT_SUBMITTED";

  const existingKtpPhoto = resolveAssetUrl(vs.ktp?.photo || "");
  const existingKtpSelfie = resolveAssetUrl(vs.ktp?.selfie || "");

  mount.innerHTML = `
    <div class="container page verification-page">
      <header class="verification-page-head">
        <h1 class="page-title">Verifikasi Identitas</h1>
        <p class="page-subtitle">Selesaikan verifikasi bertahap untuk membuka semua fitur Tolongin</p>
      </header>

      <div class="card card-pad-lg mb-4 verification-steps">
        <div class="verification-step-track">
          <div class="verification-step-node">
            ${stepIcon(emailDone)}
            <div class="verification-step-label">Email</div>
            <div class="verification-step-num">Langkah 1</div>
          </div>
          <div class="verification-step-arrow" aria-hidden="true">→</div>
          <div class="verification-step-node">
            ${stepIcon(phoneDone)}
            <div class="verification-step-label">Telepon</div>
            <div class="verification-step-num">Langkah 2</div>
          </div>
          <div class="verification-step-arrow" aria-hidden="true">→</div>
          <div class="verification-step-node">
            ${stepIcon(ktpStatus === "VERIFIED")}
            <div class="verification-step-label">KTP</div>
            <div class="verification-step-num">Langkah 3</div>
          </div>
          <div class="verification-step-arrow" aria-hidden="true">→</div>
          <div class="verification-step-node">
            ${stepIcon(bankStatus === "VERIFIED")}
            <div class="verification-step-label">Rekening Bank</div>
            <div class="verification-step-num">Langkah 4</div>
          </div>
        </div>
      </div>

      <div class="card card-pad-lg mb-4 verification-step-card" id="email-step">
        <div class="verification-step-head flex-between">
          <div>
            <h2 style="margin:0"><i class="fa-solid fa-envelope"></i> Verifikasi Email</h2>
            <p class="text-muted" style="margin:.25rem 0 0">Masukkan kode OTP yang dikirim ke ${escape(user.email)}</p>
          </div>
          ${getStatusLabel(emailDone ? "VERIFIED" : "NOT_SUBMITTED")}
        </div>
        ${
          emailDone
            ? `<div class="alert alert-success mt-3"><i class="fa-solid fa-circle-check"></i> Email <strong>${escape(user.email)}</strong> sudah terverifikasi.</div>`
            : `<div class="mt-3" id="email-form-wrap">
              <button class="btn btn-primary" id="send-email-otp" data-testid="send-email-otp-btn">
                <i class="fa-solid fa-paper-plane"></i> Kirim Kode OTP ke Email
              </button>
              <div id="email-otp-row" style="display:none;margin-top:1rem">
                <div class="form-group">
                  <label class="label">Kode OTP (6 digit)</label>
                  <div style="display:flex;gap:.5rem;max-width:320px">
                    <input class="input" id="email-otp-input" maxlength="6" placeholder="123456" data-testid="email-otp-input" style="letter-spacing:4px;font-size:1.2rem;text-align:center">
                    <button class="btn btn-primary" id="verify-email-otp" data-testid="verify-email-otp-btn">Verifikasi</button>
                  </div>
                </div>
                <button class="btn btn-ghost btn-sm" id="resend-email-otp" data-testid="resend-email-otp-btn">
                  <i class="fa-solid fa-rotate-right"></i> Kirim Ulang
                </button>
              </div>
            </div>`
        }
      </div>

      <div class="card card-pad-lg mb-4 verification-step-card" id="phone-step">
        <div class="verification-step-head flex-between">
          <div>
            <h2 style="margin:0"><i class="fa-solid fa-mobile-screen"></i> Verifikasi Nomor Telepon</h2>
            <p class="text-muted" style="margin:.25rem 0 0">Verifikasi nomor HP untuk melamar pekerjaan</p>
          </div>
          ${getStatusLabel(phoneDone ? "VERIFIED" : "NOT_SUBMITTED")}
        </div>
        ${
          phoneDone
            ? `<div class="alert alert-success mt-3"><i class="fa-solid fa-circle-check"></i> Nomor telepon sudah terverifikasi.</div>`
            : `<div class="mt-3">
              <div class="form-group">
                <label class="label">Nomor Telepon</label>
                <div style="display:flex;gap:.5rem;max-width:360px">
                  <div class="input-icon" style="flex:1">
                    <i class="fa-solid fa-phone"></i>
                    <input class="input" id="phone-input" type="tel" placeholder="0812xxxxxxxx"
                      value="${escape(user.phone || "")}" data-testid="phone-input">
                  </div>
                  <button class="btn btn-primary" id="send-phone-otp" data-testid="send-phone-otp-btn">Kirim OTP</button>
                </div>
              </div>
              <div id="phone-otp-row" style="display:none;margin-top:.75rem">
                <div class="form-group">
                  <label class="label">Kode OTP SMS</label>
                  <div style="display:flex;gap:.5rem;max-width:320px">
                    <input class="input" id="phone-otp-input" maxlength="6" placeholder="123456" data-testid="phone-otp-input" style="letter-spacing:4px;font-size:1.2rem;text-align:center">
                    <button class="btn btn-primary" id="verify-phone-otp" data-testid="verify-phone-otp-btn">Verifikasi</button>
                  </div>
                </div>
              </div>
            </div>`
        }
      </div>

      <div class="card card-pad-lg mb-4 verification-step-card" id="ktp-step">
        <div class="verification-step-head flex-between">
          <div>
            <h2 style="margin:0"><i class="fa-solid fa-id-card"></i> Verifikasi KTP</h2>
            <p class="text-muted" style="margin:.25rem 0 0">Diperlukan untuk menjual jasa (Level 2)</p>
          </div>
          ${getStatusLabel(ktpStatus)}
        </div>
        ${
          ktpStatus === "VERIFIED"
            ? `<div class="alert alert-success mt-3"><i class="fa-solid fa-circle-check"></i> KTP Anda sudah terverifikasi!</div>`
            : ktpStatus === "PENDING"
              ? pendingAlert("KTP")
              : `${ktpStatus === "REJECTED" ? `<div class="alert alert-danger mt-3">
              <i class="fa-solid fa-circle-exclamation"></i> KTP ditolak: ${escape(vs.ktp?.rejectionReason || "Data tidak jelas")}
            </div>` : ""}<form id="ktp-form" class="mt-3">
              <div class="form-group">
                <label class="label">Nomor KTP (16 digit)</label>
                <input type="text" id="ktp-number" class="input" placeholder="3201xxxxxxxxxxxx" maxlength="16"
                  value="${escape(vs.ktp?.number || "")}" required data-testid="ktp-number-input">
              </div>
              <div class="grid grid-2">
                <div class="form-group">
                  <label class="label">Foto KTP (depan)</label>
                  <div id="ktp-photo-preview">${previewHtml(existingKtpPhoto, "Foto KTP")}</div>
                  <input type="file" id="ktp-photo-input" accept="image/jpeg,image/png,image/webp,image/jpg" class="input mt-2" data-testid="ktp-photo-input">
                  <div class="text-xs text-muted mt-1">Format JPG/PNG, maks 5MB, pastikan foto jelas</div>
                </div>
                <div class="form-group">
                  <label class="label">Selfie dengan KTP</label>
                  <div id="ktp-selfie-preview">${previewHtml(existingKtpSelfie, "Selfie KTP")}</div>
                  <input type="file" id="ktp-selfie-input" accept="image/jpeg,image/png,image/webp,image/jpg" class="input mt-2" data-testid="ktp-selfie-input">
                  <div class="text-xs text-muted mt-1">Wajah dan KTP terlihat jelas dalam satu foto</div>
                </div>
              </div>
              <button type="submit" class="btn btn-primary mt-2" data-testid="ktp-submit-btn">
                <i class="fa-solid fa-paper-plane"></i> ${ktpStatus === "REJECTED" ? "Kirim Ulang Verifikasi KTP" : "Kirim Verifikasi KTP"}
              </button>
            </form>`
        }
      </div>

      <div class="card card-pad-lg mb-4 verification-step-card" id="bank-step">
        <div class="verification-step-head flex-between">
          <div>
            <h2 style="margin:0"><i class="fa-solid fa-building-columns"></i> Verifikasi Rekening Bank</h2>
            <p class="text-muted" style="margin:.25rem 0 0">Diperlukan untuk menarik saldo (Level 3)</p>
          </div>
          ${getStatusLabel(bankStatus)}
        </div>
        ${
          bankStatus === "VERIFIED"
            ? `<div class="alert alert-success mt-3">
              <i class="fa-solid fa-circle-check"></i> Rekening bank sudah terverifikasi!
              <div class="mt-2">
                <strong>Bank:</strong> ${escape(vs.bank?.bankName || user.bankName || "-")}<br>
                <strong>No. Rekening:</strong> ${escape(vs.bank?.accountNumber || user.accountNumber || "-")}<br>
                <strong>Atas Nama:</strong> ${escape(vs.bank?.accountName || user.accountName || "-")}
              </div>
            </div>`
            : bankStatus === "PENDING"
              ? pendingAlert("Rekening bank")
              : `${bankStatus === "REJECTED" ? `<div class="alert alert-danger mt-3">
              <i class="fa-solid fa-circle-exclamation"></i> Rekening ditolak: ${escape(vs.bank?.rejectionReason || "Data tidak valid")}
            </div>` : ""}<form id="bank-form" class="mt-3">
              <div class="grid grid-2">
                <div class="form-group">
                  <label class="label">Nama Bank</label>
                  <select id="bank-name" class="select" required data-testid="bank-name">
                    <option value="">Pilih Bank</option>
                    <option value="BCA">BCA</option>
                    <option value="Mandiri">Mandiri</option>
                    <option value="BNI">BNI</option>
                    <option value="BRI">BRI</option>
                    <option value="CIMB Niaga">CIMB Niaga</option>
                    <option value="Danamon">Danamon</option>
                    <option value="Permata">Permata</option>
                    <option value="Maybank">Maybank</option>
                    <option value="Other">Lainnya</option>
                  </select>
                </div>
                <div class="form-group">
                  <label class="label">Nomor Rekening</label>
                  <input type="text" id="account-number" class="input" placeholder="1234567890" required data-testid="account-number">
                </div>
              </div>
              <div class="form-group">
                <label class="label">Nama Pemilik Rekening</label>
                <input type="text" id="account-name" class="input" placeholder="Sesuai KTP" required data-testid="account-name">
              </div>
              <div class="form-group">
                <label class="label">Foto Buku Tabungan / Kartu ATM <span class="text-muted">(opsional)</span></label>
                <div id="bank-proof-preview">${previewHtml("", "Bukti rekening")}</div>
                <input type="file" id="bank-proof-input" accept="image/jpeg,image/png,image/webp,image/jpg" class="input mt-2" data-testid="bank-file-input">
                <div class="text-xs text-muted mt-1">Bukti kepemilikan rekening (opsional)</div>
              </div>
              <button type="submit" class="btn btn-primary mt-2" data-testid="bank-submit-btn">
                <i class="fa-solid fa-paper-plane"></i> ${bankStatus === "REJECTED" ? "Kirim Ulang Verifikasi Bank" : "Kirim Verifikasi Bank"}
              </button>
            </form>`
        }
      </div>
    </div>`;

  if (!emailDone) {
    const otpRow = document.getElementById("email-otp-row");

    const requestEmailOtp = async () => {
      try {
        const r = await api.post("/verification/email/request", {});
        if (r.demoOtp) {
          toast(`Kode OTP: ${r.demoOtp} (berlaku 10 menit)`, "info", 12000);
        } else {
          toast("OTP dikirim ke email Anda", "success");
        }
        if (otpRow) otpRow.style.display = "";
      } catch (err) {
        toast(err.message, "error");
      }
    };

    document.getElementById("send-email-otp")?.addEventListener("click", requestEmailOtp);
    document.getElementById("resend-email-otp")?.addEventListener("click", requestEmailOtp);

    document.getElementById("verify-email-otp")?.addEventListener("click", async () => {
      const otp = document.getElementById("email-otp-input")?.value.trim();
      if (!otp || otp.length < 6) return toast("Masukkan kode OTP 6 digit", "error");
      try {
        await api.post("/verification/email/verify", { otp });
        await refreshSessionUser();
        toast("Email berhasil diverifikasi!", "success");
        setTimeout(() => router.render(), 800);
      } catch (err) {
        toast(err.message, "error");
      }
    });
  }

  if (!phoneDone) {
    document.getElementById("send-phone-otp")?.addEventListener("click", async () => {
      const phone = document.getElementById("phone-input")?.value.trim();
      if (!phone || phone.length < 9) return toast("Masukkan nomor telepon yang valid", "error");
      try {
        const r = await api.post("/verification/phone/request", { phone });
        if (r.demoOtp) {
          toast(`Kode OTP: ${r.demoOtp} (berlaku 10 menit)`, "info", 12000);
        } else {
          toast("OTP dikirim via SMS", "success");
        }
        const phoneOtpRow = document.getElementById("phone-otp-row");
        if (phoneOtpRow) phoneOtpRow.style.display = "";
      } catch (err) {
        toast(err.message, "error");
      }
    });

    document.getElementById("verify-phone-otp")?.addEventListener("click", async () => {
      const otp = document.getElementById("phone-otp-input")?.value.trim();
      if (!otp || otp.length < 6) return toast("Masukkan kode OTP 6 digit", "error");
      const phone = document.getElementById("phone-input")?.value.trim();
      try {
        await api.post("/verification/phone/verify", { otp, phone });
        await refreshSessionUser();
        toast("Nomor telepon berhasil diverifikasi!", "success");
        setTimeout(() => router.render(), 800);
      } catch (err) {
        toast(err.message, "error");
      }
    });
  }

  const ktpForm = document.getElementById("ktp-form");
  if (ktpForm) {
    let ktpPhotoUrl = existingKtpPhoto;
    let ktpSelfieUrl = existingKtpSelfie;

    bindImagePicker({
      inputEl: document.getElementById("ktp-photo-input"),
      previewEl: document.getElementById("ktp-photo-preview"),
      folder: "ktp",
      onChange: (url) => {
        ktpPhotoUrl = url;
      },
    });

    bindImagePicker({
      inputEl: document.getElementById("ktp-selfie-input"),
      previewEl: document.getElementById("ktp-selfie-preview"),
      folder: "ktp",
      onChange: (url) => {
        ktpSelfieUrl = url;
      },
    });

    ktpForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const ktpNumber = document.getElementById("ktp-number")?.value.trim();
      if (!ktpNumber || ktpNumber.length < 10) {
        return toast("Masukkan nomor KTP yang valid (min 10 digit)", "error");
      }
      if (!ktpPhotoUrl) return toast("Unggah foto KTP terlebih dahulu", "error");
      if (!ktpSelfieUrl) return toast("Unggah selfie dengan KTP terlebih dahulu", "error");

      const btn = ktpForm.querySelector("button[type=submit]");
      btn.disabled = true;
      btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Mengirim...';

      try {
        await api.post("/verification/ktp/submit", {
          ktpNumber,
          ktpPhoto: ktpPhotoUrl,
          ktpSelfie: ktpSelfieUrl,
        });
        toast("Dokumen KTP dikirim, sedang diverifikasi...", "success");
        const verified = await waitForVerification("ktp", 20000);
        await refreshSessionUser();
        if (verified) {
          toast("KTP terverifikasi! Anda dapat bertransaksi.", "success");
        }
        router.render();
      } catch (err) {
        toast(err.message, "error");
        btn.disabled = false;
        btn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Kirim Verifikasi KTP';
      }
    });
  }

  const bankForm = document.getElementById("bank-form");
  if (bankForm) {
    let bankProofUrl = "";

    bindImagePicker({
      inputEl: document.getElementById("bank-proof-input"),
      previewEl: document.getElementById("bank-proof-preview"),
      folder: "bank",
      onChange: (url) => {
        bankProofUrl = url;
      },
    });

    bankForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const bankName = document.getElementById("bank-name")?.value;
      const accountNumber = document.getElementById("account-number")?.value.trim();
      const accountName = document.getElementById("account-name")?.value.trim();

      if (!bankName) return toast("Pilih nama bank", "error");
      if (!accountNumber || accountNumber.length < 5) {
        return toast("Nomor rekening minimal 5 digit", "error");
      }
      if (!accountName || accountName.length < 3) {
        return toast("Nama pemilik minimal 3 karakter", "error");
      }

      const btn = bankForm.querySelector("button[type=submit]");
      btn.disabled = true;
      btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Mengirim...';

      const payload = { bankName, accountNumber, accountName };
      if (bankProofUrl) payload.bankProof = bankProofUrl;

      try {
        await api.post("/verification/bank", payload);
        toast("Data bank dikirim, sedang diverifikasi...", "success");
        const verified = await waitForVerification("bank", 20000);
        await refreshSessionUser();
        if (verified) {
          toast("Rekening bank terverifikasi! Anda dapat posting jasa.", "success");
        }
        router.render();
      } catch (err) {
        toast(err.message, "error");
        btn.disabled = false;
        btn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Kirim Verifikasi Bank';
      }
    });
  }

  if (ktpStatus === "PENDING") {
    waitForVerification("ktp", 20000).then(async (ok) => {
      if (!ok) return;
      await refreshSessionUser();
      toast("KTP terverifikasi! Anda dapat bertransaksi.", "success");
      router.render();
    });
  } else if (bankStatus === "PENDING") {
    waitForVerification("bank", 20000).then(async (ok) => {
      if (!ok) return;
      await refreshSessionUser();
      toast("Rekening bank terverifikasi! Anda dapat posting jasa.", "success");
      router.render();
    });
  }
}
