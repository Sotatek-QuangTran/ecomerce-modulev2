import { EntityIdIntCommon } from 'src/common';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'orders' })
export class OrderEntity extends EntityIdIntCommon {
  @Column({ name: 'purchase_id', type: 'integer' })
  purchase_id: number;

  @Column({ name: 'product_id', type: 'integer' })
  product_id: number;

  @Column({ name: 'price', type: 'float', default: 0 })
  price: number;

  @Column({ name: 'quantity', type: 'integer', default: 0 })
  quantity: number;
}
