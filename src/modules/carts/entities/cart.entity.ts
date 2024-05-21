import { EntityIdIntDeletedAtCommon } from 'src/common';
import { Column, Entity } from 'typeorm';

@Entity()
export class CartEntity extends EntityIdIntDeletedAtCommon {
  @Column({ type: 'bigint' })
  productVariantId: number;

  @Column({ type: 'bigint' })
  userId: number;

  @Column({ type: 'int', default: 0 })
  quantity: number;

  @Column({ type: 'float', default: 0 })
  price: number;
}
