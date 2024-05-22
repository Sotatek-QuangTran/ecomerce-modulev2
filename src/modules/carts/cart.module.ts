import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartEntity } from './entities/cart.entity';
import { CartService } from './services/cart.service';
import { ProductModule } from '../products/product.module';
import { CartController } from './controllers/cart.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CartEntity]), ProductModule],
  providers: [CartService],
  controllers: [CartController],
})
export class CartModule {}
