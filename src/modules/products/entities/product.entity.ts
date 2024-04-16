import { EntityIdIntCommon } from 'src/common';
import { Column, Entity, OneToMany } from 'typeorm';
import { ProductSizeEntity } from './product-size.entity';
import { ProductColorEntity } from './product-color.entity';
import { ProductVariantEntity } from './product-variant.entity';

@Entity()
export class ProductEntity extends EntityIdIntCommon {
  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'float' })
  price: number;

  @Column({ type: 'integer' })
  categoryId: number;

  @OneToMany(() => ProductSizeEntity, (ps) => ps.product, {
    createForeignKeyConstraints: false,
  })
  productSize: ProductSizeEntity[];

  @OneToMany(() => ProductColorEntity, (pc) => pc.product, {
    createForeignKeyConstraints: false,
  })
  productColor: ProductColorEntity[];

  @OneToMany(() => ProductVariantEntity, (pc) => pc.product, {
    createForeignKeyConstraints: false,
  })
  productVariants: ProductVariantEntity[];
}
