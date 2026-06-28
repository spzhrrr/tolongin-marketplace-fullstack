import { Module } from '@nestjs/common';
import { ServicesController } from './controllers/services.controller';
import { ServicesService } from './services/services.service';
import { ServicesRepository } from './repositories/services.repository';
import { CategoriesModule } from '../categories/categories.module';
import { ServiceFactory } from './factories/service.factory';
<<<<<<< HEAD

@Module({
  imports: [CategoriesModule],
=======
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
  imports: [CategoriesModule, NotificationsModule],
>>>>>>> ec26484 (implementasi demo)
  controllers: [ServicesController],
  providers: [ServicesService, ServicesRepository, ServiceFactory],
  exports: [ServicesService, ServicesRepository],
})
export class ServicesModule {}
