import { EntityIdIntCommon } from 'src/common';
import { Column, Entity, OneToMany } from 'typeorm';
import { ProductVariantEntity } from './product-variant.entity';

@Entity()
export class SizeEntity extends EntityIdIntCommon {
  @Column({ name: 'size', unique: true })
  size: string;

  @OneToMany(() => ProductVariantEntity, (ps) => ps.size, {
    createForeignKeyConstraints: false,
  })
  productVariants: ProductVariantEntity[];
}
