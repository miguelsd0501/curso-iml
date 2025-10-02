import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import * as bodyParser from 'body-parser';

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

  // Configura el analizador de JSON con un límite de 50 MB
  app.use(bodyParser.json({ limit: '10mb' }));
  // Configura el analizador de URL-encoded con un límite de 50 MB
  app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

  // Habilitar el versionamiento por cabecera
  app.enableVersioning({
    type: VersioningType.HEADER,
    header: 'Accept-version',
  });

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
