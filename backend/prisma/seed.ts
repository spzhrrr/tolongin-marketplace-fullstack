import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();
const ROUNDS = 12;

const AVATAR = (key: string) => `https://i.pravatar.cc/200?u=${key}`;

// Fungsi untuk generate gambar yang relevan dengan kategori - DIPERBAIKI dengan lebih banyak pilihan
function getCategoryImage(
  category: string,
  title: string,
  index: number,
): string {
  // Mapping keyword ke gambar yang lebih relevan
  const keywordImages: Record<string, string[]> = {
    // Service & Reparasi
    kulkas: [
      'https://images.pexels.com/photos/6526/refrigerator-kitchen-fridge-appliance.jpg',
      'https://images.pexels.com/photos/209231/refrigerator-fridge-kitchen-appliance-209231.jpeg',
    ],
    'service kulkas': [
      'https://images.pexels.com/photos/6526/refrigerator-kitchen-fridge-appliance.jpg',
    ],
    ac: [
      'https://images.pexels.com/photos/1645110/pexels-photo-1645110.jpeg',
      'https://images.pexels.com/photos/2582874/pexels-photo-2582874.jpeg',
    ],
    'service ac': [
      'https://images.pexels.com/photos/2582874/pexels-photo-2582874.jpeg',
    ],

    // Video Editing
    'edit video': [
      'https://images.pexels.com/photos/257904/pexels-photo-257904.jpeg',
      'https://images.pexels.com/photos/2958865/pexels-photo-2958865.jpeg',
    ],
    youtube: [
      'https://images.pexels.com/photos/5081973/pexels-photo-5081973.jpeg',
    ],
    tiktok: [
      'https://images.pexels.com/photos/4050295/pexels-photo-4050295.jpeg',
    ],

    // Copywriting
    copywriting: [
      'https://images.pexels.com/photos/261763/pexels-photo-261763.jpeg',
      'https://images.pexels.com/photos/1451448/pexels-photo-1451448.jpeg',
    ],
    'deskripsi produk': [
      'https://images.pexels.com/photos/5632378/pexels-photo-5632378.jpeg',
    ],

    // Default per kategori
    'desain-grafis': [
      'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg',
      'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg',
      'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg',
    ],
    'web-development': [
      'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg',
      'https://images.pexels.com/photos/177598/pexels-photo-177598.jpeg',
      'https://images.pexels.com/photos/276452/pexels-photo-276452.jpeg',
    ],
    'mobile-development': [
      'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg',
      'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg',
    ],
    'data-entry': [
      'https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg',
      'https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg',
    ],
    penulisan: [
      'https://images.pexels.com/photos/261763/pexels-photo-261763.jpeg',
      'https://images.pexels.com/photos/1451448/pexels-photo-1451448.jpeg',
    ],
    'video-editing': [
      'https://images.pexels.com/photos/2958865/pexels-photo-2958865.jpeg',
      'https://images.pexels.com/photos/257904/pexels-photo-257904.jpeg',
      'https://images.pexels.com/photos/5081973/pexels-photo-5081973.jpeg',
    ],
    'digital-marketing': [
      'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg',
      'https://images.pexels.com/photos/2881215/pexels-photo-2881215.jpeg',
    ],
    'les-privat': [
      'https://images.pexels.com/photos/256417/pexels-photo-256417.jpeg',
      'https://images.pexels.com/photos/374788/pexels-photo-374788.jpeg',
    ],
    'service-reparasi': [
      'https://images.pexels.com/photos/1378720/pexels-photo-1378720.jpeg',
      'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg',
      'https://images.pexels.com/photos/2582874/pexels-photo-2582874.jpeg',
    ],
    pindahan: [
      'https://images.pexels.com/photos/1345386/pexels-photo-1345386.jpeg',
      'https://images.pexels.com/photos/15694/pexels-photo-15694.jpeg',
    ],
  };

  // Cek keyword spesifik di title
  const titleLower = title.toLowerCase();
  for (const [keyword, images] of Object.entries(keywordImages)) {
    if (titleLower.includes(keyword)) {
      return images[index % images.length];
    }
  }

  // Fallback ke gambar kategori
  const images = keywordImages[category] || [
    'https://images.pexels.com/photos/3182773/pexels-photo-3182773.jpeg',
    'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg',
  ];

  return images[index % images.length];
}

