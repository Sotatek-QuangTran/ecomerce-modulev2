import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ExceptionError } from './exceptions/error.exception';
import { ValidationPipe } from '@nestjs/common';
import { ResponseInterceptor } from './interceptors';

const PORT = parseInt(process.env.PORT ?? '3002');
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useGlobalFilters(new ExceptionError());
  app.useGlobalInterceptors(new ResponseInterceptor());
  const config = new DocumentBuilder()
    .addServer(process.env.DOMAIN)
    .addBearerAuth()
    .setTitle('ecommerce-module')
    .setDescription('api ecommerce modulev2')
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
