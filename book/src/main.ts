import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as dotenv from 'dotenv';
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
  }

  const port = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(port);
}
bootstrap();
