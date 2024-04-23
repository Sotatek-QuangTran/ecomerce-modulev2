import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from '../entities/product.entity';
import { IsNull, MoreThan, Not, Repository } from 'typeorm';
import { ProductCreateDto } from '../dtos/product-req.dto';
import { IPaginate } from 'src/common/inteface.common';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private productEntity: Repository<ProductEntity>,
  ) {}

  async create(data: ProductCreateDto) {
    return await this.productEntity.save(this.productEntity.create(data));
  }

  async findAndCount(criteria, pagination: IPaginate) {
    const [list, total] = await this.productEntity.findAndCount({
      ...pagination,
      where: {
        ...criteria,
        productVariants: {
          id: Not(IsNull()),
          colorId: MoreThan(0),
          sizeId: MoreThan(0),
        },
      },
      relations: [
        'productVariants',
        'productVariants.color',
        'productVariants.size',
      ],
    });
    return { list, total };
  }

  async findById(id: number) {
    const product = await this.productEntity.findOne({
      where: { id },
      relations: [
        'productVariants',
        'productVariants.color',
        'productVariants.size',
      ],
    });
    if (!product) {
      throw new NotFoundException();
    }
    return product;
  }
}
