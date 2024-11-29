import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module.ts';
import * as express from 'express';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   await app.listen(process.env.PORT ?? 3000);
// }

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Optional: Add Express middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  await app.listen(3000);
}
bootstrap();
