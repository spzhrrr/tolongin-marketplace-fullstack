<<<<<<< HEAD
=======
// backend/src/modules/applications/applications.module.ts
>>>>>>> ec26484 (implementasi demo)
import { Module } from '@nestjs/common';
import { ApplicationsController } from './controllers/applications.controller';
import { ApplicationsService } from './services/applications.service';
import { ApplicationsRepository } from './repositories/applications.repository';
import { JobsModule } from '../jobs/jobs.module';
<<<<<<< HEAD

@Module({
  imports: [JobsModule],
  controllers: [ApplicationsController],
  providers: [ApplicationsService, ApplicationsRepository],
  exports: [ApplicationsService, ApplicationsRepository],
=======
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
  imports: [JobsModule, NotificationsModule],
  controllers: [ApplicationsController],
  providers: [ApplicationsService, ApplicationsRepository],
  exports: [ApplicationsService],
>>>>>>> ec26484 (implementasi demo)
})
export class ApplicationsModule {}
