import { EntityIdIntCommon } from 'src/common';
import { Column, Entity } from 'typeorm';

@Entity()
export class OrderEntity extends EntityIdIntCommon {
  @Column({ type: 'integer' })
  purchaseId: number;

  @Column({ type: 'integer' })
  productId: number;

  @Column({ name: 'price', type: 'float', default: 0 })
  price: number;

  @Column({ name: 'quantity', type: 'integer', default: 0 })
  quantity: number;
}
