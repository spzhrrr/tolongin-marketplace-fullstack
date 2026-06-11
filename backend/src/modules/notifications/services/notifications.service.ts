import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from '../repositories/notifications.repository';
import { NotificationType } from '../../../common/constants/enums';

@Injectable()
export class NotificationsService {
  constructor(private readonly repo: NotificationsRepository) {}

  notify(
    userId: string,
    type: NotificationType,
    title: string,
    body: string,
    data?: object,
    actionUrl?: string,
  ) {
    return this.repo.create({
      user: { connect: { id: userId } },
      type,
      title,
      body,
      data: data ? JSON.stringify(data) : undefined,
      actionUrl,
    });
  }

  list(userId: string) {
    return this.repo.findByUser(userId);
  }
  unread(userId: string) {
    return this.repo.unreadCount(userId);
  }
  markRead(id: string, userId: string) {
    return this.repo.markRead(id, userId);
  }
  markAllRead(userId: string) {
    return this.repo.markAllRead(userId);
  }
  delete(id: string, userId: string) {
    return this.repo.delete(id, userId);
  }
}
