# Tolongin — Audit Laporan (Final Pre-Demo)

Tanggal audit: 2026-06-28
Auditor: Senior product-engineering review (E1)
Stack target: **NestJS + Prisma + MySQL** (backend) · **React/Vite (vanilla JS)** (frontend) — tidak diubah
Mode: Static analysis + TypeScript build + unit test (lingkungan tidak menjalankan MySQL — sesuai kesepakatan opsi **1A**).

---

## 1. Ringkasan Eksekutif

| Aspek | Status awal | Status setelah perbaikan |
| --- | --- | --- |
| Backend `tsc --noEmit` | ❌ 1 error (`orders.service.spec.ts`) | ✅ 0 error |
| Backend `nest build` | ✅ OK | ✅ OK |
| Frontend `vite build` | ✅ OK | ✅ OK |
| Unit test (`jest`) | ✅ 4 pass | ✅ 4 pass |
| Bug **kritis** (silent fund loss) | 2 ditemukan | 2 diperbaiki |
| Bug **autorisasi** | 1 (`bankVerified` selalu false) | Diperbaiki |
| Bug **race condition** | 1 (saldo bisa minus) | Diperbaiki |
| Bug **statistik salah** | 1 (rating tercampur 2 arah) | Diperbaiki |
| Seed/demo data | Mengandung placeholder ("Buyer Demo", avatar null) | Direalistiskan |

> Database produksi tidak diubah — tidak ada migrasi baru yang dibutuhkan. Semua perbaikan berada di lapisan kode TypeScript/JS dan SQL/Prisma client.

---

## 2. Temuan Kritis (P0)

### 2.1 `VerifiedWithdrawalGuard` selalu menolak semua pengguna
**Lokasi:** `backend/src/common/guards/verification.guards.ts`, `jwt.strategy.ts`, `auth.service.ts`
**Severity:** P0 — fitur penarikan dana TIDAK PERNAH berhasil dieksekusi.

`User` model **tidak memiliki kolom `bankVerified`** (sumber kebenaran ada di tabel `BankAccount.isVerified`). Guard memeriksa `!user.bankVerified` — karena field tersebut selalu `undefined`, kondisi `!undefined === true` selalu membuat guard melempar `ForbiddenException`. Akibatnya endpoint withdrawal **tidak bisa diakses oleh siapa pun**, termasuk akun yang sudah verifikasi KTP & rekening.

**Perbaikan:**
- Tambah `AuthRepository.hasVerifiedBankAccount(userId)` — query `bankAccount.count({ isVerified: true })`.
- `AuthService.validateUser()` sekarang menghitung flag tersebut dan menempelkannya ke objek user yang dipakai `JwtStrategy.validate()`.
- `toPublic()` menerima `bankVerified` sebagai parameter sehingga response `/auth/me`, `/auth/login`, `/auth/refresh` mengembalikan nilai aktual.

### 2.2 Auto-cancel order **menghilangkan dana pembeli secara diam-diam**
**Lokasi:** `backend/src/modules/orders/services/orders.service.ts → runAutoCancel/applyStatus`
**Severity:** P0 — pembeli kehilangan uang yang seharusnya direfund.

Cron job `runAutoCancel` membatalkan order **PAID/IN_PROGRESS** yang tidak ada submission selama 14 hari. Tapi implementasi lama hanya mengubah status order menjadi `CANCELLED` — **tidak mengembalikan saldo ke pembeli** dan **tidak menandai payment sebagai REFUNDED**. Escrow yang sudah `FUNDED` tetap berstatus `FUNDED` di-database walaupun order sudah cancelled, dan dana tidak pernah masuk balance siapa pun → kerugian senyap.

**Perbaikan:**
- Helper baru `cancelAndRefund(order, byUserId, note)` yang:
  1. Update order: status=CANCELLED, escrowStatus='REFUNDED', cancellationReason, timeline.
  2. `payment.updateMany({ orderId, status: COMPLETED }) → REFUNDED`.
  3. Increment saldo `buyer.balance` sebesar `order.amount`.
  4. Semua dalam `prisma.$transaction`.
- Notifikasi terpisah ke pembeli ("↩️ Dana Dikembalikan") dan ke penjual ("❌ Pesanan Dibatalkan").

### 2.3 `WithdrawalsService.create()` rentan race condition — saldo bisa minus
**Lokasi:** `backend/src/modules/withdrawals/services/withdrawals.service.ts`
**Severity:** P0 (silent fund loss / negative balance).

Implementasi lama:
```ts
if (profile.balance < dto.amount) throw new BadRequestException('Saldo tidak mencukupi');
const created = await this.repo.createWithdrawal(...);
await this.repo.updateBalance(sellerId, -dto.amount);
```
Dua request paralel dapat **lolos cek** kemudian sama-sama men-decrement saldo → saldo akhir bisa negatif. Jika `createWithdrawal` sukses tapi `updateBalance` gagal, withdrawal tercatat tanpa pemotongan saldo.

