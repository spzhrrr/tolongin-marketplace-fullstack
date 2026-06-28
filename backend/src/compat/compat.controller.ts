import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from '../common/decorators/public.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { AuthService } from '../modules/auth/services/auth.service';
import { ChatService } from '../modules/chat/services/chat.service';
import { AdminService } from '../modules/admin/services/admin.service';
import { OrdersService } from '../modules/orders/services/orders.service';
<<<<<<< HEAD
=======
import { ReviewsService } from '../modules/reviews/services/reviews.service';
import { ApplicationsService } from '../modules/applications/services/applications.service';
import { PaymentsService } from '../modules/payments/services/payments.service';
>>>>>>> 961a4cc (Update: Menyinkronkan perubahan lokal dengan repositori remote)
import { PrismaService } from '../prisma/prisma.service';
import { ROLE } from '../common/constants/enums';

/**
 * Compatibility layer mapping frontend-expected REST paths to backend services.
 * Keep the canonical modules intact – this controller only routes/aliases.
 */
@ApiTags('Compat')
@Controller()
export class CompatController {
  constructor(
    private readonly authService: AuthService,
    private readonly chat: ChatService,
    private readonly admin: AdminService,
    private readonly orders: OrdersService,
<<<<<<< HEAD
=======
    private readonly reviews: ReviewsService,
    private readonly applications: ApplicationsService,
    private readonly payments: PaymentsService,
>>>>>>> 961a4cc (Update: Menyinkronkan perubahan lokal dengan repositori remote)
    private readonly prisma: PrismaService,
  ) {}

  // ----- auth aliases -----
  @ApiBearerAuth('jwt')
  @Get('auth/me')
  @ApiOperation({ summary: 'Alias for /auth/profile' })
  me(@CurrentUser('id') uid: string) {
    return this.authService.getProfile(uid);
  }

  @ApiBearerAuth('jwt')
  @Put('users/me')
  @ApiOperation({ summary: 'Alias for PUT /auth/profile' })
  updateMe(@CurrentUser('id') uid: string, @Body() body: any) {
    return this.authService.updateProfile(uid, body);
  }

  // ----- chat aliases (no /chat prefix) -----
  @ApiBearerAuth('jwt')
  @Get('conversations')
  conversations(@CurrentUser('id') uid: string) {
    return this.chat.listConversations(uid);
  }

  @ApiBearerAuth('jwt')
  @Post('conversations')
  startConv(@CurrentUser('id') uid: string, @Body() body: any) {
    return this.chat.startConversation(uid, body);
  }

  @ApiBearerAuth('jwt')
  @Get('conversations/:id/messages')
  msgs(@Param('id') id: string, @CurrentUser('id') uid: string) {
    return this.chat.getMessages(id, uid);
  }

  @ApiBearerAuth('jwt')
  @Post('messages')
  @ApiOperation({ summary: 'Send a message (body: {conversationId, content})' })
  sendMessage(@CurrentUser('id') uid: string, @Body() body: any) {
    return this.chat.sendMessage(body.conversationId, uid, body);
  }

  // ----- admin aliases -----
  @ApiBearerAuth('jwt')
  @Get('admin/stats')
  @ApiOperation({ summary: 'Alias for /admin/dashboard/stats' })
  async stats(@CurrentUser('role') role: string) {
    if (role !== ROLE.ADMIN) throw new ForbiddenException();
    return this.admin.stats();
  }

