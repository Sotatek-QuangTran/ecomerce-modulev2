import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PurchaseEntity } from '../entities/purchase.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class PurchaseService {
  constructor(
    @InjectRepository(PurchaseEntity)
    private purchaseEntity: Repository<PurchaseEntity>,
    private dataSource: DataSource,
  ) {}

  async create(data) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const manage = queryRunner.manager;
      await manage.save(
        manage.create(PurchaseEntity, {
          user_id: data.user_id,
        }),
      );
      for (const order of data.orders) {
        await manage.save(PurchaseEntity, manage.create(PurchaseEntity, order));
      }
      return;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new Error(error);
    } finally {
      await queryRunner.release();
    }
  }
}
