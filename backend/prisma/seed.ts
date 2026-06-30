import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();
const ROUNDS = 12;

const FACE_IMG: Record<string, number> = {
  admin: 68,
  citra: 45,
  andi: 12,
  sari: 32,
  maya: 23,
  budi: 15,
  irawan: 7,
  seller: 33,
  rina: 47,
  aditya: 52,
  buyer: 11,
  eko: 16,
  fitri: 44,
  gilang: 59,
  hana: 26,
  joko: 61,
  kirana: 48,
  laras: 25,
  miko: 53,
  nia: 38,
  oki: 19,
};

const AVATAR = (key: string): string =>
  `https://i.pravatar.cc/256?img=${FACE_IMG[key] ?? 11}`;

// ============================================================
// GAMBAR RANDOM DARI LOREM PICSUM (PASTI WORK 100%)
// ============================================================

// Koleksi ID gambar yang bagus dari Picsum
const IMAGE_IDS = [
  100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114,
  115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129,
  130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144,
  145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159,
  200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 300, 301, 302, 303, 304,
  305, 306, 307, 308, 309, 400, 401, 402, 403, 404, 405, 406, 407, 408, 409,
  500, 501, 502, 503, 504, 505, 506, 507, 508, 509, 600, 601, 602, 603, 604,
  605, 606, 607, 608, 609, 700, 701, 702, 703, 704, 705, 706, 707, 708, 709,
  800, 801, 802, 803, 804, 805, 806, 807, 808, 809, 900, 901, 902, 903, 904,
  905, 906, 907, 908, 909,
];

function getServiceImages(index: number, catSlug: string): string[] {
  const pool = CATEGORY_IMAGES[catSlug] || DEFAULT_IMAGES;
  const count = Math.min(3 + (index % 2), pool.length, 4);
  const imgs: string[] = [];
  for (let i = 0; i < count; i++) {
    imgs.push(pool[(index + i) % pool.length]);
  }
  return imgs;
}

const DEFAULT_IMAGES = [
  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&h=400&q=80',
  'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&h=400&q=80',
  'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=600&h=400&q=80',
];

function getServiceImage(index: number, catSlug: string): string {
  return getServiceImages(index, catSlug)[0];
}

const CATEGORY_IMAGES: Record<string, string[]> = {
  'desain-grafis': [
    'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=600&h=400&q=80',
    'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=600&h=400&q=80',
    'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=600&h=400&q=80',
  ],
  'web-development': [
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&h=400&q=80',
    'https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=600&h=400&q=80',
    'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&h=400&q=80',
  ],
  'mobile-development': [
    'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=600&h=400&q=80',
    'https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?auto=format&fit=crop&w=600&h=400&q=80',
  ],
  'data-entry': [
    'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&h=400&q=80',
    'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=600&h=400&q=80',
  ],
  penulisan: [
    'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=600&h=400&q=80',
    'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=600&h=400&q=80',
  ],
  'video-editing': [
    'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=600&h=400&q=80',
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&h=400&q=80',
  ],
  'digital-marketing': [
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&h=400&q=80',
    'https://images.unsplash.com/photo-1557838923-2985c318be48?auto=format&fit=crop&w=600&h=400&q=80',
  ],
  'les-privat': [
    'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=600&h=400&q=80',
    'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=600&h=400&q=80',
  ],
  'service-reparasi': [
    'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=600&h=400&q=80',
    'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=600&h=400&q=80',
  ],
  pindahan: [
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&h=400&q=80',
    'https://images.unsplash.com/photo-1600518464441-9154a4dea21b?auto=format&fit=crop&w=600&h=400&q=80',
  ],
  fotografi: [
    'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?auto=format&fit=crop&w=600&h=400&q=80',
    'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=600&h=400&q=80',
  ],
  kebersihan: [
    'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?auto=format&fit=crop&w=600&h=400&q=80',
    'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&h=400&q=80',
  ],
  'event-catering': [
    'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=600&h=400&q=80',
    'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=600&h=400&q=80',
  ],
  'tukang-rumah': [
    'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&h=400&q=80',
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=600&h=400&q=80',
    'https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=600&h=400&q=80',
    'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=600&h=400&q=80',
  ],
};

const dayMs = 24 * 3600 * 1000;
const future = (days: number) => new Date(Date.now() + days * dayMs);
const past = (days: number) => new Date(Date.now() - days * dayMs);

