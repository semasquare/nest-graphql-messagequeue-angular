import { NestFactory } from '@nestjs/core';
import { UserModule } from './user.module';

export function logger(req, res, next) {
  console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);
  next();
}

async function bootstrap() {
  const app = await NestFactory.create(UserModule);
  app.use(logger);
  await app.listen(3001);
}

bootstrap();
