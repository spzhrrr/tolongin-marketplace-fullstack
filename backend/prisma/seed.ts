import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();
const ROUNDS = 12;

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
function getServiceImage(index: number): string {
  // Pilih gambar berdasarkan index untuk konsistensi (tetapi tetap bervariasi)
  const imageId = IMAGE_IDS[index % IMAGE_IDS.length];
  return `https://picsum.photos/id/${imageId}/600/400`;
>>>>>>> 961a4cc (Update: Menyinkronkan perubahan lokal dengan repositori remote)
}

const dayMs = 24 * 3600 * 1000;
const future = (days: number) => new Date(Date.now() + days * dayMs);
const past = (days: number) => new Date(Date.now() - days * dayMs);

async function main() {
  console.log('🌱  Seeding Tolongin...');

  // Clean tables
  await prisma.review.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.message.deleteMany();
  await prisma.conversation.deleteMany();
  await prisma.application.deleteMany();
  await prisma.order.deleteMany();
  await prisma.favorite.deleteMany();
  await prisma.job.deleteMany();
  await prisma.service.deleteMany();

  // ---------- Users ----------
  const hashAdmin = await bcrypt.hash('Admin@123', ROUNDS);
  const hashUser = await bcrypt.hash('User@123', ROUNDS);
  const hashSeller = await bcrypt.hash('Seller@123', ROUNDS);
  const hashBuyer = await bcrypt.hash('Buyer@123', ROUNDS);

  const baseUsers: Array<any> = [
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
    },
    {
      email: 'citra@tolongin.com',
      password: hashSeller,
      name: 'Citra Kirana',
      phone: '+6281211223344',
      avatar: AVATAR('citra'),
      role: 'USER',
      bio: 'Graphic designer freelance.',
      skills: JSON.stringify(['Logo Design']),
      emailVerified: true,
      phoneVerified: true,
      ktpVerified: true,
      verified: true,
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
      emailVerified: true,
      phoneVerified: true,
      ktpVerified: true,
      verified: true,
      rating: 4.8,
      reviewCount: 342,
      totalOrders: 360,
      completedOrders: 350,
      balance: 2_100_000,
    },
    {
      email: 'irawan@tolongin.com',
      password: hashSeller,
      name: 'Irawan Putra, S.Pd',
      phone: '+6285678901234',
      avatar: AVATAR('irawan'),
      role: 'USER',
      bio: 'Guru les privat matematika.',
      skills: JSON.stringify(['Matematika']),
      emailVerified: true,
      phoneVerified: true,
      ktpVerified: true,
      verified: true,
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
      emailVerified: true,
      phoneVerified: true,
      ktpVerified: true,
      verified: true,
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
    },
    {
      email: 'aditya@tolongin.com',
      password: hashBuyer,
      name: 'Aditya Wirawan',
      phone: '+6281755443322',
      avatar: AVATAR('aditya'),
      role: 'USER',
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
      emailVerified: true,
      phoneVerified: true,
      ktpVerified: true,
      verified: true,
      rating: 4.5,
      reviewCount: 10,
      totalOrders: 12,
      completedOrders: 10,
      balance: 500_000,
    },
    {
      email: 'buyer@tolongin.com',
      password: hashBuyer,
      name: 'Buyer Demo',
      phone: '+6281900900900',
      avatar: AVATAR('buyerdemo'),
      role: 'USER',
      bio: 'Akun demo untuk tester',
      emailVerified: true,
      phoneVerified: true,
      ktpVerified: false,
    },
  ];

  const userMap: Record<string, string> = {};
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
      featured: false,
    },
  ];

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

    await prisma.service.create({
      data: {
        sellerId,
        categoryId,
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
    await prisma.job.create({
      data: {
        buyerId,
        categoryId,
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
      status: 'COMPLETED',
      daysAgo: 30,
    },
    {
      buyer: 'rina.buyer@tolongin.com',
      seller: 'andi@tolongin.com',
      svcIdx: 3,
      status: 'COMPLETED',
      daysAgo: 21,
    },
    {
      buyer: 'aditya@tolongin.com',
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
>>>>>>> 961a4cc (Update: Menyinkronkan perubahan lokal dengan repositori remote)
        timeline: JSON.stringify([
          { status: 'WAITING_CONFIRMATION', at: createdAt },
        ]),
        createdAt,
      },
    });
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
  console.log('   📧 Admin:  admin@tolongin.com / Admin@123');
  console.log('   📧 Seller: seller@tolongin.com / Seller@123');
  console.log('   📧 Buyer:  buyer@tolongin.com / Buyer@123');
  console.log('   📧 Top:    citra@tolongin.com / Seller@123');
  console.log('   📧 Top:    andi@tolongin.com / Seller@123');
  console.log('═'.repeat(40));

  console.log('\n🖼️ IMAGES:');
  console.log('   ✅ Service images use a deterministic curated catalog');
  console.log('   ✅ 100% reliable, no broken images');

  console.log('\n' + '═'.repeat(60) + '\n');
>>>>>>> 961a4cc (Update: Menyinkronkan perubahan lokal dengan repositori remote)
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
