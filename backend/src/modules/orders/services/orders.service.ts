import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { OrdersRepository } from '../repositories/orders.repository';
import { ServicesRepository } from '../../services/repositories/services.repository';
import { ApplicationsService } from '../../applications/services/applications.service';
import {
  CreateOrderFromServiceDto,
  CancelOrderDto,
  RevisionRequestDto,
  SubmitWorkDto,
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
} from '../../../common/constants/enums';

const PLATFORM_FEE_RATE = 0.05; // 5%

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
  ) {}

  private toDto(o: any) {
    const parsedSubmission = parseJsonField(o.workSubmission, null);
    const proofAttachments = parseJsonField<string[]>(o.workProof, []);
    return {
      ...o,
      timeline: parseJsonField<TimelineEntry[]>(o.timeline, []),
      workSubmission:
        parsedSubmission ||
        (o.workNote || proofAttachments.length
          ? {
              note: o.workNote,
              attachments: proofAttachments,
              submittedAt: o.workSubmittedAt,
            }
          : null),
    };
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

    const timeline = parseJsonField<TimelineEntry[]>(o.timeline, []);
    timeline.push({
      status: nextStatus,
      at: new Date().toISOString(),
      by: userId,
      note,
    });

    const data: any = {
      status: nextStatus,
      timeline: stringifyJsonField(timeline),
    };
    if (nextStatus === ORDER_STATUS.COMPLETED) {
      data.completedAt = new Date();
      data.workApprovedAt = new Date();
      data.escrowStatus = 'RELEASED';
      if (!(o as any).fundsReleasedAt) {
        data.fundsReleasedAt = new Date();
        data.seller = { update: { balance: { increment: o.amount } } };
      }
    }
    if (nextStatus === ORDER_STATUS.CANCELLED) {
      data.cancelledAt = new Date();
      if (note) data.cancellationReason = note;
    }
    const updated = await this.repo.update(orderId, data);
    return this.toDto(updated);
  }

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
    return this.toDto(created);
  }

  async createFromApplication(buyerId: string, applicationId: string) {
    const app = await this.applicationsService.findById(applicationId);
    if (!app) throw new NotFoundException('Application not found');
    if (app.job.buyerId !== buyerId) throw new ForbiddenException();
    if (app.status !== APPLICATION_STATUS.ACCEPTED)
      throw new BadRequestException('Application not accepted');
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
  start(id: string, userId: string, userRole: string) {
    return this.transition(id, userId, userRole, ORDER_STATUS.IN_PROGRESS);
  }
  submitReview(id: string, userId: string, userRole: string) {
    return this.transition(id, userId, userRole, ORDER_STATUS.IN_REVIEW);
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
      o.status !== ORDER_STATUS.IN_PROGRESS &&
      o.status !== ORDER_STATUS.REVISION_REQUESTED
    ) {
      throw new BadRequestException(
        'Work can only be submitted after the order is in progress',
      );
    }

    const timeline = parseJsonField<TimelineEntry[]>(o.timeline, []);
    timeline.push({
      status: ORDER_STATUS.IN_REVIEW,
      at: new Date().toISOString(),
      by: userId,
      note: dto.note,
    });

    const updated = await this.repo.update(id, {
      status: ORDER_STATUS.IN_REVIEW,
      workSubmission: stringifyJsonField({
        note: dto.note,
        attachments: dto.attachments || [],
        submittedBy: userId,
        submittedAt: new Date().toISOString(),
      }),
      workProof: stringifyJsonField(dto.attachments || []),
      workNote: dto.note,
      workSubmittedAt: new Date(),
      autoReleaseAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      workRejectedAt: null,
      workRejectionReason: null,
      escrowStatus: 'AWAITING_APPROVAL',
      timeline: stringifyJsonField(timeline),
    } as any);
    return this.toDto(updated);
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
    if (o.status !== ORDER_STATUS.IN_REVIEW) {
      throw new BadRequestException('Order is not waiting for review');
    }

    const timeline = parseJsonField<TimelineEntry[]>(o.timeline, []);
    timeline.push({
      status: ORDER_STATUS.REVISION_REQUESTED,
      at: new Date().toISOString(),
      by: userId,
      note: dto.reason,
    });

    const updated = await this.repo.update(id, {
      status: ORDER_STATUS.REVISION_REQUESTED,
      workRejectedAt: new Date(),
      workRejectionReason: dto.reason,
      escrowStatus: 'REVISION_REQUESTED',
      timeline: stringifyJsonField(timeline),
    } as any);
    return this.toDto(updated);
  }
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
  complete(id: string, userId: string, userRole: string) {
    return this.transition(id, userId, userRole, ORDER_STATUS.COMPLETED);
  }
  cancel(id: string, userId: string, userRole: string, dto: CancelOrderDto) {
    return this.transition(
      id,
      userId,
      userRole,
      ORDER_STATUS.CANCELLED,
      dto.reason,
    );
  }

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
}
