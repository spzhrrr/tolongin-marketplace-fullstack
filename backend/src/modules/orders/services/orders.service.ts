import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { OrdersRepository } from '../repositories/orders.repository';
import { ServicesRepository } from '../../services/repositories/services.repository';
import { ApplicationsService } from '../../applications/services/applications.service';
<<<<<<< HEAD
<<<<<<< HEAD
=======
import { NotificationsService } from '../../notifications/services/notifications.service';
import { PrismaService } from '../../../prisma/prisma.service';
import { OrderFactory } from '../factories/order.factory';
>>>>>>> 961a4cc (Update: Menyinkronkan perubahan lokal dengan repositori remote)
=======
import { NotificationsService } from '../../notifications/services/notifications.service';
import { PrismaService } from '../../../prisma/prisma.service';
import { OrderFactory } from '../factories/order.factory';
>>>>>>> ec26484 (implementasi demo)
import {
  CreateOrderFromServiceDto,
  CancelOrderDto,
  RevisionRequestDto,
<<<<<<< HEAD
=======
  SubmitWorkDto,
  OpenDisputeDto,
>>>>>>> ec26484 (implementasi demo)
} from '../dto/order.dto';
import {
  parseJsonField,
  stringifyJsonField,
} from '../../../common/utils/helpers';
import {
  ORDER_STATUS,
  ORDER_TRANSITIONS,
  OrderStatus,
  ROLE,
  APPLICATION_STATUS,
<<<<<<< HEAD
} from '../../../common/constants/enums';

const PLATFORM_FEE_RATE = 0.05; // 5%
=======
  DISPUTE_STATUS,
} from '../../../common/constants/enums';

const PLATFORM_FEE_RATE = 0.05; // 5%
const AUTO_COMPLETE_DAYS = 7;
const AUTO_CANCEL_DAYS = 14;
const DISPUTE_AUTO_RESOLVE_DAYS = 3;
const DAY_MS = 24 * 60 * 60 * 1000;
>>>>>>> ec26484 (implementasi demo)

interface TimelineEntry {
  status: OrderStatus;
  at: string;
  by: string;
  note?: string;
}

@Injectable()
export class OrdersService {
  constructor(
    private readonly repo: OrdersRepository,
    private readonly servicesRepo: ServicesRepository,
    private readonly applicationsService: ApplicationsService,
<<<<<<< HEAD
<<<<<<< HEAD
=======
    private readonly notifications: NotificationsService,
    private readonly prisma: PrismaService,
    private readonly factory: OrderFactory,
>>>>>>> 961a4cc (Update: Menyinkronkan perubahan lokal dengan repositori remote)
  ) {}

  private toDto(o: any) {
    return { ...o, timeline: parseJsonField<TimelineEntry[]>(o.timeline, []) };
=======
    private readonly notifications: NotificationsService,
    private readonly prisma: PrismaService,
    private readonly factory: OrderFactory,
  ) {}

  private toDto(o: any) {
    const parsedSubmission = parseJsonField(o.workSubmission, null);
    const proofAttachments = parseJsonField<string[]>(o.workProof, []);
    const submissionFiles = parseJsonField<string[]>(o.workSubmissionFiles, []);
    return {
      ...o,
      timeline: parseJsonField<TimelineEntry[]>(o.timeline, []),
      workSubmissionFiles: submissionFiles,
      workSubmission:
        parsedSubmission ||
        (o.workNote || proofAttachments.length || o.workSubmissionNote
          ? {
              note: o.workNote || o.workSubmissionNote,
              attachments: proofAttachments.length
                ? proofAttachments
                : submissionFiles,
              submittedAt: o.workSubmittedAt || o.workSubmissionDate,
              status: o.workSubmissionStatus || null,
            }
          : null),
    };
>>>>>>> ec26484 (implementasi demo)
  }

  private roleFor(
    userId: string,
    order: { buyerId: string; sellerId: string },
    userRole: string,
  ): 'buyer' | 'seller' | 'admin' | null {
    if (userRole === ROLE.ADMIN) return 'admin';
    if (userId === order.buyerId) return 'buyer';
    if (userId === order.sellerId) return 'seller';
    return null;
  }

