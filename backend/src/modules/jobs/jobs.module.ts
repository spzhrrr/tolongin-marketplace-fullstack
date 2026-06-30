import { Module, forwardRef } from '@nestjs/common';
import { JobsController } from './controllers/jobs.controller';
import { JobsService } from './services/jobs.service';
import { JobsRepository } from './repositories/jobs.repository';
import { JobFactory } from './factories/job.factory';
import { NotificationsModule } from '../notifications/notifications.module';
import { SimulationModule } from '../simulation/simulation.module';

@Module({
  imports: [NotificationsModule, forwardRef(() => SimulationModule)],
  controllers: [JobsController],
  providers: [JobsService, JobsRepository, JobFactory],
  exports: [JobsService, JobsRepository],
})
export class JobsModule {}
