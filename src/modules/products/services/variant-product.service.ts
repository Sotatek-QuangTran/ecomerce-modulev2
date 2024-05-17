import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductVariantEntity } from '../entities/product-variant.entity';
import { Repository } from 'typeorm';
import { ProductVariantCreateDto } from '../dtos/product-req.dto';

@Injectable()
export class ProductVariantService {
  constructor(
    @InjectRepository(ProductVariantEntity)
    private productVariantEntity: Repository<ProductVariantEntity>,
  ) {}

  async create(data: ProductVariantCreateDto) {
    return await this.productVariantEntity.save(
      this.productVariantEntity.create(data),
    );
  }
}
