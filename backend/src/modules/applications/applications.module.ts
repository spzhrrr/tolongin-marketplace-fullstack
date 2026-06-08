import { Module } from '@nestjs/common';
import { ApplicationsController } from './controllers/applications.controller';
import { ApplicationsService } from './services/applications.service';
import { ApplicationsRepository } from './repositories/applications.repository';
import { JobsModule } from '../jobs/jobs.module';

@Module({
  imports: [JobsModule],
  controllers: [ApplicationsController],
  providers: [ApplicationsService, ApplicationsRepository],
  exports: [ApplicationsService, ApplicationsRepository],
})
export class ApplicationsModule {}
