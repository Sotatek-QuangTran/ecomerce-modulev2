import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/users/user.module';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ProductModule } from './modules/products/product.module';
import { PurchaseModule } from './modules/purchases/purchase.module';
import { WhitePaperModule } from './modules/whitepapers/whitepaper.module';
import { SnakeNamingStrategy } from './snakecase.strategy';
import { CartModule } from './modules/carts/cart.module';
import { FavoriteModule } from './modules/favorites/favorite.module';
import { CategoryModule } from './modules/categories/category.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';

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
    ThrottlerModule.forRoot([
      {
        ttl: 2000,
        limit: 3,
      },
    ]),
    UserModule,
    ProductModule,
    PurchaseModule,
    WhitePaperModule,
    CartModule,
    FavoriteModule,
    CategoryModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
