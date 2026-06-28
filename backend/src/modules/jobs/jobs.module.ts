import { Module } from '@nestjs/common';
import { JobsController } from './controllers/jobs.controller';
import { JobsService } from './services/jobs.service';
import { JobsRepository } from './repositories/jobs.repository';
import { JobFactory } from './factories/job.factory';
<<<<<<< HEAD

@Module({
=======
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
  imports: [NotificationsModule],
>>>>>>> ec26484 (implementasi demo)
  controllers: [JobsController],
  providers: [JobsService, JobsRepository, JobFactory],
  exports: [JobsService, JobsRepository],
})
export class JobsModule {}
