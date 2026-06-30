<img width="1743" height="675" alt="image" src="https://github.com/user-attachments/assets/320afd63-f574-45ba-beee-df56a98acc71" /># Tolongin — Marketplace Jasa & Pekerjaan Indonesia

Platform full-stack yang menghubungkan **penyedia jasa (seller/freelancer)** dengan **pencari jasa (buyer)**, sekaligus mendukung **marketplace pekerjaan** (posting lowongan & lamaran). Satu akun dapat berperan sebagai buyer maupun seller.

> Proyek AOL Teori Software Architecture — implementasi nyata alur marketplace dengan verifikasi identitas, escrow simulasi, chat, dan notifikasi real-time.

---

## Cuplikan Aplikasi

| Cari Jasa (Marketplace) | Cari Kerja (Lowongan) |
|:---:|:---:|
| ![Halaman Cari Jasa](docs/images/marketplace.png) | ![Halaman Cari Kerja](docs/images/jobs.png) |

| Beranda | Detail Jasa |
|:---:|:---:|
| ![Beranda](docs/images/homepage.png) | ![Detail Jasa](docs/images/service-detail.png) |

*Screenshot lain (login, profil, job detail): [`docs/images/`](docs/images/). Regenerasi: `cd frontend && npm run visual:capture` (backend + frontend harus jalan).*

---

## Konsep & Tujuan

Tolongin meniru pengalaman marketplace profesional (Fiverr/Upwork/Sribulancer) dengan nuansa **Indonesia**:

- **Dual marketplace** — jual/beli jasa *dan* posting/melamar pekerjaan dalam satu platform.
- **Escrow simulasi** — dana buyer ditahan hingga pekerjaan disetujui; tanpa tombol "demo" eksplisit di UI.
- **Kepercayaan** — verifikasi email, telepon, KTP, dan rekening bank sebelum transaksi sensitif.
- **Realtime** — notifikasi & chat via WebSocket agar alur terasa seperti aplikasi produksi.

**Hasil yang dicapai:** alur end-to-end dari registrasi → verifikasi → posting/lamaran → order → pembayaran escrow → submit pekerjaan → review → penarikan saldo, plus panel admin untuk moderasi.

---

## Fitur Utama

| Area | Kemampuan |
|------|-----------|
| **Auth & profil** | Register/login JWT, refresh token, reset password, profil publik, portofolio |
| **Verifikasi** | OTP email/telepon, upload KTP + selfie, verifikasi rekening bank |
| **Marketplace jasa** | CRUD jasa, gambar, kategori, filter/sort, favorit, rating |
| **Marketplace kerja** | Posting lowongan, lamaran dengan cover letter & penawaran harga |
| **Order & escrow** | State machine order, submit pekerjaan, revisi, dispute, auto-cancel |
| **Pembayaran** | Mock payment gateway, saldo wallet, riwayat transaksi |
| **Komunikasi** | Chat per-order, notifikasi REST + WebSocket |
| **Review** | Review dua arah setelah order selesai |
| **Admin** | Manajemen user, KYC, jasa, job, dispute, activity log |
| **Upload** | File terpusat dengan validasi MIME/signature (avatar, KTP, bukti kerja, dll.) |

---

## Tech Stack

| Lapisan | Teknologi |
|---------|-----------|
| **Backend** | NestJS 10, TypeScript, Prisma 5, MySQL 8 |
| **Frontend** | Vite 8, Vanilla JavaScript (hash router), CSS modular |
| **Auth** | JWT + Passport, httpOnly refresh cookie |
| **Realtime** | Socket.io (`/notifications`, chat gateway) |
| **API docs** | Swagger UI di `/api/docs` |
| **Testing** | Jest (unit), Python integration tests di `backend/tests/` |
| **Deploy** | Docker multi-stage (backend + frontend), Nginx static |

---

## Arsitektur Software

### Gambaran besar

```mermaid
flowchart TB
  subgraph Client
    FE[Vite SPA<br/>Hash Router + Store]
  end

  subgraph Backend["NestJS API :8001"]
    CTRL[Controllers]
    SVC[Services]
    REPO[Repositories]
    GUARD[Guards & Pipes]
    CTRL --> SVC --> REPO
    GUARD -.-> CTRL
  end

  subgraph Data
    DB[(MySQL)]
    UP[File Uploads]
  end

  subgraph Realtime
    WS[Socket.io Gateways]
  end

  subgraph Integrations
    PAY[Payment Mock]
    EMAIL[Email Mock]
    SMS[SMS Mock]
    STORE[Storage Mock]
  end

  FE -->|REST /api| CTRL
  FE <-->|WebSocket| WS
  REPO --> DB
  CTRL --> UP
  SVC --> PAY & EMAIL & SMS & STORE
  WS --> SVC
```

### Backend — layered module

Setiap domain (`auth`, `orders`, `jobs`, `services`, …) mengikuti pola:

```
modules/<nama>/
├── controllers/     # HTTP, validasi input, response shape
├── services/        # business logic & orchestration
├── repositories/    # akses database (Prisma)
├── dto/             # class-validator + Swagger
└── factories/       # (opsional) pembuatan entity kompleks
```

**Cross-cutting:** `common/guards` (JWT, Roles, Verified*), `common/filters`, `common/interceptors`, `integrations/` untuk layanan eksternal.

### Frontend — feature-based SPA

