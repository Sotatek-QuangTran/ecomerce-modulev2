import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PurchaseEntity } from '../entities/purchase.entity';
import { DataSource, Repository } from 'typeorm';
import { PurchaseCreateDto } from '../dtos/purchase-req.dto';
import { OrderEntity } from '../entities/order.entity';

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
        const save = await manage.save(
          OrderEntity,
          manage.create(OrderEntity, order),
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
}
