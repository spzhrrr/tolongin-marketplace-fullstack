import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();
const ROUNDS = 12;

<<<<<<< HEAD
const AVATAR = (_key: string): null => null;

// ============================================================
// GAMBAR VALID DARI PEXELS
// ============================================================

// Untuk Kulkas
const KULKAS_IMAGES = [
  'https://images.pexels.com/photos/6526/refrigerator-kitchen-fridge-appliance.jpg',
  'https://images.pexels.com/photos/209231/refrigerator-fridge-kitchen-appliance-209231.jpeg',
  'https://images.pexels.com/photos/264520/pexels-photo-264520.jpeg',
];

<<<<<<< HEAD
// Untuk Buku / Penulisan / Copywriting
const BUKU_IMAGES = [
  'https://images.pexels.com/photos/261763/pexels-photo-261763.jpeg',
  'https://images.pexels.com/photos/1451448/pexels-photo-1451448.jpeg',
  'https://images.pexels.com/photos/5632380/pexels-photo-5632380.jpeg',
];

const DESAIN_GRAFIS_IMAGES = [
  'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg',
  'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg',
  'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg',
];

const WEB_DEV_IMAGES = [
  'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg',
  'https://images.pexels.com/photos/177598/pexels-photo-177598.jpeg',
  'https://images.pexels.com/photos/276452/pexels-photo-276452.jpeg',
];

const MOBILE_DEV_IMAGES = [
  'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg',
  'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg',
];

const DATA_ENTRY_IMAGES = [
  'https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg',
  'https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg',
];

const PENULISAN_IMAGES = [
  'https://images.pexels.com/photos/261763/pexels-photo-261763.jpeg',
  'https://images.pexels.com/photos/1451448/pexels-photo-1451448.jpeg',
  'https://images.pexels.com/photos/5632380/pexels-photo-5632380.jpeg',
];

const VIDEO_EDITING_IMAGES = [
  'https://images.pexels.com/photos/2958865/pexels-photo-2958865.jpeg',
  'https://images.pexels.com/photos/257904/pexels-photo-257904.jpeg',
  'https://images.pexels.com/photos/5081973/pexels-photo-5081973.jpeg',
];

const DIGITAL_MARKETING_IMAGES = [
  'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg',
  'https://images.pexels.com/photos/2881215/pexels-photo-2881215.jpeg',
];

const LES_PRIVAT_IMAGES = [
  'https://images.pexels.com/photos/256417/pexels-photo-256417.jpeg',
  'https://images.pexels.com/photos/374788/pexels-photo-374788.jpeg',
  'https://images.pexels.com/photos/4144923/pexels-photo-4144923.jpeg',
];

const SERVICE_REPARASI_IMAGES = [
  'https://images.pexels.com/photos/2582874/pexels-photo-2582874.jpeg',
  'https://images.pexels.com/photos/1378720/pexels-photo-1378720.jpeg',
  'https://images.pexels.com/photos/6526/refrigerator-kitchen-fridge-appliance.jpg',
];

const PINDAHAN_IMAGES = [
  'https://images.pexels.com/photos/1345386/pexels-photo-1345386.jpeg',
  'https://images.pexels.com/photos/15694/pexels-photo-15694.jpeg',
];

// ============================================================
// FUNGSI GAMBAR - PRIORITAS SPESIFIK
// ============================================================
function getSpecificImage(
  categorySlug: string,
  title: string,
  index: number,
): string {
  const titleLower = title.toLowerCase();

  // ========================================
  // PRIORITAS 1: GAMBAR SPESIFIK BERDASARKAN JUDUL (YANG SUDAH DIGANTI GENERIK)
  // ========================================

  // Service AC (judul sudah mengandung "service ac")
  if (titleLower.includes('service ac')) {
    return 'https://images.pexels.com/photos/2582874/pexels-photo-2582874.jpeg';
  }
  // Service Kulkas (judul sudah mengandung "service kulkas")
  if (titleLower.includes('service kulkas')) {
    return 'https://images.pexels.com/photos/264520/pexels-photo-264520.jpeg';
  }
  // Pasang AC
  if (titleLower.includes('pasang ac')) {
    return 'https://images.pexels.com/photos/1645110/pexels-photo-1645110.jpeg';
  }
  // Copywriting (judul sudah mengandung "copywriting")
  if (titleLower.includes('copywriting')) {
    return 'https://images.pexels.com/photos/5632380/pexels-photo-5632380.jpeg';
  }
  // Logo
  if (titleLower.includes('logo')) {
    return 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg';
  }
  // Thumbnail
  if (titleLower.includes('thumbnail')) {
    return 'https://images.pexels.com/photos/5081973/pexels-photo-5081973.jpeg';
  }
  // Edit Foto
  if (titleLower.includes('edit foto')) {
    return 'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg';
  }
  // Portfolio
  if (titleLower.includes('portfolio')) {
    return 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg';
  }
  // Landing Page
  if (titleLower.includes('landing page')) {
    return 'https://images.pexels.com/photos/177598/pexels-photo-177598.jpeg';
  }
  // Linktree
  if (titleLower.includes('linktree')) {
    return 'https://images.pexels.com/photos/276452/pexels-photo-276452.jpeg';
  }
  // Form Pendaftaran
  if (titleLower.includes('form pendaftaran')) {
    return 'https://images.pexels.com/photos/943096/pexels-photo-943096.jpeg';
  }
  // Aplikasi Absensi
  if (titleLower.includes('aplikasi absensi')) {
    return 'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg';
  }
  // Joki Tugas
  if (titleLower.includes('joki tugas')) {
    return 'https://images.pexels.com/photos/261763/pexels-photo-261763.jpeg';
  }
  // Terjemahan
  if (titleLower.includes('terjemahan')) {
    return 'https://images.pexels.com/photos/261763/pexels-photo-261763.jpeg';
  }
  // Followers
  if (titleLower.includes('followers')) {
    return 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg';
  }
  // Iklan Instagram
  if (titleLower.includes('iklan instagram')) {
    return 'https://images.pexels.com/photos/2881215/pexels-photo-2881215.jpeg';
  }
  // TikTok
  if (titleLower.includes('tiktok')) {
    return 'https://images.pexels.com/photos/4050295/pexels-photo-4050295.jpeg';
  }
  // YouTube
  if (titleLower.includes('youtube')) {
    return 'https://images.pexels.com/photos/5081973/pexels-photo-5081973.jpeg';
  }
  // Kinemaster
  if (titleLower.includes('kinemaster')) {
    return 'https://images.pexels.com/photos/257904/pexels-photo-257904.jpeg';
  }
  // Les Matematika
  if (titleLower.includes('les online matematika')) {
    return 'https://images.pexels.com/photos/256417/pexels-photo-256417.jpeg';
  }
  // Bimbingan PR
  if (titleLower.includes('bimbingan pr')) {
    return 'https://images.pexels.com/photos/374788/pexels-photo-374788.jpeg';
  }
  // Bahasa Inggris
  if (titleLower.includes('bahasa inggris')) {
    return 'https://images.pexels.com/photos/4144923/pexels-photo-4144923.jpeg';
  }
  // Data Entry
  if (titleLower.includes('ngetik data excel')) {
    return 'https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg';
  }
  // Convert PDF
  if (titleLower.includes('convert pdf')) {
    return 'https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg';
  }
  // Pindahan
  if (titleLower.includes('pindahan')) {
    return 'https://images.pexels.com/photos/1345386/pexels-photo-1345386.jpeg';
  }

  // ========================================
  // PRIORITAS 2: FALLBACK BERDASARKAN KATEGORI
  // ========================================
  const categoryImages: Record<string, string> = {
    'desain-grafis':
      'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg',
    'web-development':
      'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg',
    'mobile-development':
      'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg',
    'data-entry':
      'https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg',
    penulisan:
      'https://images.pexels.com/photos/261763/pexels-photo-261763.jpeg',
    'video-editing':
      'https://images.pexels.com/photos/2958865/pexels-photo-2958865.jpeg',
    'digital-marketing':
      'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg',
    'les-privat':
      'https://images.pexels.com/photos/256417/pexels-photo-256417.jpeg',
    'service-reparasi':
      'https://images.pexels.com/photos/2582874/pexels-photo-2582874.jpeg',
    pindahan:
      'https://images.pexels.com/photos/1345386/pexels-photo-1345386.jpeg',
  };

  // ========================================
  // PRIORITAS 3: FALLBACK PLACEHOLDER (PASTI MUNCUL!)
  // ========================================
  const textForImage = encodeURIComponent(title.substring(0, 30));
  const fallbackPlaceholder = `https://placehold.co/800x500/0a66c2/ffffff?text=${textForImage}`;

  return categoryImages[categorySlug] || fallbackPlaceholder;
=======
=======
const AVATAR = (key: string): string => {
  // Avatar dihasilkan dari ui-avatars.com: deterministik berdasarkan nama,
  // background berwarna khas Tolongin, tanpa external upload dependency.
  // Selalu mengembalikan URL valid sehingga gate "upload foto dulu" di frontend
  // tidak menggangu demo akun seed.
  const palette = ['10b981', '0ea5e9', 'f59e0b', 'ef4444', '8b5cf6', '14b8a6'];
  const initials = encodeURIComponent(key);
  const idx = Math.abs(
    [...key].reduce((acc, c) => acc + c.charCodeAt(0), 0),
  ) % palette.length;
  return `https://ui-avatars.com/api/?name=${initials}&background=${palette[idx]}&color=fff&size=256&bold=true`;
};

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

>>>>>>> ec26484 (implementasi demo)
function getServiceImage(index: number): string {
  // Pilih gambar berdasarkan index untuk konsistensi (tetapi tetap bervariasi)
  const imageId = IMAGE_IDS[index % IMAGE_IDS.length];
  return `https://picsum.photos/id/${imageId}/600/400`;
<<<<<<< HEAD
>>>>>>> 961a4cc (Update: Menyinkronkan perubahan lokal dengan repositori remote)
=======
>>>>>>> ec26484 (implementasi demo)
}

const dayMs = 24 * 3600 * 1000;
const future = (days: number) => new Date(Date.now() + days * dayMs);
const past = (days: number) => new Date(Date.now() - days * dayMs);

async function main() {
<<<<<<< HEAD
  console.log('🌱  Seeding Tolongin...');

  // Clean tables
=======
  console.log('\n🌱 ========== STARTING SEED ==========\n');

  // ============================================================
  // CLEAN TABLES
  // ============================================================
  console.log('🧹 Cleaning existing data...');

>>>>>>> ec26484 (implementasi demo)
  await prisma.review.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.message.deleteMany();
  await prisma.conversation.deleteMany();
  await prisma.application.deleteMany();
  await prisma.order.deleteMany();
  await prisma.favorite.deleteMany();
  await prisma.job.deleteMany();
  await prisma.service.deleteMany();
<<<<<<< HEAD

  // ---------- Users ----------
=======
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
    { name: 'Desain Grafis', slug: 'desain-grafis', icon: 'fa-palette' },
    { name: 'Web Development', slug: 'web-development', icon: 'fa-code' },
    {
      name: 'Mobile Development',
      slug: 'mobile-development',
      icon: 'fa-mobile-screen',
    },
    { name: 'Data Entry', slug: 'data-entry', icon: 'fa-keyboard' },
    { name: 'Penulisan & Content', slug: 'penulisan', icon: 'fa-pen-nib' },
    { name: 'Video Editing', slug: 'video-editing', icon: 'fa-film' },
    {
      name: 'Digital Marketing',
      slug: 'digital-marketing',
      icon: 'fa-bullhorn',
    },
    { name: 'Les Privat', slug: 'les-privat', icon: 'fa-chalkboard-user' },
    {
      name: 'Service & Reparasi',
      slug: 'service-reparasi',
      icon: 'fa-screwdriver-wrench',
    },
    { name: 'Pindahan & Logistik', slug: 'pindahan', icon: 'fa-truck' },
  ];

  const catMap: Record<string, string> = {};
  for (const cat of categories) {
    const created = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: cat,
      create: cat,
    });
    catMap[cat.slug] = created.id;
  }
  console.log(`✅ ${categories.length} categories created\n`);

  // ============================================================
  // USERS
  // ============================================================
  console.log('👥 Creating users...');

