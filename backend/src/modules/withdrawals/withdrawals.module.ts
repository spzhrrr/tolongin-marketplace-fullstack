<<<<<<< HEAD
// src/modules/withdrawals/withdrawals.module.ts
=======
>>>>>>> ec26484 (implementasi demo)
import { Module } from '@nestjs/common';
import { WithdrawalsController } from './controllers/withdrawals.controller';
import { WithdrawalsService } from './services/withdrawals.service';
import { WithdrawalsRepository } from './repositories/withdrawals.repository';
import { PrismaModule } from '../../prisma/prisma.module';
<<<<<<< HEAD

@Module({
  imports: [PrismaModule],
=======
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
  imports: [PrismaModule, NotificationsModule],
>>>>>>> ec26484 (implementasi demo)
  controllers: [WithdrawalsController],
  providers: [WithdrawalsService, WithdrawalsRepository],
  exports: [WithdrawalsService, WithdrawalsRepository],
})
export class WithdrawalsModule {}
