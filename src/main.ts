import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setViewEngine('hbs');
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.useGlobalPipes(new ValidationPipe());
  // 전역 파이프에 validationPipe 객체 추가

  app.useStaticAssets(join(__dirname, '..', 'views')); // 정적 파일 경로 설정

  await app.listen(3000);
}
bootstrap();
