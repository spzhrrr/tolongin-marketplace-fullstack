import {
  Injectable,
  NotFoundException,
  ConflictException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { ApplicationsRepository } from '../repositories/applications.repository';
import { JobsRepository } from '../../jobs/repositories/jobs.repository';
import {
  CreateApplicationDto,
  UpdateApplicationDto,
  RejectApplicationDto,
} from '../dto/application.dto';
import {
  parseJsonField,
  stringifyJsonField,
} from '../../../common/utils/helpers';
import {
  APPLICATION_STATUS,
  JOB_STATUS,
} from '../../../common/constants/enums';

@Injectable()
export class ApplicationsService {
  constructor(
    private readonly repo: ApplicationsRepository,
    private readonly jobsRepo: JobsRepository,
  ) {}

  private toDto(a: any) {
    return { ...a, portfolioIds: parseJsonField<string[]>(a.portfolioIds, []) };
  }

  async apply(sellerId: string, dto: CreateApplicationDto) {
    const job = await this.jobsRepo.findById(dto.jobId);
    if (!job) throw new NotFoundException('Job not found');
    if (job.status !== JOB_STATUS.OPEN)
      throw new BadRequestException('Job is not open for applications');
    if (job.buyerId === sellerId)
      throw new BadRequestException('Tidak bisa melamar proyek Anda sendiri');

    // Bidding range: 50% - 150% of job.budget
    const MIN_PCT = 0.5;
    const MAX_PCT = 1.5;
    const minPrice = Math.round(job.budget * MIN_PCT);
    const maxPrice = Math.round(job.budget * MAX_PCT);
    if (
      dto.proposedPrice < minPrice ||
      dto.proposedPrice > maxPrice
    ) {
      throw new BadRequestException(
        `Harga tawaran harus antara Rp${minPrice.toLocaleString('id-ID')} dan Rp${maxPrice.toLocaleString('id-ID')} (50%-150% dari budget proyek)`,
      );
    }
    if (dto.proposedDuration < 1 || dto.proposedDuration > 30) {
      throw new BadRequestException('Durasi pengerjaan harus 1-30 hari');
    }
    if (!dto.coverLetter || dto.coverLetter.trim().length < 20) {
      throw new BadRequestException(
        'Surat lamaran minimal 20 karakter',
      );
    }

    const existing = await this.repo.findByJobAndSeller(dto.jobId, sellerId);
    if (existing)
      throw new ConflictException('Anda sudah melamar proyek ini');
    const created = await this.repo.create({
      job: { connect: { id: dto.jobId } },
      seller: { connect: { id: sellerId } },
      coverLetter: dto.coverLetter,
      proposedPrice: dto.proposedPrice,
      proposedDuration: dto.proposedDuration,
      portfolioIds: stringifyJsonField(dto.portfolioIds || []),
      status: APPLICATION_STATUS.PENDING,
    });
    await this.jobsRepo.incrementApplicationsCount(dto.jobId);
    return this.toDto(created);
  }

  async getMySellerApplications(sellerId: string) {
    const items = await this.repo.findBySeller(sellerId);
    return items.map((i) => this.toDto(i));
  }

  async getJobApplications(jobId: string, buyerId: string) {
    const job = await this.jobsRepo.findById(jobId);
    if (!job) throw new NotFoundException('Job not found');
    if (job.buyerId !== buyerId) throw new ForbiddenException();
    const items = await this.repo.findByJob(jobId);
    return items.map((i) => this.toDto(i));
  }

  async update(id: string, sellerId: string, dto: UpdateApplicationDto) {
    const a = await this.repo.findById(id);
    if (!a) throw new NotFoundException('Application not found');
    if (a.sellerId !== sellerId) throw new ForbiddenException();
    if (a.status !== APPLICATION_STATUS.PENDING)
      throw new BadRequestException('Cannot edit non-pending application');
    const updated = await this.repo.update(id, dto);
    return this.toDto(updated);
  }

  async withdraw(id: string, sellerId: string) {
    const a = await this.repo.findById(id);
    if (!a) throw new NotFoundException('Application not found');
    if (a.sellerId !== sellerId) throw new ForbiddenException();
    const updated = await this.repo.update(id, {
      status: APPLICATION_STATUS.WITHDRAWN,
    });
    return this.toDto(updated);
  }

  async accept(id: string, buyerId: string) {
    const a = await this.repo.findById(id);
    if (!a) throw new NotFoundException('Application not found');
    if (a.job.buyerId !== buyerId) throw new ForbiddenException();
    if (a.status !== APPLICATION_STATUS.PENDING)
      throw new BadRequestException('Already decided');
    const updated = await this.repo.update(id, {
      status: APPLICATION_STATUS.ACCEPTED,
      reviewedAt: new Date(),
    });
    return this.toDto(updated);
  }

  async reject(id: string, buyerId: string, dto: RejectApplicationDto) {
    const a = await this.repo.findById(id);
    if (!a) throw new NotFoundException('Application not found');
    if (a.job.buyerId !== buyerId) throw new ForbiddenException();
    if (a.status !== APPLICATION_STATUS.PENDING)
      throw new BadRequestException('Already decided');
    const updated = await this.repo.update(id, {
      status: APPLICATION_STATUS.REJECTED,
      rejectionReason: dto.reason,
      reviewedAt: new Date(),
    });
    return this.toDto(updated);
  }

  findById(id: string) {
    return this.repo.findById(id);
  }
}
