import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ExceptionError } from './exceptions/error.exception';

const PORT = parseInt(process.env.PORT ?? '3002');
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalFilters(new ExceptionError());
  const config = new DocumentBuilder()
    .addServer(process.env.DOMAIN)
    .addBearerAuth()
    .setTitle('ecommerce-module')
    .setDescription('api ecommerce module')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);
  app.enableCors({
    allowedHeaders: '*',
  });
  await app.listen(PORT, () => {
    console.log('Application is running on port:', PORT);
  });
}
bootstrap();