const dayMs = 24 * 3600 * 1000;
const future = (days: number) => new Date(Date.now() + days * dayMs);
const past = (days: number) => new Date(Date.now() - days * dayMs);

async function main() {
  console.log('🌱  Seeding Tolongin (realistic prices & images)...');

  // Clean transactional tables
  await prisma.review.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.message.deleteMany();
  await prisma.conversation.deleteMany();
  await prisma.application.deleteMany();
  await prisma.order.deleteMany();
  await prisma.favorite.deleteMany();
  await prisma.job.deleteMany();
  await prisma.service.deleteMany();

  // ---------- Users (12 users) ----------
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
      bio: 'Full-stack web developer 5+ tahun. Spesialis e-commerce & dashboard.',
      skills: JSON.stringify(['React', 'Node.js', 'Next.js', 'PostgreSQL']),
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
      bio: 'Content writer & social media manager. Klien: 50+ brand Indonesia.',
      skills: JSON.stringify(['Copywriting', 'SEO', 'Instagram Marketing']),
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
      bio: 'Graphic designer freelance. Logo, branding, packaging. ITB 2018.',
      skills: JSON.stringify(['Logo Design', 'Branding', 'Adobe Illustrator']),
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
      bio: 'Teknisi profesional. Service AC, kulkas, mesin cuci. Jakarta Timur.',
      skills: JSON.stringify(['Service AC', 'Service Kulkas', 'Mesin Cuci']),
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
      bio: 'Guru les privat matematika SD/SMP/SMA. Pengalaman 7 tahun, ITB.',
      skills: JSON.stringify(['Matematika', 'Fisika', 'Persiapan UTBK']),
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
      bio: 'Video editor & motion designer. TikTok, Reels, YouTube content.',
      skills: JSON.stringify([
        'Premiere Pro',
        'After Effects',
        'Motion Graphics',
      ]),
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
      bio: 'Owner brand fashion lokal. Lagi cari freelancer untuk konten brand.',
      emailVerified: true,
      phoneVerified: true,
      ktpVerified: false,
      rating: 0,
      reviewCount: 0,
      totalOrders: 8,
      completedOrders: 7,
    },
    {
      email: 'aditya@tolongin.com',
      password: hashBuyer,
      name: 'Aditya Wirawan',
      phone: '+6281755443322',
      avatar: AVATAR('aditya'),
      role: 'USER',
      bio: 'Founder startup edtech, butuh tim freelance lepas.',
      emailVerified: true,
      phoneVerified: true,
      ktpVerified: false,
      totalOrders: 4,
      completedOrders: 3,
    },
    {
      email: 'newbie@tolongin.com',
      password: hashUser,
      name: 'Budi Santoso',
      phone: '+6281211112222',
      role: 'USER',
      bio: 'Baru daftar, mau coba-coba dulu.',
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
      bio: 'Akun demo untuk tester (fully verified seller).',
      skills: JSON.stringify(['Demo Service', 'Testing']),
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
      bio: 'Akun demo untuk tester (verified buyer).',
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
  const verifiedBanks: Array<{ email: string; bank: string; no: string }> = [
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

  // ---------- Services (24 services + tambahan untuk mahasiswa) ----------
  const services = [
    // Desain Grafis (3 services)
    {
      sellerEmail: 'citra@tolongin.com',
      cat: 'desain-grafis',
      title: 'Desain Logo + Feed IG Aesthetic buat Jualan Online',
      desc: 'Cocok buat anak usaha! Logo keren + 5 template feed IG. Fast response, revisi 2x. Mulai dari 150rb aja!',
      price: 150_000,
      deliveryTime: 2,
      revisionCount: 2,
      rating: 4.9,
      reviewCount: 127,
      featured: true,
    },
    {
      sellerEmail: 'citra@tolongin.com',
      cat: 'desain-grafis',
      title: 'Edit Foto Produk buat Shopee/Tokopedia (10 foto)',
      desc: 'Biar produk lo keliatan premium! Background putih, color grading, resize. Dijamin jos!',
      price: 99_000,
      deliveryTime: 1,
      revisionCount: 2,
      rating: 4.8,
      reviewCount: 42,
    },
    {
      sellerEmail: 'citra@tolongin.com',
      cat: 'desain-grafis',
      title: 'Bikin Thumbnail YouTube Kekinian',
      desc: 'Thumbnail ala-ala creator gede! CTR boost guaranteed atau uang kembali (t&c berlaku)',
      price: 75_000,
      deliveryTime: 1,
      revisionCount: 2,
      rating: 4.9,
      reviewCount: 56,
    },

    // Web Development (4 services) - harga terjangkau untuk mahasiswa
    {
      sellerEmail: 'andi@tolongin.com',
      cat: 'web-development',
      title: 'Bikin Portfolio Website buat Fresh Graduate',
      desc: 'Biar dilirik HRD! Portfolio modern, responsive, hosting gratis 1 tahun. Mulai 500rb aja!',
      price: 500_000,
      deliveryTime: 5,
      revisionCount: 3,
      rating: 4.9,
      reviewCount: 22,
      featured: true,
    },
    {
      sellerEmail: 'andi@tolongin.com',
      cat: 'web-development',
      title: 'Landing Page buat Tugas Akhir / Skripsi',
      desc: 'Buat mahasiswa teknik yang butuh landing page buat project. Cepet, murah, dan rapi!',
      price: 350_000,
      deliveryTime: 3,
      revisionCount: 3,
      rating: 4.8,
      reviewCount: 14,
    },
    {
      sellerEmail: 'andi@tolongin.com',
      cat: 'web-development',
      title: 'Linktree Custom ala-ala (bikin keren)',
      desc: 'Ganti linktree standar lo jadi punya design sendiri. Biar IG lo makin aesthetic!',
      price: 50_000,
      deliveryTime: 1,
      revisionCount: 2,
      rating: 4.9,
      reviewCount: 28,
    },
    {
      sellerEmail: 'andi@tolongin.com',
      cat: 'web-development',
      title: 'Form Pendaftaran Online buat Event Kampus',
      desc: 'Bikin form online + export ke excel. Cocok buat BEM atau UKM yang mau ngadain event.',
      price: 250_000,
      deliveryTime: 2,
      revisionCount: 2,
      rating: 4.8,
      reviewCount: 6,
    },

    // Mobile Development (1 service)
    {
      sellerEmail: 'andi@tolongin.com',
      cat: 'mobile-development',
      title: 'Aplikasi Absensi Digital buat Kos-kosan',
      desc: 'Buat yang punya kosan atau butuh absensi anak magang. Simple dan gak ribet!',
      price: 1_500_000,
      deliveryTime: 14,
      revisionCount: 2,
      rating: 4.6,
      reviewCount: 4,
    },

    // Penulisan (3 services)
    {
      sellerEmail: 'sari@tolongin.com',
      cat: 'penulisan',
      title: 'Joki Tugas Essay / Makalah (1.000 kata)',
      desc: 'Buat mahasiswa yang kepepet deadline! Anti plagiasi, referensi jurnal. Aman dan rahasia!',
      price: 100_000,
      deliveryTime: 2,
      revisionCount: 2,
      rating: 4.9,
      reviewCount: 188,
      featured: true,
    },
    {
      sellerEmail: 'sari@tolongin.com',
      cat: 'penulisan',
      title: 'Copywriting Deskripsi Produk Shopee (10 produk)',
      desc: 'Biar produk lo laris manis! Deskripsi yang bikin orang auto checkout.',
      price: 120_000,
      deliveryTime: 2,
      revisionCount: 2,
      rating: 4.9,
      reviewCount: 75,
    },
    {
      sellerEmail: 'sari@tolongin.com',
      cat: 'penulisan',
      title: 'Nerjemahin Abstrak / Jurnal Inggris-Indonesia',
      desc: 'Cocok buat mahasiswa yang butuh terjemahan abstrak skripsi. Cepet dan akurat!',
      price: 80_000,
      deliveryTime: 1,
      revisionCount: 1,
      rating: 4.8,
      reviewCount: 41,
    },

    // Digital Marketing (2 services)
    {
      sellerEmail: 'sari@tolongin.com',
      cat: 'digital-marketing',
      title: 'Bantu Naikin Followers IG Organik (500 followers)',
      desc: 'Followers real Indonesia! Bukan bots. Perlahan tapi pasti, aman dari shadowban.',
      price: 250_000,
      deliveryTime: 7,
      revisionCount: 1,
      rating: 4.7,
      reviewCount: 16,
    },
    {
      sellerEmail: 'sari@tolongin.com',
      cat: 'digital-marketing',
      title: 'Setup Iklan Instagram buat Bisnis Cemilan Rumahan',
      desc: 'Biar usaha brownies/camilan lo dikenal banyak orang. Budget iklan bisa kecil!',
      price: 350_000,
      deliveryTime: 3,
      revisionCount: 2,
      rating: 4.6,
      reviewCount: 9,
    },

    // Video Editing (3 services)
    {
      sellerEmail: 'maya.videografi@tolongin.com',
      cat: 'video-editing',
      title: 'Edit Video TikTok 30 Detik (ala-ala viral)',
      desc: 'Biar FYP! Edit pakai efek viral, music sync, caption kekinian. Dijamin auto repeat!',
      price: 75_000,
      deliveryTime: 1,
      revisionCount: 2,
      rating: 4.9,
      reviewCount: 39,
      featured: true,
    },
    {
      sellerEmail: 'maya.videografi@tolongin.com',
      cat: 'video-editing',
      title: 'Edit Video YouTube Vlog / Podcast',
      desc: 'Buat lo yang mau mulai jadi content creator. Edit rapih + thumbnail keren!',
      price: 200_000,
      deliveryTime: 3,
      revisionCount: 2,
      rating: 4.8,
      reviewCount: 27,
    },
    {
      sellerEmail: 'maya.videografi@tolongin.com',
      cat: 'video-editing',
      title: 'Bikin Video Kinemaster untuk Tugas Kampus',
      desc: 'Buat mahasiswa yang disuruh buat video proyek. Tinggal kasih materi, beres!',
      price: 50_000,
      deliveryTime: 1,
      revisionCount: 2,
      rating: 4.7,
      reviewCount: 16,
    },

    // Les Privat (3 services)
    {
      sellerEmail: 'irawan@tolongin.com',
      cat: 'les-privat',
      title: 'Les Online Matematika 1 Jam (sd/smp/sma)',
      desc: 'Buat lo yang bingung sama matematika. Santai, sabar, nggak bikin stres!',
      price: 50_000,
      deliveryTime: 1,
      revisionCount: 1,
      rating: 5.0,
      reviewCount: 89,
      featured: true,
    },
    {
      sellerEmail: 'irawan@tolongin.com',
      cat: 'les-privat',
      title: 'Bimbingan Ngerjain PR / Tugas Matematika',
      desc: 'Cocok buat anak sekolah / mahasiswa yang kepepet PR. Langsung dibantu!',
      price: 40_000,
      deliveryTime: 1,
      revisionCount: 1,
      rating: 4.9,
      reviewCount: 53,
    },
    {
      sellerEmail: 'irawan@tolongin.com',
      cat: 'les-privat',
      title: 'Belajar Bahasa Inggris buat Pemula (1 jam)',
      desc: 'Buat lo yang mager belajar sendiri. Cara asik biar cepet bisa ngomong!',
      price: 60_000,
      deliveryTime: 1,
      revisionCount: 1,
      rating: 4.9,
      reviewCount: 47,
    },

    // Service & Reparasi (3 services) - dengan gambar yang sudah dipastikan
    {
      sellerEmail: 'budi.teknik@tolongin.com',
      cat: 'service-reparasi',
      title: 'Service AC Rumahan (Cuci + Isi Freon)',
      desc: 'AC lo panas? Di kita aja. Teknisi ramah, cepet, dan garansi 1 bulan!',
      price: 150_000,
      deliveryTime: 1,
      revisionCount: 1,
      rating: 4.8,
      reviewCount: 342,
      featured: true,
    },
    {
      sellerEmail: 'budi.teknik@tolongin.com',
      cat: 'service-reparasi',
      title: 'Service Kulkas 1 Pintu (Datang ke Rumah)',
      desc: 'Kulkas dingin sebelah? Atau bocor? Langsung dibenerin di tempat. Cepet dan rapi!',
      price: 120_000,
      deliveryTime: 1,
      revisionCount: 1,
      rating: 4.7,
      reviewCount: 128,
    },
    {
      sellerEmail: 'budi.teknik@tolongin.com',
      cat: 'service-reparasi',
      title: 'Pasang AC Baru + Bongkar Pasang (Jabodetabek)',
      desc: 'Pindahan rumah? Butuh pasang AC baru? Tim kita siap bantuin!',
      price: 200_000,
      deliveryTime: 1,
      revisionCount: 1,
      rating: 4.8,
      reviewCount: 78,
    },

    // Data Entry (2 services)
    {
      sellerEmail: 'seller@tolongin.com',
      cat: 'data-entry',
      title: 'Ngetik 500 Baris Data Excel (Cepet & Rapi)',
      desc: 'Buat lo yang males ngetik data dari foto/PDF ke excel. Tinggal kirim, saya kerjain!',
      price: 50_000,
      deliveryTime: 1,
      revisionCount: 1,
      rating: 4.5,
      reviewCount: 14,
    },
    {
      sellerEmail: 'seller@tolongin.com',
      cat: 'data-entry',
      title: 'Convert PDF ke Word / Excel (100 halaman)',
      desc: 'Biar gak repot ngetik ulang. Hasil rapi dan siap edit!',
      price: 75_000,
      deliveryTime: 1,
      revisionCount: 1,
      rating: 4.6,
      reviewCount: 22,
    },

    // Pindahan (1 service)
    {
      sellerEmail: 'seller@tolongin.com',
      cat: 'pindahan',
      title: 'Jasa Pindahan Kosan (Jakarta Area) + Packing',
      desc: 'Pindahan kosan/rumah? Tinggal santai, tim kita yang urus. Termasuk packing barang!',
      price: 500_000,
      deliveryTime: 1,
      revisionCount: 1,
      rating: 4.5,
      reviewCount: 31,
    },
  ];

  const serviceIds: string[] = [];
  for (let i = 0; i < services.length; i++) {
    const s = services[i];
    const sellerId = userMap[s.sellerEmail];
    const categoryId = catMap[s.cat];
    if (!sellerId || !categoryId) continue;

    const imageUrl = getCategoryImage(s.cat, s.title, i);

    const created = await prisma.service.create({
      data: {
        sellerId,
        categoryId,
        title: s.title,
        description: s.desc,
        price: s.price,
        deliveryTime: s.deliveryTime,
        revisionCount: s.revisionCount,
        images: JSON.stringify([imageUrl]),
        rating: s.rating,
        reviewCount: s.reviewCount,
        isFeatured: !!s.featured,
      },
    });
    serviceIds.push(created.id);
  }
  console.log(`✓ ${services.length} services with realistic prices`);

  // ... (lanjutan jobs, orders, reviews sama seperti sebelumnya)
  // Jobs (16 jobs)
  const jobs = [
    {
      buyerEmail: 'rina.buyer@tolongin.com',
      cat: 'desain-grafis',
      title: 'Bikin Logo buat Coffee Shop "Kopi Muda"',
      desc: 'Butuh logo yang kekinian, warna coklat+cream, vibe anak muda. Budget 300rb.',
      budget: 300_000,
      deadlineDays: 14,
      location: 'Jakarta',
      skills: ['Logo Design', 'Branding'],
    },
    {
      buyerEmail: 'rina.buyer@tolongin.com',
      cat: 'digital-marketing',
      title: 'Konten Instagram buat Brand Fashion "Local Threads"',
      desc: 'Mau naikin engagement. Butuh konten 1 bulan (30 post). Budget 1.5jt.',
      budget: 1_500_000,
      deadlineDays: 30,
      location: 'Remote',
      skills: ['Instagram', 'Konten Kreatif'],
    },
    {
      buyerEmail: 'aditya@tolongin.com',
      cat: 'web-development',
      title: 'Landing Page buat Startup Edukasi "BelajarYuk"',
      desc: 'Next.js + Tailwind, animasi smooth. Budget 2jt.',
      budget: 2_000_000,
      deadlineDays: 10,
      location: 'Remote',
      skills: ['Next.js', 'Tailwind'],
    },
    {
      buyerEmail: 'aditya@tolongin.com',
      cat: 'mobile-development',
      title: 'Aplikasi Absensi buat BEM (Flutter)',
      desc: 'Butuh aplikasi absensi event BEM. Sederhana aja, 3 screen. Budget 5jt.',
      budget: 5_000_000,
      deadlineDays: 30,
      location: 'Remote',
      skills: ['Flutter', 'Firebase'],
    },
    {
      buyerEmail: 'rina.buyer@tolongin.com',
      cat: 'penulisan',
      title: 'Cari Penulis Artikel Otomotif buat Website',
      desc: '5 artikel tentang mobil listrik & motor listrik. 1000 kata/artikel.',
      budget: 750_000,
      deadlineDays: 14,
      location: 'Remote',
      skills: ['SEO Writing', 'Otomotif'],
    },
    {
      buyerEmail: 'buyer@tolongin.com',
      cat: 'video-editing',
      title: 'Edit 3 Video TikTok buat Promo Produk',
      desc: 'Video 30 detik, music viral, caption lucu. Budget 300rb.',
      budget: 300_000,
      deadlineDays: 5,
      location: 'Remote',
      skills: ['Video Editing', 'TikTok'],
    },
    {
      buyerEmail: 'aditya@tolongin.com',
      cat: 'data-entry',
      title: 'Input Data 1000 Peserta Event ke Excel',
      desc: 'Data dari Google Forms, masukin ke excel. Budget 200rb.',
      budget: 200_000,
      deadlineDays: 3,
      location: 'Remote',
      skills: ['Data Entry', 'Excel'],
    },
    {
      buyerEmail: 'rina.buyer@tolongin.com',
      cat: 'desain-grafis',
      title: 'Desain Kemasan Skincare Brand Lokal',
      desc: 'Packaging skincare tema natural, warna pastel. Budget 1jt.',
      budget: 1_000_000,
      deadlineDays: 14,
      location: 'Remote',
      skills: ['Packaging Design', 'Branding'],
    },
    {
      buyerEmail: 'buyer@tolongin.com',
      cat: 'service-reparasi',
      title: 'Service AC Kantor (2 Unit) di Bekasi',
      desc: 'AC mati total, butuh dicepatin. Budget 250rb.',
      budget: 250_000,
      deadlineDays: 3,
      location: 'Bekasi',
      skills: ['Service AC'],
    },
    {
      buyerEmail: 'aditya@tolongin.com',
      cat: 'les-privat',
      title: 'Tutor Matematika Online buat Anak SD',
      desc: 'Butuh tutor buat anak kelas 5 SD, 3x seminggu.',
      budget: 600_000,
      deadlineDays: 30,
      location: 'Remote',
      skills: ['Matematika SD', 'Online Teaching'],
    },
    {
      buyerEmail: 'rina.buyer@tolongin.com',
      cat: 'digital-marketing',
      title: 'Optimasi Iklan Instagram buat Toko Online',
      desc: 'Setup iklan instagram + optimasi. Budget 800rb.',
      budget: 800_000,
      deadlineDays: 7,
      location: 'Remote',
      skills: ['Instagram Ads', 'Facebook Ads Manager'],
    },
    {
      buyerEmail: 'buyer@tolongin.com',
      cat: 'pindahan',
      title: 'Pindahan Apartemen Jaksel ke Tangerang',
      desc: '2 kamar + sofa. Budget 1jt.',
      budget: 1_000_000,
      deadlineDays: 5,
      location: 'Jakarta-Tangerang',
      skills: ['Pindahan', 'Packing'],
    },
    {
      buyerEmail: 'aditya@tolongin.com',
      cat: 'penulisan',
      title: 'Copywriting Landing Page Course "JagoBikinKonten"',
      desc: 'Copywriting yang ngejual! Budget 400rb.',
      budget: 400_000,
      deadlineDays: 4,
      location: 'Remote',
      skills: ['Copywriting', 'Sales Copy'],
    },
    {
      buyerEmail: 'rina.buyer@tolongin.com',
      cat: 'video-editing',
      title: '[URGENT] Edit Video Flash Sale 30 Detik',
      desc: 'Butuh edit video promosi, deadline besok! Budget 200rb.',
      budget: 200_000,
      deadlineDays: 1,
      location: 'Remote',
      skills: ['Video Editing', 'Fast Response'],
    },
    {
      buyerEmail: 'aditya@tolongin.com',
      cat: 'desain-grafis',
      title: '[URGENT] Banner Event 2 Hari Lagi',
      desc: 'Banner seminar, ukuran 5x2 meter. Butuh cepet! Budget 200rb.',
      budget: 200_000,
      deadlineDays: 2,
      location: 'Jakarta',
      skills: ['Banner Design', 'Print Ready'],
    },
    {
      buyerEmail: 'rina.buyer@tolongin.com',
      cat: 'web-development',
      title: '[CLOSED] Redesign Website Perusahaan',
      desc: 'Job sudah ditutup.',
      budget: 3_000_000,
      deadlineDays: -10,
      location: 'Remote',
      skills: ['Web Design', 'UI/UX'],
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
  console.log(`✓ ${jobs.length} jobs`);

  // Orders dan Reviews sama seperti sebelumnya (singkat)
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
      seller: 'sari@tolongin.com',
      svcIdx: 7,
      status: 'COMPLETED',
      daysAgo: 14,
    },
    {
      buyer: 'aditya@tolongin.com',
      seller: 'maya.videografi@tolongin.com',
      svcIdx: 11,
      status: 'IN_REVIEW',
      daysAgo: 5,
    },
    {
      buyer: 'buyer@tolongin.com',
      seller: 'irawan@tolongin.com',
      svcIdx: 14,
      status: 'IN_PROGRESS',
      daysAgo: 3,
    },
    {
      buyer: 'rina.buyer@tolongin.com',
      seller: 'budi.teknik@tolongin.com',
      svcIdx: 17,
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
      svcIdx: 15,
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
        status: o.status,
        deliveryType: 'DIGITAL',
        deadline: future(7),
        completedAt: o.status === 'COMPLETED' ? past(o.daysAgo - 2) : null,
        cancelledAt: o.status === 'CANCELLED' ? past(o.daysAgo - 1) : null,
        cancellationReason:
          o.status === 'CANCELLED' ? 'Buyer membatalkan pesanan' : null,
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
    'Hasilnya sangat memuaskan! Seller profesional dan responsif. Recommended!',
    'Tepat waktu, kualitas bagus. Akan order lagi kalau butuh jasa serupa.',
    'Sesuai dengan deskripsi, komunikasi lancar. Terima kasih kak!',
    'Luar biasa! Melebihi ekspektasi. Cepat dan rapi pengerjaannya.',
    'Harganya worth it dengan kualitas yang diberikan. 5 bintang!',
    'Makasih kak, anak saya jadi lebih paham matematika setelah les.',
    'AC jadi dingin lagi, teknisi ramah dan cepat. Puas banget!',
    'Desainnya keren dan sesuai brief. Revisi cepat, mantap!',
  ];

  let rIdx = 0;
  for (const c of createdOrders) {
    if (c.status !== 'COMPLETED') continue;
    const rating = [5, 5, 4, 5, 5, 4][rIdx % 6];
    await prisma.review.create({
      data: {
        orderId: c.order.id,
        reviewerId: c.order.buyerId,
        revieweeId: c.order.sellerId,
        serviceId: c.order.serviceId,
        rating,
        comment: reviewComments[rIdx % reviewComments.length],
        reply:
          rIdx % 3 === 0
            ? 'Terima kasih atas review positifnya! Senang bisa membantu.'
            : null,
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
          content:
            'Halo Sari, saya tertarik dengan jasa penulisan artikel SEO.',
          createdAt: past(1),
        },
        {
          conversationId: conv.id,
          senderId: sariId,
          content:
            'Hai Andi! Terima kasih minatnya. Bisa kirimkan brief artikelnya?',
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

  console.log('\n✅ Seed complete!');
  console.log('   ========================================');
  console.log('   🔑 LOGIN CREDENTIALS:');
  console.log('   ========================================');
  console.log('   Admin:   admin@tolongin.com / Admin@123');
  console.log('   Seller:  seller@tolongin.com / Seller@123');
  console.log('   Buyer:   buyer@tolongin.com / Buyer@123');
  console.log('   Andi:    andi@tolongin.com / User@123');
  console.log('   Sari:    sari@tolongin.com / User@123');
  console.log('   Citra:   citra@tolongin.com / Seller@123');
  console.log('   ========================================');
  console.log('   💰 Harga mulai dari Rp 40.000 - cocok buat mahasiswa!');
  console.log('   📸 Gambar sesuai konteks (kulkas, AC, video editing, dll)');
  console.log('   ⭐ Rating dan review sudah termasuk');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
