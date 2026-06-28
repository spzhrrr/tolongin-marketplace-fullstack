import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ReviewsRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(data: Prisma.ReviewCreateInput) {
    return this.prisma.review.create({ data });
  }
  findById(id: string) {
    return this.prisma.review.findUnique({ where: { id } });
  }
  findByOrder(orderId: string) {
<<<<<<< HEAD
    return this.prisma.review.findMany({ where: { orderId } });
=======
    return this.prisma.review.findMany({
      where: { orderId },
      include: {
        reviewer: { select: { id: true, name: true, avatar: true } },
        reviewee: { select: { id: true, name: true, avatar: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }
  // Cari review berdasarkan order DAN reviewer (untuk cek duplikasi per pihak)
  findByOrderAndReviewer(orderId: string, reviewerId: string) {
    return this.prisma.review.findFirst({ where: { orderId, reviewerId } });
  }
  // Ambil semua review yang DITERIMA seorang user (sebagai penjual maupun pembeli)
  findByReviewee(revieweeId: string) {
    return this.prisma.review.findMany({
      where: { revieweeId },
      include: { reviewer: { select: { id: true, name: true, avatar: true } } },
      orderBy: { createdAt: 'desc' },
    });
>>>>>>> ec26484 (implementasi demo)
  }
  findBySeller(sellerId: string) {
    return this.prisma.review.findMany({
      where: { revieweeId: sellerId },
      include: { reviewer: { select: { id: true, name: true, avatar: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }
  findByService(serviceId: string) {
    return this.prisma.review.findMany({
      where: { serviceId },
      include: { reviewer: { select: { id: true, name: true, avatar: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }
  update(id: string, data: Prisma.ReviewUpdateInput) {
    return this.prisma.review.update({ where: { id }, data });
  }
  delete(id: string) {
    return this.prisma.review.delete({ where: { id } });
  }
  aggregateSellerRating(sellerId: string) {
<<<<<<< HEAD
    return this.prisma.review.aggregate({
      where: { revieweeId: sellerId },
=======
    // Penting: rating yang ditampilkan untuk seorang penjual hanya dihitung
    // dari ulasan pembeli→penjual (BUYER_TO_SELLER). Sebaliknya untuk pembeli
    // dihitung dari SELLER_TO_BUYER. Pakai helper umum di bawah.
    return this.prisma.review.aggregate({
      where: { revieweeId: sellerId, reviewType: 'BUYER_TO_SELLER' },
      _avg: { rating: true },
      _count: true,
    });
  }

  aggregateBuyerRating(buyerId: string) {
    return this.prisma.review.aggregate({
      where: { revieweeId: buyerId, reviewType: 'SELLER_TO_BUYER' },
>>>>>>> ec26484 (implementasi demo)
      _avg: { rating: true },
      _count: true,
    });
  }
}
