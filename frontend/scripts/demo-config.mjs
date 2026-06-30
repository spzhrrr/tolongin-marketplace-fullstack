/** Shared config for demo walkthrough & visual capture */

export const FRONTEND_URL = process.env.DEMO_FRONTEND_URL || "http://localhost:3000";
export const API_URL = process.env.DEMO_API_URL || "http://localhost:8001/api";
export const VIEWPORT = { width: 1366, height: 768 };
export const SLOW_MO = Number(process.env.DEMO_SLOW_MO || 65);
export const PAUSE_MS = Number(process.env.DEMO_PAUSE_MS || 2200);

export const ACCOUNTS = {
  buyer: { email: "buyer@tolongin.com", password: "Buyer@123", label: "Dewi Anggraini (Buyer)" },
  buyerAlt: { email: "aditya@tolongin.com", password: "Buyer@123", label: "Aditya Wirawan (Buyer)" },
  seller: { email: "seller@tolongin.com", password: "Seller@123", label: "Yano Supriadi (Seller)" },
  designer: { email: "citra@tolongin.com", password: "Seller@123", label: "Citra Kirana (Desainer)" },
  admin: { email: "admin@tolongin.com", password: "Admin@123", label: "Admin" },
};

export const DEMO_FLOWS = [
  {
    id: "discover",
    title: "Discovery — tamu jelajahi platform",
    role: null,
    steps: [
      { path: "/", pause: 2800, note: "Landing hero + value prop" },
      { path: "/marketplace?serviceType=DIGITAL", pause: 2400, note: "Cari jasa digital" },
      { path: "/jobs", pause: 2400, note: "Cari kerja" },
    ],
  },
  {
    id: "buy-order",
    title: "Buyer — pesan jasa + escrow",
    role: "buyer",
    steps: [
      { path: "/marketplace?category=desain-grafis", pause: 2000, note: "Filter desain grafis" },
      { action: "openFirstService", pause: 2500, note: "Buka detail jasa" },
      { action: "orderService", pause: 2000, note: "Kirim pesanan" },
      { action: "payEscrow", pause: 2500, note: "Bayar via escrow (demo)" },
    ],
  },
  {
    id: "seller-work",
    title: "Seller — kelola pesanan",
    role: "designer",
    steps: [
      { path: "/dashboard", pause: 2000, note: "Dashboard seller" },
      { path: "/dashboard/transactions", pause: 2200, note: "Transaksi masuk" },
      { path: "/chat", pause: 2000, note: "Chat dengan buyer" },
    ],
  },
  {
    id: "buyer-approve",
    title: "Buyer — approve pekerjaan + review",
    role: "buyerAlt",
    steps: [
      { path: "/orders", pause: 2200, note: "Daftar pesanan (ada yang WAITING_REVIEW)" },
      { action: "openWaitingReviewOrder", pause: 2500, note: "Order menunggu review" },
    ],
  },
  {
    id: "job-flow",
    title: "Lowongan — browse & detail",
    role: "buyer",
    steps: [
      { path: "/jobs?serviceType=DIGITAL", pause: 2200, note: "Lowongan digital" },
      { action: "openFirstJob", pause: 2500, note: "Detail lowongan" },
      { path: "/dashboard/manage-jobs/new", pause: 2000, note: "Form post lowongan (preview)" },
    ],
  },
  {
    id: "admin",
    title: "Admin — moderasi platform",
    role: "admin",
    steps: [
      { path: "/admin", pause: 2200, note: "Admin dashboard" },
      { path: "/admin/kyc", pause: 2000, note: "Verifikasi KYC" },
      { path: "/admin/disputes", pause: 1800, note: "Dispute center" },
    ],
  },
];