```
frontend/src/
├── app/           # router, layout, global store
├── features/      # halaman per domain (marketplace, jobs, orders, …)
├── shared/        # UI components, api client, helpers, WebSocket
└── styles/        # main.css, navbar, premium tokens
```

Routing hash-based (`#/marketplace`) tanpa framework UI berat — ringan dan mudah di-deploy statis.

---

## Design Pattern

| Pattern | Penerapan di Tolongin |
|---------|------------------------|
| **Layered Architecture** | Controller → Service → Repository → Prisma |
| **Repository** | Semua query DB terisolasi di `*.repository.ts` |
| **DTO + Validation** | `class-validator` + global `ValidationPipe` |
| **Guard / Strategy** | JWT auth, role-based access, guard verifikasi bertingkat |
| **Factory** | `OrderFactory`, `ServiceFactory`, `JobFactory` |
| **State Machine** | Transisi status order (`ORDER_TRANSITIONS` di enums) |
| **Strategy (Integration)** | Interface `payment`, `email`, `sms`, `storage` + mock impl |
| **Observer / Event-style** | `NotificationsService.notify()` + WebSocket emit |
| **Module (NestJS)** | Satu modul per bounded context, dependency injection |

---

## Struktur Repository

```
├── backend/          # NestJS API, Prisma, seed, tests
├── frontend/         # Vite SPA
├── docs/images/      # Screenshot README
├── memory/PRD.md     # Product requirement doc
└── scripts/          # Utility (mis. resolve-conflicts)
```

---

## Menjalankan Secara Lokal

### Prasyarat

- Node.js 20+
- MySQL 8 (atau MariaDB kompatibel)
- npm

### 1. Backend

Buat `backend/.env` minimal:

```env
DATABASE_URL="mysql://user:password@localhost:3306/tolongin"
JWT_SECRET="dev-secret-min-32-characters-long"
CORS_ORIGIN="http://localhost:3000"
PORT=8001
```

```bash
cd backend
npm install
npx prisma migrate dev
npx prisma db seed
npm run start:dev             # http://localhost:8001/api
```

Swagger: **http://localhost:8001/api/docs**

### 2. Frontend

```bash
cd frontend
npm install
npm run dev                   # http://localhost:3000
```

Frontend mem-proxy API ke backend (lihat `frontend/vite.config.js`).

### Akun demo (seed)

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@tolongin.com | Admin@123 |
| Seller | seller@tolongin.com | Seller@123 |
| Buyer | buyer@tolongin.com | Buyer@123 |

---

## Environment Variables (Backend)

| Variable | Deskripsi |
|----------|-----------|
| `DATABASE_URL` | Connection string MySQL |
| `JWT_SECRET` | Secret signing access token |
| `JWT_REFRESH_SECRET` | Secret refresh token |
| `PORT` | Default `8001` |
| `CORS_ORIGIN` | Origin frontend (dev: `http://localhost:3000`) |
| `DEMO_MODE_ENABLED` | Auto-approve KYC/bank untuk demo (`true`/`false`) |

Validasi production: `backend/src/config/environment.validation.ts`.

---

## Testing

```bash
# Unit test backend (order state machine, dll.)
cd backend && npm test

# Integration tests (Python — butuh API jalan)
cd backend && python tests/backend_test.py
```

Capture screenshot UI untuk review:

```bash
cd frontend && npm run visual:capture
```

---

## Alur Bisnis Singkat (Order Escrow)

```
Buyer pesan jasa → WAITING_CONFIRMATION → Seller terima → PAID (escrow)
→ Seller kerjakan & submit → WAITING_REVIEW → Buyer approve → COMPLETED
→ Review dua arah → Saldo seller → Withdrawal (setelah KTP + bank verified)
```

Dispute, revisi, dan auto-cancel (order menganggur >14 hari) ditangani di `OrdersService` + cron `OrdersTasksService`.

---

## Deploy dengan Docker

```bash
# Backend (port 8001) — set env DATABASE_URL, JWT_SECRET, CORS_ORIGIN saat run
cd backend && docker build -t tolongin-api .
docker run -p 8001:8001 --env-file .env tolongin-api

# Frontend (Nginx, port 80)
cd frontend && docker build -t tolongin-web .
docker run -p 8080:80 tolongin-web
```

Pastikan MySQL dapat diakses container backend. Untuk cloud (Railway, Vercel, dll.) pisahkan service DB, API, dan static frontend; sesuaikan `CORS_ORIGIN` dan URL API di build frontend.

---

## Dokumentasi Terkait

| File | Isi |
|------|-----|
| [`memory/PRD.md`](memory/PRD.md) | Visi produk, backlog, requirement |
| [`backend/src/app.module.ts`](backend/src/app.module.ts) | Daftar modul NestJS terdaftar |
| Swagger `/api/docs` | Spesifikasi REST API interaktif |

---

## **DISCLAIMER:** Push ke GitHub pada iterasi terakhir dibantu Cursor Agent karena troubleshooting push yang berulang;

## Lisensi & Catatan

Proyek akademik / portfolio — **Tolongin**. Integrasi payment, email, dan SMS menggunakan **mock service**; siap diganti implementasi produksi via pattern Strategy di `backend/src/integrations/`.

---

**Dibuat sebagai implementasi full-stack marketplace dengan prinsip clean architecture, verifikasi pengguna bertingkat, dan UX modern untuk pasar jasa Indonesia.**


