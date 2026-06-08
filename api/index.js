// api/index.js - Serverless entry point untuk Vercel
const { NestFactory } = require("@nestjs/core");
const { AppModule } = require("../backend/dist/app.module");
const { ValidationPipe } = require("@nestjs/common");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");

let cachedServer = null;

async function bootstrap() {
  if (cachedServer) {
    return cachedServer;
  }

  const app = await NestFactory.create(AppModule, {
    logger: ["error", "warn", "log"],
    bodyParser: true,
  });

  // Middleware
  app.use(
    helmet({
      contentSecurityPolicy: false,
      crossOriginResourcePolicy: { policy: "cross-origin" },
    }),
  );
  app.use(cookieParser());

  // Body limit
  app.use(require("express").json({ limit: "10mb" }));
  app.use(require("express").urlencoded({ limit: "10mb", extended: true }));

  // CORS untuk Vercel
  app.enableCors({
    origin: [
      "http://localhost:5173",
      "http://localhost:3000",
      "https://tolongin-marketplace-fullstack.vercel.app",
      /\.vercel\.app$/,
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cookie",
      "X-Requested-With",
    ],
    exposedHeaders: ["Authorization", "Set-Cookie"],
  });

  app.setGlobalPrefix("api");
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: false,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  await app.init();
  cachedServer = app;
  return app;
}

// Handler untuk Vercel serverless function
module.exports = async (req, res) => {
  try {
    const app = await bootstrap();
    const server = app.getHttpServer();

    // Forward request ke NestJS
    server(req, res);
  } catch (error) {
    console.error("Serverless error:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};
