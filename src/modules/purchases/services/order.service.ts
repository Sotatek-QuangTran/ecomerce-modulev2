import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from '../entities/order.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity) private orderEntity: Repository<OrderEntity>,
  ) {}

  async create(data) {
    return await this.orderEntity.save(this.orderEntity.create(data));
  }
}
