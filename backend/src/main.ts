/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import mongoose from 'mongoose';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for frontend
  app.enableCors({
    origin: ['http://localhost:3000', 'http://localhost:3001'],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });

  app.use((req, res, next) => {
    Logger.log(`Incoming Request: ${req.method} ${req.url}`);
    next();
  });

  mongoose.connection.once('open', () => {
    console.log(`✅ Connected to MongoDB: ${mongoose.connection.name}`);
  });

  mongoose.connection.on('error', (err: Error) => {
    console.error('❌ MongoDB connection error:', err.message);
  });

  // Removed RouterExplorer-related code as it is not available in @nestjs/common
  console.log('Registered Routes feature is not implemented.');

  await app.listen(5000);
  console.log(`🚀 Backend running on http://localhost:5000`);
}
bootstrap();