  private async transition(
    orderId: string,
    userId: string,
    userRole: string,
    nextStatus: OrderStatus,
    note?: string,
  ) {
    const o = await this.repo.findById(orderId);
    if (!o) throw new NotFoundException('Order not found');
    const role = this.roleFor(userId, o, userRole);
    if (!role) throw new ForbiddenException();

    const current = o.status as OrderStatus;
    const allowed = ORDER_TRANSITIONS[current]?.[role] || [];
    if (!allowed.includes(nextStatus)) {
      throw new BadRequestException(
        `Transition not allowed: ${current} -> ${nextStatus} (role: ${role})`,
      );
    }

<<<<<<< HEAD
=======
    return this.applyStatus(o, nextStatus, userId, note);
  }

  private async applyStatus(
    o: any,
    nextStatus: OrderStatus,
    byUserId: string,
    note?: string,
  ) {
>>>>>>> ec26484 (implementasi demo)
    const timeline = parseJsonField<TimelineEntry[]>(o.timeline, []);
    timeline.push({
      status: nextStatus,
      at: new Date().toISOString(),
<<<<<<< HEAD
      by: userId,
=======
      by: byUserId,
>>>>>>> ec26484 (implementasi demo)
      note,
    });

    if (nextStatus === ORDER_STATUS.COMPLETED) {
      const hasSubmission =
        Boolean(o.workSubmittedAt || o.workSubmissionDate) ||
        Boolean(o.workSubmission && o.workSubmission !== 'null');
      if (!hasSubmission) {
        throw new BadRequestException(
          'Dana tidak dapat dirilis sebelum penjual mengirim bukti kerja',
        );
      }

      const completedAt = new Date();
      const updated = await this.prisma.$transaction(async (tx) => {
        const claimed = await tx.order.updateMany({
          where: {
            id: o.id,
            fundsReleasedAt: null,
            status: {
              in: [
                ORDER_STATUS.WAITING_REVIEW,
                ORDER_STATUS.IN_REVIEW,
                ORDER_STATUS.DISPUTED,
              ],
            },
          },
          data: {
            status: ORDER_STATUS.COMPLETED,
            completedAt,
            workApprovedAt: completedAt,
            workSubmissionStatus: 'APPROVED',
            escrowStatus: 'RELEASED',
            fundsReleasedAt: completedAt,
            timeline: stringifyJsonField(timeline),
          },
        });
        if (claimed.count === 0) {
          return tx.order.findUniqueOrThrow({ where: { id: o.id } });
        }
        await tx.user.update({
          where: { id: o.sellerId },
          data: { balance: { increment: o.amount } },
        });
        return tx.order.findUniqueOrThrow({ where: { id: o.id } });
      });
      await this.notifyStatusChange(o, nextStatus, byUserId, note);
      return this.toDto(updated);
    }

    const data: any = {
      status: nextStatus,
      timeline: stringifyJsonField(timeline),
    };
<<<<<<< HEAD
<<<<<<< HEAD
    if (nextStatus === ORDER_STATUS.COMPLETED) data.completedAt = new Date();
=======

>>>>>>> 961a4cc (Update: Menyinkronkan perubahan lokal dengan repositori remote)
=======

>>>>>>> ec26484 (implementasi demo)
    if (nextStatus === ORDER_STATUS.CANCELLED) {
      data.cancelledAt = new Date();
      if (note) data.cancellationReason = note;
    }
<<<<<<< HEAD
    const updated = await this.repo.update(orderId, data);
    return this.toDto(updated);
  }
<<<<<<< HEAD
=======
=======

    const updated = await this.repo.update(o.id, data);
    await this.notifyStatusChange(o, nextStatus, byUserId, note);
    return this.toDto(updated);
  }
