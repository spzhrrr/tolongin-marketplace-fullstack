<<<<<<< HEAD
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
=======
// backend/src/modules/notifications/notifications.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { NotificationsController } from './controllers/notifications.controller';
import { NotificationsService } from './services/notifications.service';
import { NotificationsRepository } from './repositories/notifications.repository';
import { PrismaModule } from '../../prisma/prisma.module';
import { NotificationsGateway, NotificationsRealtime } from './notifications.gateway';

@Module({
  imports: [
    PrismaModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('app.jwt.secret') || 'change-me',
      }),
    }),
  ],
>>>>>>> ec26484 (implementasi demo)
  controllers: [NotificationsController],
  providers: [
    NotificationsService,
    NotificationsRepository,
    NotificationsRealtime,
    NotificationsGateway,
  ],
<<<<<<< HEAD
  exports: [NotificationsService, NotificationsRealtime], // ✅ PASTIKAN DIEXPORT
>>>>>>> 961a4cc (Update: Menyinkronkan perubahan lokal dengan repositori remote)
=======
  exports: [NotificationsService, NotificationsRealtime],
>>>>>>> ec26484 (implementasi demo)
})
export class NotificationsModule {}
