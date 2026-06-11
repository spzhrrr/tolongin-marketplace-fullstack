import {
  Body,
  Controller,
  Get,
  Headers,
  HttpCode,
  HttpStatus,
  Post,
  Put,
  Req,
  Res,
  Query,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiProperty,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import type { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { RegisterDto } from '../dto/register.dto';
import { LoginDto } from '../dto/login.dto';
import {
  ChangePasswordDto,
  ForgotPasswordDto,
  ResetPasswordDto,
  UpdateProfileDto,
} from '../dto/password.dto';
import { Public } from '../../../common/decorators/public.decorator';
import { CurrentUser } from '../../../common/decorators/current-user.decorator';
import { AuthResponse } from '../interfaces/auth.interface';

class RefreshDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  refreshToken?: string;
}

class LogoutDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  refreshToken?: string;
}

const REFRESH_COOKIE = 'tolongin_rt';
const REFRESH_COOKIE_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000; // 7d

function setRefreshCookie(res: Response, token: string) {
  const isProd = process.env.NODE_ENV === 'production';
  res.cookie(REFRESH_COOKIE, token, {
    httpOnly: true,
    secure: isProd,
    // 'none' required for cross-origin (Railway API + Vercel frontend)
    // 'lax' only works for same-site (same domain)
    sameSite: isProd ? 'none' : 'lax',
    maxAge: REFRESH_COOKIE_MAX_AGE_MS,
    path: '/api/auth',
  });
}

function clearRefreshCookie(res: Response) {
  const isProd = process.env.NODE_ENV === 'production';
  res.clearCookie(REFRESH_COOKIE, {
    path: '/api/auth',
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? 'none' : 'lax',
  });
}

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  @ApiOperation({ summary: 'Register a new user (BUYER or SELLER)' })
  @ApiResponse({
    status: 201,
    description: 'User created. Refresh token set as httpOnly cookie.',
  })
  @ApiResponse({ status: 409, description: 'Email already registered' })
  async register(
    @Body() dto: RegisterDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<AuthResponse> {
    const r = await this.authService.register(dto);
    setRefreshCookie(res, r.refreshToken);
    return r;
  }

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login with email & password' })
  @ApiResponse({
    status: 200,
    description: 'Access token in body, refresh token in httpOnly cookie.',
  })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<AuthResponse> {
    const r = await this.authService.login(dto);
    setRefreshCookie(res, r.refreshToken);
    return r;
  }

  @Public()
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Refresh access token using httpOnly cookie' })
  async refresh(
    @Body() body: RefreshDto,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<AuthResponse> {
    // Accept token from: 1) httpOnly cookie, 2) body (fallback)
    const tokenFromCookie = (req.cookies as any)?.[REFRESH_COOKIE];
    const tokenFromBody = body?.refreshToken;
    const refreshToken = tokenFromCookie || tokenFromBody;
    if (!refreshToken) {
      throw new BadRequestException('No refresh token provided');
    }
    const r = await this.authService.refresh(refreshToken);
    setRefreshCookie(res, r.refreshToken);
    return r;
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Logout (blacklist tokens & clear cookie)' })
  async logout(
    @Headers('authorization') auth: string,
    @Body() body: LogoutDto,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const accessToken = auth?.replace('Bearer ', '');
    const tokenFromCookie = (req.cookies as any)?.[REFRESH_COOKIE];
    const tokenFromBody = body?.refreshToken;
    const refreshToken = tokenFromCookie || tokenFromBody;
    clearRefreshCookie(res);
    return this.authService.logout(accessToken, refreshToken);
  }

  @ApiBearerAuth('jwt')
  @Get('me')
  @ApiOperation({ summary: 'Get current user profile' })
  async me(@CurrentUser('id') uid: string) {
    return this.authService.getProfile(uid);
  }

  @ApiBearerAuth('jwt')
  @Put('profile')
  @ApiOperation({ summary: 'Update current user profile' })
  async updateProfile(
    @CurrentUser('id') uid: string,
    @Body() dto: UpdateProfileDto,
  ) {
    return this.authService.updateProfile(uid, dto);
  }

  @ApiBearerAuth('jwt')
  @Post('change-password')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Change password' })
  async changePassword(
    @CurrentUser('id') uid: string,
    @Body() dto: ChangePasswordDto,
  ) {
    await this.authService.changePassword(uid, dto);
    return { message: 'Password berhasil diubah' };
  }

  @Public()
  @Post('forgot-password')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Request password reset link' })
  async forgotPassword(@Body() dto: ForgotPasswordDto) {
    return this.authService.forgotPassword(dto);
  }

  @Public()
  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Reset password with token' })
  async resetPassword(@Body() dto: ResetPasswordDto) {
    await this.authService.resetPassword(dto);
    return { message: 'Password berhasil direset' };
  }

  @ApiBearerAuth('jwt')
  @Post('send-verification-email')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Send email verification OTP' })
  async sendVerificationEmail(@CurrentUser('id') uid: string) {
    return this.authService.sendVerificationEmail(uid);
  }

  @Public()
  @Get('verify-email')
  @ApiOperation({ summary: 'Verify email with OTP token' })
  async verifyEmail(@Query('token') token: string) {
    if (!token) throw new BadRequestException('Token diperlukan');
    return this.authService.verifyEmail(token);
  }
}
