import { EntityIdIntDeletedAtCommon } from 'src/common';
import { Column, Entity } from 'typeorm';

@Entity()
export class CategoryEntity extends EntityIdIntDeletedAtCommon {
  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'int' })
  order: number;
}
