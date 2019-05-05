import { NestFactory } from '@nestjs/core';
import { CommentModule } from './comment.module';

export function logger(req, res, next) {
  console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);
  next();
}

async function bootstrap() {
  const app = await NestFactory.create(CommentModule);
  app.use(logger);
  await app.listen(3002);
}

bootstrap();
