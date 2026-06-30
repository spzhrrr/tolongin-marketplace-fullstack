/**
 * Route catalog for visual capture — keep in sync with frontend/src/app/router.js
 * @typedef {{ path: string, name: string, role: 'public'|'buyer'|'seller'|'admin', dynamic?: 'service'|'job'|'user' }} VisualRoute
 */

/** @type {VisualRoute[]} */
export const VISUAL_ROUTES = [
  { path: "/", name: "homepage", role: "public" },
  { path: "/login", name: "login", role: "public" },
  { path: "/register", name: "register", role: "public" },
  { path: "/forgot-password", name: "forgot-password", role: "public" },
  { path: "/marketplace", name: "marketplace", role: "public" },
  { path: "/jobs", name: "jobs", role: "public" },
  { path: "/services/:id", name: "service-detail", role: "public", dynamic: "service" },
  { path: "/jobs/:id", name: "job-detail", role: "public", dynamic: "job" },
  { path: "/users/:id", name: "public-profile", role: "public", dynamic: "user" },

  { path: "/dashboard", name: "dashboard-overview", role: "buyer" },
  { path: "/dashboard/favorites", name: "dashboard-favorites", role: "buyer" },
  { path: "/dashboard/transactions", name: "dashboard-transactions", role: "buyer" },
  { path: "/orders", name: "orders", role: "buyer" },
  { path: "/notifications", name: "notifications", role: "buyer" },
  { path: "/settings", name: "settings", role: "buyer" },
  { path: "/profile", name: "profile", role: "buyer" },
  { path: "/verification", name: "verification", role: "buyer" },
  { path: "/chat", name: "chat", role: "buyer" },

  { path: "/dashboard/manage-services", name: "seller-services", role: "seller" },
  { path: "/dashboard/manage-jobs", name: "seller-jobs", role: "seller" },
  { path: "/dashboard/my-applications", name: "seller-applications", role: "seller" },
  { path: "/dashboard/earnings", name: "seller-earnings", role: "seller" },

  { path: "/admin", name: "admin-dashboard", role: "admin" },
  { path: "/admin/users", name: "admin-users", role: "admin" },
  { path: "/admin/services", name: "admin-services", role: "admin" },
  { path: "/admin/jobs", name: "admin-jobs", role: "admin" },
  { path: "/admin/kyc", name: "admin-kyc", role: "admin" },
  { path: "/admin/disputes", name: "admin-disputes", role: "admin" },
];

export const CREDENTIALS = {
  buyer: { email: "buyer@tolongin.com", password: "Buyer@123" },
  seller: { email: "seller@tolongin.com", password: "Seller@123" },
  admin: { email: "admin@tolongin.com", password: "Admin@123" },
};
