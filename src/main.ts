import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const PORT = parseInt(process.env.PORT ?? '3001');
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api');
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
