import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
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

  // Configuración de la documentación
  const config = new DocumentBuilder()
    .setTitle('Vende: MS Invoice')
    .setDescription(
      `
      Esta API expone un conjunto de endpoints para la gestion de CFDIs, permitiendo ejecutar tareas de timbrado, cancelación y obtención del estado del CFDI.
     
      ## Caracteristicas principales
      - Caracteristica 1.
      - Caracteristica 2.
      - Caracteristica N.

      ## Convenciones técnicas
      ...

      ## Autenticación y seguridad
      ...

      ## Notas adicionales

      ## Licencia y términos de uso (importante)
      
      ## Información de contácto
      ...
      `,
    )
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  // Configura el analizador de JSON con un límite de 50 MB
  app.use(bodyParser.json({ limit: '10mb' }));
  // Configura el analizador de URL-encoded con un límite de 50 MB
  app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

  // Habilitar el versionamiento por cabecera
  app.enableVersioning({
    type: VersioningType.HEADER,
    header: 'Accept-version', // O 'X-API-Version' como práctica recomendada
  });

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
