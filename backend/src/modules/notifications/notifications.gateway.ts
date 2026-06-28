import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import {
  OnGatewayConnection,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { getCorsOrigins } from '../../common/utils/cors';
import { JwtPayload } from '../auth/interfaces/auth.interface';

@Injectable()
export class NotificationsRealtime {
  private server?: Server;

  attach(server: Server) {
    this.server = server;
  }

  emit(userId: string, event: string, payload: unknown) {
    this.server?.to('user:' + userId).emit(event, payload);
  }
}

@WebSocketGateway({
  cors: { origin: getCorsOrigins(), credentials: true },
  namespace: '/notifications',
  path: '/api/socket.io',
  transports: ['websocket', 'polling'],
})
export class NotificationsGateway implements OnGatewayConnection {
  @WebSocketServer() server!: Server;
  private readonly logger = new Logger(NotificationsGateway.name);

  constructor(
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
    private readonly realtime: NotificationsRealtime,
  ) {}

  afterInit(server: Server) {
    this.realtime.attach(server);
  }

  handleConnection(client: Socket) {
    try {
      const token =
        (client.handshake.auth?.token as string) ||
        (client.handshake.query?.token as string);
      if (!token) throw new Error('No token');
      const payload = this.jwt.verify<JwtPayload>(token, {
        secret: this.config.get<string>('app.jwt.secret') || 'change-me',
      });
      client.data.userId = payload.sub;
      client.join('user:' + payload.sub);
      client.emit('connected', { ok: true });
    } catch (error) {
      this.logger.warn('Notification socket auth failed');
      client.disconnect(true);
    }
  }
}