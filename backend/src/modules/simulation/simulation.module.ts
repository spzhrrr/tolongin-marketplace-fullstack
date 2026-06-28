// backend/src/modules/simulation/simulation.module.ts
import { Module } from '@nestjs/common';
import { SimulationService } from './simulation.service';
import { OrdersModule } from '../orders/orders.module';
import { ApplicationsModule } from '../applications/applications.module';
import { NotificationsModule } from '../notifications/notifications.module';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [
    OrdersModule,
    ApplicationsModule,
    NotificationsModule,
    PrismaModule,
  ],
  providers: [SimulationService],
  exports: [SimulationService], // ✅ Tambahkan exports jika diperlukan di module lain
})
export class SimulationModule {}
