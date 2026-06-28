import { store } from "../../app/store.js";

function normalizeBackendUrl(value) {
  if (!value || typeof value !== "string") return "";
  return value.replace(/\/api\/?$/i, "").replace(/\/+$/, "");
}

const BACKEND_URL = normalizeBackendUrl(
  import.meta.env.VITE_BACKEND_URL || "http://localhost:8001",
);
export const API = BACKEND_URL ? `${BACKEND_URL}/api` : "/api";

export function resolveAssetUrl(url) {
  if (!url || typeof url !== "string") return "";
  if (/^(https?:|data:|blob:)/i.test(url)) return url;
  if (url.startsWith("/api/") || url.startsWith("/uploads/"))
    return BACKEND_URL + url;
  return url;
}

let refreshPromise = null;

async function tryRefresh() {
  if (!refreshPromise) {
    refreshPromise = fetch(`${API}/auth/refresh`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    })
      .then(async (r) => {
        if (!r.ok) throw new Error("Refresh failed");
        const data = await r.json();
        store.setState({
          token: data.token,
          user: data.user || store.getState().user,
        });
        return data.token;
      })
      .finally(() => {
        refreshPromise = null;
      });
  }
  return refreshPromise;
}

async function rawRequest(
  path,
  { method = "GET", body, auth = true, token } = {},
) {
  const headers = {};
  const isFormData =
    typeof FormData !== "undefined" && body instanceof FormData;

  if (!isFormData && body !== undefined) {
    headers["Content-Type"] = "application/json";
  }
  if (auth) {
    const t = token || store.getState().token;
    if (t) headers["Authorization"] = `Bearer ${t}`;
  }

  const url = `${API}${path}`;
  console.log("📡 API Request:", method, url);

  const res = await fetch(url, {
    method,
    headers,
    credentials: "include",
    body: isFormData
      ? body
      : body !== undefined
        ? JSON.stringify(body)
        : undefined,
  });

<<<<<<< HEAD
  let data;
  const ct = res.headers.get("content-type") || "";
  data = ct.includes("application/json") ? await res.json() : await res.text();
  return { ok: res.ok, status: res.status, data };
=======
  for (let attempt = 0; attempt <= (canRetry ? MAX_RETRIES : 0); attempt++) {
    try {
      const res = await fetch(url, {
        method,
        headers,
        credentials: "include",
        body: isFormData
          ? body
          : body !== undefined
            ? JSON.stringify(body)
            : undefined,
      });

      // Retry hanya untuk status server sementara.
      if (
        canRetry &&
        RETRYABLE_STATUS.includes(res.status) &&
        attempt < MAX_RETRIES
      ) {
        await sleep(300 * (attempt + 1));
        continue;
      }

      let data;
      const ct = res.headers.get("content-type") || "";
      data = ct.includes("application/json")
        ? await res.json()
        : await res.text();
      return { ok: res.ok, status: res.status, data };
    } catch (err) {
      // Error jaringan (fetch reject): coba ulang bila masih punya jatah.
      lastErr = err;
      if (canRetry && attempt < MAX_RETRIES) {
        await sleep(300 * (attempt + 1));
        continue;
      }
      throw err;
    }
  }
  throw lastErr || new Error("Request gagal");
>>>>>>> 961a4cc (Update: Menyinkronkan perubahan lokal dengan repositori remote)
}

async function request(path, opts = {}) {
  let result = await rawRequest(path, opts);
  const isAuthEndpoint =
    path.startsWith("/auth/login") ||
    path.startsWith("/auth/register") ||
    path.startsWith("/auth/refresh") ||
    path.startsWith("/auth/logout");

  if (
    result.status === 401 &&
    opts.auth !== false &&
    !isAuthEndpoint &&
    store.getState().user
  ) {
    try {
      const newToken = await tryRefresh();
      result = await rawRequest(path, { ...opts, token: newToken });
    } catch (_) {
      store.setState({ token: null, refreshToken: null, user: null });
    }
  }

  if (!result.ok) {
    const d = result.data;
    let msg = "Terjadi kesalahan";
    if (d) {
      if (typeof d === "string") msg = d;
      else if (Array.isArray(d.message)) msg = d.message.join(", ");
      else if (d.message) msg = d.message;
      else if (d.detail) msg = d.detail;
      else if (d.error) msg = d.error;
    }
    const err = new Error(typeof msg === "string" ? msg : JSON.stringify(msg));
    err.status = result.status;
    err.data = d;
    throw err;
  }
  return result.data;
}

export const api = {
  get: (p) => request(p),
<<<<<<< HEAD
  post: (p, body, _opts) => request(p, { method: "POST", body }),
  put: (p, body, _opts) => request(p, { method: "PUT", body }),
  del: (p) => request(p, { method: "DELETE" }),
=======
  post: (p, body, opts = {}) => request(p, { ...opts, method: "POST", body }),
  put: (p, body, opts = {}) => request(p, { ...opts, method: "PUT", body }),
  patch: (p, body, opts = {}) => request(p, { ...opts, method: "PATCH", body }),
  del: (p, opts = {}) => request(p, { ...opts, method: "DELETE" }),
  upload: (p, formData, opts = {}) =>
    request(p, { ...opts, method: "POST", body: formData }),
>>>>>>> 961a4cc (Update: Menyinkronkan perubahan lokal dengan repositori remote)
};
