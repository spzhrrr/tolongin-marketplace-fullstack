import { Module, forwardRef } from '@nestjs/common';
import { ApplicationsController } from './controllers/applications.controller';
import { ApplicationsService } from './services/applications.service';
import { ApplicationsRepository } from './repositories/applications.repository';
import { JobsModule } from '../jobs/jobs.module';
import { NotificationsModule } from '../notifications/notifications.module';
import { OrdersModule } from '../orders/orders.module';
import { SimulationModule } from '../simulation/simulation.module';

@Module({
  imports: [
    JobsModule,
    NotificationsModule,
    forwardRef(() => OrdersModule),
    forwardRef(() => SimulationModule),
  ],
  controllers: [ApplicationsController],
  providers: [ApplicationsService, ApplicationsRepository],
  exports: [ApplicationsService],
})
export class ApplicationsModule {}