>>>>>>> ec26484 (implementasi demo)
  private async notifyStatusChange(
    o: any,
    nextStatus: OrderStatus,
    byUserId: string,
    note?: string,
  ) {
    const url = `/orders/${o.id}`;
    try {
      if (nextStatus === ORDER_STATUS.COMPLETED) {
        await this.notifications.notify(
          o.sellerId,
          'ORDER',
          '💰 Dana Dirilis',
          `Pesanan "${o.title}" telah selesai. Dana sebesar ${this.formatCurrency(o.amount)} telah masuk ke saldo Anda.`,
          { orderId: o.id, event: 'WORK_APPROVED' },
          url,
        );
        await this.notifications.notify(
          o.buyerId,
          'ORDER',
          '✅ Pesanan Selesai',
          `Pesanan "${o.title}" telah selesai. Terima kasih telah menggunakan layanan Tolongin.`,
          { orderId: o.id, event: 'ORDER_COMPLETED' },
          url,
        );
      } else if (nextStatus === ORDER_STATUS.REVISION_REQUESTED) {
        await this.notifications.notify(
          o.sellerId,
          'ORDER',
          '🔄 Permintaan Revisi',
          `Pembeli meminta revisi untuk pesanan "${o.title}".${note ? ' Alasan: ' + note : ''}`,
          { orderId: o.id, event: 'REVISION_REQUESTED', reason: note },
          url,
        );
      } else if (nextStatus === ORDER_STATUS.PAID) {
        await this.notifications.notify(
          o.buyerId,
          'ORDER',
          '✅ Pesanan Diterima',
          `Penjual menerima pesanan "${o.title}". Pengerjaan akan segera dimulai.`,
          { orderId: o.id, event: 'ORDER_ACCEPTED' },
          url,
        );
      } else if (nextStatus === ORDER_STATUS.WAITING_REVIEW) {
        await this.notifications.notify(
          o.buyerId,
          'ORDER',
          '📦 Hasil Kerja Dikirim',
          `Penjual telah mengirimkan hasil kerja untuk "${o.title}". Silakan review dan approve.`,
          { orderId: o.id, event: 'WORK_SUBMITTED' },
          url,
        );
      } else if (nextStatus === ORDER_STATUS.CANCELLED) {
        const target = byUserId === o.buyerId ? o.sellerId : o.buyerId;
        await this.notifications.notify(
          target,
          'ORDER',
          '❌ Pesanan Dibatalkan',
          `Pesanan "${o.title}" telah dibatalkan.${note ? ' Alasan: ' + note : ''}`,
          { orderId: o.id, event: 'ORDER_CANCELLED', reason: note },
          url,
        );
      }
    } catch {
      // Notifikasi tidak boleh menggagalkan transaksi utama
    }
  }

  private formatCurrency(amount: number): string {
    return `Rp${amount.toLocaleString('id-ID')}`;
  }
