# Tolongin — Fix Report (Pre-Demo)

Tanggal: 2026-06-28
Stack: NestJS + Prisma + MySQL · React/Vite (vanilla JS)

Hanya berisi list konkret file yang berubah dan ringkasan perubahannya. Untuk konteks "kenapa" lihat `AUDIT_REPORT.md`.

## Backend (NestJS / TypeScript)

| File | Jenis | Ringkasan |
| --- | --- | --- |
| `backend/src/modules/auth/repositories/auth.repository.ts` | tambah method | `hasVerifiedBankAccount(userId)` — derive flag bankVerified dari tabel `BankAccount`. |
| `backend/src/modules/auth/services/auth.service.ts` | refactor | `toPublic` menerima `bankVerified` dari caller. `buildTokens`, `getProfile`, `updateProfile`, `validateUser` sekarang menghitung & meneruskan flag tsb. |
| `backend/src/modules/orders/services/orders.service.ts` | bug fix + new helper | Auto-cancel kini transactional dan **mengembalikan saldo pembeli** + tandai payment REFUNDED + notifikasi ke kedua pihak. Helper baru `cancelAndRefund()`. |
| `backend/src/modules/withdrawals/services/withdrawals.service.ts` | rewrite | Penarikan dana sepenuhnya transactional dengan decrement saldo bersyarat (CAS) untuk menutup race. Validasi rekening terverifikasi & minimum withdrawal. Notifikasi setelah create. |
| `backend/src/modules/withdrawals/withdrawals.module.ts` | dependency injection | Import `NotificationsModule` agar `WithdrawalsService` bisa notify. |
| `backend/src/modules/reviews/repositories/reviews.repository.ts` | bug fix | `aggregateSellerRating` filter `reviewType: 'BUYER_TO_SELLER'`. Tambah `aggregateBuyerRating` untuk `SELLER_TO_BUYER`. |
| `backend/src/modules/reviews/services/reviews.service.ts` | bug fix | Saat update/delete review: pilih aggregator sesuai arah ulasan. Saat create: aggregator dipilih berdasarkan apakah reviewer adalah buyer atau seller pada order tsb. |
| `backend/src/modules/services/services/services.service.ts` | feature | Pencarian `q` sekarang OR pada `title` + `description`. |
| `backend/src/modules/jobs/services/jobs.service.ts` | feature | Idem untuk job marketplace. |
| `backend/src/modules/orders/services/orders.service.spec.ts` | TS fix | Annotation `ORDER_STATUS.WAITING_REVIEW as string` agar partial object literal-friendly. |
| `backend/prisma/seed.ts` | data realism | Replace `Buyer Demo / Demo Buyer` → **Dewi Anggraini** (Sidoarjo). Bio + deskripsi service & job diperluas. `AVATAR()` sekarang URL `ui-avatars.com` deterministik. Login banner cetak nama lengkap akun untuk demo. |

## Frontend (React/Vite, vanilla JS)

> Tidak ada perubahan kontrak API atau perubahan struktural yang dibutuhkan untuk core fix backend (semua perbaikan transparan terhadap frontend). Berikut perubahan kecil yang sudah ada di repo.

| File | Catatan |
| --- | --- |
| _(tidak ada perubahan source code wajib pada iterasi ini)_ | Audit UX detail di `AUDIT_REPORT.md §5`. |

## Documentation

| File baru | Isi |
| --- | --- |
| `AUDIT_REPORT.md` | Temuan kritis, mayor, minor, dan alasan tidak mengubah hal-hal lain. |
| `FIX_REPORT.md` | File-by-file diff summary (file ini). |
| `CHANGELOG.md` | Pengumuman ringkas untuk handoff. |
| `DEPLOYMENT.md` | Perintah lokal end-to-end. |
| `memory/PRD.md` | Konteks produk untuk iterasi selanjutnya. |
| `memory/test_credentials.md` | Kredensial akun seed (demo). |
