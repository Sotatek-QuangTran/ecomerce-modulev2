import { EntityIdIntCommon } from 'src/common';
import { Column, Entity } from 'typeorm';

@Entity()
export class PurchaseEntity extends EntityIdIntCommon {
  @Column({ type: 'integer' })
  userId: number;

  @Column({ name: 'amount', type: 'float' })
  amount: number;
}
