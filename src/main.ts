import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  // configuracion global para validar los parametros de entrada a los endpoints
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: false, // elimina los parametros de entrada no reconocidos y deja pasar la solicitud
      forbidNonWhitelisted: true, // marca un error si se manda un paràmetro de entrada no reconocido
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
