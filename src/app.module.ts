import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ProductModule } from './modules/products/product.module';
import { PurchaseModule } from './modules/purchases/purchase.module';
import { WhitePaperModule } from './modules/whitepapers/whitepaper.module';
import { SnakeNamingStrategy } from './snakecase.strategy';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        autoLoadEntities: true,
        entities: ['dist/**/*.entity.js'],
        synchronize: true,
        namingStrategy: new SnakeNamingStrategy(),
        extra: {
          charset: 'utf8mb4_unicode_ci',
        },
      }),
    }),
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      cache: true,
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      global: true,
      useFactory: (config: ConfigService) => ({
        signOptions: {
          expiresIn: '4h',
        },
        secret: config.get('JWT_SECRETKEY'),
      }),
    }),
    UserModule,
    ProductModule,
    PurchaseModule,
    WhitePaperModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule {}
