import { store } from "../../app/store.js";

const BACKEND_URL = "";
export const API = BACKEND_URL ? `${BACKEND_URL}/api` : "/api";

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
    credentials: "include", // ✅ PENTING untuk cookie
    body: isFormData
      ? body
      : body !== undefined
        ? JSON.stringify(body)
        : undefined,
  });

  let data;
  const ct = res.headers.get("content-type") || "";
  data = ct.includes("application/json") ? await res.json() : await res.text();
  return { ok: res.ok, status: res.status, data };
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
  post: (p, body, _opts) => request(p, { method: "POST", body }),
  put: (p, body, _opts) => request(p, { method: "PUT", body }),
  del: (p) => request(p, { method: "DELETE" }),
};
