<<<<<<< HEAD
=======
// backend/src/modules/reviews/reviews.module.ts
>>>>>>> ec26484 (implementasi demo)
import { Module } from '@nestjs/common';
import { ReviewsController } from './controllers/reviews.controller';
import { ReviewsService } from './services/reviews.service';
import { ReviewsRepository } from './repositories/reviews.repository';
import { OrdersModule } from '../orders/orders.module';
<<<<<<< HEAD

@Module({
  imports: [OrdersModule],
=======
import { NotificationsModule } from '../notifications/notifications.module'; // ✅ TAMBAHKAN

@Module({
  imports: [OrdersModule, NotificationsModule], // ✅ TAMBAHKAN
>>>>>>> ec26484 (implementasi demo)
  controllers: [ReviewsController],
  providers: [ReviewsService, ReviewsRepository],
  exports: [ReviewsService],
})
export class ReviewsModule {}
