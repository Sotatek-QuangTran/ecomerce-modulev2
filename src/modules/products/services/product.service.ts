import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from '../entities/product.entity';
import { IsNull, MoreThan, Not, Repository } from 'typeorm';
import {
  ProductCreateDto,
  ProductQueryReq,
  ProductUpdateDto,
} from '../dtos/product-req.dto';
import { IPaginate } from 'src/common/inteface.common';
import { ProductVariantEntity } from '../entities/product-variant.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private productEntity: Repository<ProductEntity>,
    @InjectRepository(ProductVariantEntity)
    private variantEntity: Repository<ProductVariantEntity>,
  ) {}

  async create(data: ProductCreateDto) {
    return await this.productEntity.save(this.productEntity.create(data));
  }

  async findAndCount(criteria: ProductQueryReq, pagination: IPaginate) {
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

  async findQueryBuilder(criteria: ProductQueryReq, pagination: IPaginate) {
    const { entities, raw } = await this.productEntity
      .createQueryBuilder('p')
      .leftJoinAndSelect('p.productVariants', 'v')
      .leftJoinAndSelect('v.orders', 'o')
      .addSelect('coalesce(SUM(`o`.`quantity`),0)', 'p_total_sale')
      .orderBy('p_total_sale', 'DESC')
      .take(pagination.take)
      .skip(pagination.skip)
      .groupBy('v.id')
      .getRawAndEntities();

    const list = entities.map((entity) => {
      entity.productVariants.map((v: any) => {
        const variant = raw.find((r) => r.v_id === v.id);
        v.total_sale = +variant.p_total_sale;
        return v;
      });
      return entity;
    });
    const total = await this.productEntity.count({
      where: criteria,
    });
    return { list, total };
  }

  async findAndSaleByProduct(criteria: ProductQueryReq, pagination: IPaginate) {
    const { entities, raw } = await this.productEntity
      .createQueryBuilder('p')
      .leftJoin('p.productVariants', 'v')
      .leftJoinAndSelect('v.orders', 'o')
      .addSelect('coalesce(SUM(`o`.`quantity`),0)', 'p_total_sale')
      .where(criteria)
      .orderBy('p_total_sale', 'DESC')
      .addOrderBy('p.id', 'DESC')
      .take(pagination.take)
      .skip(pagination.skip)
      .groupBy('p.id')
      .getRawAndEntities();

    const list = entities.map((entity: any, i) => {
      entity.total_sale = +raw[i].p_total_sale;
      return entity;
    });
    const total = await this.productEntity.count({
      where: criteria,
    });
    return { list, total };
  }

  async update(id: number, data: ProductUpdateDto) {
    await this.productEntity.update({ id }, data);
    return await this.findById(id);
  }

  async remove(id: number) {
    return await this.productEntity.softDelete(id);
  }
}
