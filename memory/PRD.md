# Tolongin — Product Requirement Document (Living)

> Konteks ringkas untuk iterasi berikutnya. Detail sejarah perubahan ada di
> `AUDIT_REPORT.md`, `FIX_REPORT.md`, dan `CHANGELOG.md`.

## Visi singkat

Tolongin adalah marketplace **service + job** Indonesia: buyer bisa langsung
order jasa atau memposting lowongan; seller/freelancer menerima order dan
melamar pekerjaan. Inspirasi UX dari Fiverr/Upwork/Sribulancer namun
identitasnya khas Indonesia (Bahasa Indonesia primer, kategori lokal seperti
Service AC, Les Privat, Pindahan, dll.) — bukan e-commerce barang.

## Stack (tidak boleh diubah)

- Backend: **NestJS 10 + TypeScript 5 + Prisma 5 + MySQL 8**
- Frontend: **Vite + vanilla JS (custom hash router)** + Tailwind/CSS kustom
- Auth: JWT (access + refresh via httpOnly cookie)
- Realtime: Socket.io (`@nestjs/platform-socket.io`) namespace `/notifications`
- Cron: `@nestjs/schedule` (`OrdersTasksService`)
- Mock integrasi: payment / email / SMS / storage (Strategy pattern)

## User persona

1. **Buyer** — UMKM, founder startup, individu yang butuh service atau memposting job.
2. **Seller / Freelancer** — Desainer, developer, content writer, video editor, teknisi service, guru les. Bisa juga melamar job.
3. **Admin** — Tim platform yang memverifikasi KYC, menyelesaikan dispute, mengatur platform settings.

## Architecture pattern (sudah ada)

- Layered architecture per modul: `controllers/ → services/ → repositories/ → prisma`.
- DTO + class-validator + global ValidationPipe.
- Guards (JWT, Roles, VerifiedContact/Ktp/Withdrawal).
- Interceptors (Logging), Filters (Global Exception).
- Strategy pattern di `integrations/` (payment, email, sms, storage).
- Factory pattern: `OrderFactory`, `ServiceFactory`.
- State machine: `ORDER_TRANSITIONS` (lihat `common/constants/enums.ts`).
- Event-style notifications via `NotificationsService.notify()`.

## Core requirements (static)

- Buyer tidak boleh memesan service-nya sendiri (sudah dienforce).
- Seller tidak boleh melamar job-nya sendiri (sudah dienforce).
- Satu seller, satu application per job (unique constraint `[jobId, sellerId]`).
- Review hanya bisa dibuat saat order COMPLETED — sudah dienforce.
- Setiap pihak hanya boleh 1 review per order (unique `[orderId, reviewerId]`).
- Withdrawal hanya bisa dilakukan setelah KTP + rekening terverifikasi
  (sekarang `bankVerified` benar-benar bekerja).
- Auto-cancel order PAID >14 hari → refund saldo pembeli (baru saja diperbaiki).

## What's been implemented (2026-06-28)

- ✅ Auth/JWT lengkap dengan refresh, blacklist, password reset, OTP email/phone.
- ✅ Service marketplace: CRUD, featured, recommended, search/filter/sort,
  rating per service, favorit.
- ✅ Job marketplace: posting, application dengan validasi 50-150% budget,
  durasi 1-30 hari, cover letter min 20 char.
- ✅ Order lifecycle dengan escrow simulasi: WAITING_CONFIRMATION → PAID →
  WAITING_REVIEW → COMPLETED (atau REJECTED → resubmit → COMPLETED). Dispute
  membuka jalur DISPUTED.
- ✅ Work submission dengan attachment + work proof.
- ✅ Notifikasi (REST + WebSocket emit) untuk event order/payment/application/review/dispute.
- ✅ Chat per-order (`Conversation` 1:1 ke `Order`).
- ✅ Upload terpusat (`/api/uploads`) dengan magic byte signature validation.
- ✅ Admin dashboard (users, services, jobs, KYC, disputes, settings, activity).
- ✅ KYC simulasi (submit KTP + selfie + admin approve/reject).
- ✅ Seed realistis Indonesia (Citra/Andi/Sari/Maya/Budi/Irawan/Yano + buyers).
- ✅ Unit test escrow state machine (`orders.service.spec.ts`, 4 pass).

## Prioritized backlog

### P0 — Penting sebelum demo (selesai)
- [x] Fix `bankVerified` guard yang selalu false.
- [x] Atomic withdrawal (no race condition).
- [x] Auto-cancel transactional + refund saldo pembeli.

### P1 — Iterasi berikutnya
- [ ] Rate-limit per-user untuk endpoint POST sensitif (login, register,
  withdrawal, work-submission). `@nestjs/throttler` sudah dipasang global —
  tinggal menambah `@Throttle` per route critical.
- [ ] Pagination universal di endpoint `/reviews`, `/notifications` (sekarang
  berpotensi return banyak record).
- [ ] Frontend: skeleton loading konsisten di marketplace list & dashboard.
- [ ] Frontend: dark mode toggle (struktur `store.theme` sudah ada, CSS
  variables belum dipersiapkan).
- [ ] Refactor `DashboardPages.js` (1181 baris) menjadi sub-file per section.
- [ ] Static search index untuk service title supaya FULLTEXT MySQL
  (`MATCH ... AGAINST`) lebih cepat dibanding `LIKE %q%`. Butuh migrasi
  Prisma kecil.

### P2 — Polish jangka panjang
- [ ] Migrasi Vite vanilla JS ke arsitektur komponen reusable (mis. Lit /
  small wrapper). Bukan migrasi framework — hanya ekstraksi komponen.
- [ ] Internationalization yang lebih lengkap (sekarang ID-only).
- [ ] Analytics event tracking (mis. Plausible / PostHog) untuk demo metric.

## Next tasks

1. Jalankan smoke E2E lokal sesuai `DEPLOYMENT.md` sebelum presentasi.
2. Demo flow yang sudah diverifikasi (level kode):
   - Buyer order service → checkout simulasi → seller submit work → buyer
     approve → review.
   - Buyer post job → seller apply → buyer accept → order tercipta → ...
   - Withdrawal request (sekarang benar-benar lolos guard).
3. Setelah demo: ambil log review user, lanjutkan ke P1 backlog.
