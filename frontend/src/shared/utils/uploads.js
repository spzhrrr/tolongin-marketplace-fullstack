import { API, resolveAssetUrl } from "./api.js";
import { store } from "../../app/store.js";

const ALLOWED_TYPES = new Set([
  "image/jpeg",
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