  @ApiBearerAuth('jwt')
  @Get('admin/kyc')
  async adminKyc(
    @CurrentUser('role') role: string,
    @Query('status') status?: string,
  ) {
    if (role !== ROLE.ADMIN) throw new ForbiddenException();
    if (!status || status === 'pending') return this.admin.pendingSellers();
    return this.prisma.user.findMany({
      where:
        status === 'verified'
          ? { ktpVerified: true }
          : { ktpRejectedReason: { not: null }, ktpVerified: false },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        avatar: true,
        ktpVerified: true,
        ktpVerifiedAt: true,
        ktpRejectedReason: true,
        ktpSubmittedAt: true,
      },
    });
  }

  // ----- favorites (now persisted on Favorite table) -----
  @ApiBearerAuth('jwt')
  @Get('favorites')
  async listFavs(@CurrentUser('id') uid: string) {
    const rows = await this.prisma.favorite.findMany({
      where: { userId: uid },
      include: {
        service: {
          include: {
            seller: { select: { id: true, name: true, avatar: true } },
            category: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => r.service);
  }

  @ApiBearerAuth('jwt')
  @Post('favorites/:serviceId')
  async addFav(
    @CurrentUser('id') uid: string,
    @Param('serviceId') serviceId: string,
  ) {
    await this.prisma.favorite.upsert({
      where: { userId_serviceId: { userId: uid, serviceId } },
      update: {},
      create: { userId: uid, serviceId },
    });
    return { ok: true };
  }

  @ApiBearerAuth('jwt')
  @Delete('favorites/:serviceId')
  async removeFav(
    @CurrentUser('id') uid: string,
    @Param('serviceId') serviceId: string,
  ) {
    await this.prisma.favorite
      .delete({ where: { userId_serviceId: { userId: uid, serviceId } } })
      .catch(() => null);
    return { ok: true };
  }

  // ----- kyc -----
  @ApiBearerAuth('jwt')
  @Get('kyc/me')
  async myKyc(@CurrentUser('id') uid: string) {
    const u = await this.prisma.user.findUnique({
      where: { id: uid },
      select: {
        emailVerified: true,
        phoneVerified: true,
        ktpVerified: true,
        ktpVerifiedAt: true,
        ktpSubmittedAt: true,
        ktpRejectedReason: true,
        ktpNumber: true,
        ktpPhoto: true,
        ktpSelfie: true,
        name: true,
        bankAccounts: {
          where: { isDefault: true },
          select: {
            isVerified: true,
            bankName: true,
            accountNumber: true,
            accountName: true,
          },
          take: 1,
        },
      },
    });
    if (!u) return { status: 'NOT_SUBMITTED' };
    const status = u.ktpVerified
      ? 'approved'
      : u.ktpRejectedReason
        ? 'rejected'
        : u.ktpSubmittedAt
          ? 'pending'
          : 'not_submitted';
    return {
      status,
      emailVerified: u.emailVerified,
      phoneVerified: u.phoneVerified,
      ktpVerified: u.ktpVerified,
      bankVerified: u.bankAccounts[0]?.isVerified || false,
      rejectionReason: u.ktpRejectedReason,
      verifiedAt: u.ktpVerifiedAt,
      submittedAt: u.ktpSubmittedAt,
      data: {
        fullName: u.name,
        ktpNumber: u.ktpNumber,
        ktpPhoto: u.ktpPhoto,
        ktpSelfie: u.ktpSelfie,
        bankName: u.bankAccounts[0]?.bankName,
        bankAccountNumber: u.bankAccounts[0]?.accountNumber,
        bankAccountName: u.bankAccounts[0]?.accountName,
        rejectReason: u.ktpRejectedReason,
      },
    };
  }

  @ApiBearerAuth('jwt')
  @Post('kyc/submit')
  async submitKyc(@CurrentUser('id') uid: string, @Body() body: any) {
    if (!body?.ktpPhoto || !body?.ktpSelfie) {
      // do not throw — mock submission still acceptable
    }

    await this.prisma.$transaction(async (tx) => {
      const userData: any = {
        ktpNumber: body?.ktpNumber || null,
        ktpPhoto: body?.ktpPhoto || null,
        ktpSelfie: body?.ktpSelfie || null,
        ktpSubmittedAt: new Date(),
        ktpVerified: false,
        ktpRejectedReason: null,
      };
      if (body?.fullName) {
        userData.name = body.fullName;
      }
      await tx.user.update({ where: { id: uid }, data: userData });

      if (body?.bankName && body?.bankAccountNumber && body?.bankAccountName) {
        const existingBank = await tx.bankAccount.findFirst({
          where: { userId: uid, isDefault: true },
        });
        if (existingBank) {
          await tx.bankAccount.update({
            where: { id: existingBank.id },
            data: {
              bankName: body.bankName,
              accountNumber: body.bankAccountNumber,
              accountName: body.bankAccountName,
              isVerified: false,
            },
          });
        } else {
          await tx.bankAccount.create({
            data: {
              userId: uid,
              bankName: body.bankName,
              accountNumber: body.bankAccountNumber,
              accountName: body.bankAccountName,
              isDefault: true,
              isVerified: false,
            },
          });
        }
      }
    });

    return { status: 'pending' };
  }

  // ----- integrations status -----
  @Public()
  @Get('integrations/status')
  integrationsStatus() {
    return {
      email: { provider: 'mock', ready: true },
      sms: { provider: 'mock', ready: true },
      payment: { provider: 'mock', ready: true },
      storage: { provider: 'mock', ready: true },
    };
  }

  // ----- payments mocked config -----
  @Public()
  @Get('payments/midtrans/config')
  midtransConfig() {
    return {
      enabled: false,
      mock: true,
      clientKey: null,
      isProduction: false,
    };
  }

  @ApiBearerAuth('jwt')
  @Post('payments/demo/confirm/:orderId')
  async demoPay(
    @CurrentUser('id') uid: string,
    @CurrentUser('role') role: string,
    @Param('orderId') orderId: string,
  ) {
<<<<<<< HEAD
    // mark order ACCEPTED as if seller accepted after buyer paid; or just mark COMPLETED on demo
    return this.orders.accept(orderId, uid, role).catch(() => ({ ok: true }));
=======
    return this.payments.confirmDemo(uid, orderId);
>>>>>>> 961a4cc (Update: Menyinkronkan perubahan lokal dengan repositori remote)
  }
  // ----- order create (frontend posts to /orders) -----
  @ApiBearerAuth('jwt')
  @Post('orders')
  @ApiOperation({
    summary:
      'Generic order creation (body: { serviceId | applicationId, notes?, deliveryType?, deliveryAddress? })',
  })
  async genericCreateOrder(@CurrentUser('id') uid: string, @Body() body: any) {
    if (body?.serviceId) {
      return this.orders.createFromService(uid, body.serviceId, body);
    }
    if (body?.applicationId) {
      return this.orders.createFromApplication(uid, body.applicationId);
    }
    return { error: 'Provide serviceId or applicationId' };
  }

  @Public()
  @Get()
  @ApiOperation({ summary: 'API root' })
  getRoot() {
    return {
      message: 'Tolongin API',
      version: '2.0.0',
      docs: '/api/docs',
      status: 'running',
    };
  }
}
