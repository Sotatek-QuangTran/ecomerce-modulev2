import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from 'src/shared/shared.module';
import { ProductEntity } from './entities/product.entity';
import { ColorEntity } from './entities/color.entity';
import { SizeEntity } from './entities/size.entity';
import { ProductService } from './services/product.service';
import { ProductController } from './controllers/product.controller';
import { AdminProductController } from './controllers/admin-product.controller';
import { ProductVariantEntity } from './entities/product-variant.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductEntity,
      ColorEntity,
      SizeEntity,
      ProductVariantEntity,
    ]),
    SharedModule,
  ],
  providers: [ProductService],
  controllers: [ProductController, AdminProductController],
})
export class ProductModule {}
