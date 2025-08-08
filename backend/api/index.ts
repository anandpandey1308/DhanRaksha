/* eslint-disable @typescript-eslint/no-unsafe-return */
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { ValidationPipe } from '@nestjs/common';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';

const server = express();

async function createNestServer(expressInstance: express.Express) {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressInstance),
  );

  // Enable CORS for frontend
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'https://dhanraksha.vercel.app',
      'https://*.vercel.app',
    ],
    credentials: true,
  });

  // Global validation pipe
  app.useGlobalPipes(new ValidationPipe());

  // Set global prefix
  app.setGlobalPrefix('api');

  await app.init();
  return app.getHttpAdapter().getInstance();
}

createNestServer(server)
  .then(() => console.log('Nest Ready'))
  .catch((err) => console.error('Nest broken', err));

export default server;
