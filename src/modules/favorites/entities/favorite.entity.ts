import { EntityIdIntCommon } from 'src/common';
import { Column, Entity } from 'typeorm';

@Entity()
export class FavoriteEntity extends EntityIdIntCommon {
  @Column({ type: 'int' })
  productId: number;

  @Column({ type: 'int' })
  userId: number;
}