>>>>>>> ec26484 (implementasi demo)
  const hashAdmin = await bcrypt.hash('Admin@123', ROUNDS);
  const hashUser = await bcrypt.hash('User@123', ROUNDS);
  const hashSeller = await bcrypt.hash('Seller@123', ROUNDS);
  const hashBuyer = await bcrypt.hash('Buyer@123', ROUNDS);

<<<<<<< HEAD
  const baseUsers: Array<any> = [
=======
  const users = [
>>>>>>> ec26484 (implementasi demo)
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
<<<<<<< HEAD
    },
    {
      email: 'andi@tolongin.com',
      password: hashUser,
      name: 'Andi Pratama',
      phone: '+6281298765432',
      avatar: AVATAR('andi'),
      role: 'USER',
      bio: 'Full-stack web developer 5+ tahun.',
      skills: JSON.stringify(['React', 'Node.js']),
      emailVerified: true,
      phoneVerified: true,
      ktpVerified: true,
      verified: true,
      rating: 4.8,
      reviewCount: 24,
      totalOrders: 32,
      completedOrders: 30,
      balance: 1_250_000,
    },
    {
      email: 'sari@tolongin.com',
      password: hashUser,
      name: 'Sari Wulandari',
      phone: '+6281234567899',
      avatar: AVATAR('sari'),
      role: 'USER',
      bio: 'Content writer & social media manager.',
      skills: JSON.stringify(['Copywriting', 'SEO']),
      emailVerified: true,
      phoneVerified: true,
      ktpVerified: true,
      verified: true,
      rating: 4.9,
      reviewCount: 38,
      totalOrders: 41,
      completedOrders: 40,
      balance: 850_000,
=======
      city: 'Jakarta Pusat',
      rating: 5.0,
      reviewCount: 0,
      balance: 0,
>>>>>>> ec26484 (implementasi demo)
    },
    {
      email: 'citra@tolongin.com',
      password: hashSeller,
      name: 'Citra Kirana',
      phone: '+6281211223344',
      avatar: AVATAR('citra'),
      role: 'USER',
<<<<<<< HEAD
      bio: 'Graphic designer freelance.',
      skills: JSON.stringify(['Logo Design']),
=======
      bio: '✨ Top Rated Designer | 5+ tahun pengalaman • Sudah desain 300+ logo & brand identity untuk UMKM Indonesia',
>>>>>>> ec26484 (implementasi demo)
      emailVerified: true,
      phoneVerified: true,
      ktpVerified: true,
      verified: true,
<<<<<<< HEAD
      rating: 4.9,
      reviewCount: 127,
      totalOrders: 135,
      completedOrders: 130,
      balance: 4_800_000,
    },
    {
      email: 'budi.teknik@tolongin.com',
      password: hashSeller,
      name: 'Budi Setiawan',
      phone: '+6281355667788',
      avatar: AVATAR('buditeknik'),
      role: 'USER',
      bio: 'Teknisi profesional. Service AC, kulkas.',
      skills: JSON.stringify(['Service AC']),
=======
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
>>>>>>> ec26484 (implementasi demo)
      emailVerified: true,
      phoneVerified: true,
      ktpVerified: true,
      verified: true,
<<<<<<< HEAD
      rating: 4.8,
      reviewCount: 342,
      totalOrders: 360,
      completedOrders: 350,
      balance: 2_100_000,
=======
      city: 'Jakarta Selatan',
      rating: 4.7,
      reviewCount: 527,
      totalOrders: 560,
      completedOrders: 550,
      balance: 8_750_000,
>>>>>>> ec26484 (implementasi demo)
    },
    {
      email: 'irawan@tolongin.com',
      password: hashSeller,
      name: 'Irawan Putra, S.Pd',
      phone: '+6285678901234',
      avatar: AVATAR('irawan'),
      role: 'USER',
<<<<<<< HEAD
      bio: 'Guru les privat matematika.',
      skills: JSON.stringify(['Matematika']),
=======
      bio: '📚 Guru Les Privat (Matematika, Fisika, Bahasa Inggris) • 8 tahun mengajar SMP/SMA',
>>>>>>> ec26484 (implementasi demo)
      emailVerified: true,
      phoneVerified: true,
      ktpVerified: true,
      verified: true,
<<<<<<< HEAD
      rating: 5.0,
      reviewCount: 89,
      totalOrders: 92,
      completedOrders: 89,
      balance: 1_750_000,
    },
    {
      email: 'maya.videografi@tolongin.com',
      password: hashSeller,
      name: 'Maya Sari',
      phone: '+6281544332211',
      avatar: AVATAR('mayavid'),
      role: 'USER',
      bio: 'Video editor & motion designer.',
      skills: JSON.stringify(['Premiere Pro']),
=======
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
>>>>>>> ec26484 (implementasi demo)
      emailVerified: true,
      phoneVerified: true,
      ktpVerified: true,
      verified: true,
<<<<<<< HEAD
      rating: 4.7,
      reviewCount: 56,
      totalOrders: 60,
      completedOrders: 56,
      balance: 920_000,
    },
    {
      email: 'rina.buyer@tolongin.com',
      password: hashBuyer,
      name: 'Rina Pratiwi',
      phone: '+6281622334455',
      avatar: AVATAR('rinabuyer'),
      role: 'USER',
      bio: 'Owner brand fashion lokal.',
      emailVerified: true,
      phoneVerified: true,
      ktpVerified: false,
=======
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
>>>>>>> ec26484 (implementasi demo)
    },
    {
      email: 'aditya@tolongin.com',
      password: hashBuyer,
      name: 'Aditya Wirawan',
      phone: '+6281755443322',
      avatar: AVATAR('aditya'),
      role: 'USER',
<<<<<<< HEAD
      bio: 'Founder startup edtech.',
      emailVerified: true,
      phoneVerified: true,
      ktpVerified: false,
    },
    {
      email: 'newbie@tolongin.com',
      password: hashUser,
      name: 'Budi Santoso',
      phone: '+6281211112222',
      role: 'USER',
      bio: 'Baru daftar',
      emailVerified: false,
      phoneVerified: false,
    },
    {
      email: 'seller@tolongin.com',
      password: hashSeller,
      name: 'Yano Supriadi',
      phone: '+6281800800800',
      avatar: AVATAR('sellerdemo'),
      role: 'USER',
      bio: 'Akun demo untuk tester',
      skills: JSON.stringify(['Demo']),
=======
      bio: '🚀 Founder Startup',
>>>>>>> ec26484 (implementasi demo)
      emailVerified: true,
      phoneVerified: true,
      ktpVerified: true,
      verified: true,
<<<<<<< HEAD
      rating: 4.5,
      reviewCount: 10,
      totalOrders: 12,
      completedOrders: 10,
      balance: 500_000,
=======
      city: 'Jakarta Selatan',
      rating: 4.8,
      reviewCount: 8,
      balance: 0,
>>>>>>> ec26484 (implementasi demo)
    },
    {
      email: 'buyer@tolongin.com',
      password: hashBuyer,
<<<<<<< HEAD
      name: 'Buyer Demo',
      phone: '+6281900900900',
      avatar: AVATAR('buyerdemo'),
      role: 'USER',
      bio: 'Akun demo untuk tester',
      emailVerified: true,
      phoneVerified: true,
      ktpVerified: false,
=======
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
      phone: '+6281311112233',
      avatar: AVATAR('eko'),
      role: 'USER',
      bio: '📱 Mobile Developer Flutter & React Native • 4 tahun pengalaman',
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
      name: 'Fitri Rahmawati',
      phone: '+6281422223344',
      avatar: AVATAR('fitri'),
      role: 'USER',
      bio: '🎨 UI/UX Designer • Figma expert • Spesialis dashboard & mobile app',
      emailVerified: true,
      phoneVerified: true,
      ktpVerified: true,
      verified: true,
      city: 'Medan',
      rating: 4.7,
      reviewCount: 124,
      balance: 4_100_000,
    },
    {
      email: 'gilang@tolongin.com',
      password: hashSeller,
      name: 'Gilang Wijaya',
      phone: '+6281533334455',
      avatar: AVATAR('gilang'),
      role: 'USER',
      bio: '📊 Data Analyst & Excel Expert • Laporan bisnis & visualisasi data',
      emailVerified: true,
      phoneVerified: true,
      ktpVerified: true,
      verified: true,
      city: 'Depok',
      rating: 4.5,
      reviewCount: 67,
      balance: 2_800_000,
    },
    {
      email: 'hana@tolongin.com',
      password: hashBuyer,
      name: 'Hana Putri',
      phone: '+6281644445566',
      avatar: AVATAR('hana'),
      role: 'USER',
      bio: '🍰 Owner Bakery Online • butuh desain kemasan & konten sosmed',
      emailVerified: true,
      phoneVerified: true,
      ktpVerified: true,
      verified: true,
      city: 'Solo',
      rating: 4.3,
      reviewCount: 15,
      balance: 0,
    },
    {
      email: 'joko@tolongin.com',
      password: hashSeller,
      name: 'Joko Susilo',
      phone: '+6281755556677',
      avatar: AVATAR('joko'),
      role: 'USER',
      bio: '🏗️ Kontraktor Renovasi Rumah • Interior & finishing berkualitas',
      emailVerified: true,
      phoneVerified: true,
      ktpVerified: true,
      verified: true,
      city: 'Bekasi',
      rating: 4.4,
      reviewCount: 203,
      balance: 6_500_000,
    },
    {
      email: 'kirana@tolongin.com',
      password: hashSeller,
      name: 'Kirana Maharani',
      phone: '+6281866667788',
      avatar: AVATAR('kirana'),
      role: 'USER',
      bio: '📸 Fotografer Produk & Food • Studio mini di Bandung',
      emailVerified: true,
      phoneVerified: true,
      ktpVerified: true,
      verified: true,
      city: 'Bandung',
      rating: 4.8,
      reviewCount: 176,
      balance: 5_900_000,
    },
    {
      email: 'laras@tolongin.com',
      password: hashBuyer,
      name: 'Laras Dwi',
      phone: '+6281977778899',
      avatar: AVATAR('laras'),
      role: 'USER',
      bio: '💼 HR Manager • sering butuh jasa rekrutmen & admin',
      emailVerified: true,
      phoneVerified: true,
      ktpVerified: true,
      verified: true,
      city: 'Surabaya',
      rating: 4.2,
      reviewCount: 9,
      balance: 0,
    },
    {
      email: 'miko@tolongin.com',
      password: hashSeller,
      name: 'Miko Hartono',
      phone: '+6281988889900',
      avatar: AVATAR('miko'),
      role: 'USER',
      bio: '🎵 Sound Engineer & Voice Over • Podcast & iklan radio',
      emailVerified: true,
      phoneVerified: true,
      ktpVerified: true,
      verified: true,
      city: 'Jakarta Barat',
      rating: 4.6,
      reviewCount: 98,
      balance: 3_700_000,
    },
    {
      email: 'nia@tolongin.com',
      password: hashSeller,
      name: 'Nia Permata',
      phone: '+6281999990011',
      avatar: AVATAR('nia'),
      role: 'USER',
      bio: '🌐 Translator EN-ID • Legal, marketing, dan teknis',
      emailVerified: true,
      phoneVerified: true,
      ktpVerified: true,
      verified: true,
      city: 'Denpasar',
      rating: 4.9,
      reviewCount: 145,
      balance: 4_400_000,
    },
    {
      email: 'oki@tolongin.com',
      password: hashSeller,
      name: 'Oki Prasetyo',
      phone: '+6281100001122',
      avatar: AVATAR('oki'),
      role: 'USER',
      bio: '🚚 Driver & Kurir Bandung-Jakarta • Pengiriman aman & cepat',
      emailVerified: true,
      phoneVerified: true,
      ktpVerified: true,
      verified: true,
      city: 'Bandung',
      rating: 4.3,
      reviewCount: 312,
      balance: 2_100_000,
>>>>>>> ec26484 (implementasi demo)
    },
  ];

  const userMap: Record<string, string> = {};
