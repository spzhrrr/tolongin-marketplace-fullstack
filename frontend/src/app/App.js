// Main App entry: registers routes & mounts the layout
import { router } from "./router.js";
import { renderLayout } from "./layout.js";
import { HomePage } from "../features/home/HomePage.js";
import { LoginPage } from "../features/auth/pages/LoginPage.js";
import {
  RegisterPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  VerifyEmailPage,
} from "../features/auth/pages/AuthPages.js";
import {
  MarketplacePage,
  ServiceDetailPage,
} from "../features/marketplace/MarketplacePages.js";
import {
  JobsPage,
  PostJobPage,
  JobDetailPage,
} from "../features/jobs/JobsPages.js";
import {
  OrdersListPage,
  OrderDetailPage,
} from "../features/orders/OrdersPages.js";
import { ChatPage } from "../features/chat/ChatPages.js";
import { ProfilePage, SettingsPage } from "../features/profile/ProfilePages.js";
import { PublicProfilePage } from "../features/profile/PublicProfilePage.js";
import { KycPage } from "../features/profile/KycPage.js";
import { VerificationPage } from "../features/verification/VerificationPage.js";
import {
  DashboardOverview,
  BuyerOrders,
  BuyerJobs,
  BuyerFavorites,
  SellerServices,
  SellerOrders,
  SellerEarnings,
} from "../features/dashboard/DashboardPages.js";
import {
  AdminDashboard,
  VerifySellers,
  ManageUsers,
  ManageServices,
  ManageJobs,
  ManageDisputes,
  PlatformSettings,
  ActivityLog,
  ManageKyc,
} from "../features/admin/AdminPages.js";
import { store } from "./store.js";
import { api } from "../shared/utils/api.js";

/**
 * On boot, if we have a persisted user but no in-memory access token,
 * attempt one silent refresh via the httpOnly cookie before the first
 * authenticated request fires. Failure is silent: any guarded request
 * will redirect to /login.
 */
async function silentRefresh() {
  const s = store.getState();
  if (!s.user || s.token) return;
  try {
    const data = await api.post("/auth/refresh", {});
    if (data?.token)
      store.setState({ token: data.token, user: data.user || s.user });
  } catch (_) {
    store.setState({ token: null, refreshToken: null, user: null });
  }
}

export async function bootstrap() {
  const root = document.getElementById("app");
  const mount = renderLayout(root);
  await silentRefresh();

  router
    .add("/", HomePage)
    .add("/login", LoginPage)
    .add("/register", RegisterPage)
    .add("/forgot-password", ForgotPasswordPage)
    .add("/reset-password", ResetPasswordPage)
    .add("/verify-email", VerifyEmailPage)
    .add("/marketplace", MarketplacePage)
    .add("/services/:id", ServiceDetailPage)
    .add("/jobs", JobsPage)
    .add("/jobs/:id", JobDetailPage)
    .add("/post-job", PostJobPage, { auth: true })
    .add("/orders", OrdersListPage, { auth: true })
    .add("/orders/:id", OrderDetailPage, { auth: true })
    .add("/chat", ChatPage, { auth: true })
    .add("/chat/:id", ChatPage, { auth: true })
    .add("/profile", ProfilePage, { auth: true })
    .add("/users/:id", PublicProfilePage)
    .add("/settings", SettingsPage, { auth: true })
    .add("/kyc", KycPage, { auth: true })
    .add("/verification", VerificationPage, { auth: true })
    .add("/dashboard", DashboardOverview, { auth: true })
    .add("/dashboard/buyer/orders", BuyerOrders, { auth: true })
    .add("/dashboard/buyer/jobs", BuyerJobs, { auth: true })
    .add("/dashboard/buyer/favorites", BuyerFavorites, { auth: true })
    .add("/dashboard/seller/services", SellerServices, { auth: true })
    .add("/dashboard/seller/orders", SellerOrders, { auth: true })
    .add("/dashboard/seller/earnings", SellerEarnings, { auth: true })
    .add("/admin", AdminDashboard, { auth: true, role: "ADMIN" })
    .add("/admin/sellers", VerifySellers, { auth: true, role: "ADMIN" })
    .add("/admin/kyc", ManageKyc, { auth: true, role: "ADMIN" })
    .add("/admin/users", ManageUsers, { auth: true, role: "ADMIN" })
    .add("/admin/services", ManageServices, { auth: true, role: "ADMIN" })
    .add("/admin/jobs", ManageJobs, { auth: true, role: "ADMIN" })
    .add("/admin/disputes", ManageDisputes, { auth: true, role: "ADMIN" })
    .add("/admin/settings", PlatformSettings, { auth: true, role: "ADMIN" })
    .add("/admin/activity", ActivityLog, { auth: true, role: "ADMIN" })
    .setNotFound((m) => {
      m.innerHTML = `<div class="container page"><div class="empty"><i class="fa-solid fa-compass"></i><h3>404 — Halaman tidak ditemukan</h3><p>URL yang Anda buka tidak tersedia.</p><a class="btn btn-primary mt-2" href="#/">Kembali ke Beranda</a></div></div>`;
    })
    .mount(mount);
}
