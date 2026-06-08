import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { DisputesService } from '../services/disputes.service';
import { CreateDisputeDto } from '../dto/dispute.dto';
import { CurrentUser } from '../../../common/decorators/current-user.decorator';

@ApiTags('Disputes')
@ApiBearerAuth('jwt')
@Controller('disputes')
export class DisputesController {
  constructor(private readonly disputesService: DisputesService) {}

  @Post()
  @ApiOperation({ summary: 'Raise a dispute on an order' })
  create(@CurrentUser('id') uid: string, @Body() dto: CreateDisputeDto) {
    return this.disputesService.create(uid, dto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get dispute detail' })
  detail(@Param('id') id: string) {
    return this.disputesService.findById(id);
  }
}
