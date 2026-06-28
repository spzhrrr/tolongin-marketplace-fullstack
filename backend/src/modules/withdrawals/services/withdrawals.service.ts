import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { WithdrawalsRepository } from './../repositories/withdrawals.repository';
import {
  CreateWithdrawalDto,
  CreateBankAccountDto,
} from '../dto/withdrawal.dto';
<<<<<<< HEAD

@Injectable()
export class WithdrawalsService {
  constructor(private readonly repo: WithdrawalsRepository) {}

  async create(sellerId: string, dto: CreateWithdrawalDto) {
    const acc = await this.repo.findBankAccountById(dto.bankAccountId);
    if (!acc || acc.userId !== sellerId)
      throw new NotFoundException('Bank account not found');
    const profile = await this.repo.findUser(sellerId);
    if (!profile) throw new BadRequestException('Seller profile not found');
    if (profile.balance < dto.amount)
      throw new BadRequestException('Saldo tidak mencukupi');
    const created = await this.repo.createWithdrawal({
      seller: { connect: { id: sellerId } },
      amount: dto.amount,
      bankName: acc.bankName,
      accountNumber: acc.accountNumber,
      accountName: acc.accountName,
    });
    await this.repo.updateBalance(sellerId, -dto.amount);
    return created;
=======
import { PrismaService } from '../../../prisma/prisma.service';
import { NotificationsService } from '../../notifications/services/notifications.service';
import { WITHDRAWAL_STATUS } from '../../../common/constants/enums';

// Minimum nominal penarikan (sinkron dengan PlatformSetting `min_withdrawal`).
const MIN_WITHDRAWAL_DEFAULT = 50_000;

@Injectable()
export class WithdrawalsService {
  constructor(
    private readonly repo: WithdrawalsRepository,
    private readonly prisma: PrismaService,
    private readonly notifications: NotificationsService,
  ) {}

  private async getMinWithdrawal(): Promise<number> {
    const setting = await this.prisma.platformSetting.findUnique({
      where: { key: 'min_withdrawal' },
    });
    const value = setting ? parseInt(setting.value, 10) : NaN;
    return Number.isFinite(value) && value > 0 ? value : MIN_WITHDRAWAL_DEFAULT;
  }

  /**
   * Membuat permintaan penarikan dana secara atomik.
   *
   * Race condition pada implementasi sebelumnya:
   *   create()  -> updateBalance(-amount)
   * Saldo bisa minus jika dua request datang bersamaan. Kini kita pakai
   * `updateMany` bersyarat di dalam `$transaction` sehingga decrement saldo
   * hanya berhasil jika saldo masih mencukupi.
   */
  async create(sellerId: string, dto: CreateWithdrawalDto) {
    if (!dto.amount || dto.amount <= 0)
      throw new BadRequestException('Nominal penarikan harus lebih dari nol');

    const minimum = await this.getMinWithdrawal();
    if (dto.amount < minimum) {
      throw new BadRequestException(
        `Minimal penarikan adalah Rp${minimum.toLocaleString('id-ID')}`,
      );
    }

    const acc = await this.repo.findBankAccountById(dto.bankAccountId);
    if (!acc || acc.userId !== sellerId)
      throw new NotFoundException('Bank account not found');
    if (!acc.isVerified)
      throw new BadRequestException(
        'Rekening bank belum diverifikasi. Hubungi admin untuk verifikasi.',
      );

    const result = await this.prisma.$transaction(async (tx) => {
      // Decrement bersyarat — hanya berhasil jika saldo cukup. Ini menutup
      // race condition tanpa perlu locking eksplisit.
      const claimed = await tx.user.updateMany({
        where: { id: sellerId, balance: { gte: dto.amount } },
        data: { balance: { decrement: dto.amount } },
      });
      if (claimed.count === 0) {
        throw new BadRequestException('Saldo tidak mencukupi');
      }
      const created = await tx.withdrawal.create({
        data: {
          seller: { connect: { id: sellerId } },
          amount: dto.amount,
          bankName: acc.bankName,
          accountNumber: acc.accountNumber,
          accountName: acc.accountName,
          status: WITHDRAWAL_STATUS.PENDING,
        },
      });
      return created;
    });

    await this.notifications
      .notify(
        sellerId,
        'WITHDRAWAL',
        '💸 Permintaan Penarikan Diterima',
        `Permintaan penarikan Rp${dto.amount.toLocaleString(
          'id-ID',
        )} sedang diproses (1-2 hari kerja).`,
        { withdrawalId: result.id, amount: dto.amount },
        '/dashboard/earnings',
      )
      .catch(() => undefined);

    return result;
>>>>>>> ec26484 (implementasi demo)
  }

  listMine(sellerId: string) {
    return this.repo.findWithdrawalsBySeller(sellerId);
  }

  async balance(sellerId: string) {
    const profile = await this.repo.findUser(sellerId);
    return { balance: profile?.balance || 0 };
  }

  bankAccounts(userId: string) {
    return this.repo.findBankAccountsByUser(userId);
  }

  addBankAccount(userId: string, dto: CreateBankAccountDto) {
    return this.repo.createBankAccount({
      user: { connect: { id: userId } },
      bankName: dto.bankName,
      accountNumber: dto.accountNumber,
      accountName: dto.accountName,
      isDefault: !!dto.isDefault,
    });
  }

  async deleteBankAccount(id: string, userId: string) {
    const acc = await this.repo.findBankAccountById(id);
    if (!acc) throw new NotFoundException();
    if (acc.userId !== userId) throw new ForbiddenException();
    await this.repo.deleteBankAccount(id);
    return { message: 'Bank account deleted' };
  }
}
