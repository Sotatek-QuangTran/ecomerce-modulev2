import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from '../entities/product.entity';
import { Repository } from 'typeorm';
import { ProductCreateDto } from '../dtos/product-req.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private productEntity: Repository<ProductEntity>,
  ) {}

  async create(data: ProductCreateDto) {
    return await this.productEntity.save(this.productEntity.create(data));
  }

  async findAndCount(criteria, pagination) {
    const [list, total] = await this.productEntity.findAndCount({
      ...pagination,
      where: criteria,
    });
    return { list, total };
  }
}
