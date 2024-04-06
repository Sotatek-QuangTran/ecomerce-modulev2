import { EntityIdIntCommon } from 'src/common';
import { Column, Entity, OneToMany } from 'typeorm';
import { ProductSizeEntity } from './product-size.entity';
import { ProductColorEntity } from './product-color.entity';

@Entity()
export class ProductEntity extends EntityIdIntCommon {
  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'float' })
  price: number;

  @Column({ type: 'integer' })
  categoryId: number;

  @OneToMany(() => ProductSizeEntity, (ps) => ps.productId, {
    createForeignKeyConstraints: false,
  })
  productSize: ProductSizeEntity[];

  @OneToMany(() => ProductColorEntity, (pc) => pc.productId, {
    createForeignKeyConstraints: false,
  })
  productColor: ProductColorEntity[];
}
