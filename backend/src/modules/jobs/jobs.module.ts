import { Module } from '@nestjs/common';
import { JobsController } from './controllers/jobs.controller';
import { JobsService } from './services/jobs.service';
import { JobsRepository } from './repositories/jobs.repository';
import { JobFactory } from './factories/job.factory';

@Module({
  controllers: [JobsController],
  providers: [JobsService, JobsRepository, JobFactory],
  exports: [JobsService, JobsRepository],
})
export class JobsModule {}
