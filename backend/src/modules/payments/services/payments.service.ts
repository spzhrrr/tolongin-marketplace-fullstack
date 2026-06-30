import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
  UnauthorizedException,
  ServiceUnavailableException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { timingSafeEqual } from 'crypto';
import { PaymentsRepository } from '../repositories/payments.repository';
import { OrdersRepository } from '../../orders/repositories/orders.repository';
import { NotificationsService } from '../../notifications/services/notifications.service';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreatePaymentDto } from '../dto/payment.dto';
import {
  PAYMENT_STATUS,
  ORDER_STATUS,
  PAYMENT_METHOD_VALUES,
} from '../../../common/constants/enums';
import { parseJsonField, stringifyJsonField } from '../../../common/utils/helpers';
import { DemoFlowService } from '../../simulation/demo-flow.service';

@Injectable()
export class PaymentsService {
  constructor(
    private readonly repo: PaymentsRepository,
    private readonly ordersRepo: OrdersRepository,
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
    private readonly notifications: NotificationsService,
    @Inject(forwardRef(() => DemoFlowService))
    private readonly demoFlow: DemoFlowService,
  ) {}

  async create(userId: string, dto: CreatePaymentDto) {
    const order = await this.ordersRepo.findById(dto.orderId);
    if (!order) throw new NotFoundException('Order not found');
    if (order.buyerId !== userId) throw new ForbiddenException();
    if (order.status !== ORDER_STATUS.ACCEPTED) {
      throw new BadRequestException(
        'Pesanan belum siap dibayar. Tunggu konfirmasi penjual terlebih dahulu.',
      );
    }

    const existing = await this.prisma.payment.findFirst({
      where: {
        orderId: order.id,
        status: { in: [PAYMENT_STATUS.PENDING, PAYMENT_STATUS.COMPLETED] },
      },
      orderBy: { createdAt: 'desc' },
    });
    if (existing) return existing;

    const payment = await this.repo.create({
      order: { connect: { id: order.id } },
      user: { connect: { id: userId } },
      amount: order.amount,
      fee: order.fee,
      totalAmount: order.totalAmount,
      method: dto.method,
      status: PAYMENT_STATUS.PENDING,
      transactionId: 'DEMO-' + Date.now(),
      paymentUrl: null,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });

    await this.notifications
      .notify(
        userId,
        'PAYMENT',
        '💳 Menunggu Pembayaran',
        `Pembayaran untuk "${order.title}" siap diproses. Selesaikan pembayaran untuk melanjutkan.`,
        { orderId: order.id, paymentId: payment.id, event: 'PAYMENT_PENDING' },
        `/orders/${order.id}`,
      )
      .catch(() => undefined);

    return payment;
  }

  async checkStatus(id: string, userId: string) {
    const p = await this.repo.findById(id);
    if (!p) throw new NotFoundException();
    if (p.userId !== userId) throw new ForbiddenException();
    return { id: p.id, status: p.status, paidAt: p.paidAt };
  }

  history(userId: string) {
    return this.repo.findByUser(userId);
  }

  getMethods() {
    return PAYMENT_METHOD_VALUES.map((m) => ({
      code: m,
      name: m.replaceAll('_', ' '),
    }));
  }

  async confirmDemo(userId: string, orderId: string) {
    const order = await this.prisma.order.findUnique({ where: { id: orderId } });
    if (!order) throw new NotFoundException('Order not found');
    if (order.buyerId !== userId) throw new ForbiddenException();

    let payment = await this.prisma.payment.findFirst({
      where: { orderId },
      orderBy: { createdAt: 'desc' },
    });
    if (!payment) {
      payment = await this.prisma.payment.create({
        data: {
          orderId,
          userId,
          amount: order.amount,
          fee: order.fee,
          totalAmount: order.totalAmount,
          method: 'BANK_TRANSFER',
          status: PAYMENT_STATUS.PENDING,
          transactionId: 'DEMO-' + Date.now(),
        },
      });
    }
    return this.settle(payment.id, 'demo');
  }

  private async settle(paymentId: string, provider: string) {
    const result = await this.prisma.$transaction(async (tx) => {
      const payment = await tx.payment.findUnique({ where: { id: paymentId } });
      if (!payment) throw new NotFoundException('Payment not found');
      const order = await tx.order.findUnique({ where: { id: payment.orderId } });
      if (!order) throw new NotFoundException('Order not found');

      if (order.status === ORDER_STATUS.PAID) {
        return { payment, order, changed: false };
      }
      if (order.status !== ORDER_STATUS.ACCEPTED) {
        throw new BadRequestException('Pesanan belum siap dibayar');
      }

      const paidAt = new Date();
      const timeline = parseJsonField<any[]>(order.timeline, []);
      timeline.push({
        status: ORDER_STATUS.PAID,
        at: paidAt.toISOString(),
        by: 'PAYMENT_PROVIDER',
        note: 'Pembayaran dikonfirmasi melalui ' + provider,
      });

      const updatedPayment = await tx.payment.update({
        where: { id: payment.id },
        data: { status: PAYMENT_STATUS.COMPLETED, paidAt },
      });
      const updatedOrder = await tx.order.update({
        where: { id: order.id },
        data: {
          status: ORDER_STATUS.PAID,
          escrowStatus: 'FUNDED',
          timeline: stringifyJsonField(timeline),
        },
      });
      return { payment: updatedPayment, order: updatedOrder, changed: true };
    });

    if (result.changed) {
      const orderUrl = '/orders/' + result.order.id;
      await this.notifications
        .notify(
          result.order.buyerId,
          'PAYMENT',
          '💳 Pembayaran Berhasil',
          `Pembayaran berhasil! Dana ${result.order.totalAmount.toLocaleString('id-ID')} masuk escrow untuk "${result.order.title}".`,
          { orderId: result.order.id, event: 'PAYMENT_SUCCESS' },
          orderUrl,
        )
        .catch(() => undefined);
      await this.notifications
        .notify(
          result.order.sellerId,
          'PAYMENT',
          '💳 Pembayaran Dikonfirmasi',
          `Pembayaran telah dikonfirmasi! Silakan mulai mengerjakan pesanan "${result.order.title}".`,
          { orderId: result.order.id, event: 'ORDER_PAID' },
          orderUrl,
        )
        .catch(() => undefined);
      this.demoFlow.onPaymentCompleted(result.order.id);
    }
    return {
      ok: true,
      paymentId: result.payment.id,
      status: result.order.status,
      escrowStatus: result.order.escrowStatus,
    };
  }

  async webhook(provider: string, body: any, providedSecret?: string) {
    const expected = this.config.get<string>('PAYMENT_WEBHOOK_SECRET');
    if (!expected) {
      throw new ServiceUnavailableException(
        'PAYMENT_WEBHOOK_SECRET is not configured',
      );
    }
    const supplied = providedSecret || '';
    const a = Buffer.from(expected);
    const b = Buffer.from(supplied);
    if (a.length !== b.length || !timingSafeEqual(a, b)) {
      throw new UnauthorizedException('Invalid webhook signature');
    }

    const txId = body?.transactionId || body?.order_id;
    if (!txId) throw new BadRequestException('Missing transaction id');
    const payment = await this.repo.findByTransactionId(String(txId));
    if (!payment) throw new NotFoundException('Payment not found');

    const paid =
      body?.status === 'success' ||
      body?.transaction_status === 'settlement';
    if (!paid) return { ok: true, provider, ignored: true };
    return this.settle(payment.id, provider);
  }
}