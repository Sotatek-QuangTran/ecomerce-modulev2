import { EntityIdIntCommon } from 'src/common';
import { Column, Entity, OneToMany } from 'typeorm';
import { ProductSizeEntity } from './product-size.entity';
import { ProductColorEntity } from './product-color.entity';

@Entity({ name: 'products' })
export class ProductEntity extends EntityIdIntCommon {
  @Column({ name: 'name', type: 'text' })
  name: string;

  @Column({ name: 'price', type: 'float' })
  price: number;

  @Column({ name: 'category_id', type: 'integer' })
  category_id: number;

  @OneToMany(() => ProductSizeEntity, (ps) => ps.product_id, {
    createForeignKeyConstraints: false,
  })
  product_size: ProductSizeEntity;

  @OneToMany(() => ProductColorEntity, (pc) => pc.product_id, {
    createForeignKeyConstraints: false,
  })
  product_color: ProductColorEntity;
}
