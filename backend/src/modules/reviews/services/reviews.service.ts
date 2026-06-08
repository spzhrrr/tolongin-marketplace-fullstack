import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { ReviewsRepository } from '../repositories/reviews.repository';
import { OrdersRepository } from '../../orders/repositories/orders.repository';
import {
  CreateReviewDto,
  UpdateReviewDto,
  ReplyReviewDto,
} from '../dto/review.dto';
import {
  parseJsonField,
  stringifyJsonField,
} from '../../../common/utils/helpers';
import { ORDER_STATUS, ROLE } from '../../../common/constants/enums';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class ReviewsService {
  constructor(
    private readonly repo: ReviewsRepository,
    private readonly ordersRepo: OrdersRepository,
    private readonly prisma: PrismaService,
  ) {}

  private toDto(r: any) {
    return { ...r, images: parseJsonField<string[]>(r.images, []) };
  }

  async create(userId: string, dto: CreateReviewDto) {
    const order = await this.ordersRepo.findById(dto.orderId);
    if (!order) throw new NotFoundException('Order not found');
    if (order.buyerId !== userId)
      throw new ForbiddenException('Only buyer can review');
    if (order.status !== ORDER_STATUS.COMPLETED)
      throw new BadRequestException('Order must be completed');

    const existing = await this.repo.findByOrder(dto.orderId);
    if (existing.length > 0)
      throw new BadRequestException('Review already submitted');

    const created = await this.repo.create({
      order: { connect: { id: order.id } },
      reviewer: { connect: { id: userId } },
      reviewee: { connect: { id: order.sellerId } },
      service: order.serviceId
        ? { connect: { id: order.serviceId } }
        : undefined,
      rating: dto.rating,
      comment: dto.comment,
      images: stringifyJsonField(dto.images || []),
      isAnonymous: dto.isAnonymous || false,
    });

    // ✅ Update aggregates - rating/reviewCount untuk User
    const agg = await this.repo.aggregateSellerRating(order.sellerId);
    await this.prisma.user.update({
      where: { id: order.sellerId },
      data: {
        rating: agg._avg.rating || 0,
        reviewCount: agg._count,
      },
    });

    // ✅ UPDATE SERVICE RATING & REVIEWCOUNT
    if (order.serviceId) {
      const svcAgg = await this.prisma.review.aggregate({
        where: { serviceId: order.serviceId },
        _avg: { rating: true },
        _count: true,
      });
      await this.prisma.service.update({
        where: { id: order.serviceId },
        data: {
          rating: svcAgg._avg.rating || 0,
          reviewCount: svcAgg._count,
        },
      });
    }

    return this.toDto(created);
  }

  async getBySeller(sellerId: string) {
    const reviews = await this.repo.findBySeller(sellerId);
    return reviews.map((r) => this.toDto(r));
  }

  async getByService(serviceId: string) {
    const reviews = await this.repo.findByService(serviceId);
    return reviews.map((r) => this.toDto(r));
  }

  async update(id: string, userId: string, dto: UpdateReviewDto) {
    const r = await this.repo.findById(id);
    if (!r) throw new NotFoundException('Review not found');
    if (r.reviewerId !== userId)
      throw new ForbiddenException('You can only edit your own reviews');

    const updated = await this.repo.update(id, dto);

    // ✅ Update service rating jika ada perubahan rating
    if (r.serviceId && dto.rating !== undefined) {
      const svcAgg = await this.prisma.review.aggregate({
        where: { serviceId: r.serviceId },
        _avg: { rating: true },
        _count: true,
      });
      await this.prisma.service.update({
        where: { id: r.serviceId },
        data: {
          rating: svcAgg._avg.rating || 0,
          reviewCount: svcAgg._count,
        },
      });

      // Update seller rating juga
      const sellerAgg = await this.repo.aggregateSellerRating(r.revieweeId);
      await this.prisma.user.update({
        where: { id: r.revieweeId },
        data: {
          rating: sellerAgg._avg.rating || 0,
          reviewCount: sellerAgg._count,
        },
      });
    }

    return this.toDto(updated);
  }

  async delete(id: string, userId: string, role: string) {
    const r = await this.repo.findById(id);
    if (!r) throw new NotFoundException('Review not found');
    if (r.reviewerId !== userId && role !== ROLE.ADMIN)
      throw new ForbiddenException('You can only delete your own reviews');

    const serviceId = r.serviceId;
    const revieweeId = r.revieweeId;

    await this.repo.delete(id);

    // ✅ Update service rating setelah delete
    if (serviceId) {
      const svcAgg = await this.prisma.review.aggregate({
        where: { serviceId: serviceId },
        _avg: { rating: true },
        _count: true,
      });
      await this.prisma.service.update({
        where: { id: serviceId },
        data: {
          rating: svcAgg._avg.rating || 0,
          reviewCount: svcAgg._count,
        },
      });
    }

    // ✅ Update seller rating setelah delete
    if (revieweeId) {
      const sellerAgg = await this.repo.aggregateSellerRating(revieweeId);
      await this.prisma.user.update({
        where: { id: revieweeId },
        data: {
          rating: sellerAgg._avg.rating || 0,
          reviewCount: sellerAgg._count,
        },
      });
    }

    return { message: 'Review deleted' };
  }

  async reply(id: string, userId: string, dto: ReplyReviewDto) {
    const r = await this.repo.findById(id);
    if (!r) throw new NotFoundException('Review not found');
    if (r.revieweeId !== userId)
      throw new ForbiddenException('Only the reviewed seller can reply');

    const updated = await this.repo.update(id, {
      reply: dto.reply,
      replyAt: new Date(),
    });
    return this.toDto(updated);
  }

  async markHelpful(id: string) {
    const r = await this.repo.findById(id);
    if (!r) throw new NotFoundException('Review not found');

    const updated = await this.repo.update(id, {
      helpfulCount: { increment: 1 },
    });
    return this.toDto(updated);
  }
}
