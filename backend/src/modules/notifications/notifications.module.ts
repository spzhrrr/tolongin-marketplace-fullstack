import { Global, Module } from '@nestjs/common';
import { NotificationsController } from './controllers/notifications.controller';
import { NotificationsService } from './services/notifications.service';
import { NotificationsRepository } from './repositories/notifications.repository';
<<<<<<< HEAD
=======
import { PrismaModule } from '../../prisma/prisma.module';
import { NotificationsGateway, NotificationsRealtime } from './notifications.gateway';
import { AuthModule } from '../auth/auth.module';
>>>>>>> 961a4cc (Update: Menyinkronkan perubahan lokal dengan repositori remote)

@Global()
@Module({
<<<<<<< HEAD
  controllers: [NotificationsController],
  providers: [NotificationsService, NotificationsRepository],
  exports: [NotificationsService],
=======
  imports: [PrismaModule, AuthModule],
  controllers: [NotificationsController],
  providers: [
    NotificationsService,
    NotificationsRepository,
    NotificationsRealtime,
    NotificationsGateway,
  ],
  exports: [NotificationsService, NotificationsRealtime], // ✅ PASTIKAN DIEXPORT
>>>>>>> 961a4cc (Update: Menyinkronkan perubahan lokal dengan repositori remote)
})
export class NotificationsModule {}
