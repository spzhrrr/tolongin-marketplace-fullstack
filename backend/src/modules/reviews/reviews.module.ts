// backend/src/modules/reviews/reviews.module.ts
import { Module, forwardRef } from '@nestjs/common';
import { ReviewsController } from './controllers/reviews.controller';
import { ReviewsService } from './services/reviews.service';
import { ReviewsRepository } from './repositories/reviews.repository';
import { OrdersModule } from '../orders/orders.module';
import { NotificationsModule } from '../notifications/notifications.module';
import { SimulationModule } from '../simulation/simulation.module';

@Module({
  imports: [
    OrdersModule,
    NotificationsModule,
    forwardRef(() => SimulationModule),
  ],
  controllers: [ReviewsController],
  providers: [ReviewsService, ReviewsRepository],
  exports: [ReviewsService],
})
export class ReviewsModule {}
