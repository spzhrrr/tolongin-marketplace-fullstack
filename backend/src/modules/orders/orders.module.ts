import { Module } from '@nestjs/common';
import { OrdersController } from './controllers/orders.controller';
import { OrdersService } from './services/orders.service';
import { OrdersRepository } from './repositories/orders.repository';
import { OrderFactory } from './factories/order.factory';
import { ServicesModule } from '../services/services.module';
import { ApplicationsModule } from '../applications/applications.module';

@Module({
  imports: [ServicesModule, ApplicationsModule],
  controllers: [OrdersController],
<<<<<<< HEAD
  providers: [OrdersService, OrdersRepository],
=======
  providers: [OrdersService, OrdersTasksService, OrdersRepository, OrderFactory],
>>>>>>> 961a4cc (Update: Menyinkronkan perubahan lokal dengan repositori remote)
  exports: [OrdersService, OrdersRepository],
})
export class OrdersModule {}
