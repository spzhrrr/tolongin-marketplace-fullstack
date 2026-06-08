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
    return this.prisma.review.findMany({ where: { orderId } });
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
    return this.prisma.review.aggregate({
      where: { revieweeId: sellerId },
      _avg: { rating: true },
      _count: true,
    });
  }
}