<<<<<<< HEAD
>>>>>>> 961a4cc (Update: Menyinkronkan perubahan lokal dengan repositori remote)
=======
>>>>>>> ec26484 (implementasi demo)

  async createFromService(
    buyerId: string,
    serviceId: string,
    dto: CreateOrderFromServiceDto,
  ) {
    const s = await this.servicesRepo.findById(serviceId);
    if (!s) throw new NotFoundException('Service not found');
    if (!s.isActive) throw new BadRequestException('Service is not active');
    if (s.sellerId === buyerId)
      throw new BadRequestException('Cannot order your own service');
<<<<<<< HEAD
<<<<<<< HEAD
    const fee = +(s.price * PLATFORM_FEE_RATE).toFixed(2);
    const totalAmount = +(s.price + fee).toFixed(2);
    const timeline: TimelineEntry[] = [
      {
        status: ORDER_STATUS.WAITING_CONFIRMATION,
        at: new Date().toISOString(),
        by: buyerId,
      },
    ];
    const created = await this.repo.create({
      buyer: { connect: { id: buyerId } },
      seller: { connect: { id: s.sellerId } },
      service: { connect: { id: s.id } },
      title: s.title,
      amount: s.price,
      fee,
      totalAmount,
      status: ORDER_STATUS.WAITING_CONFIRMATION,
      notes: dto.notes,
      deliveryType: dto.deliveryType || 'DIGITAL',
      deliveryAddress: dto.deliveryAddress,
      timeline: stringifyJsonField(timeline),
    });
=======
=======
>>>>>>> ec26484 (implementasi demo)

    const created = await this.repo.create(
      this.factory.fromService(buyerId, s, dto),
    );

    await this.notifications
      .notify(
        s.sellerId,
        'ORDER',
        '📦 Pesanan Baru',
        `Anda menerima pesanan baru: "${s.title}" seharga ${this.formatCurrency(s.price)}.`,
        { orderId: created.id, event: 'ORDER_CREATED' },
        `/orders/${created.id}`,
      )
      .catch(() => undefined);

<<<<<<< HEAD
>>>>>>> 961a4cc (Update: Menyinkronkan perubahan lokal dengan repositori remote)
=======
>>>>>>> ec26484 (implementasi demo)
    return this.toDto(created);
  }

  async createFromApplication(buyerId: string, applicationId: string) {
    const app = await this.applicationsService.findById(applicationId);
    if (!app) throw new NotFoundException('Application not found');
    if (app.job.buyerId !== buyerId) throw new ForbiddenException();
    if (app.status !== APPLICATION_STATUS.ACCEPTED)
      throw new BadRequestException('Application not accepted');
<<<<<<< HEAD
<<<<<<< HEAD
    const fee = +(app.proposedPrice * PLATFORM_FEE_RATE).toFixed(2);
    const totalAmount = +(app.proposedPrice + fee).toFixed(2);
    const timeline: TimelineEntry[] = [
      {
        status: ORDER_STATUS.WAITING_CONFIRMATION,
        at: new Date().toISOString(),
        by: buyerId,
      },
    ];
    const created = await this.repo.create({
      buyer: { connect: { id: buyerId } },
      seller: { connect: { id: app.sellerId } },
      application: { connect: { id: app.id } },
      title: app.job.title,
      amount: app.proposedPrice,
      fee,
      totalAmount,
      status: ORDER_STATUS.WAITING_CONFIRMATION,
      timeline: stringifyJsonField(timeline),
    });
=======
=======
>>>>>>> ec26484 (implementasi demo)

    const created = await this.repo.create(
      this.factory.fromApplication(buyerId, app),
    );

    await this.notifications
      .notify(
        app.sellerId,
        'ORDER',
        '📦 Pesanan Baru',
        `Pekerjaan "${app.job.title}" telah dijadikan pesanan. Silakan tunggu pembayaran dari pembeli.`,
        { orderId: created.id, event: 'ORDER_CREATED' },
        `/orders/${created.id}`,
      )
      .catch(() => undefined);

<<<<<<< HEAD
>>>>>>> 961a4cc (Update: Menyinkronkan perubahan lokal dengan repositori remote)
=======
>>>>>>> ec26484 (implementasi demo)
    return this.toDto(created);
  }

  async getById(id: string, userId: string, userRole: string) {
    const o = await this.repo.findById(id);
    if (!o) throw new NotFoundException('Order not found');
    if (
      userRole !== ROLE.ADMIN &&
      o.buyerId !== userId &&
      o.sellerId !== userId
    ) {
      throw new ForbiddenException();
    }
    return this.toDto(o);
  }

  async listByBuyer(buyerId: string) {
    const items = await this.repo.findByBuyer(buyerId);
    return items.map((i) => this.toDto(i));
  }

  async listBySeller(sellerId: string) {
    const items = await this.repo.findBySeller(sellerId);
    return items.map((i) => this.toDto(i));
  }

  accept(id: string, userId: string, userRole: string) {
    return this.transition(id, userId, userRole, ORDER_STATUS.ACCEPTED);
  }
<<<<<<< HEAD
  start(id: string, userId: string, userRole: string) {
    return this.transition(id, userId, userRole, ORDER_STATUS.IN_PROGRESS);
  }
<<<<<<< HEAD
  submitReview(id: string, userId: string, userRole: string) {
    return this.transition(id, userId, userRole, ORDER_STATUS.IN_REVIEW);
  }
=======
=======

  start(id: string, userId: string, userRole: string) {
    return this.transition(id, userId, userRole, ORDER_STATUS.IN_PROGRESS);
  }
