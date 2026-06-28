# Tolongin — Local Deployment Guide

Lingkungan Emergent pod tidak menyediakan MySQL, sehingga seluruh perbaikan dilakukan dan diverifikasi dengan **static analysis** (tsc/nest build/vite build/jest). Berikut perintah lengkap yang harus dijalankan di mesin lokal Anda sebelum demo.

## Prasyarat

- Node.js 20+ (proyek diuji dengan v20.20.2)
- npm 10+ / yarn 1.x
- MySQL 8.x lokal atau remote (mis. lewat Docker)
- (opsional) Docker untuk container MySQL

### Jalankan MySQL lokal dengan Docker (opsional)

```bash
docker run -d --name tolongin-mysql \
  -e MYSQL_ROOT_PASSWORD= \
  -e MYSQL_ALLOW_EMPTY_PASSWORD=1 \
  -e MYSQL_DATABASE=tolongin \
  -p 3306:3306 \
  mysql:8 \
  --default-authentication-plugin=mysql_native_password
```

## 1) Backend

```bash
cd backend
cp .env .env.local       # opsional, kalau ingin override
# .env yang ter-bundle sudah berisi:
#   DATABASE_URL="mysql://root@localhost:3306/tolongin"
#   JWT_SECRET="secret_dev_tolongin"
#   PORT=8001 / CORS_ORIGIN=http://localhost:3000 / DEMO_MODE_ENABLED=true

npm install              # atau: yarn install
npx prisma generate
npx prisma migrate dev   # menerapkan migrasi yang sudah ada
npx prisma db seed       # mengisi user, kategori, services, jobs, orders demo

# Verifikasi build/test (sudah lulus di static analysis):
npx tsc --noEmit -p tsconfig.json
npx nest build
npx jest

# Jalankan dev server (port 8001):
npm run start:dev
```

API tersedia di `http://localhost:8001/api`. Swagger UI di `http://localhost:8001/api/docs`.

## 2) Frontend

```bash
cd frontend
# Pastikan VITE_BACKEND_URL menunjuk ke backend lokal Anda.
# Bawaan .env: VITE_BACKEND_URL=http://localhost:8001
npm install

# Verifikasi build:
npx vite build

# Jalankan dev server (port 3000):
npm run dev
```

UI tersedia di `http://localhost:3000`.

## 3) Akun demo (setelah seed)

Detail lengkap di `memory/test_credentials.md`. Yang paling sering dipakai untuk demo:

| Peran | Email | Password | Nama (seed) | Catatan |
| --- | --- | --- | --- | --- |
| Admin | admin@tolongin.com | Admin@123 | Admin Tolongin | Akses panel admin penuh. |
| Buyer (verified) | rina@tolongin.com | Buyer@123 | Rina Pratiwi | Owner brand fashion. |
| Buyer (un-KTP) | buyer@tolongin.com | Buyer@123 | Dewi Anggraini | Untuk demo flow KYC. |
| Seller (top) | citra@tolongin.com | Seller@123 | Citra Kirana | Desain grafis. |
| Seller (top) | andi@tolongin.com | Seller@123 | Andi Pratama | Web development. |
| Seller (generic) | seller@tolongin.com | Seller@123 | Yano Supriadi | Demo seller. |

## 4) Cron / scheduled tasks

`OrdersTasksService` berjalan otomatis tiap jam melalui `@nestjs/schedule`:
- `runAutoComplete` — disabled by design (escrow dirilis hanya lewat persetujuan eksplisit pembeli).
- `runAutoCancel` — cancel order PAID/IN_PROGRESS yang menggantung 14 hari, **kini ikut refund saldo pembeli** secara transactional.
- `runAutoResolveDisputes` — sengketa pending > 3 hari diselesaikan otomatis (demo).

## 5) Smoke test endpoint

```bash
# Login (ambil token):
curl -s -X POST http://localhost:8001/api/auth/login \
  -H 'Content-Type: application/json' \
  -d '{"email":"buyer@tolongin.com","password":"Buyer@123"}' | jq .

# Featured services (publik):
curl -s http://localhost:8001/api/services/featured | jq '.[0]'

# Daftar kategori:
curl -s http://localhost:8001/api/categories | jq .
```

## 6) Troubleshooting

- **Prisma generate gagal**: pastikan `npm install` selesai tanpa error. `npx prisma generate` butuh `@prisma/client` ter-install.
- **Migrate dev butuh database kosong**: drop database & buat ulang jika ada konflik schema.
- **CORS error di browser**: cek `CORS_ORIGIN` di `backend/.env` cocok dengan URL frontend Anda.
- **WebSocket tidak konek**: dev server Vite menset `clientPort: 443, protocol: 'wss'` (siap untuk preview HTTPS). Untuk dev lokal HTTP, edit `frontend/vite.config.js` (`hmr: false` jika perlu).
