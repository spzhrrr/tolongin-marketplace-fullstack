import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
  ApiConsumes,
  ApiBody,
} from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';
import { diskStorage } from 'multer';
import { mkdirSync } from 'fs';
import { resolve } from 'path';
import { randomInt, randomUUID } from 'crypto';
import { CurrentUser } from '../../../common/decorators/current-user.decorator';
import { PrismaService } from '../../../prisma/prisma.service';
import { EMAIL_SERVICE } from '../../../integrations/email/email.interface';
import type { IEmailService } from '../../../integrations/email/email.interface';
import { SMS_SERVICE } from '../../../integrations/sms/sms.interface';
import type { ISmsService } from '../../../integrations/sms/sms.interface';

// Definisikan tipe untuk file
interface MulterFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  destination: string;
  filename: string;
  path: string;
  buffer: Buffer;
}

function generateOtp() {
  return String(randomInt(100000, 1000000));
}

// Konfigurasi upload file
const storageConfig = {
  storage: diskStorage({
    destination: (_req, file, cb) => {
      const subfolder = file.fieldname === 'bankProof' ? 'bank' : 'ktp';
      const folder = resolve(process.cwd(), 'uploads', subfolder);
      mkdirSync(folder, { recursive: true });
      cb(null, folder);
    },
    filename: (_req, file, cb) => {
      const extension = file.mimetype === 'image/png' ? '.png' : '.jpg';
      cb(null, randomUUID() + extension);
    },
  }),
  fileFilter: (req, file, cb) => {
    const allowed = ['image/jpeg', 'image/png', 'image/jpg'];
    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new BadRequestException('Hanya file JPG/PNG yang diperbolehkan'),
        false,
      );
    }
  },
  limits: { fileSize: 5 * 1024 * 1024 },
};

