import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';
import * as fs from 'fs';
import * as yaml from 'js-yaml';
import * as process from 'node:process';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Polizas API CRUD')
    .setDescription('API')
    .setVersion('1.0')
    .addTag('API')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  const outputPath = join(process.cwd(), 'swagger');
  fs.mkdirSync(outputPath, { recursive: true });
  fs.writeFileSync(
    join(outputPath, 'swagger.json'),
    JSON.stringify(document, null, 2),
  );
  fs.writeFileSync(join(outputPath, 'swagger.yaml'), yaml.dump(document));

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
      forbidNonWhitelisted: true,
      whitelist: true,
    }),
  );

  app.enableCors();

  await app.listen(parseInt(process.env.PORT) || 3117);
}
bootstrap();