**Perbaikan:**
- Wrap dalam `prisma.$transaction`.
- Decrement saldo memakai `user.updateMany({ where: { id, balance: { gte: amount } }, data: { balance: { decrement: amount } } })`. Jika `claimed.count === 0`, lempar `BadRequestException('Saldo tidak mencukupi')`. Ini bersifat **CAS atomik** dan menutup race tanpa locking eksplisit.
- Validasi `acc.isVerified` ditambahkan sebelum transaksi.
- Validasi `minimum withdrawal` dari `PlatformSetting.min_withdrawal` (fallback 50_000).
- Notifikasi user setelah withdrawal dibuat.

---

## 3. Temuan Mayor (P1)

### 3.1 Statistik rating user **mencampur dua arah ulasan**
**Lokasi:** `backend/src/modules/reviews/repositories/reviews.repository.ts → aggregateSellerRating`

`User.rating` di-update dari `aggregateSellerRating` tanpa filter `reviewType`. Padahal ulasan `BUYER_TO_SELLER` dan `SELLER_TO_BUYER` berbeda peran. Akibatnya rating "sebagai penjual" tercampur dengan rating "sebagai pembeli".

**Perbaikan:**
- `aggregateSellerRating` sekarang filter `reviewType: 'BUYER_TO_SELLER'`.
- Tambah `aggregateBuyerRating` untuk `SELLER_TO_BUYER`.
- `ReviewsService.create / update / delete` memilih aggregator yang tepat berdasarkan arah ulasan.

### 3.2 Pencarian marketplace & jobs hanya mencocokkan **title**
**Lokasi:** `services.service.ts`, `jobs.service.ts`

Filter `query.q` hanya cari di `title`. User yang search keyword yang ada di description tidak menemukan listing relevan.

**Perbaikan:** ubah ke `where.OR = [{ title: { contains } }, { description: { contains } }]`.

### 3.3 Seed data masih mengandung placeholder
**Lokasi:** `backend/prisma/seed.ts`

- `Buyer Demo` / `🎯 Demo Buyer` (dilarang user) → diganti **Dewi Anggraini** (Manajer UMKM Sidoarjo).
- Bio pendek dan generik ("Senior Full-stack Developer") → diperluas dengan teknologi spesifik + pengalaman.
- Deskripsi service singkat ("AC cooling service", "Math tutoring online") → diperluas dengan detail deliverable, output, garansi.
- `AVATAR` dulu return `null` sehingga semua akun seed **tidak punya avatar** → otomatis terkena gate router (`!user.avatar → redirect /settings`). Sekarang return URL `ui-avatars.com` deterministik berdasarkan nama, agar demo langsung dapat browsing tanpa harus upload dulu.

---

## 4. Temuan Minor (P2)

| # | Lokasi | Catatan |
| --- | --- | --- |
| 4.1 | `orders.service.spec.ts:97` | TS narrowing error pada literal `ORDER_STATUS.PAID` di partial object — diperbaiki dengan annotation `as string` agar tipe `status` di test tetap fleksibel. |
| 4.2 | `verification.guards.ts` | Komentar sudah jelas, namun behaviour kini benar setelah fix `bankVerified`. |
| 4.3 | `uploads.controller.ts` | Global JwtAuthGuard sudah memproteksi endpoint upload — tidak ada endpoint upload publik. |
| 4.4 | `notifications.service` | Sudah pakai `NotificationsRealtime` untuk emit WS — tidak ada kebocoran listener. |

---

## 5. Yang **Tidak** Diubah dan Kenapa

- **Stack** (NestJS/MySQL/Prisma/React/Vite) — sesuai instruksi explicit dari user.
- **Database schema (`schema.prisma`)** — tidak dibutuhkan migrasi karena seluruh fix bisa dilakukan di service layer. Menambah kolom `bankVerified` ke `User` akan menjadi duplikasi data (denormalisasi). Sumber kebenaran tetap di `BankAccount`.
- **WebSocket gateway, chat module, dispute module** — implementasi sudah konsisten; tidak ada bug yang terdeteksi pada static review.
- **Routing struktur frontend, layout, navbar** — bekerja dengan benar; perubahan kosmetik diserahkan ke iterasi selanjutnya.
- **Real payment/email/SMS integration** — semua tetap mock sesuai instruksi user (opsi 3A).

---

## 6. Hasil Build & Test (Pasca-Perbaikan)

```
$ cd backend && npx tsc --noEmit                              # 0 error
$ cd backend && npx nest build                                # OK
$ cd backend && npx jest --testPathPattern=orders.service     # 4 passed
$ cd frontend && npx vite build                               # built, 0 error
```

Lihat `FIX_REPORT.md` untuk daftar perubahan file, dan `DEPLOYMENT.md` untuk perintah yang harus dijalankan secara lokal sebelum demo.