<<<<<<< HEAD
  for (const u of baseUsers) {
    const r = await prisma.user.upsert({
      where: { email: u.email },
      update: u,
      create: u,
    });
    userMap[u.email] = r.id;
  }
  console.log(`✓ ${baseUsers.length} users`);

  // ---------- Bank Accounts ----------
  const verifiedBanks = [
    { email: 'andi@tolongin.com', bank: 'BCA', no: '1234567890' },
    { email: 'sari@tolongin.com', bank: 'Mandiri', no: '0987654321' },
    { email: 'citra@tolongin.com', bank: 'BNI', no: '2233445566' },
    { email: 'budi.teknik@tolongin.com', bank: 'BRI', no: '3344556677' },
    { email: 'irawan@tolongin.com', bank: 'CIMB Niaga', no: '4455667788' },
    { email: 'maya.videografi@tolongin.com', bank: 'BCA', no: '5566778899' },
    { email: 'seller@tolongin.com', bank: 'BCA', no: '9999888877' },
  ];
  for (const b of verifiedBanks) {
    const userId = userMap[b.email];
    if (!userId) continue;
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) continue;
    const existing = await prisma.bankAccount.findFirst({ where: { userId } });
    if (existing) continue;
    await prisma.bankAccount.create({
      data: {
        userId,
        bankName: b.bank,
        accountNumber: b.no,
        accountName: user.name,
        isDefault: true,
        isVerified: true,
      },
    });
  }
  console.log('✓ bank accounts');

  // ---------- Categories ----------
  const cats = [
    { name: 'Desain Grafis', slug: 'desain-grafis', icon: 'palette' },
    { name: 'Web Development', slug: 'web-development', icon: 'code' },
    {
      name: 'Mobile Development',
      slug: 'mobile-development',
      icon: 'mobile-screen',
    },
    { name: 'Data Entry', slug: 'data-entry', icon: 'keyboard' },
    { name: 'Penulisan', slug: 'penulisan', icon: 'pen-nib' },
    { name: 'Video Editing', slug: 'video-editing', icon: 'film' },
    { name: 'Digital Marketing', slug: 'digital-marketing', icon: 'bullhorn' },
    { name: 'Les Privat', slug: 'les-privat', icon: 'chalkboard-user' },
    {
      name: 'Service & Reparasi',
      slug: 'service-reparasi',
      icon: 'screwdriver-wrench',
    },
    { name: 'Pindahan & Logistik', slug: 'pindahan', icon: 'truck' },
  ];
  const catMap: Record<string, string> = {};
  for (const c of cats) {
    const x = await prisma.category.upsert({
      where: { slug: c.slug },
      update: c,
      create: c,
    });
    catMap[c.slug] = x.id;
  }
  console.log(`✓ ${cats.length} categories`);

  // ============================================================
  // SERVICES - HANYA 3 SERVICE YANG DIGANTI JUDULNYA
  // ============================================================
  const services = [
    // Desain Grafis (3) - TIDAK BERUBAH
    {
      sellerEmail: 'citra@tolongin.com',
      cat: 'desain-grafis',
      title: 'Desain Logo + Feed IG Aesthetic',
      desc: 'Logo keren + 5 template feed IG',
      price: 150000,
      deliveryTime: 2,
      revisionCount: 2,
      rating: 4.9,
      reviewCount: 127,
      featured: true,
    },
    {
      sellerEmail: 'citra@tolongin.com',
      cat: 'desain-grafis',
      title: 'Edit Foto Produk Shopee/Tokopedia',
      desc: 'Biar produk lo keliatan premium!',
      price: 99000,
      deliveryTime: 1,
      revisionCount: 2,
      rating: 4.8,
      reviewCount: 42,
      featured: false,
    },
    {
      sellerEmail: 'citra@tolongin.com',
      cat: 'desain-grafis',
      title: 'Bikin Thumbnail YouTube Kekinian',
      desc: 'Thumbnail ala creator gede!',
      price: 75000,
      deliveryTime: 1,
      revisionCount: 2,
      rating: 4.9,
      reviewCount: 56,
      featured: false,
    },
    // Web Development (4) - TIDAK BERUBAH
    {
      sellerEmail: 'andi@tolongin.com',
      cat: 'web-development',
      title: 'Portfolio Website Fresh Graduate',
      desc: 'Portfolio modern, responsive',
      price: 500000,
      deliveryTime: 5,
      revisionCount: 3,
      rating: 4.9,
      reviewCount: 22,
      featured: true,
    },
    {
      sellerEmail: 'andi@tolongin.com',
      cat: 'web-development',
      title: 'Landing Page Tugas Akhir',
      desc: 'Buat mahasiswa teknik',
      price: 350000,
      deliveryTime: 3,
      revisionCount: 3,
      rating: 4.8,
      reviewCount: 14,
      featured: false,
    },
    {
      sellerEmail: 'andi@tolongin.com',
      cat: 'web-development',
      title: 'Linktree Custom Keren',
      desc: 'Biar IG lo makin aesthetic!',
      price: 50000,
      deliveryTime: 1,
      revisionCount: 2,
      rating: 4.9,
      reviewCount: 28,
      featured: false,
    },
    {
      sellerEmail: 'andi@tolongin.com',
      cat: 'web-development',
      title: 'Form Pendaftaran Event Kampus',
      desc: 'Online + export ke excel',
      price: 250000,
      deliveryTime: 2,
      revisionCount: 2,
      rating: 4.8,
      reviewCount: 6,
      featured: false,
    },
    // Mobile Development (1) - TIDAK BERUBAH
    {
      sellerEmail: 'andi@tolongin.com',
      cat: 'mobile-development',
      title: 'Aplikasi Absensi Kos-kosan',
      desc: 'Simple dan gak ribet!',
      price: 1500000,
      deliveryTime: 14,
      revisionCount: 2,
      rating: 4.6,
      reviewCount: 4,
      featured: false,
    },
    // Penulisan (3) - HANYA COPYWRITING YANG DIGANTI
    {
      sellerEmail: 'sari@tolongin.com',
      cat: 'penulisan',
      title: 'Joki Tugas Essay 1000 Kata',
      desc: 'Anti plagiasi!',
      price: 100000,
      deliveryTime: 2,
      revisionCount: 2,
      rating: 4.9,
      reviewCount: 188,
      featured: true,
    },
    {
      sellerEmail: 'sari@tolongin.com',
      cat: 'penulisan',
      title: 'Jasa Copywriting Professional untuk Deskripsi Produk',
      desc: 'Biar auto checkout!',
      price: 120000,
      deliveryTime: 2,
      revisionCount: 2,
      rating: 4.9,
      reviewCount: 75,
      featured: false,
    }, // ✅ DIGANTI
    {
      sellerEmail: 'sari@tolongin.com',
      cat: 'penulisan',
      title: 'Terjemahan Abstrak Inggris-Indonesia',
      desc: 'Cocok buat skripsi!',
      price: 80000,
      deliveryTime: 1,
      revisionCount: 1,
      rating: 4.8,
      reviewCount: 41,
      featured: false,
    },
    // Digital Marketing (2) - TIDAK BERUBAH
    {
      sellerEmail: 'sari@tolongin.com',
      cat: 'digital-marketing',
      title: 'Naikin Followers IG Organik 500',
      desc: 'Followers real Indonesia!',
      price: 250000,
      deliveryTime: 7,
      revisionCount: 1,
      rating: 4.7,
      reviewCount: 16,
      featured: false,
    },
    {
      sellerEmail: 'sari@tolongin.com',
      cat: 'digital-marketing',
      title: 'Setup Iklan Instagram Bisnis',
      desc: 'Biar usaha lo dikenal!',
      price: 350000,
      deliveryTime: 3,
      revisionCount: 2,
      rating: 4.6,
      reviewCount: 9,
      featured: false,
    },
    // Video Editing (3) - TIDAK BERUBAH
    {
      sellerEmail: 'maya.videografi@tolongin.com',
      cat: 'video-editing',
      title: 'Edit Video TikTok 30 Detik Viral',
      desc: 'Biar FYP!',
      price: 75000,
      deliveryTime: 1,
      revisionCount: 2,
      rating: 4.9,
      reviewCount: 39,
      featured: true,
    },
    {
      sellerEmail: 'maya.videografi@tolongin.com',
      cat: 'video-editing',
      title: 'Edit Video YouTube Vlog/Podcast',
      desc: 'Rapih + thumbnail keren!',
      price: 200000,
      deliveryTime: 3,
      revisionCount: 2,
      rating: 4.8,
      reviewCount: 27,
      featured: false,
    },
    {
      sellerEmail: 'maya.videografi@tolongin.com',
      cat: 'video-editing',
      title: 'Bikin Video Kinemaster Tugas',
      desc: 'Tinggal kasih materi',
      price: 50000,
      deliveryTime: 1,
      revisionCount: 2,
      rating: 4.7,
      reviewCount: 16,
      featured: false,
    },
    // Les Privat (3) - TIDAK BERUBAH
    {
      sellerEmail: 'irawan@tolongin.com',
      cat: 'les-privat',
      title: 'Les Online Matematika 1 Jam',
      desc: 'Santai, sabar, nggak bikin stres!',
      price: 50000,
      deliveryTime: 1,
      revisionCount: 1,
      rating: 5.0,
      reviewCount: 89,
      featured: true,
    },
    {
      sellerEmail: 'irawan@tolongin.com',
      cat: 'les-privat',
      title: 'Bimbingan PR Matematika',
      desc: 'Cocok buat anak sekolah',
      price: 40000,
      deliveryTime: 1,
      revisionCount: 1,
      rating: 4.9,
      reviewCount: 53,
      featured: false,
    },
    {
      sellerEmail: 'irawan@tolongin.com',
      cat: 'les-privat',
      title: 'Belajar Bahasa Inggris Pemula',
      desc: 'Cara asik biar cepet bisa ngomong!',
      price: 60000,
      deliveryTime: 1,
      revisionCount: 1,
      rating: 4.9,
      reviewCount: 47,
      featured: false,
    },
    // Service & Reparasi (3) - KETIGANYA DIGANTI
    {
      sellerEmail: 'budi.teknik@tolongin.com',
      cat: 'service-reparasi',
      title: 'Jasa Service AC Profesional - Cuci & Isi Freon',
      desc: 'AC panas? Di kita aja. Garansi 1 bulan!',
      price: 150000,
      deliveryTime: 1,
      revisionCount: 1,
      rating: 4.8,
      reviewCount: 342,
      featured: true,
    }, // ✅ DIGANTI
    {
      sellerEmail: 'budi.teknik@tolongin.com',
      cat: 'service-reparasi',
      title: 'Jasa Service Kulkas 1 Pintu - Datang ke Rumah',
      desc: 'Kulkas dingin sebelah? Langsung dibenerin',
      price: 120000,
      deliveryTime: 1,
      revisionCount: 1,
      rating: 4.7,
      reviewCount: 128,
      featured: false,
    }, // ✅ DIGANTI
    {
      sellerEmail: 'budi.teknik@tolongin.com',
      cat: 'service-reparasi',
      title: 'Jasa Pasang AC Baru - Free Konsultasi',
      desc: 'Pindahan rumah? Kita bantuin pasang AC!',
      price: 200000,
      deliveryTime: 1,
      revisionCount: 1,
      rating: 4.8,
      reviewCount: 78,
      featured: false,
    }, // ✅ DIGANTI
    // Data Entry (2) - TIDAK BERUBAH
    {
      sellerEmail: 'seller@tolongin.com',
      cat: 'data-entry',
      title: 'Ngetik Data Excel 500 Baris',
      desc: 'Tinggal kirim, saya kerjain!',
      price: 50000,
      deliveryTime: 1,
      revisionCount: 1,
      rating: 4.5,
      reviewCount: 14,
      featured: false,
    },
    {
      sellerEmail: 'seller@tolongin.com',
      cat: 'data-entry',
      title: 'Convert PDF ke Word/Excel 100 Halaman',
      desc: 'Biar gak repot ngetik ulang!',
      price: 75000,
      deliveryTime: 1,
      revisionCount: 1,
      rating: 4.6,
      reviewCount: 22,
      featured: false,
    },
    // Pindahan (1) - TIDAK BERUBAH
    {
      sellerEmail: 'seller@tolongin.com',
      cat: 'pindahan',
      title: 'Jasa Pindahan Kosan Jakarta + Packing',
      desc: 'Tinggal santai, tim kita yang urus!',
      price: 500000,
      deliveryTime: 1,
      revisionCount: 1,
      rating: 4.5,
      reviewCount: 31,
=======
  for (const user of users) {
    const created = await prisma.user.upsert({
      where: { email: user.email },
      update: user,
      create: user,
    });
    userMap[user.email] = created.id;
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
    },
    {
      seller: 'budi@tolongin.com',
      cat: 'service-reparasi',
      title: 'Service Kulkas 1/2 Pintu',
      desc: 'Refrigerator repair',
      price: 120000,
      delivery: 1,
      rev: 1,
      featured: true,
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
      title: 'Les Online Matematika (1 jam)',
      desc: 'Les privat online 1-on-1 untuk SMP/SMA via Zoom. Materi disesuaikan dengan kurikulum sekolah, dilengkapi worksheet PDF, rekaman sesi, dan diskusi WhatsApp di luar jam belajar.',
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
>>>>>>> ec26484 (implementasi demo)
      featured: false,
    },
  ];

<<<<<<< HEAD
  console.log('\n📸 MEMBUAT SERVICES:\n');
  for (let i = 0; i < services.length; i++) {
    const s = services[i];
    const sellerId = userMap[s.sellerEmail];
    const categoryId = catMap[s.cat];
    if (!sellerId || !categoryId) continue;

<<<<<<< HEAD
    const imageUrl = getSpecificImage(s.cat, s.title, i);
    console.log(`  ✅ [${i + 1}] ${s.title.substring(0, 45)}`);
=======
    const imageUrl = getServiceImage(serviceIndex);
>>>>>>> 961a4cc (Update: Menyinkronkan perubahan lokal dengan repositori remote)
=======
  let serviceIndex = 0;
  for (const svc of serviceList) {
    const sellerId = userMap[svc.seller];
    const categoryId = catMap[svc.cat];
    if (!sellerId || !categoryId) continue;

    const imageUrl = getServiceImage(serviceIndex);
>>>>>>> ec26484 (implementasi demo)

    await prisma.service.create({
      data: {
        sellerId,
        categoryId,
<<<<<<< HEAD
        title: s.title,
        description: s.desc,
        price: s.price,
        deliveryTime: s.deliveryTime,
        revisionCount: s.revisionCount,
        images: JSON.stringify([imageUrl]),
<<<<<<< HEAD
        rating: s.rating,
        reviewCount: s.reviewCount,
        isFeatured: s.featured,
=======
        rating: 4.5 + (serviceIndex % 5) * 0.1,
        reviewCount: 18 + serviceIndex * 7,
        isFeatured: svc.featured,
>>>>>>> 961a4cc (Update: Menyinkronkan perubahan lokal dengan repositori remote)
      },
    });
  }
  console.log(`\n✅ ${services.length} services`);

  // ============================================================
  // JOBS (16 jobs) - TIDAK BERUBAH
  // ============================================================
  const jobs = [
    {
      buyerEmail: 'rina.buyer@tolongin.com',
      cat: 'desain-grafis',
      title: 'Bikin Logo Coffee Shop "Kopi Muda"',
      desc: 'Logo kekinian',
      budget: 300000,
      deadlineDays: 14,
      location: 'Jakarta',
      skills: ['Logo Design'],
    },
    {
      buyerEmail: 'rina.buyer@tolongin.com',
      cat: 'digital-marketing',
      title: 'Konten Instagram Brand Fashion',
      desc: '30 post untuk 1 bulan',
      budget: 1500000,
      deadlineDays: 30,
      location: 'Remote',
      skills: ['Instagram'],
    },
    {
      buyerEmail: 'aditya@tolongin.com',
      cat: 'web-development',
      title: 'Landing Page Startup Edukasi',
      desc: 'Next.js + Tailwind',
      budget: 2000000,
      deadlineDays: 10,
      location: 'Remote',
      skills: ['Next.js'],
    },
    {
      buyerEmail: 'aditya@tolongin.com',
      cat: 'mobile-development',
      title: 'Aplikasi Absensi BEM',
      desc: 'Flutter, 3 screen',
      budget: 5000000,
      deadlineDays: 30,
      location: 'Remote',
      skills: ['Flutter'],
    },
    {
      buyerEmail: 'rina.buyer@tolongin.com',
      cat: 'penulisan',
      title: 'Penulis Artikel Otomotif 5 Artikel',
      desc: 'Mobil listrik',
      budget: 750000,
      deadlineDays: 14,
      location: 'Remote',
      skills: ['SEO Writing'],
    },
    {
      buyerEmail: 'buyer@tolongin.com',
      cat: 'video-editing',
      title: 'Edit 3 Video TikTok Promo',
      desc: '30 detik',
      budget: 300000,
      deadlineDays: 5,
      location: 'Remote',
      skills: ['Video Editing'],
    },
    {
      buyerEmail: 'aditya@tolongin.com',
      cat: 'data-entry',
      title: 'Input Data 1000 Peserta Event',
      desc: 'Google Forms ke Excel',
      budget: 200000,
      deadlineDays: 3,
      location: 'Remote',
      skills: ['Data Entry'],
    },
    {
      buyerEmail: 'rina.buyer@tolongin.com',
      cat: 'desain-grafis',
      title: 'Desain Kemasan Skincare',
      desc: 'Tema natural',
      budget: 1000000,
      deadlineDays: 14,
      location: 'Remote',
      skills: ['Packaging Design'],
    },
    {
      buyerEmail: 'buyer@tolongin.com',
      cat: 'service-reparasi',
      title: 'Service AC Kantor 2 Unit Bekasi',
      desc: 'Bekasi area',
      budget: 250000,
      deadlineDays: 3,
      location: 'Bekasi',
      skills: ['Service AC'],
    },
    {
      buyerEmail: 'aditya@tolongin.com',
      cat: 'les-privat',
      title: 'Tutor Matematika Online Anak SD',
      desc: '3x seminggu',
      budget: 600000,
      deadlineDays: 30,
      location: 'Remote',
      skills: ['Matematika SD'],
    },
    {
      buyerEmail: 'rina.buyer@tolongin.com',
      cat: 'digital-marketing',
      title: 'Optimasi Iklan Instagram Toko',
      desc: 'Setup + optimasi',
      budget: 800000,
      deadlineDays: 7,
      location: 'Remote',
      skills: ['Instagram Ads'],
    },
    {
      buyerEmail: 'buyer@tolongin.com',
      cat: 'pindahan',
      title: 'Pindahan Apartemen Jaksel ke Tangerang',
      desc: '2 kamar + sofa',
      budget: 1000000,
      deadlineDays: 5,
      location: 'Jakarta-Tangerang',
      skills: ['Pindahan'],
    },
    {
      buyerEmail: 'aditya@tolongin.com',
      cat: 'penulisan',
      title: 'Copywriting Landing Page Course',
      desc: 'Copywriting yang ngejual!',
      budget: 400000,
      deadlineDays: 4,
      location: 'Remote',
      skills: ['Copywriting'],
    },
    {
      buyerEmail: 'rina.buyer@tolongin.com',
      cat: 'video-editing',
      title: '[URGENT] Edit Video Flash Sale 30 Detik',
      desc: 'Deadline besok!',
      budget: 200000,
      deadlineDays: 1,
      location: 'Remote',
      skills: ['Video Editing'],
    },
    {
      buyerEmail: 'aditya@tolongin.com',
      cat: 'desain-grafis',
      title: '[URGENT] Banner Event 2 Hari Lagi',
      desc: 'Ukuran 5x2 meter',
      budget: 200000,
      deadlineDays: 2,
      location: 'Jakarta',
      skills: ['Banner Design'],
    },
    {
      buyerEmail: 'rina.buyer@tolongin.com',
      cat: 'web-development',
      title: '[CLOSED] Redesign Website Perusahaan',
      desc: 'Job sudah ditutup',
      budget: 3000000,
      deadlineDays: -10,
      location: 'Remote',
      skills: ['Web Design'],
      status: 'CLOSED',
    },
  ];

  for (const j of jobs) {
    const buyerId = userMap[j.buyerEmail];
    const categoryId = catMap[j.cat];
    if (!buyerId || !categoryId) continue;
=======
        title: svc.title,
        description: svc.desc,
        price: svc.price,
        deliveryTime: svc.delivery,
        revisionCount: svc.rev,
        images: JSON.stringify([imageUrl]),
        rating: 4.5 + (serviceIndex % 5) * 0.1,
        reviewCount: 18 + serviceIndex * 7,
        isFeatured: svc.featured,
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
      location: 'Jakarta',
      skills: ['Logo Design'],
      urgent: false,
    },
    {
      buyer: 'rina@tolongin.com',
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
      buyer: 'aditya@tolongin.com',
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
      buyer: 'aditya@tolongin.com',
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
      buyer: 'aditya@tolongin.com',
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
      buyer: 'rina@tolongin.com',
      cat: 'mobile-development',
      title: 'Perbaikan Bug Aplikasi Flutter UMKM',
      desc: 'Mencari developer Flutter untuk memperbaiki crash pada halaman checkout, merapikan validasi form alamat, dan menyiapkan build Android untuk pengujian internal. Source code dan daftar reproduksi bug sudah tersedia.',
      budget: 1800000,
      deadline: 10,
      location: 'Remote',
      skills: ['Flutter', 'Firebase'],
      urgent: false,
    },
    {
      buyer: 'aditya@tolongin.com',
      cat: 'digital-marketing',
      title: 'Audit dan Optimasi Google Ads',
      desc: 'Audit campaign aktif selama 30 hari, perbaikan struktur ad group dan keyword negatif, serta laporan rekomendasi yang mudah dipahami tim internal.',
      budget: 950000,
      deadline: 7,
      location: 'Remote',
      skills: ['Google Ads', 'Analytics'],
      urgent: true,
    },
    {
      buyer: 'rina@tolongin.com',
      cat: 'pindahan',
      title: 'Pindahan Apartemen Studio Bandung',
      desc: 'Butuh bantuan packing dan angkut isi apartemen studio. Barang utama: meja kerja, kursi, 8 kardus, dan satu rak kecil. Lokasi asal dan tujuan masih dalam kota Bandung.',
      budget: 700000,
      deadline: 5,
      location: 'Bandung',
      skills: ['Packing', 'Logistik'],
      urgent: false,
    },
    {
      buyer: 'aditya@tolongin.com',
      cat: 'penulisan',
      title: 'Copywriting Email Onboarding SaaS',
      desc: 'Menulis rangkaian 7 email onboarding berbahasa Indonesia untuk produk SaaS B2B. Tone profesional dan hangat, dengan CTA yang jelas dan dua variasi subject line per email.',
      budget: 1100000,
      deadline: 9,
      location: 'Remote',
      skills: ['Copywriting', 'Email Marketing'],
      urgent: false,
    },
  ];

  for (const job of jobList) {
    const buyerId = userMap[job.buyer];
    const categoryId = catMap[job.cat];
    if (!buyerId || !categoryId) continue;

>>>>>>> ec26484 (implementasi demo)
    await prisma.job.create({
      data: {
        buyerId,
        categoryId,
<<<<<<< HEAD
        title: j.title,
        description: j.desc,
        budget: j.budget,
        budgetType: 'FIXED',
        deadline:
          j.deadlineDays >= 0
            ? future(j.deadlineDays)
            : past(Math.abs(j.deadlineDays)),
        location: j.location,
        isOnline: j.location === 'Remote',
        skills: JSON.stringify(j.skills),
        status: j.status || 'OPEN',
      },
    });
  }
  console.log(`\n✓ ${jobs.length} jobs`);

  // Orders (10 orders) - TIDAK BERUBAH
  const allServicesCreated = await prisma.service.findMany({ take: 10 });
  const orderSpecs = [
    {
      buyer: 'rina.buyer@tolongin.com',
      seller: 'citra@tolongin.com',
      svcIdx: 0,
=======
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
>>>>>>> ec26484 (implementasi demo)
      status: 'COMPLETED',
      daysAgo: 30,
    },
    {
<<<<<<< HEAD
      buyer: 'rina.buyer@tolongin.com',
      seller: 'andi@tolongin.com',
      svcIdx: 3,
=======
      buyer: 'aditya@tolongin.com',
      seller: 'sari@tolongin.com',
>>>>>>> ec26484 (implementasi demo)
      status: 'COMPLETED',
      daysAgo: 21,
    },
    {
      buyer: 'aditya@tolongin.com',
<<<<<<< HEAD
<<<<<<< HEAD
      seller: 'sari@tolongin.com',
      svcIdx: 7,
      status: 'COMPLETED',
      daysAgo: 14,
    },
    {
      buyer: 'aditya@tolongin.com',
      seller: 'maya.videografi@tolongin.com',
      svcIdx: 12,
      status: 'IN_REVIEW',
      daysAgo: 5,
    },
    {
      buyer: 'buyer@tolongin.com',
      seller: 'irawan@tolongin.com',
      svcIdx: 15,
      status: 'IN_PROGRESS',
=======
=======
>>>>>>> ec26484 (implementasi demo)
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
<<<<<<< HEAD
>>>>>>> 961a4cc (Update: Menyinkronkan perubahan lokal dengan repositori remote)
      daysAgo: 3,
    },
    {
      buyer: 'rina.buyer@tolongin.com',
      seller: 'budi.teknik@tolongin.com',
      svcIdx: 18,
      status: 'ACCEPTED',
      daysAgo: 1,
    },
    {
      buyer: 'aditya@tolongin.com',
      seller: 'citra@tolongin.com',
      svcIdx: 1,
      status: 'WAITING_CONFIRMATION',
      daysAgo: 0,
    },
    {
      buyer: 'buyer@tolongin.com',
      seller: 'andi@tolongin.com',
      svcIdx: 4,
      status: 'CANCELLED',
      daysAgo: 7,
    },
    {
      buyer: 'rina.buyer@tolongin.com',
      seller: 'sari@tolongin.com',
      svcIdx: 8,
      status: 'COMPLETED',
      daysAgo: 45,
    },
    {
      buyer: 'aditya@tolongin.com',
      seller: 'irawan@tolongin.com',
      svcIdx: 16,
      status: 'COMPLETED',
      daysAgo: 60,
    },
  ];

  const createdOrders: any[] = [];
  for (const o of orderSpecs) {
    const buyerId = userMap[o.buyer];
    const sellerId = userMap[o.seller];
    const svc =
      allServicesCreated[o.svcIdx] ||
      (await prisma.service.findFirst({ where: { sellerId } }));
    if (!buyerId || !sellerId || !svc) continue;
    const amount = svc.price;
    const fee = Math.round(amount * 0.05);
    const total = amount + fee;
    const createdAt = past(o.daysAgo);
    const order = await prisma.order.create({
      data: {
        buyerId,
        sellerId,
        serviceId: svc.id,
        title: svc.title,
        amount,
        fee,
        totalAmount: total,
<<<<<<< HEAD
        status: o.status,
        deliveryType: 'DIGITAL',
        deadline: future(7),
        completedAt: o.status === 'COMPLETED' ? past(o.daysAgo - 2) : null,
        cancelledAt: o.status === 'CANCELLED' ? past(o.daysAgo - 1) : null,
        cancellationReason:
          o.status === 'CANCELLED' ? 'Buyer membatalkan pesanan' : null,
=======
=======
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
>>>>>>> ec26484 (implementasi demo)
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
<<<<<<< HEAD
>>>>>>> 961a4cc (Update: Menyinkronkan perubahan lokal dengan repositori remote)
        timeline: JSON.stringify([
          { status: 'WAITING_CONFIRMATION', at: createdAt },
=======
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
  // REVIEW HISTORY (real relational data, not display-only counters)
  // ============================================================
  console.log('⭐ Creating realistic review history...');
  const reviewBuyers = [
    userMap['rina@tolongin.com'],
    userMap['aditya@tolongin.com'],
    userMap['buyer@tolongin.com'],
  ].filter(Boolean);
  const reviewComments = [
    'Hasilnya rapi dan sesuai brief. Komunikasinya juga enak, revisi kecil langsung dikerjakan.',
    'Pengerjaan tepat waktu dan detail yang diberikan sangat membantu. Recommended.',
    'Respons cepat, prosesnya transparan, dan hasil akhir lebih bagus dari ekspektasi saya.',
    'Secara keseluruhan memuaskan. Ada sedikit penyesuaian di awal, tetapi hasil akhirnya bagus.',
    'Profesional dan mudah diajak diskusi. Saya kemungkinan besar akan pesan lagi.',
    'Brief dipahami dengan baik dan file akhir tersusun rapi. Terima kasih!',
    'Kualitas pekerjaan konsisten dan update progresnya jelas dari awal sampai selesai.',
    'Pelayanannya ramah, cepat, dan solutif ketika ada perubahan kebutuhan.',
    'Hasil sesuai contoh yang disepakati. Proses revisinya juga tidak berbelit-belit.',
    'Sangat membantu untuk deadline yang cukup ketat. Pekerjaan selesai tanpa mengorbankan kualitas.',
  ];
  const ratingPattern = [5, 5, 4, 5, 5, 4, 5, 5, 5, 4];
  let seededReviewCount = 0;

  for (let i = 0; i < 100; i += 1) {
    const service = allServices[i % allServices.length];
    const buyerId = reviewBuyers[i % reviewBuyers.length];
    if (!service || !buyerId || buyerId === service.sellerId) continue;
    const rating = ratingPattern[i % ratingPattern.length];
    const createdAt = past(7 + (i % 120));
    const amount = service.price;
    const fee = Math.round(amount * 0.05);
    const order = await prisma.order.create({
      data: {
        buyerId,
        sellerId: service.sellerId,
        serviceId: service.id,
        title: service.title,
        amount,
        fee,
        totalAmount: amount + fee,
        status: 'COMPLETED',
        escrowStatus: 'RELEASED',
        deliveryType: 'DIGITAL',
        completedAt: createdAt,
        fundsReleasedAt: createdAt,
        workApprovedAt: createdAt,
        timeline: JSON.stringify([
          { status: 'COMPLETED', at: createdAt.toISOString(), by: buyerId },
>>>>>>> ec26484 (implementasi demo)
        ]),
        createdAt,
      },
    });
<<<<<<< HEAD
    createdOrders.push({ order, status: o.status });
  }
  console.log(`✓ ${createdOrders.length} orders`);

  // Reviews
  const reviewComments = [
    'Hasilnya sangat memuaskan! Seller profesional!',
    'Tepat waktu, kualitas bagus! Akan order lagi!',
    'Sesuai deskripsi, komunikasi lancar! Makasih!',
    'Luar biasa! Melebihi ekspektasi! 5 bintang!',
    'Worth it banget dengan kualitas yang diberikan!',
  ];

  let rIdx = 0;
  for (const c of createdOrders) {
    if (c.status !== 'COMPLETED') continue;
    const rating = [5, 5, 4, 5, 5][rIdx % 5];
    await prisma.review.create({
      data: {
        orderId: c.order.id,
        reviewerId: c.order.buyerId,
        revieweeId: c.order.sellerId,
        serviceId: c.order.serviceId,
        rating,
        comment: reviewComments[rIdx % reviewComments.length],
        reply: rIdx % 3 === 0 ? 'Terima kasih review positifnya!' : null,
        replyAt: rIdx % 3 === 0 ? past(1) : null,
      },
    });
    rIdx++;
  }
  console.log(`✓ ${rIdx} reviews`);

  // Sample conversation
  const andiId = userMap['andi@tolongin.com'];
  const sariId = userMap['sari@tolongin.com'];
  if (andiId && sariId) {
    const conv = await prisma.conversation.create({
      data: {
        participants: JSON.stringify([andiId, sariId]),
        lastMessage: 'Baik, saya tunggu ya.',
        lastMessageAt: new Date(),
      },
    });
    await prisma.message.createMany({
      data: [
        {
          conversationId: conv.id,
          senderId: andiId,
          content: 'Halo Sari, tertarik jasa artikel SEO.',
          createdAt: past(1),
        },
        {
          conversationId: conv.id,
          senderId: sariId,
          content: 'Hai! Bisa kirim briefnya?',
          createdAt: past(1),
        },
        {
          conversationId: conv.id,
          senderId: andiId,
          content: 'Baik, saya tunggu ya.',
          createdAt: new Date(),
        },
      ],
    });
    console.log('✓ sample conversation');
  }

  // Platform settings
  const settings = [
    { key: 'platform_fee_percent', value: '5' },
    { key: 'min_withdrawal', value: '50000' },
    { key: 'bidding_min_percent', value: '0.5' },
    { key: 'bidding_max_percent', value: '1.5' },
    { key: 'support_email', value: 'support@tolongin.com' },
    { key: 'maintenance_mode', value: 'false' },
  ];
  for (const s of settings) {
    await prisma.platformSetting.upsert({
      where: { key: s.key },
      update: s,
      create: s,
    });
  }
  console.log('✓ platform settings');

<<<<<<< HEAD
  console.log('\n✅ SEED COMPLETE!');
  console.log('   ═══════════════════════════════════════════════════');
  console.log('   🔑 LOGIN CREDENTIALS:');
  console.log('   ═══════════════════════════════════════════════════');
  console.log('   Admin:   admin@tolongin.com / Admin@123');
  console.log('   Seller:  seller@tolongin.com / Seller@123');
  console.log('   Buyer:   buyer@tolongin.com / Buyer@123');
  console.log('   ═══════════════════════════════════════════════════');
  console.log('   ✅ 3 service yang DIGANTI judulnya:');
  console.log('      1. Jasa Service AC Profesional - Cuci & Isi Freon');
  console.log('      2. Jasa Service Kulkas 1 Pintu - Datang ke Rumah');
  console.log('      3. Jasa Pasang AC Baru - Free Konsultasi');
  console.log('      4. Jasa Copywriting Professional untuk Deskripsi Produk');
  console.log('   🎯 Semua gambar akan muncul karena keyword sudah generik!');
=======
=======
    await prisma.review.create({
      data: {
        orderId: order.id,
        reviewerId: buyerId,
        revieweeId: service.sellerId,
        serviceId: service.id,
        rating,
        comment: reviewComments[i % reviewComments.length],
        reviewType: 'BUYER_TO_SELLER',
        helpfulCount: i % 9,
        createdAt,
      },
    });
    seededReviewCount += 1;

    if (i % 2 === 0) {
      await prisma.review.create({
        data: {
          orderId: order.id,
          reviewerId: service.sellerId,
          revieweeId: buyerId,
          rating: ratingPattern[(i + 2) % ratingPattern.length],
          comment: 'Klien responsif dan pembayaran lancar. Senang bekerja sama.',
          reviewType: 'SELLER_TO_BUYER',
          helpfulCount: i % 5,
          createdAt,
        },
      });
      seededReviewCount += 1;
    }
  }

  for (const service of allServices) {
    const aggregate = await prisma.review.aggregate({
      where: { serviceId: service.id },
      _avg: { rating: true },
      _count: true,
    });
    await prisma.service.update({
      where: { id: service.id },
      data: {
        rating: aggregate._avg.rating || 0,
        reviewCount: aggregate._count,
      },
    });
  }
  for (const sellerId of [...new Set(allServices.map((s) => s.sellerId))]) {
    const aggregate = await prisma.review.aggregate({
      where: { revieweeId: sellerId },
      _avg: { rating: true },
      _count: true,
    });
    await prisma.user.update({
      where: { id: sellerId },
      data: {
        rating: aggregate._avg.rating || 0,
        reviewCount: aggregate._count,
      },
    });
  }
  console.log(`✅ ${seededReviewCount} reviews with completed orders created\n`);

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

>>>>>>> ec26484 (implementasi demo)
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
<<<<<<< HEAD

  console.log('\n🔑 LOGIN CREDENTIALS:');
  console.log('═'.repeat(40));
  console.log('   📧 Admin:  admin@tolongin.com / Admin@123');
  console.log('   📧 Seller: seller@tolongin.com / Seller@123');
  console.log('   📧 Buyer:  buyer@tolongin.com / Buyer@123');
  console.log('   📧 Top:    citra@tolongin.com / Seller@123');
  console.log('   📧 Top:    andi@tolongin.com / Seller@123');
=======
  console.log(`   ⭐ Reviews: ${seededReviewCount}`);

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
>>>>>>> ec26484 (implementasi demo)
  console.log('═'.repeat(40));

  console.log('\n🖼️ IMAGES:');
  console.log('   ✅ Service images use a deterministic curated catalog');
  console.log('   ✅ 100% reliable, no broken images');

  console.log('\n' + '═'.repeat(60) + '\n');
<<<<<<< HEAD
>>>>>>> 961a4cc (Update: Menyinkronkan perubahan lokal dengan repositori remote)
=======
>>>>>>> ec26484 (implementasi demo)
}

main()
  .catch((e) => {
<<<<<<< HEAD
    console.error(e);
=======
    console.error('\n❌ SEED ERROR:', e);
>>>>>>> ec26484 (implementasi demo)
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
