import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { PrismaService } from '../../prisma/prisma.service';
import { NotificationsService } from '../notifications/services/notifications.service';
import { ORDER_STATUS, ROLE } from '../../common/constants/enums';
import { OrdersService } from '../orders/services/orders.service';

@Injectable()
export class SimulationService {
  private readonly logger = new Logger(SimulationService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly notificationsService: NotificationsService,
    private readonly ordersService: OrdersService,
  ) {}

  private enabled(): boolean {
    return process.env.DEMO_AUTOMATION_ENABLED === 'true';
  }

  private formatIDR(amount: number): string {
    return `Rp${amount.toLocaleString('id-ID')}`;
  }

  private async updateTimeline(
    orderId: string,
    status: string,
    userId: string,
    note: string,
  ) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      select: { timeline: true },
    });
    let timelineEntries: unknown[] = [];
    if (order?.timeline) {
      try {
        timelineEntries = JSON.parse(order.timeline as string);
      } catch {
        timelineEntries = [];
      }
    }
    timelineEntries.push({
      status,
      at: new Date().toISOString(),
      by: userId,
      note,
    });
    return JSON.stringify(timelineEntries);
  }

  /** New service → simulated buyer order (notify seller only) */
  @Cron('*/20 * * * * *')
  async simulateNewOrderForServices() {
    if (!this.enabled()) return;

    const services = await this.prisma.service.findMany({
      where: {
        createdAt: { gte: new Date(Date.now() - 90 * 1000) },
        simulationOrderCreatedAt: null,
        isActive: true,
      },
      include: { seller: true },
      take: 1,
    });

    for (const service of services) {
      const dummyBuyer = await this.prisma.user.findFirst({
        where: {
          id: { not: service.sellerId },
          role: 'USER',
          emailVerified: true,
          ktpVerified: true,
        },
      });
      if (!dummyBuyer) continue;

      const fee = Math.round(service.price * 0.05);
      const total = service.price + fee;
      const timeline = JSON.stringify([
        {
          status: ORDER_STATUS.WAITING_CONFIRMATION,
          at: new Date().toISOString(),
          by: dummyBuyer.id,
          note: 'Pesanan dibuat',
        },
      ]);

      const order = await this.prisma.order.create({
        data: {
          buyerId: dummyBuyer.id,
          sellerId: service.sellerId,
          serviceId: service.id,
          title: service.title,
          amount: service.price,
          fee,
          totalAmount: total,
          status: ORDER_STATUS.WAITING_CONFIRMATION,
          deliveryType: 'DIGITAL',
          timeline,
        },
      });

      await this.prisma.service.update({
        where: { id: service.id },
        data: { simulationOrderCreatedAt: new Date() },
      });

      await this.notificationsService.notify(
        service.sellerId,
        'ORDER',
        '🛒 Ada Pesanan Baru!',
        `${dummyBuyer.name} ingin memesan jasa "${service.title}" seharga ${this.formatIDR(service.price)}.`,
        { orderId: order.id, serviceId: service.id },
        `/orders/${order.id}`,
      );
    }
  }

  /** New job → simulated application (notify job owner only) */
  @Cron('*/25 * * * * *')
  async simulateNewApplicationForJobs() {
    if (!this.enabled()) return;

    const jobs = await this.prisma.job.findMany({
      where: {
        createdAt: { gte: new Date(Date.now() - 90 * 1000) },
        simulationApplicationCreatedAt: null,
        status: 'OPEN',
      },
      include: { buyer: true },
      take: 1,
    });

    for (const job of jobs) {
      const dummySeller = await this.prisma.user.findFirst({
        where: {
          id: { not: job.buyerId },
          role: 'USER',
          emailVerified: true,
          ktpVerified: true,
        },
      });
      if (!dummySeller) continue;

      const proposedPrice = Math.round(job.budget * (0.85 + Math.random() * 0.2));
      const proposedDuration = Math.floor(Math.random() * 10) + 3;
      const coverLetter = `Halo, saya tertarik dengan pekerjaan "${job.title}". Saya berpengalaman di bidang ini dan siap mulai segera.`;

      const application = await this.prisma.application.create({
        data: {
          jobId: job.id,
          sellerId: dummySeller.id,
          coverLetter,
          proposedPrice,
          proposedDuration,
          status: 'PENDING',
        },
      });

      await this.prisma.job.update({
        where: { id: job.id },
        data: {
          simulationApplicationCreatedAt: new Date(),
          applicationsCount: { increment: 1 },
        },
      });

      await this.notificationsService.notify(
        job.buyerId,
        'APPLICATION',
        '📩 Ada Lamaran Baru!',
        `${dummySeller.name} melamar pekerjaan "${job.title}" dengan tawaran ${this.formatIDR(proposedPrice)}.`,
        { applicationId: application.id, jobId: job.id },
        `/jobs/${job.id}?tab=applications`,
      );
    }
  }

  /** Auto-accept waiting orders → PAID (notify buyer only) */
  @Cron('*/30 * * * * *')
  async simulateOrderAcceptance() {
    if (!this.enabled()) return;

    const orders = await this.prisma.order.findMany({
      where: {
        status: ORDER_STATUS.WAITING_CONFIRMATION,
        simulationAcceptedAt: null,
      },
      take: 1,
    });

    for (const order of orders) {
      const timeline = await this.updateTimeline(
        order.id,
        ORDER_STATUS.PAID,
        order.sellerId,
        'Pesanan diterima, pembayaran dikonfirmasi',
      );

      await this.prisma.order.update({
        where: { id: order.id },
        data: {
          status: ORDER_STATUS.IN_PROGRESS,
          simulationAcceptedAt: new Date(),
          timeline,
        },
      });

      await this.notificationsService.notify(
        order.buyerId,
        'ORDER',
        '💳 Pembayaran Dikonfirmasi!',
        `Pesanan "${order.title}" sedang dikerjakan.`,
        { orderId: order.id },
        `/orders/${order.id}`,
      );
    }
  }

  /** Auto-submit work for PAID/IN_PROGRESS orders (notify buyer only) */
  @Cron('*/35 * * * * *')
  async simulateWorkSubmission() {
    if (!this.enabled()) return;

    const orders = await this.prisma.order.findMany({
      where: {
        status: { in: [ORDER_STATUS.PAID, ORDER_STATUS.IN_PROGRESS] },
        simulationWorkSubmittedAt: null,
      },
      take: 1,
    });

    for (const order of orders) {
      const attachment = 'https://picsum.photos/seed/work-proof/800/600';
      const timeline = await this.updateTimeline(
        order.id,
        ORDER_STATUS.WAITING_REVIEW,
        order.sellerId,
        'Bukti kerja dikirim',
      );

      await this.prisma.order.update({
        where: { id: order.id },
        data: {
          status: ORDER_STATUS.WAITING_REVIEW,
          simulationWorkSubmittedAt: new Date(),
          workSubmission: JSON.stringify({
            note: 'Hasil pekerjaan telah selesai. Silakan tinjau lampiran.',
            attachments: [attachment],
          }),
          workSubmittedAt: new Date(),
          timeline,
        },
      });

      await this.notificationsService.notify(
        order.buyerId,
        'ORDER',
        '📤 Bukti Kerja Dikirim!',
        `Penjual mengirim hasil kerja untuk "${order.title}". Silakan review.`,
        { orderId: order.id },
        `/orders/${order.id}`,
      );
    }
  }

  /** Auto-approve work (notify seller only) */
  @Cron('*/45 * * * * *')
  async simulateWorkApproval() {
    if (!this.enabled()) return;

    const orders = await this.prisma.order.findMany({
      where: {
        status: ORDER_STATUS.WAITING_REVIEW,
        simulationApprovedAt: null,
      },
      take: 1,
    });

    for (const order of orders) {
      await this.ordersService.approveWork(order.id, order.buyerId, ROLE.USER);
      await this.prisma.order.update({
        where: { id: order.id },
        data: { simulationApprovedAt: new Date() },
      });

      await this.notificationsService.notify(
        order.sellerId,
        'ORDER',
        '💰 Dana Telah Dicairkan!',
        `Pembayaran untuk "${order.title}" telah masuk ke saldo Anda.`,
        { orderId: order.id },
        `/dashboard`,
      );
    }
  }
}
