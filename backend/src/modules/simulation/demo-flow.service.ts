import {
  Injectable,
  Logger,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { NotificationsService } from '../notifications/services/notifications.service';
import { OrdersService } from '../orders/services/orders.service';
import { ApplicationsService } from '../applications/services/applications.service';
import { ReviewsService } from '../reviews/services/reviews.service';
import {
  ORDER_STATUS,
  JOB_STATUS,
  ROLE,
  PAYMENT_STATUS,
} from '../../common/constants/enums';
import {
  parseJsonField,
  stringifyJsonField,
} from '../../common/utils/helpers';

const WORK_PROOF_IMAGES = [
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
  'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80',
];

const SIMULATED_BUYER_ORDER_NOTE = 'Pesanan demo dibuat';

const RECIPROCAL_REVIEW_COMMENTS = [
  'Terima kasih! Pengalaman kerja sama yang menyenangkan.',
  'Profesional dan responsif. Puas dengan transaksi ini!',
  'Sangat direkomendasikan, komunikasi lancar dari awal hingga selesai.',
  'Kerja bagus, tepat waktu, dan mudah diajak kerja sama.',
];

/** Demo actors respond within 3–5 seconds. User actions stay manual. */
const DEMO_DELAY_MIN_MS = 3000;
const DEMO_DELAY_MAX_MS = 5000;

function demoFlowEnabled() {
  return (
    process.env.DEMO_AUTOMATION_ENABLED === 'true' ||
    process.env.NODE_ENV !== 'production'
  );
}

@Injectable()
export class DemoFlowService {
  private readonly logger = new Logger(DemoFlowService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly notifications: NotificationsService,
    @Inject(forwardRef(() => OrdersService))
    private readonly ordersService: OrdersService,
    @Inject(forwardRef(() => ApplicationsService))
    private readonly applicationsService: ApplicationsService,
    @Inject(forwardRef(() => ReviewsService))
    private readonly reviewsService: ReviewsService,
  ) {}

  private demoDelayMs() {
    return (
      DEMO_DELAY_MIN_MS +
      Math.floor(Math.random() * (DEMO_DELAY_MAX_MS - DEMO_DELAY_MIN_MS + 1))
    );
  }

  private scheduleDemo(task: () => Promise<void>, delayMs?: number) {
    const wait = delayMs ?? this.demoDelayMs();
    setTimeout(() => {
      task().catch((err) =>
        this.logger.warn(`Demo automation failed: ${err?.message || err}`),
      );
    }, wait);
  }

  private isSimulatedBuyerOrder(order: { timeline: string | null }) {
    const timeline = parseJsonField<any[]>(order.timeline, []);
    return timeline.some((t) =>
      String(t?.note || '').includes(SIMULATED_BUYER_ORDER_NOTE),
    );
  }

  private isSimulatedApplication(app: {
    simulationApplicationCreatedAt?: Date | null;
  }) {
    return Boolean(app?.simulationApplicationCreatedAt);
  }

  /** Sewa jasa: penjual auto-terima. Post jasa (pembeli demo): penjual terima manual. */
  onOrderCreated(orderId: string) {
    if (!demoFlowEnabled()) return;
    this.scheduleDemo(async () => {
      const order = await this.prisma.order.findUnique({
        where: { id: orderId },
      });
      if (!order || order.status !== ORDER_STATUS.WAITING_CONFIRMATION) return;
      if (this.isSimulatedBuyerOrder(order)) return;

      await this.autoSellerAcceptOrder(orderId);
    });
  }

  /** Lamar pekerjaan: pemilik lowongan auto-terima lamaran Anda. Post lowongan (pelamar demo): terima manual. */
  onApplicationCreated(applicationId: string) {
    if (!demoFlowEnabled()) return;
    this.scheduleDemo(async () => {
      const app = await this.prisma.application.findUnique({
        where: { id: applicationId },
        include: { job: true },
      });
      if (!app || app.status !== 'PENDING') return;
      if (this.isSimulatedApplication(app)) return;

      await this.applicationsService.accept(app.id, app.job.buyerId);
    });
  }

  onApplicationAccepted(orderId: string) {
    if (!demoFlowEnabled()) return;
    this.scheduleDemo(() => this.remindBuyerToPay(orderId), 1200);
    this.scheduleDemo(() => this.autoPayWhenOtherPartyIsBuyer(orderId));
  }

  onSellerAcceptedOrder(orderId: string) {
    if (!demoFlowEnabled()) return;
    this.scheduleDemo(() => this.remindBuyerToPay(orderId), 1200);
    this.scheduleDemo(() => this.autoPayWhenOtherPartyIsBuyer(orderId));
  }

  onJobCreated(jobId: string) {
    if (!demoFlowEnabled()) return;
    this.scheduleDemo(() => this.simulateApplicationForJob(jobId));
  }

  onServiceCreated(serviceId: string) {
    if (!demoFlowEnabled()) return;
    this.scheduleDemo(() => this.simulateOrderForService(serviceId));
  }

  /**
   * Pihak pembeli/pemilik auto-approve setelah Anda (penjual/freelancer) upload bukti:
   * - Post jasa → pembeli demo approve
   * - Lamar pekerjaan → pemilik lowongan approve
   */
  onWorkSubmitted(orderId: string) {
    if (!demoFlowEnabled()) return;
    this.scheduleDemo(async () => {
      const order = await this.prisma.order.findUnique({
        where: { id: orderId },
        include: { application: true },
      });
      if (!order || order.status !== ORDER_STATUS.WAITING_REVIEW) return;

      const buyerShouldAutoApprove =
        this.isSimulatedBuyerOrder(order) ||
        (Boolean(order.applicationId) &&
          order.application &&
          !this.isSimulatedApplication(order.application));

      if (!buyerShouldAutoApprove) return;

      await this.autoApproveDemoWork(orderId);
    });
  }

  /**
   * Pihak penjual/freelancer auto-upload bukti setelah Anda bayar:
   * - Sewa jasa / post lowongan → freelancer upload otomatis
   * - Post jasa / lamar pekerjaan → Anda upload manual
   */
  onPaymentCompleted(orderId: string) {
    if (!demoFlowEnabled()) return;
    this.scheduleDemo(async () => {
      const order = await this.prisma.order.findUnique({
        where: { id: orderId },
        include: { application: true },
      });
      if (!order || order.status !== ORDER_STATUS.PAID) return;

      if (this.isSimulatedBuyerOrder(order)) return;

      if (
        order.applicationId &&
        order.application &&
        !this.isSimulatedApplication(order.application)
      ) {
        return;
      }

      await this.submitDemoWork(orderId);
    });
  }

  onOrderCompleted(orderId: string) {
    if (!demoFlowEnabled()) return;
    this.scheduleDemo(() => this.promptReviewsAndCloseJob(orderId), 1500);
  }

  /** Setelah satu pihak mengirim ulasan, lawan transaksi otomatis membalas (demo). */
  onReviewSubmitted(orderId: string, reviewerId: string) {
    if (!demoFlowEnabled()) return;
    this.scheduleDemo(() => this.submitReciprocalReview(orderId, reviewerId));
  }

  onRevisionSubmitted(_orderId: string) {}

  private async autoSellerAcceptOrder(orderId: string) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      include: { seller: true },
    });
    if (!order || order.status !== ORDER_STATUS.WAITING_CONFIRMATION) return;

    await this.ordersService.sellerAcceptOrder(
      orderId,
      order.sellerId,
      ROLE.USER,
    );
  }

  /** Pembeli demo (post jasa) atau pemilik lowongan (lamar pekerjaan) bayar otomatis. */
  private async autoPayWhenOtherPartyIsBuyer(orderId: string) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      include: { application: true, buyer: true, seller: true },
    });
    if (!order || order.status !== ORDER_STATUS.ACCEPTED) return;

    const shouldAutoPay =
      this.isSimulatedBuyerOrder(order) ||
      (Boolean(order.applicationId) &&
        order.application &&
        !this.isSimulatedApplication(order.application));

    if (!shouldAutoPay) return;

    await this.runAutoPay(order);
  }

  private async runAutoPay(order: {
    id: string;
    buyerId: string;
    sellerId: string;
    amount: number;
    fee: number;
    totalAmount: number;
    timeline: string | null;
    title: string;
    buyer?: { name?: string | null };
    seller?: { name?: string | null };
  }) {
    await this.settleDemoPayment(order);

    await this.notifications.notify(
      order.buyerId,
      'PAYMENT',
      '💳 Pembayaran Berhasil',
      `Pembayaran ${this.formatIDR(order.totalAmount)} untuk "${order.title}" berhasil. Dana ditahan di escrow.`,
      { orderId: order.id, event: 'PAYMENT_SUCCESS' },
      `/orders/${order.id}`,
    );

    await this.notifications.notify(
      order.sellerId,
      'PAYMENT',
      '💳 Pembayaran Masuk Escrow',
      `Pembayaran diterima untuk "${order.title}". Silakan kerjakan dan upload bukti.`,
      { orderId: order.id, event: 'ORDER_PAID' },
      `/orders/${order.id}`,
    );

    this.onPaymentCompleted(order.id);
  }

  async submitDemoWork(orderId: string) {
    const order = await this.prisma.order.findUnique({ where: { id: orderId } });
    if (!order || order.status !== ORDER_STATUS.PAID) return;

    const img =
      WORK_PROOF_IMAGES[Math.floor(Math.random() * WORK_PROOF_IMAGES.length)];

    await this.ordersService.submitWork(orderId, order.sellerId, ROLE.USER, {
      note: 'Hasil pekerjaan telah selesai. Lampiran berisi bukti deliverable final.',
      attachments: [img],
    });
  }

  private async autoApproveDemoWork(orderId: string) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      include: { application: true },
    });
    if (!order || order.status !== ORDER_STATUS.WAITING_REVIEW) return;

    await this.ordersService.approveWork(orderId, order.buyerId, ROLE.USER, true);
  }

  private async promptReviewsAndCloseJob(orderId: string) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      include: { application: { include: { job: true } } },
    });
    if (!order) return;

    if (order.application?.jobId || order.jobId) {
      await this.prisma.job.update({
        where: { id: order.jobId || order.application!.jobId },
        data: { status: JOB_STATUS.FILLED },
      });
    }

    await this.notifications.notify(
      order.buyerId,
      'REVIEW',
      '⭐ Beri Ulasan',
      `Pesanan "${order.title}" selesai! Beri ulasan untuk penjual.`,
      { orderId: order.id },
      `/orders/${order.id}`,
    );
    await this.notifications.notify(
      order.sellerId,
      'REVIEW',
      '⭐ Beri Ulasan',
      `Pesanan "${order.title}" selesai! Beri ulasan untuk pembeli.`,
      { orderId: order.id },
      `/orders/${order.id}`,
    );
  }

  private async submitReciprocalReview(orderId: string, originalReviewerId: string) {
    const order = await this.prisma.order.findUnique({ where: { id: orderId } });
    if (!order || order.status !== ORDER_STATUS.COMPLETED) return;

    const counterpartId =
      order.buyerId === originalReviewerId ? order.sellerId : order.buyerId;

    const existing = await this.prisma.review.findFirst({
      where: { orderId, reviewerId: counterpartId },
    });
    if (existing) return;

    const rating = 4 + Math.floor(Math.random() * 2);
    const comment =
      RECIPROCAL_REVIEW_COMMENTS[
        Math.floor(Math.random() * RECIPROCAL_REVIEW_COMMENTS.length)
      ];

    await this.reviewsService.create(
      counterpartId,
      { orderId, rating, comment },
      { skipReciprocal: true },
    );
  }

  private formatIDR(amount: number) {
    return `Rp${amount.toLocaleString('id-ID')}`;
  }

  private async remindBuyerToPay(orderId: string) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      include: { buyer: true, seller: true },
    });
    if (!order || order.status !== ORDER_STATUS.ACCEPTED) return;

    await this.notifications.notify(
      order.buyerId,
      'PAYMENT',
      '💳 Lanjutkan Pembayaran',
      `Pesanan "${order.title}" siap dibayar ${this.formatIDR(order.totalAmount)}. Buka halaman pesanan, pilih metode, lalu konfirmasi — dana masuk escrow.`,
      {
        orderId: order.id,
        event: 'PAYMENT_REQUIRED',
        serviceId: order.serviceId || undefined,
      },
      `/orders/${order.id}`,
    );
  }

  private async settleDemoPayment(order: {
    id: string;
    buyerId: string;
    amount: number;
    fee: number;
    totalAmount: number;
    timeline: string | null;
  }) {
    const paidAt = new Date();
    const timeline = parseJsonField<any[]>(order.timeline, []);
    timeline.push({
      status: ORDER_STATUS.PAID,
      at: paidAt.toISOString(),
      by: 'DEMO_PAYMENT',
      note: 'Pembayaran demo dikonfirmasi otomatis',
    });

    await this.prisma.$transaction(async (tx) => {
      const existing = await tx.payment.findFirst({
        where: { orderId: order.id },
        orderBy: { createdAt: 'desc' },
      });
      if (existing) {
        await tx.payment.update({
          where: { id: existing.id },
          data: { status: PAYMENT_STATUS.COMPLETED, paidAt },
        });
      } else {
        await tx.payment.create({
          data: {
            orderId: order.id,
            userId: order.buyerId,
            amount: order.amount,
            fee: order.fee,
            totalAmount: order.totalAmount,
            method: 'BANK_TRANSFER',
            status: PAYMENT_STATUS.COMPLETED,
            transactionId: 'DEMO-' + Date.now(),
            paidAt,
          },
        });
      }
      await tx.order.update({
        where: { id: order.id },
        data: {
          status: ORDER_STATUS.PAID,
          escrowStatus: 'FUNDED',
          timeline: stringifyJsonField(timeline),
        },
      });
    });
  }

  private async simulateApplicationForJob(jobId: string) {
    const job = await this.prisma.job.findUnique({ where: { id: jobId } });
    if (!job || job.status !== JOB_STATUS.OPEN) return;

    const dummySeller = await this.prisma.user.findFirst({
      where: {
        id: { not: job.buyerId },
        role: 'USER',
        emailVerified: true,
        ktpVerified: true,
      },
    });
    if (!dummySeller) return;

    const existing = await this.prisma.application.findUnique({
      where: { jobId_sellerId: { jobId, sellerId: dummySeller.id } },
    });
    if (existing) return;

    const proposedPrice = Math.round(job.budget * 0.9);
    const application = await this.prisma.application.create({
      data: {
        jobId,
        sellerId: dummySeller.id,
        coverLetter: `Halo, saya tertarik dengan "${job.title}". Saya berpengalaman dan siap mulai segera dengan kualitas terbaik.`,
        proposedPrice,
        proposedDuration: 7,
        status: 'PENDING',
        simulationApplicationCreatedAt: new Date(),
      },
    });

    await this.prisma.job.update({
      where: { id: jobId },
      data: { applicationsCount: { increment: 1 } },
    });

    await this.notifications.notify(
      job.buyerId,
      'APPLICATION',
      '📩 Ada Lamaran Baru!',
      `Ada lamaran baru untuk pekerjaan Anda dari ${dummySeller.name}! Klik Terima untuk melanjutkan.`,
      { applicationId: application.id, jobId },
      `/jobs/${jobId}?tab=applications`,
    );

    await this.notifications.notify(
      dummySeller.id,
      'APPLICATION',
      '📩 Lamaran Terkirim',
      `Lamaran Anda berhasil dikirim untuk "${job.title}"!`,
      { applicationId: application.id, jobId },
      `/jobs/${jobId}`,
    );
  }

  private async simulateOrderForService(serviceId: string) {
    const service = await this.prisma.service.findUnique({
      where: { id: serviceId },
    });
    if (!service || !service.isActive) return;

    const dummyBuyer = await this.prisma.user.findFirst({
      where: {
        id: { not: service.sellerId },
        role: 'USER',
        emailVerified: true,
        ktpVerified: true,
      },
    });
    if (!dummyBuyer) return;

    const fee = Math.round(service.price * 0.05);
    const order = await this.prisma.order.create({
      data: {
        buyerId: dummyBuyer.id,
        sellerId: service.sellerId,
        serviceId: service.id,
        title: service.title,
        amount: service.price,
        fee,
        totalAmount: service.price + fee,
        status: ORDER_STATUS.WAITING_CONFIRMATION,
        deliveryType: 'DIGITAL',
        timeline: stringifyJsonField([
          {
            status: ORDER_STATUS.WAITING_CONFIRMATION,
            at: new Date().toISOString(),
            by: dummyBuyer.id,
            note: SIMULATED_BUYER_ORDER_NOTE,
          },
        ]),
      },
    });

    await this.notifications.notify(
      service.sellerId,
      'ORDER',
      '📩 Pesanan Baru',
      `${dummyBuyer.name} memesan jasa "${service.title}"! Klik Terima Pesanan untuk melanjutkan.`,
      { orderId: order.id, serviceId: service.id },
      `/orders/${order.id}`,
    );

    await this.notifications.notify(
      dummyBuyer.id,
      'ORDER',
      '📩 Pesanan Terkirim',
      `Pesanan berhasil dikirim! Menunggu konfirmasi penjual.`,
      { orderId: order.id, serviceId: service.id },
      `/orders/${order.id}`,
    );
  }
}
