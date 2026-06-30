// backend/src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { AppThrottlerGuard } from './common/guards/app-throttler.guard';
import appConfig from './config/app.config';
import { validateEnvironment } from './config/environment.validation';
import { PrismaModule } from './prisma/prisma.module';
import { CommonModule } from './common/common.module';
import { IntegrationsModule } from './integrations/integrations.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { ServicesModule } from './modules/services/services.module';
import { JobsModule } from './modules/jobs/jobs.module';
import { ApplicationsModule } from './modules/applications/applications.module'; // ✅ PASTIKAN PATH BENAR
import { OrdersModule } from './modules/orders/orders.module';
import { ReviewsModule } from './modules/reviews/reviews.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { WithdrawalsModule } from './modules/withdrawals/withdrawals.module';
import { ChatModule } from './modules/chat/chat.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { DisputesModule } from './modules/disputes/disputes.module';
import { AdminModule } from './modules/admin/admin.module';
import { SimulationModule } from './modules/simulation/simulation.module';
import { UploadsModule } from './modules/uploads/uploads.module';
import { CompatModule } from './compat/compat.module';
import {
  VerifiedContactGuard,
  VerifiedKtpGuard,
  VerifiedWithdrawalGuard,
  VerifiedTransactionGuard,
  VerifiedSellerGuard,
} from './common/guards/verification.guards';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
      validate: validateEnvironment,
    }),
    ScheduleModule.forRoot(),
    ThrottlerModule.forRoot([
      {
        name: 'short',
        ttl: 1000,
        limit: process.env.NODE_ENV === 'production' ? 15 : 80,
      },
      {
        name: 'medium',
        ttl: 10_000,
        limit: process.env.NODE_ENV === 'production' ? 80 : 400,
      },
      {
        name: 'long',
        ttl: 60_000,
        limit: process.env.NODE_ENV === 'production' ? 300 : 1200,
      },
    ]),
    PrismaModule,
    CommonModule,
    IntegrationsModule,
    AuthModule,
    UsersModule,
    CategoriesModule,
    ServicesModule,
    JobsModule,
    ApplicationsModule,
    OrdersModule,
    ReviewsModule,
    PaymentsModule,
    WithdrawalsModule,
    ChatModule,
    NotificationsModule,
    DisputesModule,
    AdminModule,
    SimulationModule,
    UploadsModule,
    CompatModule,
  ],
  providers: [
    { provide: APP_GUARD, useClass: AppThrottlerGuard },
    VerifiedContactGuard,
    VerifiedKtpGuard,
    VerifiedWithdrawalGuard,
    VerifiedTransactionGuard,
    VerifiedSellerGuard,
  ],
})
export class AppModule {}
