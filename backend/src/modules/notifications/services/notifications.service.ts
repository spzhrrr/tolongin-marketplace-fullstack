import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from '../repositories/notifications.repository';
import { NotificationType } from '../../../common/constants/enums';
import { NotificationsRealtime } from '../notifications.gateway';

@Injectable()
export class NotificationsService {
<<<<<<< HEAD
  constructor(private readonly repo: NotificationsRepository) {}

  notify(
=======
  constructor(
    private readonly repo: NotificationsRepository,
    private readonly realtime: NotificationsRealtime,
  ) {}
  // backend/src/modules/notifications/services/notifications.service.ts

  async notify(
>>>>>>> 961a4cc (Update: Menyinkronkan perubahan lokal dengan repositori remote)
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
<<<<<<< HEAD
=======

    this.realtime.emit(userId, 'notification', notification);
    const unread = await this.repo.unreadCount(userId);
    this.realtime.emit(userId, 'unread-count', { count: unread });
    return notification;
>>>>>>> 961a4cc (Update: Menyinkronkan perubahan lokal dengan repositori remote)
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
