# Changelog

Semua perubahan signifikan untuk persiapan Final Project Software Architecture.

## [2026-06-28] — Pre-demo audit & refactor

### Fixed (P0 — kritis)
- **Withdrawal endpoint kini bisa diakses** — `bankVerified` semula selalu `undefined`/`false` di JWT payload (kolom tidak ada di schema `User`); sekarang diderive dari `BankAccount.isVerified` di `AuthService.validateUser` & dipropagasi ke `JwtStrategy.validate`.
- **Auto-cancel order tidak lagi menghilangkan dana pembeli** — order PAID/IN_PROGRESS yang di-cancel cron 14-hari kini transactional: saldo pembeli direstore, payment ditandai REFUNDED, dan kedua pihak menerima notifikasi yang berbeda.
- **Withdrawal race condition diperbaiki** — decrement saldo bersyarat (`updateMany where balance >= amount`) dalam transaction sehingga saldo tidak bisa minus.

### Fixed (P1)
- Rating user tidak lagi mencampur arah ulasan (buyer→seller vs seller→buyer). Field `User.rating` kini mengikuti peran yang sesuai dengan arah review.
- Pencarian marketplace & job mencakup `title` + `description` (sebelumnya hanya title).
- Test `orders.service.spec.ts` kompilasi clean tanpa narrowing error.

### Changed (UX/seed)
- Akun "Buyer Demo" diganti **Dewi Anggraini** (Sidoarjo). Bio & deskripsi service/job direvisi agar realistis dan informatif.
- Avatar seed sekarang URL `ui-avatars.com` deterministik berdasarkan nama. Demo dapat langsung browsing tanpa onboarding upload-avatar.

### Validated
- `npx tsc --noEmit -p tsconfig.json` → 0 error.
- `npx nest build` → OK.
- `npx jest --testPathPattern=orders.service` → 4 passed.
- `npx vite build` → built tanpa error.

### Not changed (intentional)
- Stack tetap NestJS + Prisma + MySQL & React/Vite (sesuai brief).
- Tidak ada migrasi Prisma baru — semua fix di service layer.
- Integrasi eksternal (payment, email, SMS, storage) tetap mock (sesuai opsi 3A).
