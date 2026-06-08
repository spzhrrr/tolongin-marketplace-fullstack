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
    return { ...o, timeline: parseJsonField<TimelineEntry[]>(o.timeline, []) };
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
    if (nextStatus === ORDER_STATUS.COMPLETED) data.completedAt = new Date();
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