@ApiTags('Verification')
@ApiBearerAuth('jwt')
@Controller('verification')
export class VerificationController {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(EMAIL_SERVICE) private readonly email: IEmailService,
    @Inject(SMS_SERVICE) private readonly sms: ISmsService,
  ) {}

  @Get('status')
  @ApiOperation({ summary: 'Get my verification status' })
  async status(@CurrentUser('id') uid: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: uid },
      include: {
        bankAccounts: {
          where: { isDefault: true },
          take: 1,
        },
      },
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const defaultBank = user.bankAccounts[0];

    return {
      ktp: {
        status: user.ktpVerified
          ? 'VERIFIED'
          : user.ktpSubmittedAt
            ? user.ktpRejectedReason
              ? 'REJECTED'
              : 'PENDING'
            : 'NOT_SUBMITTED',
        rejectionReason: user.ktpRejectedReason,
        photo: user.ktpPhoto,
        number: user.ktpNumber,
        selfie: user.ktpSelfie,
        submittedAt: user.ktpSubmittedAt,
      },
      bank: {
        status: defaultBank?.isVerified
          ? 'VERIFIED'
          : defaultBank
            ? 'PENDING'
            : 'NOT_SUBMITTED',
        bankName: defaultBank?.bankName,
        accountNumber: defaultBank?.accountNumber,
        accountName: defaultBank?.accountName,
      },
      emailVerified: user.emailVerified,
      phoneVerified: user.phoneVerified,
    };
  }

  // ==================== EMAIL OTP ====================
  @Post('email/request')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Send OTP to email' })
  async emailRequest(@CurrentUser('id') uid: string) {
    const u = await this.prisma.user.findUnique({ where: { id: uid } });
    if (!u) throw new BadRequestException('User not found');
    if (u.emailVerified)
      return { ok: true, message: 'Email sudah terverifikasi' };

    const otp = generateOtp();
    const hash = await bcrypt.hash(otp, 8);

    await this.prisma.user.update({
      where: { id: uid },
      data: {
        emailOtpHash: hash,
        emailOtpExpiresAt: new Date(Date.now() + 15 * 60 * 1000),
      },
    });

    await this.email.sendOtp(u.email, otp);
    const demoMode =
      process.env.DEMO_MODE_ENABLED === 'true' ||
      process.env.NODE_ENV !== 'production';
    return { ok: true, demoOtp: demoMode ? otp : undefined };
  }

  @Post('email/confirm')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Confirm email OTP' })
  async emailConfirm(
    @CurrentUser('id') uid: string,
    @Body() body: { otp: string },
  ) {
    const u = await this.prisma.user.findUnique({ where: { id: uid } });
    if (!u || !u.emailOtpHash || !u.emailOtpExpiresAt) {
      throw new BadRequestException(
        'OTP tidak ditemukan, silakan request ulang',
      );
    }
    if (u.emailOtpExpiresAt < new Date()) {
      throw new BadRequestException('OTP kedaluwarsa');
    }

    const isValid = await bcrypt.compare(
      String(body?.otp || ''),
      u.emailOtpHash,
    );
    if (!isValid) throw new BadRequestException('OTP salah');

    await this.prisma.user.update({
      where: { id: uid },
      data: {
        emailVerified: true,
        emailVerifiedAt: new Date(),
        emailOtpHash: null,
        emailOtpExpiresAt: null,
      },
    });

    return { ok: true };
  }

  // Aliases for /verify (frontend compatibility)
  @Post('email/verify')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Confirm email OTP (alias)' })
  async emailVerifyAlias(
    @CurrentUser('id') uid: string,
    @Body() body: { otp: string },
  ) {
    return this.emailConfirm(uid, body);
  }

  // ==================== PHONE OTP ====================
  @Post('phone/request')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Send OTP to phone' })
  async phoneRequest(
    @CurrentUser('id') uid: string,
    @Body() body: { phone?: string },
  ) {
    const u = await this.prisma.user.findUnique({ where: { id: uid } });
    if (!u) throw new BadRequestException('User not found');

    const phone = (body?.phone || u.phone || '').trim();
    if (!phone) throw new BadRequestException('Nomor telepon belum diisi');
    if (u.phoneVerified && phone === u.phone) {
      return { ok: true, message: 'Nomor sudah terverifikasi' };
    }

    const otp = generateOtp();
    const hash = await bcrypt.hash(otp, 8);

    await this.prisma.user.update({
      where: { id: uid },
      data: {
        phone,
        phoneOtpHash: hash,
        phoneOtpExpiresAt: new Date(Date.now() + 10 * 60 * 1000),
        phoneVerified: false,
      },
    });

    await this.sms.sendOtp(phone, otp);
    const demoMode =
      process.env.DEMO_MODE_ENABLED === 'true' ||
      process.env.NODE_ENV !== 'production';
    return { ok: true, demoOtp: demoMode ? otp : undefined };
  }

  @Post('phone/confirm')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Confirm phone OTP' })
  async phoneConfirm(
    @CurrentUser('id') uid: string,
    @Body() body: { otp: string },
  ) {
    const u = await this.prisma.user.findUnique({ where: { id: uid } });
    if (!u || !u.phoneOtpHash || !u.phoneOtpExpiresAt) {
      throw new BadRequestException(
        'OTP tidak ditemukan, silakan request ulang',
      );
    }
    if (u.phoneOtpExpiresAt < new Date()) {
      throw new BadRequestException('OTP kedaluwarsa');
    }

    const isValid = await bcrypt.compare(
      String(body?.otp || ''),
      u.phoneOtpHash,
    );
    if (!isValid) throw new BadRequestException('OTP salah');

    await this.prisma.user.update({
      where: { id: uid },
      data: {
        phoneVerified: true,
        phoneVerifiedAt: new Date(),
        phoneOtpHash: null,
        phoneOtpExpiresAt: null,
      },
    });

    return { ok: true };
  }

  // Aliases for /verify (frontend compatibility)
  @Post('phone/verify')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Confirm phone OTP (alias)' })
  async phoneVerifyAlias(
    @CurrentUser('id') uid: string,
    @Body() body: { otp: string },
  ) {
    return this.phoneConfirm(uid, body);
  }

  // ==================== KTP UPLOAD (FILE) ====================
  @Post('ktp')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Upload KTP file for verification' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        ktpImage: { type: 'string', format: 'binary' },
      },
    },
  })
  @UseInterceptors(FileInterceptor('ktpImage', storageConfig))
  async uploadKtp(
    @CurrentUser('id') uid: string,
    @UploadedFile() file: MulterFile,
  ) {
    if (!file) {
      throw new BadRequestException('File KTP tidak ditemukan');
    }

    const ktpPhotoUrl = '/api/uploads/ktp/' + file.filename;

    await this.prisma.user.update({
      where: { id: uid },
      data: {
        ktpPhoto: ktpPhotoUrl,
        ktpSubmittedAt: new Date(),
        ktpVerified: false,
        ktpRejectedReason: null,
      },
    });

    return {
      ok: true,
      message: 'KTP uploaded, waiting for admin verification',
    };
  }

  // ==================== BANK ACCOUNT (TIDAK PAKAI FILE UPLOAD, LANGSUNG KE BankAccount) ====================
  @Post('bank')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Submit bank account for verification' })
  async submitBank(
    @CurrentUser('id') uid: string,
    @Body()
    body: { bankName: string; accountNumber: string; accountName: string },
  ) {
    if (!body.bankName || !body.accountNumber || !body.accountName) {
      throw new BadRequestException('Lengkapi data bank');
    }

    // Cek apakah sudah ada bank account untuk user ini
    const existingBank = await this.prisma.bankAccount.findFirst({
      where: { userId: uid },
    });

    if (existingBank) {
      // Update existing
      await this.prisma.bankAccount.update({
        where: { id: existingBank.id },
        data: {
          bankName: body.bankName,
          accountNumber: body.accountNumber,
          accountName: body.accountName,
          isVerified: false,
        },
      });
    } else {
      // Create new
      await this.prisma.bankAccount.create({
        data: {
          userId: uid,
          bankName: body.bankName,
          accountNumber: body.accountNumber,
          accountName: body.accountName,
          isDefault: true,
          isVerified: false,
        },
      });
    }

    return {
      ok: true,
      message: 'Bank data submitted, waiting for admin verification',
    };
  }

  // ==================== LEGACY ENDPOINTS ====================
  @Post('ktp/submit')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Submit KTP data (JSON) for verification' })
  async submitKtpLegacy(
    @CurrentUser('id') uid: string,
    @Body() body: { ktpNumber?: string; ktpPhoto?: string; ktpSelfie?: string },
  ) {
    if (!body?.ktpNumber || !body?.ktpPhoto || !body?.ktpSelfie) {
      throw new BadRequestException(
        'Lengkapi nomor KTP, foto KTP, dan selfie dengan KTP',
      );
    }

    await this.prisma.user.update({
      where: { id: uid },
      data: {
        ktpNumber: body.ktpNumber,
        ktpPhoto: body.ktpPhoto,
        ktpSelfie: body.ktpSelfie,
        ktpSubmittedAt: new Date(),
        ktpVerified: false,
        ktpRejectedReason: null,
      },
    });

    return { ok: true, status: 'PENDING' };
  }

  @Post('bank/verify')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Mark bank account as verified' })
  async verifyBank(@CurrentUser('id') uid: string) {
    const bankAccount = await this.prisma.bankAccount.findFirst({
      where: { userId: uid },
    });

    if (!bankAccount) {
      throw new BadRequestException('Tambah rekening bank dulu');
    }

    await this.prisma.bankAccount.update({
      where: { id: bankAccount.id },
      data: { isVerified: true },
    });

    return { ok: true };
  }

  // ==================== DEMO ENDPOINTS (FOR TESTING) ====================
  @Post('demo/ktp')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'DEMO: Instant KTP verification' })
  async demoKtp(@CurrentUser('id') uid: string) {
    await this.prisma.user.update({
      where: { id: uid },
      data: {
        ktpVerified: true,
        ktpVerifiedAt: new Date(),
        ktpSubmittedAt: new Date(),
        ktpRejectedReason: null,
        ktpNumber: 'DEMO1234567890',
        ktpPhoto: 'https://placehold.co/400x300/0a66c2/ffffff?text=DEMO+KTP',
        ktpSelfie:
          'https://placehold.co/400x300/0a66c2/ffffff?text=DEMO+Selfie',
        verified: true,
      },
    });
    return { ok: true, message: 'KTP verified (demo mode)' };
  }

  @Post('demo/bank')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'DEMO: Instant Bank verification' })
  async demoBank(
    @CurrentUser('id') uid: string,
    @Body()
    body: { bankName: string; accountNumber: string; accountName: string },
  ) {
    if (!body.bankName || !body.accountNumber || !body.accountName) {
      throw new BadRequestException('Lengkapi data bank');
    }

    // Cek apakah sudah ada bank account
    const existingBank = await this.prisma.bankAccount.findFirst({
      where: { userId: uid },
    });

    if (existingBank) {
      await this.prisma.bankAccount.update({
        where: { id: existingBank.id },
        data: {
          bankName: body.bankName,
          accountNumber: body.accountNumber,
          accountName: body.accountName,
          isVerified: true,
          bankProof:
            'https://placehold.co/400x300/0a66c2/ffffff?text=DEMO+Bank+Proof',
        },
      });
    } else {
      await this.prisma.bankAccount.create({
        data: {
          userId: uid,
          bankName: body.bankName,
          accountNumber: body.accountNumber,
          accountName: body.accountName,
          isDefault: true,
          isVerified: true,
          bankProof:
            'https://placehold.co/400x300/0a66c2/ffffff?text=DEMO+Bank+Proof',
        },
      });
    }

    // Update user verified status
    await this.prisma.user.update({
      where: { id: uid },
      data: { verified: true },
    });

    return { ok: true, message: 'Bank verified (demo mode)' };
  }
}
