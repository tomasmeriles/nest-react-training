import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { ValidationPipe } from '@nestjs/common';
import { environment } from './config/environment/environment.js';
import { useContainer } from 'class-validator';

const validationPipe = new ValidationPipe({
  whitelist: true,
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: environment.LOG_LEVEL,
  });

  app.useGlobalPipes(validationPipe);

  app.setGlobalPrefix('/api');

  // IMPORTANT: Enable dependency injection in class-validator
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  await app.listen(environment.PORT);
}
void bootstrap();
