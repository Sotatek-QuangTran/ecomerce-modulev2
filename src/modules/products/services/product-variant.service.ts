import { Injectable, NotFoundException } from '@nestjs/common';
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

  async findById(id: number) {
    const variant = await this.productVariantEntity.findOne({
      where: { id },
    });
    if (!variant) {
      throw new NotFoundException('Variant not found');
    }
    return variant;
  }
}
