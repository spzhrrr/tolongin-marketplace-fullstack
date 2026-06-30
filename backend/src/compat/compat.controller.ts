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
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from '../common/decorators/public.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { AuthService } from '../modules/auth/services/auth.service';
import { ChatService } from '../modules/chat/services/chat.service';
import { AdminService } from '../modules/admin/services/admin.service';
import { OrdersService } from '../modules/orders/services/orders.service';
import { ReviewsService } from '../modules/reviews/services/reviews.service';
import { ApplicationsService } from '../modules/applications/services/applications.service';
import { PaymentsService } from '../modules/payments/services/payments.service';
import { PrismaService } from '../prisma/prisma.service';
import { ORDER_STATUS, PAYMENT_STATUS, ROLE } from '../common/constants/enums';
import { VerifiedTransactionGuard } from '../common/guards/verification.guards';

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
    private readonly reviews: ReviewsService,
    private readonly applications: ApplicationsService,
    private readonly payments: PaymentsService,
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
  @Get('admin/activity')
  @ApiOperation({ summary: 'Alias for /admin/activity-log' })
  async adminActivity(@CurrentUser('role') role: string) {
    if (role !== ROLE.ADMIN) throw new ForbiddenException();
    const rows = await this.admin.activity();
    return rows.map((row: any) => ({
      ...row,
      type: row.action,
      message:
        [row.entity, row.entityId].filter(Boolean).join(' ') || row.action,
    }));
  }

  @ApiBearerAuth('jwt')
  @Post('admin/users/:id/verify')
  @ApiOperation({ summary: 'Alias for approving a user KYC submission' })
  async verifyUser(
    @CurrentUser('role') role: string,
    @CurrentUser('id') adminId: string,
    @Param('id') id: string,
  ) {
    if (role !== ROLE.ADMIN) throw new ForbiddenException();
    return this.admin.approveKyc(id, adminId);
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
  async toggleFav(
    @CurrentUser('id') uid: string,
    @Param('serviceId') serviceId: string,
  ) {
    const existing = await this.prisma.favorite.findUnique({
      where: { userId_serviceId: { userId: uid, serviceId } },
    });
    if (existing) {
      await this.prisma.favorite.delete({
        where: { userId_serviceId: { userId: uid, serviceId } },
      });
      return { ok: true, favorited: false };
    }
    await this.prisma.favorite.create({
      data: { userId: uid, serviceId },
    });
    return { ok: true, favorited: true };
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
    @Param('orderId') orderId: string,
  ) {
    return this.payments.confirmDemo(uid, orderId);
  }
  // ----- order create (frontend posts to /orders) -----
  @ApiBearerAuth('jwt')
  @UseGuards(VerifiedTransactionGuard)
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

  @ApiBearerAuth('jwt')
  @Post('orders/:id/review')
  @ApiOperation({ summary: 'Alias for POST /reviews with orderId from route' })
  createOrderReview(
    @CurrentUser('id') uid: string,
    @Param('id') orderId: string,
    @Body() body: any,
  ) {
    return this.reviews.create(uid, { ...body, orderId });
  }

  @Public()
  @Get('services/:id/reviews')
  @ApiOperation({ summary: 'Alias for /reviews/service/:serviceId' })
  serviceReviews(@Param('id') serviceId: string) {
    return this.reviews.getByService(serviceId);
  }

  @ApiBearerAuth('jwt')
  @Post('applications/:id/decision')
  @ApiOperation({ summary: 'Alias for accepting/rejecting applications' })
  decideApplication(
    @CurrentUser('id') uid: string,
    @Param('id') id: string,
    @Body() body: any,
  ) {
    const status = String(body?.status || '').toUpperCase();
    if (status === 'ACCEPTED') return this.applications.accept(id, uid);
    if (status === 'REJECTED') {
      return this.applications.reject(id, uid, {
        reason: body?.reason || 'Ditolak oleh pemilik pekerjaan',
      });
    }
    return { error: 'Unsupported decision status' };
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
