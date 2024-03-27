import { EntityIdIntCommon } from 'src/common';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'purchases' })
export class PurchaseEntity extends EntityIdIntCommon {
  @Column({ name: 'user_id', type: 'integer' })
  user_id: number;

  @Column({ name: 'amount', type: 'float' })
  amount: number;
}
