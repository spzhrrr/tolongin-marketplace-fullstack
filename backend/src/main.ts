import { NestFactory, Reflector } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import * as express from 'express';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './common/filters/http-exception.filter';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';
import { RolesGuard } from './common/guards/roles.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');

  // Security headers
  app.use(
    helmet({
      contentSecurityPolicy: false,
      crossOriginResourcePolicy: { policy: 'cross-origin' },
    }),
  );
  app.use(cookieParser());

  // Increase body size limit for base64 avatar uploads (up to ~5MB)
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ limit: '10mb', extended: true }));

  // ✅ CORS - Allow Vercel frontend domains (untuk monorepo atau terpisah)
  app.enableCors({
    origin: [
      'http://localhost:5173',
      'http://localhost:3000',
      'https://tolongin-marketplace-fullstack.vercel.app',
      /\.vercel\.app$/,
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS', 'HEAD'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'X-Requested-With',
      'Accept',
      'Origin',
      'Cookie',
    ],
    exposedHeaders: ['Authorization', 'Set-Cookie'],
  });

  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: false,
      transformOptions: { enableImplicitConversion: true },
    }),
  );
  app.useGlobalFilters(new GlobalExceptionFilter());
  app.useGlobalInterceptors(new LoggingInterceptor());

  const reflector = app.get(Reflector);
  app.useGlobalGuards(new JwtAuthGuard(reflector), new RolesGuard(reflector));

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('Tolongin API')
    .setDescription(
      'Marketplace jasa & pekerjaan Indonesia — REST + WebSocket API',
    )
    .setVersion('2.0.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'jwt',
    )
    .addTag('Auth', 'Registration, login, refresh, logout & password reset')
    .addTag('Users', 'Public user profiles & seller info')
    .addTag('Categories', 'Service & job categories')
    .addTag('Services', 'Marketplace service listings')
    .addTag('Jobs', 'Job postings from buyers')
    .addTag('Applications', 'Seller applications to jobs')
    .addTag('Orders', 'Order lifecycle & state machine')
    .addTag('Reviews', 'Service & seller reviews')
    .addTag('Payments', 'Order payments & webhooks')
    .addTag('Withdrawals', 'Seller withdrawals & bank accounts')
    .addTag('Chat', 'Real-time chat (REST + WebSocket)')
    .addTag('Notifications', 'User notifications')
    .addTag('Disputes', 'Order disputes')
    .addTag('Admin', 'Admin dashboard & management')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: { persistAuthorization: true },
  });

  // ✅ Port untuk Vercel (gunakan PORT dari environment)
  const port = process.env.PORT || 3000;

  await app.listen(port, '0.0.0.0');

  logger.log(`✅ Tolongin backend is running!`);
  logger.log(`📍 API: http://localhost:${port}/api`);
  logger.log(`📚 Swagger UI: http://localhost:${port}/api/docs`);
}
bootstrap();
