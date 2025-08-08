import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import mongoose from 'mongoose';

async function bootstrap() {
  // Create app with reduced logging
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn'], // Only show errors and warnings, remove 'log'
  });

  // Enable CORS for frontend
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://localhost:3001',
      'https://dhanraksha-re6yyrlii-anandpandey1308s-projects.vercel.app',
      'https://dhanraksha-o6pq45io6-anandpandey1308s-projects.vercel.app',
      'https://dhanraksha.vercel.app',
      /^https:\/\/dhanraksha.*\.vercel\.app$/,
    ],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'Accept',
      'User-Agent',
      'Referer',
      'sec-ch-ua',
      'sec-ch-ua-mobile',
      'sec-ch-ua-platform',
      'X-Requested-With',
      'Origin',
    ],
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });

  mongoose.connection.once('open', () => {
    console.log(`✅ Connected to MongoDB: ${mongoose.connection.name}`);
  });

  mongoose.connection.on('error', (err: Error) => {
    console.error('❌ MongoDB connection error:', err.message);
  });

  await app.listen(5000);
  console.log(`🚀 Backend running on http://localhost:5000`);
}
bootstrap();
