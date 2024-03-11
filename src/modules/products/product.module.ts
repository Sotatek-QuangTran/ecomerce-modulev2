import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from 'src/shared/shared.module';
import { ProductEntity } from './entities/product.entity';
import { ColorEntity } from './entities/color.entity';
import { SizeEntity } from './entities/size.entity';
import { ProductColorEntity } from './entities/product-color.entity';
import { ProductSizeEntity } from './entities/product-size.entity';
import { ProductService } from './services/product.service';
import { ProductController } from './controllers/product.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductEntity,
      ColorEntity,
      SizeEntity,
      ProductColorEntity,
      ProductSizeEntity,
    ]),
    SharedModule,
  ],
  providers: [ProductService],
  controllers: [ProductController],
})
export class ProductModule {}
