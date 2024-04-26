import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PurchaseEntity } from '../entities/purchase.entity';
import { DataSource, Repository } from 'typeorm';
import { PurchaseCreateDto } from '../dtos/purchase-req.dto';
import { OrderEntity } from '../entities/order.entity';
import { IPaginate } from 'src/common/inteface.common';
import { ProductVariantEntity } from 'src/modules/products/entities/product-variant.entity';

@Injectable()
export class PurchaseService {
  constructor(
    @InjectRepository(PurchaseEntity)
    private purchaseEntity: Repository<PurchaseEntity>,
    private dataSource: DataSource,
  ) {}

  async create(data: PurchaseCreateDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const manage = queryRunner.manager;
      const purchase = await manage.save(
        manage.create(PurchaseEntity, {
          userId: data.userId,
        }),
      );
      const orders = [];
      for (const order of data.orders) {
        order.purchaseId = purchase.id;
        const variant = await manage.findOne(ProductVariantEntity, {
          where: { id: order.productVariantId },
        });
        if (variant.stock - order.quantity < 0) {
          throw new BadRequestException('Out of stock');
        }
        const save = await manage.save(
          OrderEntity,
          manage.create(OrderEntity, order),
        );
        await manage.update(
          ProductVariantEntity,
          { id: variant.id },
          { stock: variant.stock - order.quantity },
        );
        orders.push(save);
      }
      purchase.orders = orders;
      await queryRunner.commitTransaction();
      return purchase;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new Error(error);
    } finally {
      await queryRunner.release();
    }
  }

  async findAndCount(criteria, pagination: IPaginate) {
    const [list, total] = await this.purchaseEntity.findAndCount({
      ...pagination,
      where: criteria,
      relations: ['orders'],
    });
    return { list, total };
  }
}
