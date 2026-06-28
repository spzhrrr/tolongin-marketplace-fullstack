import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CreateJobDto } from '../dto/job.dto';
import { JOB_STATUS } from '../../../common/constants/enums';
import { stringifyJsonField } from '../../../common/utils/helpers';

@Injectable()
export class JobFactory {
  create(buyerId: string, dto: CreateJobDto): Prisma.JobCreateInput {
    return {
      buyer: { connect: { id: buyerId } },
      category: { connect: { id: dto.categoryId } },
      title: dto.title,
      description: dto.description,
      budget: dto.budget,
      budgetType: dto.budgetType || 'FIXED',
      deadline: dto.deadline ? new Date(dto.deadline) : undefined,
      location: dto.location,
      isOnline: dto.isOnline ?? false,
      skills: stringifyJsonField(dto.skills || []),
      urgency: dto.urgency ? dto.urgency.toUpperCase() : 'NORMAL',
      status: JOB_STATUS.OPEN,
    };
  }
}