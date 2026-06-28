import { Module } from '@nestjs/common';
import { CompatController } from './compat.controller';
import { AuthModule } from '../modules/auth/auth.module';
import { ChatModule } from '../modules/chat/chat.module';
import { AdminModule } from '../modules/admin/admin.module';
import { OrdersModule } from '../modules/orders/orders.module';
<<<<<<< HEAD
<<<<<<< HEAD

@Module({
  imports: [AuthModule, ChatModule, AdminModule, OrdersModule],
=======
=======
>>>>>>> ec26484 (implementasi demo)
import { ReviewsModule } from '../modules/reviews/reviews.module';
import { ApplicationsModule } from '../modules/applications/applications.module';
import { PaymentsModule } from '../modules/payments/payments.module';

@Module({
  imports: [
    AuthModule,
    ChatModule,
    AdminModule,
    OrdersModule,
    ReviewsModule,
    ApplicationsModule,
    PaymentsModule,
  ],
<<<<<<< HEAD
>>>>>>> 961a4cc (Update: Menyinkronkan perubahan lokal dengan repositori remote)
=======
>>>>>>> ec26484 (implementasi demo)
  controllers: [CompatController],
})
export class CompatModule {}
