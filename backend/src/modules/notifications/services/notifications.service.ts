<<<<<<< HEAD
import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from '../repositories/notifications.repository';
=======
// backend/src/modules/notifications/services/notifications.service.ts
import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from '../repositories/notifications.repository';
// import { NotificationsGateway } from '../notifications.gateway'; // HAPUS
>>>>>>> ec26484 (implementasi demo)
import { NotificationType } from '../../../common/constants/enums';
import { NotificationsRealtime } from '../notifications.gateway';

@Injectable()
export class NotificationsService {
<<<<<<< HEAD
<<<<<<< HEAD
  constructor(private readonly repo: NotificationsRepository) {}

  notify(
=======
=======
>>>>>>> ec26484 (implementasi demo)
  constructor(
    private readonly repo: NotificationsRepository,
    private readonly realtime: NotificationsRealtime,
  ) {}
  // backend/src/modules/notifications/services/notifications.service.ts

  async notify(
<<<<<<< HEAD
>>>>>>> 961a4cc (Update: Menyinkronkan perubahan lokal dengan repositori remote)
=======
>>>>>>> ec26484 (implementasi demo)
    userId: string,
    type: NotificationType,
    title: string,
    body: string,
    data?: object,
    actionUrl?: string,
  ) {
<<<<<<< HEAD
    return this.repo.create({
=======
    const notification = await this.repo.create({
>>>>>>> ec26484 (implementasi demo)
      user: { connect: { id: userId } },
      type,
      title,
      body,
      data: data ? JSON.stringify(data) : undefined,
<<<<<<< HEAD
      actionUrl,
    });
<<<<<<< HEAD
=======
=======
      actionUrl: actionUrl || null, // ✅ PASTIKAN TERSIMPAN
    });
>>>>>>> ec26484 (implementasi demo)

    this.realtime.emit(userId, 'notification', notification);
    const unread = await this.repo.unreadCount(userId);
    this.realtime.emit(userId, 'unread-count', { count: unread });
    return notification;
<<<<<<< HEAD
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
=======
  }

  list(userId: string, unreadOnly = false) {
    return this.repo.findByUser(userId, unreadOnly);
  }

  unread(userId: string) {
    return this.repo.unreadCount(userId);
  }

  async markRead(id: string, userId: string) {
    return this.repo.markRead(id, userId);
  }

  async markAllRead(userId: string) {
    return this.repo.markAllRead(userId);
  }

>>>>>>> ec26484 (implementasi demo)
  delete(id: string, userId: string) {
    return this.repo.delete(id, userId);
  }
}
