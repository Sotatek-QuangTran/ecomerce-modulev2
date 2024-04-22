import { EntityIdIntCommon } from 'src/common';
import { Column, Entity, OneToMany } from 'typeorm';
import { ProductVariantEntity } from './product-variant.entity';

@Entity()
export class ProductEntity extends EntityIdIntCommon {
  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'float' })
  price: number;

  @Column({ type: 'integer' })
  categoryId: number;

  @OneToMany(() => ProductVariantEntity, (pc) => pc.product, {
    createForeignKeyConstraints: false,
  })
  productVariants: ProductVariantEntity[];
}
