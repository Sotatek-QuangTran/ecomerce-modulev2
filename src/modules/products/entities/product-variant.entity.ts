import { EntityIdIntCommon } from 'src/common';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { ProductEntity } from './product.entity';

@Entity()
export class ProductVariantEntity extends EntityIdIntCommon {
  @Column({ type: 'int' })
  productId: number;

  @Column({})
  size: number;

  @Column({ type: 'int', default: 0 })
  stock: number;

  @ManyToOne(() => ProductEntity, (p) => p.productSize, {
    cascade: true,
    onDelete: 'CASCADE',
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'product_id' })
  product: ProductEntity;
}
