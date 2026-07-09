import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: true, // 开发阶段允许所有来源，生产环境改为具体域名
    credentials: true,
  });
  await app.listen(3000);
}
bootstrap();
