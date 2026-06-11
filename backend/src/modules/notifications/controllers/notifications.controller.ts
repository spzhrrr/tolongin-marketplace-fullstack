import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { NotificationsService } from '../services/notifications.service';
import { CurrentUser } from '../../../common/decorators/current-user.decorator';

@ApiTags('Notifications')
@ApiBearerAuth('jwt')
@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get()
  @ApiOperation({ summary: 'List my notifications' })
  list(@CurrentUser('id') uid: string) {
    return this.notificationsService.list(uid);
  }

  @Get('unread-count')
  @ApiOperation({ summary: 'Unread count' })
  unread(@CurrentUser('id') uid: string) {
    return this.notificationsService.unread(uid).then((count) => ({ count }));
  }

  @Post(':id/read')
  @ApiOperation({ summary: 'Mark as read' })
  read(@Param('id') id: string, @CurrentUser('id') uid: string) {
    return this.notificationsService
      .markRead(id, uid)
      .then(() => ({ ok: true }));
  }

  @Post('read-all')
  @ApiOperation({ summary: 'Mark all as read' })
  readAll(@CurrentUser('id') uid: string) {
    return this.notificationsService
      .markAllRead(uid)
      .then(() => ({ ok: true }));
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete notification' })
  delete(@Param('id') id: string, @CurrentUser('id') uid: string) {
    return this.notificationsService.delete(id, uid).then(() => ({ ok: true }));
  }
}
