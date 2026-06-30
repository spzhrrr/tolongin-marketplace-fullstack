import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ORDER_STATUS } from '../../../common/constants/enums';
import { stringifyJsonField } from '../../../common/utils/helpers';
import { CreateOrderFromServiceDto } from '../dto/order.dto';

const PLATFORM_FEE_RATE = 0.05;

@Injectable()
export class OrderFactory {
  fromService(
    buyerId: string,
    service: { id: string; sellerId: string; title: string; price: number },
    dto: CreateOrderFromServiceDto,
  ): Prisma.OrderCreateInput {
    return this.createBase(
      buyerId,
      service.sellerId,
      service.title,
      service.price,
      dto,
      { service: { connect: { id: service.id } } },
    );
  }

  fromApplication(
    buyerId: string,
    application: {
      id: string;
      sellerId: string;
      proposedPrice: number;
      job: { id: string; title: string };
    },
  ): Prisma.OrderCreateInput {
    const fee = Math.round(application.proposedPrice * PLATFORM_FEE_RATE);
    const now = new Date().toISOString();
    const timeline = [
      {
        status: ORDER_STATUS.WAITING_CONFIRMATION,
        at: now,
        by: buyerId,
        note: 'Pesanan dibuat dari lamaran diterima',
      },
      {
        status: ORDER_STATUS.ACCEPTED,
        at: now,
        by: buyerId,
        note: 'Lamaran diterima — menunggu pembayaran',
      },
    ];
    return {
      buyer: { connect: { id: buyerId } },
      seller: { connect: { id: application.sellerId } },
      title: application.job.title,
      amount: application.proposedPrice,
      fee,
      totalAmount: application.proposedPrice + fee,
      status: ORDER_STATUS.ACCEPTED,
      escrowStatus: 'UNPAID',
      timeline: stringifyJsonField(timeline),
      application: { connect: { id: application.id } },
      jobId: application.job.id,
    };
  }

  private createBase(
    buyerId: string,
    sellerId: string,
    title: string,
    amount: number,
    dto: CreateOrderFromServiceDto,
    relation: Partial<Prisma.OrderCreateInput>,
  ): Prisma.OrderCreateInput {
    const fee = Math.round(amount * PLATFORM_FEE_RATE);
    const timeline = [
      {
        status: ORDER_STATUS.WAITING_CONFIRMATION,
        at: new Date().toISOString(),
        by: buyerId,
      },
    ];
    return {
      buyer: { connect: { id: buyerId } },
      seller: { connect: { id: sellerId } },
      title,
      amount,
      fee,
      totalAmount: amount + fee,
      status: ORDER_STATUS.WAITING_CONFIRMATION,
      escrowStatus: 'UNPAID',
      notes: dto.notes,
      deliveryType: dto.deliveryType || 'DIGITAL',
      deliveryAddress: dto.deliveryAddress,
      timeline: stringifyJsonField(timeline),
      ...relation,
    };
  }
}