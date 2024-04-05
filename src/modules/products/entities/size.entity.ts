import { EntityIdIntCommon } from 'src/common';
import { Column, Entity, OneToMany } from 'typeorm';
import { ProductSizeEntity } from './product-size.entity';

@Entity({ name: 'sizes' })
export class SizeEntity extends EntityIdIntCommon {
  @Column({ name: 'size', unique: true })
  size: string;

  @OneToMany(() => ProductSizeEntity, (ps) => ps.size_id, {
    createForeignKeyConstraints: false,
  })
  product_size: ProductSizeEntity[];
}