>>>>>>> ec26484 (implementasi demo)

  submitReview(_id: string, _userId: string, _userRole: string) {
    throw new BadRequestException(
      'Gunakan endpoint work-submission dan lampirkan bukti kerja',
    );
  }
  async submitWork(
    id: string,
    userId: string,
    userRole: string,
    dto: SubmitWorkDto,
  ) {
    const o = await this.repo.findById(id);
    if (!o) throw new NotFoundException('Order not found');
    const role = this.roleFor(userId, o, userRole);
    if (role !== 'seller') throw new ForbiddenException();
    if (
      o.status !== ORDER_STATUS.PAID &&
      o.status !== ORDER_STATUS.REJECTED &&
      o.status !== ORDER_STATUS.IN_PROGRESS &&
      o.status !== ORDER_STATUS.REVISION_REQUESTED
    ) {
      throw new BadRequestException(
        'Hasil kerja hanya bisa dikumpulkan setelah order dikerjakan',
      );
    }

    const attachments = dto.attachments || [];
    if (!attachments.length) {
      throw new BadRequestException('Minimal satu bukti kerja wajib diupload');
    }
    const now = new Date();
    const timeline = parseJsonField<TimelineEntry[]>(o.timeline, []);
    timeline.push({
      status: ORDER_STATUS.WAITING_REVIEW,
      at: now.toISOString(),
      by: userId,
      note: dto.note,
    });

    const updated = await this.repo.update(id, {
      status: ORDER_STATUS.WAITING_REVIEW,
      workSubmission: stringifyJsonField({
        note: dto.note,
        attachments,
        submittedBy: userId,
        submittedAt: now.toISOString(),
      }),
      workProof: stringifyJsonField(attachments),
      workNote: dto.note,
      workSubmittedAt: now,
      workSubmissionNote: dto.note,
      workSubmissionFiles: stringifyJsonField(attachments),
      workSubmissionDate: now,
      workSubmissionStatus: 'PENDING',
      autoReleaseAt: null,
      workRejectedAt: null,
      workRejectionReason: null,
      escrowStatus: 'AWAITING_APPROVAL',
      timeline: stringifyJsonField(timeline),
    } as any);

    await this.notifications
      .notify(
        o.buyerId,
        'ORDER',
        '📦 Hasil Kerja Dikirim',
        `Penjual telah mengirimkan hasil kerja untuk "${o.title}". Silakan review dan approve.`,
        { orderId: o.id, event: 'WORK_SUBMITTED' },
        `/orders/${o.id}`,
      )
      .catch(() => undefined);

    return this.toDto(updated);
  }

  async approveWork(id: string, userId: string, userRole: string) {
    const o = await this.repo.findById(id);
    if (!o) throw new NotFoundException('Order not found');
    const role = this.roleFor(userId, o, userRole);
    if (role !== 'buyer' && role !== 'admin')
      throw new ForbiddenException('Hanya pembeli yang dapat menyetujui');

    if (o.status === ORDER_STATUS.COMPLETED) {
      return this.toDto(o);
    }

    if (
      o.status !== ORDER_STATUS.WAITING_REVIEW &&
      o.status !== ORDER_STATUS.IN_REVIEW
    ) {
      throw new BadRequestException(
        'Order tidak sedang menunggu persetujuan hasil kerja',
      );
    }

    return this.applyStatus(o, ORDER_STATUS.COMPLETED, userId);
  }

  async complete(id: string, userId: string, userRole: string) {
    const o = await this.repo.findById(id);
    if (!o) throw new NotFoundException('Order not found');
    const role = this.roleFor(userId, o, userRole);

    if (o.status === ORDER_STATUS.COMPLETED) {
      return this.toDto(o);
    }

    if (role !== 'buyer' && role !== 'admin')
      throw new ForbiddenException('Hanya pembeli yang dapat menyelesaikan');

    if (
      o.status !== ORDER_STATUS.WAITING_REVIEW &&
      o.status !== ORDER_STATUS.IN_REVIEW
    ) {
      throw new BadRequestException('Order harus dalam status review');
    }

    return this.applyStatus(o, ORDER_STATUS.COMPLETED, userId);
  }

  async rejectWork(
    id: string,
    userId: string,
    userRole: string,
    dto: RevisionRequestDto,
  ) {
    const o = await this.repo.findById(id);
    if (!o) throw new NotFoundException('Order not found');
    const role = this.roleFor(userId, o, userRole);
    if (role !== 'buyer') throw new ForbiddenException();
    if (
      o.status !== ORDER_STATUS.WAITING_REVIEW &&
      o.status !== ORDER_STATUS.IN_REVIEW
    ) {
      throw new BadRequestException('Order is not waiting for review');
    }

    const timeline = parseJsonField<TimelineEntry[]>(o.timeline, []);
    timeline.push({
      status: ORDER_STATUS.REJECTED,
      at: new Date().toISOString(),
      by: userId,
      note: dto.reason,
    });

    const updated = await this.repo.update(id, {
      status: ORDER_STATUS.REJECTED,
      workRejectedAt: new Date(),
      workRejectionReason: dto.reason,
      workSubmissionStatus: 'REVISION_REQUESTED',
      escrowStatus: 'FUNDED',
      timeline: stringifyJsonField(timeline),
    } as any);

    await this.notifications
      .notify(
        o.sellerId,
        'ORDER',
        '🔄 Permintaan Revisi',
        `Pembeli meminta revisi untuk "${o.title}". Alasan: ${dto.reason}`,
        { orderId: o.id, event: 'REVISION_REQUESTED', reason: dto.reason },
        `/orders/${o.id}`,
      )
      .catch(() => undefined);

    return this.toDto(updated);
  }

