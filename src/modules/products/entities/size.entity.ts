import { EntityIdIntCommon } from 'src/common';
import { Column, Entity, OneToMany } from 'typeorm';
import { ProductSizeEntity } from './product-size.entity';

@Entity()
export class SizeEntity extends EntityIdIntCommon {
  @Column({ name: 'size', unique: true })
  size: string;

  @OneToMany(() => ProductSizeEntity, (ps) => ps.sizeId, {
    createForeignKeyConstraints: false,
  })
  productSize: ProductSizeEntity[];
}
