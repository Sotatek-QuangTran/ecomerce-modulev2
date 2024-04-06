import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { ProductEntity } from './product.entity';
import { SizeEntity } from './size.entity';

@Entity()
export class ProductSizeEntity {
  @PrimaryColumn()
  productId: number;

  @PrimaryColumn()
  sizeId: number;

  @ManyToOne(() => ProductEntity, (p) => p.productSize, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'product_id' })
  product: ProductEntity;

  @ManyToOne(() => SizeEntity, (s) => s.productSize, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'size_id' })
  size: SizeEntity;
}