<<<<<<< HEAD
>>>>>>> 961a4cc (Update: Menyinkronkan perubahan lokal dengan repositori remote)
=======
>>>>>>> ec26484 (implementasi demo)
  requestRevision(
    id: string,
    userId: string,
    userRole: string,
    dto: RevisionRequestDto,
  ) {
    return this.transition(
      id,
      userId,
      userRole,
      ORDER_STATUS.REVISION_REQUESTED,
      dto.reason,
    );
  }
<<<<<<< HEAD
  complete(id: string, userId: string, userRole: string) {
    return this.transition(id, userId, userRole, ORDER_STATUS.COMPLETED);
  }
=======

>>>>>>> ec26484 (implementasi demo)
  cancel(id: string, userId: string, userRole: string, dto: CancelOrderDto) {
    return this.transition(
      id,
      userId,
      userRole,
      ORDER_STATUS.CANCELLED,
      dto.reason,
    );
  }

<<<<<<< HEAD
=======
  async openDispute(
    id: string,
    userId: string,
    userRole: string,
    dto: OpenDisputeDto,
  ) {
    const o = await this.repo.findById(id);
    if (!o) throw new NotFoundException('Order not found');
    const role = this.roleFor(userId, o, userRole);
    if (role !== 'buyer' && role !== 'seller')
      throw new ForbiddenException(
        'Hanya pihak terkait yang dapat membuka sengketa',
      );

    const existing = await this.prisma.dispute.findUnique({
      where: { orderId: id },
    });
    if (existing)
      throw new BadRequestException('Sengketa untuk order ini sudah ada');

    const now = new Date();
    const dispute = await this.prisma.dispute.create({
      data: {
        order: { connect: { id } },
        raiser: { connect: { id: userId } },
        reason: dto.reason,
        description: dto.description,
        evidence: stringifyJsonField(dto.evidence || []),
        status: DISPUTE_STATUS.PENDING,
        autoResolveAt: new Date(
          now.getTime() + DISPUTE_AUTO_RESOLVE_DAYS * DAY_MS,
        ),
      },
    });

    const timeline = parseJsonField<TimelineEntry[]>(o.timeline, []);
    timeline.push({
      status: ORDER_STATUS.DISPUTED,
      at: now.toISOString(),
      by: userId,
      note: dto.reason,
    });

    await this.repo.update(id, {
      status: ORDER_STATUS.DISPUTED,
      workSubmissionStatus: 'DISPUTED',
      timeline: stringifyJsonField(timeline),
    } as any);

    const target = userId === o.buyerId ? o.sellerId : o.buyerId;
    await this.notifications
      .notify(
        target,
        'DISPUTE',
        '⚠️ Sengketa Dibuka',
        `Sengketa dibuka untuk pesanan "${o.title}". Alasan: ${dto.reason}`,
        { orderId: o.id, disputeId: dispute.id, event: 'DISPUTE_OPENED' },
        `/orders/${o.id}`,
      )
      .catch(() => undefined);

    return {
      ...dispute,
      evidence: parseJsonField<string[]>(dispute.evidence, []),
    };
  }

