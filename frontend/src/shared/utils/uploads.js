import { API, resolveAssetUrl } from "./api.js";
import { store } from "../../app/store.js";
import { toast } from "./helpers.js";

const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "application/pdf",
]);

export function uploadFile(file, folder = "general", onProgress) {
  if (!file) return Promise.reject(new Error("File wajib dipilih"));
  if (!ALLOWED_TYPES.has(file.type))
    return Promise.reject(new Error("Format harus JPG, PNG, WebP, atau PDF"));
  if (file.size > 10 * 1024 * 1024)
    return Promise.reject(new Error("Ukuran file maksimal 10 MB"));

  const form = new FormData();
  form.append("file", file);

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", API + "/uploads?folder=" + encodeURIComponent(folder));
    xhr.withCredentials = true;
    const token = store.getState().token;
    if (token) xhr.setRequestHeader("Authorization", "Bearer " + token);

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable && onProgress) {
        onProgress(Math.round((event.loaded / event.total) * 100));
      }
    };
    xhr.onerror = () => reject(new Error("Koneksi upload terputus"));
    xhr.onload = () => {
      let data;
      try {
        data = JSON.parse(xhr.responseText || "{}");
      } catch {
        data = {};
      }
      if (xhr.status < 200 || xhr.status >= 300) {
        const message = Array.isArray(data.message)
          ? data.message.join(", ")
          : data.message || "Upload gagal";
        reject(new Error(message));
        return;
      }
      resolve({ ...data, url: resolveAssetUrl(data.url) });
    };
    xhr.send(form);
  });
}

export function toStoredUploadPath(url) {
  if (!url) return "";
  const idx = url.indexOf("/api/uploads/");
  return idx >= 0 ? url.slice(idx) : url;
}

/** Upload gambar jasa — pola yang sama dengan upload lowongan yang sudah jalan. */
export function setupServiceImageUpload(container) {
  if (!container) return;

  const uploadZone = container.querySelector("#upload-zone");
  const coverFile = container.querySelector("#imageFile");
  const coverUrl = container.querySelector("#imageUrl");
  const coverPreview = container.querySelector("#image-preview");
  const coverImg = container.querySelector("#preview-img");
  const removeBtn = container.querySelector("#remove-image");

  if (!uploadZone || !coverFile) return;

  let statusEl = container.querySelector("#upload-status");
  if (!statusEl) {
    statusEl = document.createElement("div");
    statusEl.id = "upload-status";
    statusEl.className = "text-sm text-muted";
    statusEl.style.marginTop = "8px";
    uploadZone.parentNode.appendChild(statusEl);
  }

  const showZone = () => {
    uploadZone.style.display = "";
  };
  const hideZone = () => {
    uploadZone.style.display = "none";
  };

  if (coverUrl?.value?.trim()) {
    const src = resolveAssetUrl(coverUrl.value.trim());
    if (coverImg) coverImg.src = src;
    if (coverPreview) coverPreview.style.display = "block";
    hideZone();
  }

  uploadZone.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    coverFile.click();
  });

  coverFile.addEventListener("change", async () => {
    const file = coverFile.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast("File harus berupa gambar", "error");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast("Ukuran file maksimal 5MB", "error");
      return;
    }

    statusEl.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Mengupload foto...';
    try {
      const result = await uploadFile(file, "services");
      const stored = toStoredUploadPath(result.url);
      if (coverUrl) coverUrl.value = stored;
      if (coverImg) coverImg.src = resolveAssetUrl(stored);
      if (coverPreview) coverPreview.style.display = "block";
      hideZone();
      statusEl.innerHTML =
        '<i class="fa-solid fa-check" style="color:var(--success)"></i> Foto berhasil diupload';
    } catch (err) {
      statusEl.innerHTML = "";
      toast(err.message || "Gagal upload foto", "error");
    }
  });

  removeBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (coverUrl) coverUrl.value = "";
    coverFile.value = "";
    if (coverPreview) coverPreview.style.display = "none";
    if (coverImg) coverImg.src = "";
    showZone();
    statusEl.innerHTML = "";
  });
}