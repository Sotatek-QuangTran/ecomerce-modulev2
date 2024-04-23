import { EntityIdIntCommon } from 'src/common';
import { Column, Entity, OneToMany } from 'typeorm';
import { OrderEntity } from './order.entity';

@Entity()
export class PurchaseEntity extends EntityIdIntCommon {
  @Column({ type: 'integer' })
  userId: number;

  @Column({ name: 'amount', type: 'float', default: 0 })
  amount: number;

  @Column({ default: 'pending' })
  status: string;

  @OneToMany(() => OrderEntity, (p) => p.purchase, {
    createForeignKeyConstraints: false,
    cascade: true,
    onDelete: 'CASCADE',
  })
  orders: OrderEntity[];
}