>>>>>>> ec26484 (implementasi demo)
  async getTimeline(id: string, userId: string, userRole: string) {
    const o = await this.getById(id, userId, userRole);
    return o.timeline;
  }

  async getInvoice(id: string, userId: string, userRole: string) {
    const o = await this.getById(id, userId, userRole);
    return {
      orderId: o.id,
      title: o.title,
      buyer: o.buyer,
      seller: o.seller,
      amount: o.amount,
      fee: o.fee,
      total: o.totalAmount,
      status: o.status,
      issuedAt: o.createdAt,
      paidAt: o.completedAt,
    };
  }
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> ec26484 (implementasi demo)

  async runDemoFlow(id: string, userId: string, userRole: string) {
    const demoEnabled =
      process.env.DEMO_MODE_ENABLED === 'true' ||
      process.env.NODE_ENV !== 'production';
    if (!demoEnabled) {
      throw new ForbiddenException('Demo mode is disabled');
    }

    let order = await this.repo.findById(id);
    if (!order) throw new NotFoundException('Order not found');
    if (!this.roleFor(userId, order, userRole)) throw new ForbiddenException();

    if (order.status === ORDER_STATUS.WAITING_CONFIRMATION) {
      const now = new Date();
      const timeline = parseJsonField<TimelineEntry[]>(order.timeline, []);
      timeline.push({
        status: ORDER_STATUS.PAID,
        at: now.toISOString(),
        by: 'DEMO_PAYMENT',
        note: 'Pembayaran demo dikonfirmasi dan masuk escrow',
      });
      await this.prisma.$transaction([
        this.prisma.payment.create({
          data: {
            orderId: order.id,
            userId: order.buyerId,
            amount: order.amount,
            fee: order.fee,
            totalAmount: order.totalAmount,
            method: 'BANK_TRANSFER',
            status: 'COMPLETED',
            transactionId: 'DEMO-AUTO-' + Date.now(),
            paidAt: now,
          },
        }),
        this.prisma.order.update({
          where: { id: order.id },
          data: {
            status: ORDER_STATUS.PAID,
            escrowStatus: 'FUNDED',
            timeline: stringifyJsonField(timeline),
          },
        }),
      ]);
      order = await this.repo.findById(id);
    }

    if (
      order &&
      (order.status === ORDER_STATUS.PAID ||
        order.status === ORDER_STATUS.REJECTED)
    ) {
      await this.submitWork(order.id, order.sellerId, ROLE.USER, {
        note:
          'Bukti demo: pekerjaan telah diselesaikan sesuai brief dan siap diperiksa.',
        attachments: ['https://demo.tolongin.local/bukti-kerja.pdf'],
      });
      order = await this.repo.findById(id);
    }

    if (order?.status === ORDER_STATUS.WAITING_REVIEW) {
      await this.approveWork(order.id, order.buyerId, ROLE.USER);
    }

    return this.getById(id, userId, userRole);
  }
  async runAutoComplete(): Promise<number> {
    // Escrow is never auto-released: explicit buyer approval (or an audited
    // admin dispute resolution) is required.
    return 0;
  }
  async runAutoCancel(): Promise<number> {
    const threshold = new Date(Date.now() - AUTO_CANCEL_DAYS * DAY_MS);
    const candidates = await this.prisma.order.findMany({
      where: {
        status: { in: [ORDER_STATUS.PAID, ORDER_STATUS.IN_PROGRESS] },
        workSubmittedAt: null,
        updatedAt: { lte: threshold },
      },
    });
    let count = 0;
    for (const o of candidates) {
<<<<<<< HEAD
      await this.applyStatus(
        o,
        ORDER_STATUS.CANCELLED,
=======
      await this.cancelAndRefund(
        o,
>>>>>>> ec26484 (implementasi demo)
        'SYSTEM',
        `Auto-cancel: tidak ada pengumpulan hasil kerja dalam ${AUTO_CANCEL_DAYS} hari`,
      );
      count++;
    }
    return count;
  }

<<<<<<< HEAD
=======
  /**
   * Membatalkan order dan, jika pembeli sudah membayar, mengembalikan dana
   * ke saldo pembeli serta menandai payment terkait sebagai REFUNDED. Semua
   * dilakukan dalam satu transaksi agar tidak meninggalkan dana di limbo.
   */
  private async cancelAndRefund(
    order: any,
    byUserId: string,
    note: string,
  ) {
    const wasFunded =
      order.escrowStatus === 'FUNDED' ||
      order.status === ORDER_STATUS.PAID ||
      order.status === ORDER_STATUS.IN_PROGRESS;

    const now = new Date();
    const timeline = parseJsonField<TimelineEntry[]>(order.timeline, []);
    timeline.push({
      status: ORDER_STATUS.CANCELLED,
      at: now.toISOString(),
      by: byUserId,
      note,
    });

    await this.prisma.$transaction(async (tx) => {
      await tx.order.update({
        where: { id: order.id },
        data: {
          status: ORDER_STATUS.CANCELLED,
          cancelledAt: now,
          cancellationReason: note,
          escrowStatus: wasFunded ? 'REFUNDED' : order.escrowStatus,
          timeline: stringifyJsonField(timeline),
        },
      });
      if (wasFunded) {
        await tx.payment.updateMany({
          where: { orderId: order.id, status: 'COMPLETED' },
          data: { status: 'REFUNDED' },
        });
        await tx.user.update({
          where: { id: order.buyerId },
          data: { balance: { increment: order.amount } },
        });
      }
    });

    // Notifikasi kedua pihak
    await this.notifications
      .notify(
        order.buyerId,
        'ORDER',
        wasFunded ? '↩️ Dana Dikembalikan' : '❌ Pesanan Dibatalkan',
        wasFunded
          ? `Pesanan "${order.title}" dibatalkan otomatis. Dana ${this.formatCurrency(order.amount)} telah dikembalikan ke saldo Anda.`
          : `Pesanan "${order.title}" telah dibatalkan otomatis.`,
        { orderId: order.id, event: 'ORDER_AUTO_CANCELLED', refunded: wasFunded },
        `/orders/${order.id}`,
      )
      .catch(() => undefined);
    await this.notifications
      .notify(
        order.sellerId,
        'ORDER',
        '❌ Pesanan Dibatalkan',
        `Pesanan "${order.title}" telah dibatalkan otomatis karena melewati batas waktu pengerjaan.`,
        { orderId: order.id, event: 'ORDER_AUTO_CANCELLED' },
        `/orders/${order.id}`,
      )
      .catch(() => undefined);
  }

>>>>>>> ec26484 (implementasi demo)
  async runAutoResolveDisputes(): Promise<number> {
    const now = new Date();
    const disputes = await this.prisma.dispute.findMany({
      where: {
        status: DISPUTE_STATUS.PENDING,
        autoResolveAt: { not: null, lte: now },
      },
      include: { order: true },
    });
    let count = 0;
    for (const d of disputes) {
      await this.prisma.dispute.update({
        where: { id: d.id },
        data: {
          status: DISPUTE_STATUS.RESOLVED,
          resolution:
            'Diselesaikan otomatis oleh sistem setelah 3 hari (demo).',
          resolvedAt: now,
        },
      });
      if (d.order && d.order.status === ORDER_STATUS.DISPUTED) {
        await this.applyStatus(
          d.order,
          ORDER_STATUS.COMPLETED,
          'SYSTEM',
          'Auto-resolve sengketa (demo)',
        );
      }
      const targets = d.order
        ? [d.order.buyerId, d.order.sellerId]
        : [d.raisedBy];
      for (const t of targets) {
        await this.notifications
          .notify(
            t,
            'DISPUTE',
            '✅ Sengketa Diselesaikan',
            'Sengketa pesanan Anda telah diselesaikan otomatis oleh sistem.',
            { disputeId: d.id, event: 'DISPUTE_RESOLVED' },
            d.order ? `/orders/${d.order.id}` : '/disputes',
          )
          .catch(() => undefined);
      }
      count++;
    }
    return count;
  }
<<<<<<< HEAD
>>>>>>> 961a4cc (Update: Menyinkronkan perubahan lokal dengan repositori remote)
=======
>>>>>>> ec26484 (implementasi demo)
}
