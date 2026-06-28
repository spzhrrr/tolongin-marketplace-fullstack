import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CreateServiceDto } from '../dto/service.dto';
import { stringifyJsonField } from '../../../common/utils/helpers';

@Injectable()
export class ServiceFactory {
  create(sellerId: string, dto: CreateServiceDto): Prisma.ServiceCreateInput {
    return {
      seller: { connect: { id: sellerId } },
      category: { connect: { id: dto.categoryId } },
      title: dto.title,
      description: dto.description,
      price: dto.price,
      priceType: dto.priceType || 'FIXED',
      deliveryTime: dto.deliveryTime,
      revisionCount: dto.revisionCount ?? 1,
      images: stringifyJsonField(dto.images || []),
    };
  }
}