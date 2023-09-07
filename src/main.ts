import 'dotenv/config';

import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { corsConfig } from 'src/shared/config/cors.config';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors(corsConfig);
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3010);
}

bootstrap();
