import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { environment } from './config/environment/environment';

const validationPipe = new ValidationPipe({
  whitelist: true,
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: environment.LOG_LEVEL,
  });

  app.useGlobalPipes(validationPipe);

  await app.listen(environment.PORT);
}
void bootstrap();
