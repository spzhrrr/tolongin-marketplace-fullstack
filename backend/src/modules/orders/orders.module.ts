import { Module } from '@nestjs/common';
import { OrdersController } from './controllers/orders.controller';
import { OrdersService } from './services/orders.service';
import { OrdersRepository } from './repositories/orders.repository';
import { ServicesModule } from '../services/services.module';
import { ApplicationsModule } from '../applications/applications.module';

@Module({
  imports: [ServicesModule, ApplicationsModule],
  controllers: [OrdersController],
  providers: [OrdersService, OrdersRepository],
  exports: [OrdersService, OrdersRepository],
})
export class OrdersModule {}