async function main() {
  console.log('\n🌱 ========== STARTING SEED ==========\n');

  // ============================================================
  // CLEAN TABLES
  // ============================================================
  console.log('🧹 Cleaning existing data...');

  await prisma.review.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.message.deleteMany();
  await prisma.conversation.deleteMany();
  await prisma.application.deleteMany();
  await prisma.order.deleteMany();
  await prisma.favorite.deleteMany();
  await prisma.job.deleteMany();
  await prisma.service.deleteMany();
  await prisma.bankAccount.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.portfolio.deleteMany();
  await prisma.userBadge.deleteMany();

  console.log('✅ Clean complete\n');

  // ============================================================
  // CATEGORIES
  // ============================================================
  console.log('📂 Creating categories...');

  const categories = [
    {
      name: 'Desain Grafis',
      slug: 'desain-grafis',
      icon: 'fa-palette',
      serviceType: 'DIGITAL',
    },
    {
      name: 'Web Development',
      slug: 'web-development',
      icon: 'fa-code',
      serviceType: 'DIGITAL',
    },
    {
      name: 'Mobile Development',
      slug: 'mobile-development',
      icon: 'fa-mobile-screen',
      serviceType: 'DIGITAL',
    },
    {
      name: 'Data Entry',
      slug: 'data-entry',
      icon: 'fa-keyboard',
      serviceType: 'DIGITAL',
    },
    {
      name: 'Penulisan & Content',
      slug: 'penulisan',
      icon: 'fa-pen-nib',
      serviceType: 'DIGITAL',
    },
    {
      name: 'Video Editing',
      slug: 'video-editing',
      icon: 'fa-film',
      serviceType: 'DIGITAL',
    },
    {
      name: 'Digital Marketing',
      slug: 'digital-marketing',
      icon: 'fa-bullhorn',
      serviceType: 'DIGITAL',
    },
    {
      name: 'Les Privat',
      slug: 'les-privat',
      icon: 'fa-chalkboard-user',
      serviceType: 'PHYSICAL',
    },
    {
      name: 'Service & Reparasi',
      slug: 'service-reparasi',
      icon: 'fa-screwdriver-wrench',
      serviceType: 'PHYSICAL',
    },
    {
      name: 'Pindahan & Logistik',
      slug: 'pindahan',
      icon: 'fa-truck',
      serviceType: 'PHYSICAL',
    },
    {
      name: 'Fotografi & Videografi',
      slug: 'fotografi',
      icon: 'fa-camera',
      serviceType: 'PHYSICAL',
    },
    {
      name: 'Kebersihan & Cleaning',
      slug: 'kebersihan',
      icon: 'fa-broom',
      serviceType: 'PHYSICAL',
    },
    {
      name: 'Event & Catering',
      slug: 'event-catering',
      icon: 'fa-champagne-glasses',
      serviceType: 'PHYSICAL',
    },
    {
      name: 'Tukang & Renovasi',
      slug: 'tukang-rumah',
      icon: 'fa-hammer',
      serviceType: 'PHYSICAL',
    },
  ];

  const catMap: Record<string, string> = {};
  const catTypeMap: Record<string, string> = {};
  for (const cat of categories) {
    const created = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: cat,
      create: cat,
    });
    catMap[cat.slug] = created.id;
    catTypeMap[cat.slug] = cat.serviceType;
  }
  console.log(`✅ ${categories.length} categories created\n`);

  // ============================================================
  // USERS
  // ============================================================
  console.log('👥 Creating users...');

  const hashAdmin = await bcrypt.hash('Admin@123', ROUNDS);
  const hashUser = await bcrypt.hash('User@123', ROUNDS);
  const hashSeller = await bcrypt.hash('Seller@123', ROUNDS);
  const hashBuyer = await bcrypt.hash('Buyer@123', ROUNDS);

  const users = [
    {
      email: 'admin@tolongin.com',
      password: hashAdmin,
      name: 'Admin Tolongin',
      phone: '+6281200000001',
      avatar: AVATAR('admin'),
      role: 'ADMIN',
      bio: 'Administrator platform Tolongin',
      emailVerified: true,
      phoneVerified: true,
      ktpVerified: true,
      verified: true,
      city: 'Jakarta Pusat',
      rating: 5.0,
      reviewCount: 0,
      balance: 0,
    },
    {
      email: 'citra@tolongin.com',
      password: hashSeller,
      name: 'Citra Kirana',
      phone: '+6281211223344',
      avatar: AVATAR('citra'),
      role: 'USER',
      bio: '✨ Top Rated Designer | 5+ tahun pengalaman • Sudah desain 300+ logo & brand identity untuk UMKM Indonesia',
      emailVerified: true,
      phoneVerified: true,
      ktpVerified: true,
      verified: true,
      city: 'Bandung',
      rating: 4.9,
      reviewCount: 342,
      totalOrders: 380,
      completedOrders: 370,
      balance: 12_500_000,
    },
    {
      email: 'andi@tolongin.com',
      password: hashSeller,
      name: 'Andi Pratama',
      phone: '+6281298765432',
      avatar: AVATAR('andi'),
      role: 'USER',
      bio: '💻 Senior Full-stack Developer • React, Next.js, NestJS • Pernah pegang project e-commerce 500K MAU',
      emailVerified: true,
      phoneVerified: true,
      ktpVerified: true,
      verified: true,
      city: 'Yogyakarta',
      rating: 4.9,
      reviewCount: 280,
      totalOrders: 310,
      completedOrders: 300,
      balance: 15_200_000,
    },
    {
      email: 'sari@tolongin.com',
      password: hashSeller,
      name: 'Sari Wulandari',
      phone: '+6281234567899',
      avatar: AVATAR('sari'),
      role: 'USER',
      bio: '✍️ Content Writer & SEO Specialist • Spesialis artikel UMKM, blog startup & copywriting marketplace',
      emailVerified: true,
      phoneVerified: true,
      ktpVerified: true,
      verified: true,
      city: 'Surabaya',
      rating: 4.8,
      reviewCount: 156,
      totalOrders: 180,
      completedOrders: 170,
      balance: 6_800_000,
    },
    {
      email: 'maya@tolongin.com',
      password: hashSeller,
      name: 'Maya Sari',
      phone: '+6281544332211',
      avatar: AVATAR('maya'),
      role: 'USER',
      bio: '🎬 Video Editor & Motion Designer • Adobe Premiere, After Effects • Pernah edit konten 2M+ view',
      emailVerified: true,
      phoneVerified: true,
      ktpVerified: true,
      verified: true,
      city: 'Bali',
      rating: 4.8,
      reviewCount: 198,
      totalOrders: 210,
      completedOrders: 200,
      balance: 7_200_000,
    },
    {
      email: 'budi@tolongin.com',
      password: hashSeller,
      name: 'Budi Setiawan',
      phone: '+6281355667788',
      avatar: AVATAR('budi'),
      role: 'USER',
      bio: '🔧 Teknisi Profesional • Service AC, kulkas, mesin cuci • Garansi 30 hari • Jangkauan Jabodetabek',
      emailVerified: true,
      phoneVerified: true,
      ktpVerified: true,
      verified: true,
      city: 'Jakarta Selatan',
      rating: 4.7,
      reviewCount: 527,
      totalOrders: 560,
      completedOrders: 550,
      balance: 8_750_000,
    },
    {
      email: 'irawan@tolongin.com',
      password: hashSeller,
      name: 'Irawan Putra, S.Pd',
      phone: '+6285678901234',
      avatar: AVATAR('irawan'),
      role: 'USER',
      bio: '📚 Guru Les Privat (Matematika, Fisika, Bahasa Inggris) • 8 tahun mengajar SMP/SMA',
      emailVerified: true,
      phoneVerified: true,
      ktpVerified: true,
      verified: true,
      city: 'Malang',
      rating: 5.0,
      reviewCount: 312,
      totalOrders: 340,
      completedOrders: 335,
      balance: 5_500_000,
    },
    {
      email: 'seller@tolongin.com',
      password: hashSeller,
      name: 'Yano Supriadi',
      phone: '+6281800800800',
      avatar: AVATAR('seller'),
      role: 'USER',
      bio: '🌟 Spesialis pindahan & data entry • respons cepat • garansi puas',
      emailVerified: true,
      phoneVerified: true,
      ktpVerified: true,
      verified: true,
      city: 'Tangerang',
      rating: 4.5,
      reviewCount: 45,
      totalOrders: 50,
      completedOrders: 48,
      balance: 1_250_000,
    },
    {
      email: 'rina@tolongin.com',
      password: hashBuyer,
      name: 'Rina Pratiwi',
      phone: '+6281622334455',
      avatar: AVATAR('rina'),
      role: 'USER',
      bio: '👗 Owner Brand Fashion',
      emailVerified: true,
      phoneVerified: true,
      ktpVerified: true,
      verified: true,
      city: 'Jakarta Utara',
      rating: 4.5,
      reviewCount: 12,
      balance: 0,
    },
    {
      email: 'aditya@tolongin.com',
      password: hashBuyer,
      name: 'Aditya Wirawan',
      phone: '+6281755443322',
      avatar: AVATAR('aditya'),
      role: 'USER',
      bio: '🚀 Founder Startup',
      emailVerified: true,
      phoneVerified: true,
      ktpVerified: true,
      verified: true,
      city: 'Jakarta Selatan',
      rating: 4.8,
      reviewCount: 8,
      balance: 0,
    },
    {
      email: 'buyer@tolongin.com',
      password: hashBuyer,
      name: 'Dewi Anggraini',
      phone: '+6281900900900',
      avatar: AVATAR('buyer'),
      role: 'USER',
      bio: '🏢 Manajer UMKM Sidoarjo • butuh jasa desain & konten rutin',
      emailVerified: true,
      phoneVerified: true,
      ktpVerified: false,
      verified: false,
      city: 'Sidoarjo',
      rating: 0,
      reviewCount: 0,
      balance: 0,
    },
    {
      email: 'eko@tolongin.com',
      password: hashSeller,
      name: 'Eko Santoso',
      phone: '+6281900112233',
      avatar: AVATAR('eko'),
      role: 'USER',
      bio: '📸 Fotografer produk & event • Lightroom expert',
      emailVerified: true,
      phoneVerified: true,
      ktpVerified: true,
      verified: true,
      city: 'Semarang',
      rating: 4.6,
      reviewCount: 89,
      balance: 3_200_000,
    },
    {
      email: 'fitri@tolongin.com',
      password: hashSeller,
      name: 'Fitri Handayani',
      phone: '+6281900223344',
      avatar: AVATAR('fitri'),
      role: 'USER',
      bio: '🎨 UI/UX Designer • Figma • Design system untuk startup',
      emailVerified: true,
      phoneVerified: true,
      ktpVerified: true,
      verified: true,
      city: 'Jakarta Barat',
      rating: 4.7,
      reviewCount: 134,
      balance: 4_100_000,
    },
    {
      email: 'gilang@tolongin.com',
      password: hashSeller,
      name: 'Gilang Ramadhan',
      phone: '+6281900334455',
      avatar: AVATAR('gilang'),
      role: 'USER',
      bio: '⚡ Backend Engineer • Node.js, PostgreSQL, Redis',
      emailVerified: true,
      phoneVerified: true,
      ktpVerified: true,
      verified: true,
      city: 'Bandung',
      rating: 4.8,
      reviewCount: 67,
      balance: 5_600_000,
    },
    {
      email: 'hana@tolongin.com',
      password: hashBuyer,
      name: 'Hana Putri',
      phone: '+6281900445566',
      avatar: AVATAR('hana'),
      role: 'USER',
      bio: '🍰 Owner bakery online • butuh desain & social media',
      emailVerified: true,
      phoneVerified: true,
      ktpVerified: true,
      verified: true,
      city: 'Surabaya',
      rating: 4.3,
      reviewCount: 5,
      balance: 0,
    },
    {
      email: 'joko@tolongin.com',
      password: hashSeller,
      name: 'Joko Widodo',
      phone: '+6281900556677',
      avatar: AVATAR('joko'),
      role: 'USER',
      bio: '🔌 Electrician & home repair • Surabaya & sekitarnya',
      emailVerified: true,
      phoneVerified: true,
      ktpVerified: true,
      verified: true,
      city: 'Surabaya',
      rating: 4.5,
      reviewCount: 210,
      balance: 2_800_000,
    },
    {
      email: 'kirana@tolongin.com',
      password: hashSeller,
      name: 'Kirana Ayu',
      phone: '+6281900667788',
      avatar: AVATAR('kirana'),
      role: 'USER',
      bio: '🎤 Voice over & dubbing • Indonesia & English',
      emailVerified: true,
      phoneVerified: true,
      ktpVerified: true,
      verified: true,
      city: 'Yogyakarta',
      rating: 4.9,
      reviewCount: 95,
      balance: 3_900_000,
    },
    {
      email: 'laras@tolongin.com',
      password: hashBuyer,
      name: 'Larasati',
      phone: '+6281900778899',
      avatar: AVATAR('laras'),
      role: 'USER',
      bio: '📱 Social media manager UMKM',
      emailVerified: true,
      phoneVerified: true,
      ktpVerified: true,
      verified: true,
      city: 'Medan',
      rating: 4.2,
      reviewCount: 3,
      balance: 0,
    },
    {
      email: 'miko@tolongin.com',
      password: hashSeller,
      name: 'Miko Pratama',
      phone: '+6281900889900',
      avatar: AVATAR('miko'),
      role: 'USER',
      bio: '🎮 Game developer • Unity, mobile casual games',
      emailVerified: true,
      phoneVerified: true,
      ktpVerified: true,
      verified: true,
      city: 'Bali',
      rating: 4.6,
      reviewCount: 42,
      balance: 6_100_000,
    },
    {
      email: 'nia@tolongin.com',
      password: hashSeller,
      name: 'Nia Ramadhani',
      phone: '+6281900990011',
      avatar: AVATAR('nia'),
      role: 'USER',
      bio: '📊 Data analyst • Excel, Power BI, dashboard',
      emailVerified: true,
      phoneVerified: true,
      ktpVerified: true,
      verified: true,
      city: 'Jakarta Pusat',
      rating: 4.7,
      reviewCount: 58,
      balance: 4_500_000,
    },
    {
      email: 'oki@tolongin.com',
      password: hashBuyer,
      name: 'Oki Setiawan',
      phone: '+6281901001122',
      avatar: AVATAR('oki'),
      role: 'USER',
      bio: '🏗️ Kontraktor kecil • butuh jasa desain & dokumentasi',
      emailVerified: true,
      phoneVerified: true,
      ktpVerified: true,
      verified: true,
      city: 'Palembang',
      rating: 4.0,
      reviewCount: 2,
      balance: 0,
    },
  ];

  const userMap: Record<string, string> = {};
  const userCityMap: Record<string, string> = {};
  for (const user of users) {
    const created = await prisma.user.upsert({
      where: { email: user.email },
      update: user,
      create: user,
    });
    userMap[user.email] = created.id;
    userCityMap[user.email] = user.city || 'Indonesia';
  }
  console.log(`✅ ${users.length} users created\n`);

  // ============================================================
  // BANK ACCOUNTS
  // ============================================================
  console.log('🏦 Creating bank accounts...');

  const bankAccounts = [
    {
      email: 'citra@tolongin.com',
      bank: 'BCA',
      number: '1234567890',
      name: 'Citra Kirana',
    },
    {
      email: 'andi@tolongin.com',
      bank: 'BNI',
      number: '1122334455',
      name: 'Andi Pratama',
    },
    {
      email: 'sari@tolongin.com',
      bank: 'BRI',
      number: '2233445566',
      name: 'Sari Wulandari',
    },
    {
      email: 'maya@tolongin.com',
      bank: 'BCA',
      number: '3344556677',
      name: 'Maya Sari',
    },
    {
      email: 'budi@tolongin.com',
      bank: 'Mandiri',
      number: '0987654321',
      name: 'Budi Setiawan',
    },
    {
      email: 'irawan@tolongin.com',
      bank: 'CIMB',
      number: '4455667788',
      name: 'Irawan Putra',
    },
    {
      email: 'seller@tolongin.com',
      bank: 'BCA',
      number: '9999888877',
      name: 'Yano Supriadi',
    },
  ];

  for (const acc of bankAccounts) {
    const userId = userMap[acc.email];
    if (!userId) continue;

    const existing = await prisma.bankAccount.findFirst({ where: { userId } });
    if (!existing) {
      await prisma.bankAccount.create({
        data: {
          userId,
          bankName: acc.bank,
          accountNumber: acc.number,
          accountName: acc.name,
          isDefault: true,
          isVerified: true,
        },
      });
    }
  }
  console.log(`✅ ${bankAccounts.length} bank accounts created\n`);

  // ============================================================
  // SERVICES
  // ============================================================
  console.log('🛠️ Creating services...');

  const serviceList = [
    // Citra - Desain Grafis
    {
      seller: 'citra@tolongin.com',
      cat: 'desain-grafis',
      title: 'Desain Logo Profesional + Brand Guideline',
      desc: 'Jasa desain logo unik dari nol untuk UMKM, startup, dan personal brand. Sudah termasuk 3 konsep awal, 3x revisi, file source (AI/PSD), serta mini brand guideline 5 halaman (warna, tipografi, do/don\'t).',
      price: 250000,
      delivery: 3,
      rev: 3,
      featured: true,
    },
    {
      seller: 'citra@tolongin.com',
      cat: 'desain-grafis',
      title: 'Desain Feed Instagram Aesthetic (10 post)',
      desc: 'Paket 10 desain feed Instagram aesthetic yang konsisten dengan identitas brand Anda. Sudah include caption template, ukuran 1:1 & story 9:16, plus 2x revisi gratis per post.',
      price: 180000,
      delivery: 2,
      rev: 2,
      featured: true,
    },
    {
      seller: 'citra@tolongin.com',
      cat: 'desain-grafis',
      title: 'Edit Foto Produk Shopee/Tokopedia',
      desc: 'Foto produk siap jual',
      price: 120000,
      delivery: 2,
      rev: 2,
      featured: false,
    },
    {
      seller: 'citra@tolongin.com',
      cat: 'desain-grafis',
      title: 'Bikin Thumbnail YouTube Kekinian',
      desc: 'Thumbnail CTR tinggi',
      price: 85000,
      delivery: 1,
      rev: 2,
      featured: false,
    },
    {
      seller: 'citra@tolongin.com',
      cat: 'desain-grafis',
      title: 'Desain Kemasan Produk UMKM',
      desc: 'Desain kemasan profesional',
      price: 300000,
      delivery: 4,
      rev: 3,
      featured: false,
    },

    // Andi - Web Development
    {
      seller: 'andi@tolongin.com',
      cat: 'web-development',
      title: 'Website Company Profile Professional',
      desc: 'Website company profile responsif (mobile/desktop), 5 halaman utama, form kontak terintegrasi WhatsApp, panel admin sederhana untuk update konten, plus SEO dasar. Hosting & domain 1 tahun bisa di-bundle dengan biaya tambahan.',
      price: 850000,
      delivery: 5,
      rev: 3,
      featured: true,
    },
    {
      seller: 'andi@tolongin.com',
      cat: 'web-development',
      title: 'Landing Page High Converting',
      desc: 'Landing page yang dioptimasi untuk konversi: 1 halaman fokus, copywriting persuasif, integrasi pixel FB/GA4, form lead → email/WhatsApp, dan A/B testing variant judul. Cocok untuk campaign ads.',
      price: 450000,
      delivery: 3,
      rev: 2,
      featured: true,
    },
    {
      seller: 'andi@tolongin.com',
      cat: 'web-development',
      title: 'Portfolio Website Modern',
      desc: 'Modern portfolio website',
      price: 350000,
      delivery: 3,
      rev: 2,
      featured: false,
    },
    {
      seller: 'andi@tolongin.com',
      cat: 'web-development',
      title: 'Custom Form dengan Database',
      desc: 'Online form with database',
      price: 350000,
      delivery: 2,
      rev: 2,
      featured: false,
    },
    {
      seller: 'andi@tolongin.com',
      cat: 'web-development',
      title: 'Linktree Custom Keren',
      desc: 'Professional linktree',
      price: 75000,
      delivery: 1,
      rev: 2,
      featured: false,
    },

    // Sari - Penulisan
    {
      seller: 'sari@tolongin.com',
      cat: 'penulisan',
      title: 'Artikel SEO 1000 Kata',
      desc: 'Artikel SEO original 1000 kata dengan riset keyword (Ahrefs/SEMrush), meta description, heading hierarchy yang benar, internal linking opportunity, dan Plagiarism-free guarantee.',
      price: 150000,
      delivery: 2,
      rev: 2,
      featured: true,
    },
    {
      seller: 'sari@tolongin.com',
      cat: 'penulisan',
      title: 'Copywriting Produk untuk E-commerce',
      desc: 'Product description that sells',
      price: 100000,
      delivery: 1,
      rev: 2,
      featured: true,
    },
    {
      seller: 'sari@tolongin.com',
      cat: 'penulisan',
      title: 'Terjemahan Inggris-Indonesia (1000 kata)',
      desc: 'Accurate translation',
      price: 120000,
      delivery: 2,
      rev: 2,
      featured: false,
    },
    {
      seller: 'sari@tolongin.com',
      cat: 'penulisan',
      title: 'Script Video TikTok/Vlog',
      desc: 'Engaging video script',
      price: 80000,
      delivery: 1,
      rev: 1,
      featured: false,
    },

    // Maya - Video Editing
    {
      seller: 'maya@tolongin.com',
      cat: 'video-editing',
      title: 'Edit Video YouTube Vlog (10 menit)',
      desc: 'Edit video YouTube hingga 10 menit dengan color grading, sound design, subtitle Indonesia, transisi cinematic, plus 1 thumbnail eye-catching dan SEO-friendly chapter markers.',
      price: 250000,
      delivery: 3,
      rev: 2,
      featured: true,
    },
    {
      seller: 'maya@tolongin.com',
      cat: 'video-editing',
      title: 'Edit Video TikTok 30 Detik (Viral Style)',
      desc: 'Trending TikTok editing',
      price: 100000,
      delivery: 1,
      rev: 2,
      featured: true,
    },
    {
      seller: 'maya@tolongin.com',
      cat: 'video-editing',
      title: 'Video Profil Perusahaan (1 menit)',
      desc: 'Professional company profile',
      price: 500000,
      delivery: 5,
      rev: 3,
      featured: false,
    },
    {
      seller: 'maya@tolongin.com',
      cat: 'video-editing',
      title: 'Edit Video Kinemaster untuk Tugas',
      desc: 'Quick editing for assignments',
      price: 75000,
      delivery: 1,
      rev: 2,
      featured: false,
    },

    // Budi - Service & Reparasi
    {
      seller: 'budi@tolongin.com',
      cat: 'service-reparasi',
      title: 'Service AC - Cuci & Isi Freon',
      desc: 'Cuci AC menyeluruh (indoor + outdoor), cek tekanan freon, isi freon (R-32/R-410) bila perlu, dan tes performa pendinginan. Garansi 30 hari setelah pengerjaan. Jangkauan Jakarta + sekitarnya.',
      price: 150000,
      delivery: 1,
      rev: 1,
      featured: true,
      location: 'Jakarta',
    },
    {
      seller: 'budi@tolongin.com',
      cat: 'service-reparasi',
      title: 'Service Kulkas 1/2 Pintu',
      desc: 'Perbaikan kulkas tidak dingin, bocor, atau bunyi berisik. Kunjungan ke rumah/kantor area Jakarta Selatan & sekitarnya.',
      price: 120000,
      delivery: 1,
      rev: 1,
      featured: true,
      location: 'Jakarta',
    },
    {
      seller: 'budi@tolongin.com',
      cat: 'service-reparasi',
      title: 'Pasang AC Baru + Konsultasi',
      desc: 'AC installation',
      price: 200000,
      delivery: 1,
      rev: 1,
      featured: false,
    },
    {
      seller: 'budi@tolongin.com',
      cat: 'service-reparasi',
      title: 'Service Mesin Cuci 1 Tabung',
      desc: 'Washing machine repair',
      price: 100000,
      delivery: 1,
      rev: 1,
      featured: false,
    },

    // Irawan - Les Privat
    {
      seller: 'irawan@tolongin.com',
      cat: 'les-privat',
      title: 'Les Privat Matematika Tatap Muka (1 jam)',
      desc: 'Les privat 1-on-1 di rumah siswa atau di tempat tenang di Malang. Materi SMP/SMA disesuaikan kurikulum, worksheet, evaluasi per sesi, dan laporan progress ke orang tua.',
      price: 75000,
      delivery: 1,
      rev: 1,
      featured: true,
    },
    {
      seller: 'irawan@tolongin.com',
      cat: 'les-privat',
      title: 'Bimbingan PR Matematika/Fisika',
      desc: 'Homework assistance',
      price: 50000,
      delivery: 1,
      rev: 1,
      featured: false,
    },
    {
      seller: 'irawan@tolongin.com',
      cat: 'les-privat',
      title: 'Belajar Bahasa Inggris Percakapan',
      desc: 'English conversation practice',
      price: 70000,
      delivery: 1,
      rev: 1,
      featured: false,
    },

    // Yano - Data Entry
    {
      seller: 'seller@tolongin.com',
      cat: 'data-entry',
      title: 'Ngetik Data Excel (500 baris)',
      desc: 'Fast and accurate data entry',
      price: 75000,
      delivery: 1,
      rev: 1,
      featured: false,
    },
    {
      seller: 'seller@tolongin.com',
      cat: 'data-entry',
      title: 'Convert PDF ke Word (100 halaman)',
      desc: 'PDF to Word conversion',
      price: 100000,
      delivery: 1,
      rev: 1,
      featured: false,
    },
    {
      seller: 'seller@tolongin.com',
      cat: 'data-entry',
      title: 'Scrape Data dari Website',
      desc: 'Web scraping service',
      price: 200000,
      delivery: 2,
      rev: 1,
      featured: false,
    },

    // Yano - Pindahan
    {
      seller: 'seller@tolongin.com',
      cat: 'pindahan',
      title: 'Jasa Pindahan Kosan Jakarta',
      desc: 'Moving service with packing',
      price: 500000,
      delivery: 1,
      rev: 1,
      featured: false,
    },
    {
      seller: 'seller@tolongin.com',
      cat: 'pindahan',
      title: 'Pindahan Rumah + Truk + Packing',
      desc: 'Full moving service',
      price: 1200000,
      delivery: 1,
      rev: 1,
      featured: false,
    },

    // Sari - Digital Marketing
    {
      seller: 'sari@tolongin.com',
      cat: 'digital-marketing',
      title: 'Instagram Growth (500 followers)',
      desc: 'Real Indonesian followers',
      price: 300000,
      delivery: 7,
      rev: 1,
      featured: false,
    },
    {
      seller: 'sari@tolongin.com',
      cat: 'digital-marketing',
      title: 'Setup Iklan Facebook/Instagram',
      desc: 'Ad campaign optimization',
      price: 400000,
      delivery: 3,
      rev: 2,
      featured: false,
    },

    // Jasa fisik — kategori baru
    {
      seller: 'citra@tolongin.com',
      cat: 'fotografi',
      title: 'Fotografi Produk UMKM (10 foto)',
      desc: 'Sesi foto produk di studio Bandung: lighting profesional, 10 angle, retouch basic, file siap upload marketplace & Instagram.',
      price: 450000,
      delivery: 3,
      rev: 2,
      featured: true,
      location: 'Bandung',
    },
    {
      seller: 'maya@tolongin.com',
      cat: 'fotografi',
      title: 'Videografer Acara Pernikahan (Half Day)',
      desc: 'Dokumentasi pernikahan half-day di Bali: 1 videografer + 1 kamera backup, highlight 3–5 menit, file raw diserahkan.',
      price: 2500000,
      delivery: 7,
      rev: 2,
      featured: true,
      location: 'Bali',
    },
    {
      seller: 'seller@tolongin.com',
      cat: 'kebersihan',
      title: 'Deep Cleaning Apartemen 2 Kamar',
      desc: 'Bersih-bersih apartemen 2BR Tangerang: kamar mandi, dapur, vacuum, pel, dan perapian. Bawa peralatan & chemical aman.',
      price: 350000,
      delivery: 1,
      rev: 1,
      featured: true,
      location: 'Tangerang',
    },
    {
      seller: 'seller@tolongin.com',
      cat: 'kebersihan',
      title: 'General Cleaning Rumah 1 Lantai',
      desc: 'Pembersihan rumah tinggal 1 lantai area Tangerang & BSD. Tim 2 orang, estimasi 4–5 jam.',
      price: 400000,
      delivery: 1,
      rev: 1,
      featured: false,
      location: 'Tangerang',
    },
    {
      seller: 'rina@tolongin.com',
      cat: 'event-catering',
      title: 'Koordinasi Event Ulang Tahun Anak (50 pax)',
      desc: 'On-site event coordinator Jakarta: dekorasi simple, timeline acara, koordinasi catering & dokumentasi. Tidak termasuk makanan.',
      price: 1500000,
      delivery: 5,
      rev: 2,
      featured: false,
      location: 'Jakarta',
    },
    {
      seller: 'budi@tolongin.com',
      cat: 'tukang-rumah',
      title: 'Pasang Rak Dinding & Curtains (3 ruang)',
      desc: 'Tukang profesional Jakarta Selatan: bor dinding, pasang bracket, rak, dan gorden. Material dari klien, bawa tools lengkap.',
      price: 250000,
      delivery: 1,
      rev: 1,
      featured: false,
      location: 'Jakarta',
    },
    {
      seller: 'budi@tolongin.com',
      cat: 'tukang-rumah',
      title: 'Perbaikan Plafon Bocor & Cat Spot',
      desc: 'Perbaikan plafon bocor ringan, dempul, dan cat spot area maks. 4 m². Survey lokasi gratis untuk area Jabodetabek.',
      price: 350000,
      delivery: 2,
      rev: 1,
      featured: true,
      location: 'Jakarta',
    },
  ];

  let serviceIndex = 0;
  for (const svc of serviceList) {
    const sellerId = userMap[svc.seller];
    const categoryId = catMap[svc.cat];
    if (!sellerId || !categoryId) continue;

    const imageUrls = getServiceImages(serviceIndex, svc.cat);
    const serviceType = catTypeMap[svc.cat] || 'DIGITAL';
    const isRemote = serviceType === 'DIGITAL';
    const location = isRemote
      ? 'Remote'
      : svc.location || userCityMap[svc.seller] || 'Indonesia';

    await prisma.service.create({
      data: {
        sellerId,
        categoryId,
        title: svc.title,
        description: svc.desc,
        price: svc.price,
        deliveryTime: svc.delivery,
        revisionCount: svc.rev,
        images: JSON.stringify(imageUrls),
        rating: 4.5 + (serviceIndex % 5) * 0.1,
        reviewCount: 18 + serviceIndex * 7,
        isFeatured: svc.featured,
        isRemote,
        location,
      },
    });
    serviceIndex++;
  }
  console.log(`✅ ${serviceList.length} services created\n`);

  // ============================================================
  // JOBS
  // ============================================================
  console.log('💼 Creating jobs...');

  const jobList = [
    {
      buyer: 'rina@tolongin.com',
      cat: 'desain-grafis',
      title: 'Desain Logo Brand Fashion',
      desc: 'Membutuhkan logo untuk brand fashion wanita kontemporer. Style: minimalis, feminin, tetapi powerful. Output: file vektor (AI, SVG), mockup di kain & tag baju, dan mini guideline 3 halaman. 3 konsep, 2x revisi.',
      budget: 500000,
      deadline: 14,
      location: 'Remote',
      skills: ['Logo Design'],
      urgent: false,
    },
    {
      buyer: 'eko@tolongin.com',
      cat: 'desain-grafis',
      title: 'Desain Kemasan Skincare',
      desc: 'Kemasan tube + box untuk 3 varian',
      budget: 1200000,
      deadline: 21,
      location: 'Remote',
      skills: ['Packaging'],
      urgent: false,
    },
    {
      buyer: 'aditya@tolongin.com',
      cat: 'web-development',
      title: 'Landing Page Startup',
      desc: 'Butuh landing page produk SaaS edukasi. Stack preferred: Next.js + Tailwind CSS, animasi Framer Motion. Harus mobile-first, page speed >90, dan integrasi waitlist email via Resend/Mailerlite. Deliverable di GitHub repo + Vercel deploy.',
      budget: 2500000,
      deadline: 14,
      location: 'Remote',
      skills: ['Next.js'],
      urgent: false,
    },
    {
      buyer: 'fitri@tolongin.com',
      cat: 'web-development',
      title: 'Dashboard Admin',
      desc: 'React + Chart.js',
      budget: 800000,
      deadline: 10,
      location: 'Remote',
      skills: ['React'],
      urgent: false,
    },
    {
      buyer: 'gilang@tolongin.com',
      cat: 'penulisan',
      title: 'Artikel Blog SEO 10 Artikel',
      desc: 'Topik startup & teknologi',
      budget: 1500000,
      deadline: 14,
      location: 'Remote',
      skills: ['SEO'],
      urgent: false,
    },
    {
      buyer: 'rina@tolongin.com',
      cat: 'video-editing',
      title: 'Edit Video Flash Sale',
      desc: 'Video campaign flash sale',
      budget: 200000,
      deadline: 2,
      location: 'Remote',
      skills: ['Editing'],
      urgent: true,
    },
    {
      buyer: 'rina@tolongin.com',
      cat: 'service-reparasi',
      title: 'Service AC Kantor 2 Unit',
      desc: 'Service rutin 2 unit AC split 1 PK di kantor Jakarta Selatan. Cuci, cek freon, ganti karet seal jika perlu, dan laporan kondisi tertulis. Pengerjaan di luar jam kerja kantor (sore/Sabtu).',
      budget: 300000,
      deadline: 3,
      location: 'Jakarta',
      skills: ['Service AC'],
      urgent: false,
    },
    {
      buyer: 'hana@tolongin.com',
      cat: 'data-entry',
      title: 'Input Data Peserta (1000 data)',
      desc: 'Google Forms ke Excel',
      budget: 250000,
      deadline: 3,
      location: 'Remote',
      skills: ['Data Entry'],
      urgent: false,
    },
    {
      buyer: 'aditya@tolongin.com',
      cat: 'pindahan',
      title: 'Jasa Pindahan Kantor 2 Lantai',
      desc: 'Pindahan kantor startup di Jakarta Selatan: packing peralatan IT, meja, kursi, dan transport 1 truk. Pengerjaan weekend.',
      budget: 3500000,
      deadline: 7,
      location: 'Jakarta',
      skills: ['Pindahan', 'Logistik'],
      urgent: false,
    },
    {
      buyer: 'fitri@tolongin.com',
      cat: 'les-privat',
      title: 'Les Privat Fisika SMA (2x/minggu)',
      desc: 'Guru datang ke rumah siswa area Yogyakarta. 2 sesi per minggu @90 menit, fokus persiapan UTBK.',
      budget: 800000,
      deadline: 30,
      location: 'Yogyakarta',
      skills: ['Fisika', 'Les Privat'],
      urgent: false,
    },
    {
      buyer: 'rina@tolongin.com',
      cat: 'fotografi',
      title: 'Fotografer Product Launch Event',
      desc: 'Dokumentasi foto acara launching produk skincare di Jakarta. Durasi 4 jam, min. 80 foto edited.',
      budget: 1200000,
      deadline: 10,
      location: 'Jakarta',
      skills: ['Fotografi', 'Event'],
      urgent: false,
    },
    {
      buyer: 'eko@tolongin.com',
      cat: 'kebersihan',
      title: 'General Cleaning Gudang (200 m²)',
      desc: 'Bersih-bersih gudang di Surabaya sebelum audit: sapu, pel, buang sampah, dan lap debu rak.',
      budget: 600000,
      deadline: 5,
      location: 'Surabaya',
      skills: ['Cleaning'],
      urgent: false,
    },
    {
      buyer: 'gilang@tolongin.com',
      cat: 'event-catering',
      title: 'MC & Sound System Acara Seminar',
      desc: 'Butuh MC profesional + operator sound untuk seminar 100 orang di Bandung. Acara 1 hari, Sabtu pagi.',
      budget: 900000,
      deadline: 14,
      location: 'Bandung',
      skills: ['MC', 'Event'],
      urgent: false,
    },
    {
      buyer: 'aditya@tolongin.com',
      cat: 'tukang-rumah',
      title: 'Renovasi Kamar Mandi Kecil (3 m²)',
      desc: 'Ganti keramik lantai & dinding, perbaikan pipa bocor ringan, area Jakarta Selatan. Material dari klien.',
      budget: 4500000,
      deadline: 21,
      location: 'Jakarta',
      skills: ['Renovasi', 'Plumbing'],
      urgent: false,
    },
    {
      buyer: 'fitri@tolongin.com',
      cat: 'pindahan',
      title: 'Angkut Barang Kos-kosan Malang',
      desc: 'Pindahan kos ke kos baru di Malang, 1 kamar + dapur kecil. Butuh pickup + 2 helper.',
      budget: 450000,
      deadline: 3,
      location: 'Malang',
      skills: ['Pindahan'],
      urgent: true,
    },
  ];

  for (const job of jobList) {
    const buyerId = userMap[job.buyer];
    const categoryId = catMap[job.cat];
    if (!buyerId || !categoryId) continue;

    await prisma.job.create({
      data: {
        buyerId,
        categoryId,
        title: job.title,
        description: job.desc,
        budget: job.budget,
        budgetType: 'FIXED',
        deadline: future(job.deadline),
        location: job.location,
        isOnline: job.location === 'Remote',
        skills: JSON.stringify(job.skills),
        urgency: job.urgent ? 'URGENT' : 'NORMAL',
        status: 'OPEN',
        applicationsCount: 0,
      },
    });
  }
  console.log(`✅ ${jobList.length} jobs created\n`);

  // ============================================================
  // ORDERS
  // ============================================================
  console.log('📦 Creating orders...');

  const allServices = await prisma.service.findMany();

  const orderSpecs = [
    {
      buyer: 'rina@tolongin.com',
      seller: 'citra@tolongin.com',
      status: 'COMPLETED',
      daysAgo: 45,
    },
    {
      buyer: 'rina@tolongin.com',
      seller: 'andi@tolongin.com',
      status: 'COMPLETED',
      daysAgo: 30,
    },
    {
      buyer: 'aditya@tolongin.com',
      seller: 'sari@tolongin.com',
      status: 'COMPLETED',
      daysAgo: 21,
    },
    {
      buyer: 'aditya@tolongin.com',
      seller: 'citra@tolongin.com',
      status: 'WAITING_REVIEW',
      daysAgo: 5,
    },
    {
      buyer: 'rina@tolongin.com',
      seller: 'budi@tolongin.com',
      status: 'PAID',
      daysAgo: 2,
    },
    {
      buyer: 'aditya@tolongin.com',
      seller: 'maya@tolongin.com',
      status: 'PAID',
      daysAgo: 3,
    },
    {
      buyer: 'buyer@tolongin.com',
      seller: 'irawan@tolongin.com',
      status: 'WAITING_CONFIRMATION',
      daysAgo: 0,
    },
  ];

  for (const spec of orderSpecs) {
    const buyerId = userMap[spec.buyer];
    const sellerId = userMap[spec.seller];
    const service = allServices.find((s) => s.sellerId === sellerId);
    if (!buyerId || !sellerId || !service) continue;

    const amount = service.price;
    const fee = Math.round(amount * 0.05);
    const total = amount + fee;
    const createdAt = past(spec.daysAgo);

    await prisma.order.create({
      data: {
        buyerId,
        sellerId,
        serviceId: service.id,
        title: service.title,
        amount,
        fee,
        totalAmount: total,
        status: spec.status,
        escrowStatus:
          spec.status === 'WAITING_CONFIRMATION'
            ? 'UNPAID'
            : spec.status === 'COMPLETED'
              ? 'RELEASED'
              : spec.status === 'WAITING_REVIEW'
                ? 'AWAITING_APPROVAL'
                : 'FUNDED',
        deliveryType: 'DIGITAL',
        workSubmission:
          ['WAITING_REVIEW', 'COMPLETED'].includes(spec.status)
            ? JSON.stringify({
                note: 'Hasil pekerjaan lengkap sesuai brief.',
                attachments: ['https://demo.tolongin.local/bukti-kerja.pdf'],
                submittedAt: past(Math.max(0, spec.daysAgo - 1)).toISOString(),
              })
            : null,
        workProof:
          ['WAITING_REVIEW', 'COMPLETED'].includes(spec.status)
            ? JSON.stringify(['https://demo.tolongin.local/bukti-kerja.pdf'])
            : null,
        workSubmittedAt:
          ['WAITING_REVIEW', 'COMPLETED'].includes(spec.status)
            ? past(Math.max(0, spec.daysAgo - 1))
            : null,
        fundsReleasedAt:
          spec.status === 'COMPLETED' ? past(Math.max(0, spec.daysAgo - 2)) : null,
        workApprovedAt:
          spec.status === 'COMPLETED' ? past(Math.max(0, spec.daysAgo - 2)) : null,
        timeline: JSON.stringify([
          { status: spec.status, at: createdAt.toISOString(), by: buyerId },
        ]),
        createdAt,
        completedAt:
          spec.status === 'COMPLETED' ? past(spec.daysAgo - 2) : null,
      },
    });
  }
  console.log(`✅ ${orderSpecs.length} orders created\n`);

  // ============================================================
  // REVIEWS (120+ synthetic reviews for alive marketplace)
  // ============================================================
  console.log('⭐ Creating reviews...');

  const reviewCommentsBuyer = [
    'Pekerjaan sangat memuaskan, komunikasi lancar dan hasil sesuai brief.',
    'Seller responsif dan profesional. Recommended!',
    'Kualitas di atas ekspektasi, akan order lagi.',
    'Sedikit revisi di awal tapi akhirnya perfect. Terima kasih!',
    'Cepat, rapi, dan harga worth it.',
    'Desainnya fresh dan modern, persis seperti yang saya bayangkan.',
    'Penjelasan teknisnya mudah dipahami, delivery tepat waktu.',
    'Sangat detail dan teliti — tidak perlu revisi sama sekali.',
    'Freelancer ini benar-benar paham kebutuhan UMKM seperti saya.',
    'Komunikasi via chat sangat responsif, progress update rutin.',
    'Hasil editing videonya cinematic banget, puas!',
    'Logo brand baru kami jauh lebih profesional setelah pakai jasa ini.',
    'Translate dokumen legalnya akurat dan rapi.',
    'Website landing page-nya loading cepat dan mobile-friendly.',
    'Ilustrasi karakter game-nya unik, tidak generik sama sekali.',
    'Social media content-nya engaging, engagement naik 2x lipat.',
    'Penulisan artikel SEO-nya natural, tidak terasa keyword stuffing.',
    'Voice over-nya jelas dan sesuai tone brand kami.',
    'Data entry rapi dan error-free, sangat membantu operasional.',
    'Fotografi produk e-commerce kami jadi jauh lebih menarik.',
  ];

  const reviewCommentsSeller = [
    'Buyer kooperatif dan brief jelas. Senang bekerja sama.',
    'Pembayaran lancar, komunikasi profesional.',
    'Klien yang sabar dan terbuka dengan feedback — proyek lancar.',
    'Repeat client — selalu puas dengan kolaborasi kami.',
    'Brief detail dari awal, minim revisi. Ideal!',
    'Buyer ramah dan menghargai waktu pengerjaan.',
    'Proyek menantang tapi buyer supportif sepanjang jalan.',
    'Scope jelas, milestone tepat, pembayaran via escrow aman.',
    'Klien startup yang visioner — kolaborasi produktif.',
    'Feedback konstruktif dan respon cepat. Top buyer!',
  ];

  const reviewCommentsPhysical = [
    'Tukang datang tepat waktu, pekerjaan rapi dan area dibersihkan setelah selesai.',
    'Plafon bocor sudah diperbaiki dengan baik — tidak ada rembes lagi setelah hujan.',
    'Servis AC dingin kembali, teknisi jelaskan perawatan rutin dengan sabar.',
    'Les privat anak saya naik nilainya — guru sabar dan metode mengajarnya jelas.',
    'Fotografer produk UMKM kami sangat membantu — foto jadi lebih profesional di marketplace.',
    'Jasa pindahan aman, barang sampai utuh tanpa lecet. Tim solid dan komunikatif.',
    'Kebersihan rumah sangat memuaskan, sudut-sudut sulit ikut dibersihkan.',
    'Perbaikan rak dinding rapi, tidak ada bekas bor yang berantakan.',
    'Catering acara keluarga pas porsi dan rasanya enak — tamu banyak yang tanya kontak.',
    'Renovasi spot cat halus, warna menyatu dengan dinding sekitarnya.',
  ];

  const allUsers = await prisma.user.findMany({ where: { role: 'USER' } });
  const completedOrders = await prisma.order.findMany({
    where: { status: 'COMPLETED' },
    include: { service: true },
  });

  let reviewCount = 0;
  const reviewersByReviewee = new Map<string, Set<string>>();

  for (let i = 0; i < 120; i++) {
    const service = allServices[i % allServices.length];
    if (!service) break;

    const seller = allUsers.find((u) => u.id === service.sellerId);
    if (!seller) continue;

    const usedForSeller = reviewersByReviewee.get(seller.id) || new Set<string>();
    const buyer = allUsers.find(
      (u) => u.id !== seller.id && !usedForSeller.has(u.id),
    );
    if (!buyer) continue;

    const rating = 3 + ((i * 5 + 2) % 3);
    const isPhysical = service.isRemote === false;
    const commentPool = isPhysical ? reviewCommentsPhysical : reviewCommentsBuyer;
    const comment = commentPool[(i * 3 + 7) % commentPool.length];

    let order = completedOrders.find(
      (o) =>
        o.buyerId === buyer.id &&
        o.sellerId === seller.id &&
        o.serviceId === service.id,
    );
    if (!order) {
      const amount = service.price;
      const fee = Math.round(amount * 0.05);
      order = await prisma.order.create({
        data: {
          buyerId: buyer.id,
          sellerId: seller.id,
          serviceId: service.id,
          title: service.title,
          amount,
          fee,
          totalAmount: amount + fee,
          status: 'COMPLETED',
          escrowStatus: 'RELEASED',
          completedAt: past(i % 60),
          createdAt: past(i % 60 + 5),
          timeline: JSON.stringify([
            { status: 'COMPLETED', at: past(i % 60).toISOString(), by: buyer.id },
          ]),
        },
        include: { service: true },
      });
    }

    try {
      await prisma.review.create({
        data: {
          orderId: order.id,
          reviewerId: buyer.id,
          revieweeId: seller.id,
          serviceId: order.serviceId,
          rating,
          comment,
          reviewType: 'BUYER_TO_SELLER',
          createdAt: past(i % 90),
        },
      });
      reviewCount++;
    } catch {
      // skip duplicate order+reviewer
    }

    usedForSeller.add(buyer.id);
    reviewersByReviewee.set(seller.id, usedForSeller);

    if (i % 2 === 0) {
      try {
        await prisma.review.create({
          data: {
            orderId: order.id,
            reviewerId: seller.id,
            revieweeId: buyer.id,
            serviceId: order.serviceId,
            rating: Math.min(5, rating + 1),
            comment: reviewCommentsSeller[(i * 5 + 1) % reviewCommentsSeller.length],
            reviewType: 'SELLER_TO_BUYER',
            createdAt: past(i % 90),
          },
        });
        reviewCount++;
      } catch {
        // skip duplicate
      }
    }
  }

  const featuredSellerEmails = [
    'andi@tolongin.com',
    'citra@tolongin.com',
    'sari@tolongin.com',
    'maya@tolongin.com',
    'budi@tolongin.com',
    'irawan@tolongin.com',
  ];
  const buyerPool = allUsers.filter(
    (u) => !featuredSellerEmails.includes(u.email) && u.role === 'USER',
  );

  for (const email of featuredSellerEmails) {
    const seller = allUsers.find((u) => u.email === email);
    if (!seller) continue;

    const used = reviewersByReviewee.get(seller.id) || new Set<string>();
    let added = 0;

    for (let b = 0; b < buyerPool.length && added < 6; b++) {
      const buyer = buyerPool[(b + email.length) % buyerPool.length];
      if (!buyer || buyer.id === seller.id || used.has(buyer.id)) continue;

      const service =
        allServices.find((s) => s.sellerId === seller.id) ||
        allServices[(added + b) % allServices.length];
      if (!service) break;

      const rating = 4 + (added % 2);
      const comment =
        reviewCommentsBuyer[(added * 5 + b) % reviewCommentsBuyer.length];

      let order = completedOrders.find(
        (o) => o.buyerId === buyer.id && o.sellerId === seller.id,
      );
      if (!order) {
        const amount = service.price;
        const fee = Math.round(amount * 0.05);
        order = await prisma.order.create({
          data: {
            buyerId: buyer.id,
            sellerId: seller.id,
            serviceId: service.id,
            title: service.title,
            amount,
            fee,
            totalAmount: amount + fee,
            status: 'COMPLETED',
            escrowStatus: 'RELEASED',
            completedAt: past(added + 3),
            createdAt: past(added + 8),
            timeline: JSON.stringify([
              {
                status: 'COMPLETED',
                at: past(added + 3).toISOString(),
                by: buyer.id,
              },
            ]),
          },
          include: { service: true },
        });
        completedOrders.push(order);
      }

      try {
        await prisma.review.create({
          data: {
            orderId: order.id,
            reviewerId: buyer.id,
            revieweeId: seller.id,
            serviceId: order.serviceId,
            rating,
            comment,
            reviewType: 'BUYER_TO_SELLER',
            createdAt: past(added + 10),
          },
        });
        reviewCount++;
        used.add(buyer.id);
        added++;
      } catch {
        // skip duplicate
      }
    }
    reviewersByReviewee.set(seller.id, used);
  }

  console.log(`✅ ${reviewCount} reviews created\n`);

  // ============================================================
  // PLATFORM SETTINGS
  // ============================================================
  console.log('⚙️ Creating platform settings...');

  const settings = [
    { key: 'platform_fee_percent', value: '5' },
    { key: 'min_withdrawal', value: '50000' },
    { key: 'support_email', value: 'support@tolongin.com' },
    { key: 'maintenance_mode', value: 'false' },
  ];

  for (const setting of settings) {
    await prisma.platformSetting.upsert({
      where: { key: setting.key },
      update: setting,
      create: setting,
    });
  }
  console.log(`✅ ${settings.length} platform settings created\n`);

  // ============================================================
  // SUMMARY
  // ============================================================
  console.log('\n' + '═'.repeat(60));
  console.log('✅ SEEDING COMPLETE!');
  console.log('═'.repeat(60));
  console.log('\n📊 SUMMARY:');
  console.log(`   👥 Users: ${users.length}`);
  console.log(`   📂 Categories: ${categories.length}`);
  console.log(`   🛠️ Services: ${serviceList.length}`);
  console.log(`   💼 Jobs: ${jobList.length}`);
  console.log(`   📦 Orders: ${orderSpecs.length}`);

  console.log('\n🔑 LOGIN CREDENTIALS:');
  console.log('═'.repeat(40));
  console.log('   👑 Admin   : admin@tolongin.com / Admin@123');
  console.log('   🛒 Buyer   : buyer@tolongin.com / Buyer@123  (Dewi Anggraini, Sidoarjo)');
  console.log('   💼 Seller  : seller@tolongin.com / Seller@123  (Yano Supriadi, Tangerang)');
  console.log('   ⭐ Top Designer : citra@tolongin.com / Seller@123  (Citra Kirana, Bandung)');
  console.log('   ⭐ Top Developer: andi@tolongin.com  / Seller@123  (Andi Pratama, Yogyakarta)');
  console.log('   ⭐ Top Writer   : sari@tolongin.com  / Seller@123  (Sari Wulandari, Surabaya)');
  console.log('   ⭐ Top Editor   : maya@tolongin.com  / Seller@123  (Maya Sari, Bali)');
  console.log('   ⭐ Tukang AC   : budi@tolongin.com  / Seller@123  (Budi Setiawan, Jakarta)');
  console.log('   ⭐ Guru Les    : irawan@tolongin.com / Seller@123 (Irawan Putra, Malang)');
  console.log('   🛍️ Buyer Owner : rina@tolongin.com  / Buyer@123  (Rina Pratiwi)');
  console.log('   🚀 Buyer Startup: aditya@tolongin.com / Buyer@123 (Aditya Wirawan)');
  console.log('═'.repeat(40));

  console.log('\n🖼️ IMAGES:');
  console.log('   ✅ Service images use a deterministic curated catalog');
  console.log('   ✅ 100% reliable, no broken images');

  console.log('\n' + '═'.repeat(60) + '\n');
}

main()
  .catch((e) => {
    console.error('\n❌ SEED ERROR:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
