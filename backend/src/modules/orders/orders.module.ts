<<<<<<< HEAD
import { Module } from '@nestjs/common';
import { OrdersController } from './controllers/orders.controller';
import { OrdersService } from './services/orders.service';
=======
// backend/src/modules/orders/orders.module.ts
import { Module } from '@nestjs/common';
import { OrdersController } from './controllers/orders.controller';
import { OrdersService } from './services/orders.service';
import { OrdersTasksService } from './services/orders-tasks.service';
>>>>>>> ec26484 (implementasi demo)
import { OrdersRepository } from './repositories/orders.repository';
import { OrderFactory } from './factories/order.factory';
import { ServicesModule } from '../services/services.module';
import { ApplicationsModule } from '../applications/applications.module';
<<<<<<< HEAD

@Module({
  imports: [ServicesModule, ApplicationsModule],
  controllers: [OrdersController],
<<<<<<< HEAD
  providers: [OrdersService, OrdersRepository],
=======
  providers: [OrdersService, OrdersTasksService, OrdersRepository, OrderFactory],
>>>>>>> 961a4cc (Update: Menyinkronkan perubahan lokal dengan repositori remote)
=======
import { NotificationsModule } from '../notifications/notifications.module'; // ✅ TAMBAHKAN

@Module({
  imports: [
    ServicesModule,
    ApplicationsModule,
    NotificationsModule, // ✅ TAMBAHKAN
  ],
  controllers: [OrdersController],
  providers: [OrdersService, OrdersTasksService, OrdersRepository, OrderFactory],
>>>>>>> ec26484 (implementasi demo)
  exports: [OrdersService, OrdersRepository],
})
export class OrdersModule {}
