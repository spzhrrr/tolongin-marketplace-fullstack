import { Module, forwardRef } from '@nestjs/common';
import { OrdersController } from './controllers/orders.controller';
import { OrdersService } from './services/orders.service';
import { OrdersTasksService } from './services/orders-tasks.service';
import { OrdersRepository } from './repositories/orders.repository';
import { OrderFactory } from './factories/order.factory';
import { ServicesModule } from '../services/services.module';
import { ApplicationsModule } from '../applications/applications.module';
import { NotificationsModule } from '../notifications/notifications.module';
import { SimulationModule } from '../simulation/simulation.module';

@Module({
  imports: [
    forwardRef(() => ServicesModule),
    forwardRef(() => ApplicationsModule),
    NotificationsModule,
    forwardRef(() => SimulationModule),
  ],
  controllers: [OrdersController],
  providers: [OrdersService, OrdersTasksService, OrdersRepository, OrderFactory],
  exports: [OrdersService, OrdersRepository],
})
export class OrdersModule {}
