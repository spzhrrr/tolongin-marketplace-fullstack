import { Module, forwardRef } from '@nestjs/common';
import { ServicesController } from './controllers/services.controller';
import { ServicesService } from './services/services.service';
import { ServicesRepository } from './repositories/services.repository';
import { CategoriesModule } from '../categories/categories.module';
import { ServiceFactory } from './factories/service.factory';
import { NotificationsModule } from '../notifications/notifications.module';
import { SimulationModule } from '../simulation/simulation.module';

@Module({
  imports: [CategoriesModule, NotificationsModule, forwardRef(() => SimulationModule)],
  controllers: [ServicesController],
  providers: [ServicesService, ServicesRepository, ServiceFactory],
  exports: [ServicesService, ServicesRepository],
})
export class ServicesModule {}
