<<<<<<< HEAD
import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { UsersService } from '../services/users.service';
import { Public } from '../../../common/decorators/public.decorator';
=======
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';
import { UsersService } from '../services/users.service';
import { Public } from '../../../common/decorators/public.decorator';
import { CurrentUser } from '../../../common/decorators/current-user.decorator';
import { CreatePortfolioDto } from '../dto/portfolio.dto';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { UpdateUserDto } from '../dto/update-user.dto';
>>>>>>> 961a4cc (Update: Menyinkronkan perubahan lokal dengan repositori remote)

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Put('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('jwt')
  @ApiOperation({ summary: 'Update current user profile' })
  async updateMe(
    @CurrentUser('id') userId: string,
    @Body() dto: UpdateUserDto,
  ) {
    return this.usersService.update(userId, dto);
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Get public user profile' })
  async getPublicProfile(@Param('id') id: string) {
    return this.usersService.getPublicProfile(id);
  }

  @Public()
  @Get(':id/services')
  @ApiOperation({ summary: 'Get user services' })
  async getUserServices(@Param('id') id: string) {
    return this.usersService.getServices(id);
  }

  @Public()
  @Get(':id/reviews')
  @ApiOperation({ summary: 'Get user reviews' })
  async getUserReviews(@Param('id') id: string) {
    return this.usersService.getReviews(id);
  }

  @Public()
  @Get(':id/jobs')
  @ApiOperation({ summary: 'Get user jobs' })
  async getUserJobs(@Param('id') id: string) {
    return this.usersService.getUserJobs(id);
  }

  @Public()
  @Get(':id/complete')
  @ApiOperation({
    summary: 'Get complete user profile with services, jobs, reviews',
  })
  async getCompleteProfile(@Param('id') id: string) {
    return this.usersService.getCompleteProfile(id);
  }
}
