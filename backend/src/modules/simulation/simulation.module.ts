// backend/src/modules/simulation/simulation.module.ts
import { Module, forwardRef } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { SimulationService } from './simulation.service';
import { DemoFlowService } from './demo-flow.service';
import { OrdersModule } from '../orders/orders.module';
import { ApplicationsModule } from '../applications/applications.module';
import { NotificationsModule } from '../notifications/notifications.module';
import { PrismaModule } from '../../prisma/prisma.module';
import { ReviewsModule } from '../reviews/reviews.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    forwardRef(() => OrdersModule),
    forwardRef(() => ApplicationsModule),
    forwardRef(() => ReviewsModule),
    NotificationsModule,
    PrismaModule,
  ],
  providers: [SimulationService, DemoFlowService],
  exports: [SimulationService, DemoFlowService],
})
export class SimulationModule {}
