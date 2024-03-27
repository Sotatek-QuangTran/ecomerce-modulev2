import { Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { ProductEntity } from './product.entity';
import { SizeEntity } from './size.entity';

@Entity({ name: 'product_size' })
export class ProductSizeEntity {
  @PrimaryColumn({ name: 'product_id' })
  product_id: number;

  @PrimaryColumn({ name: 'size_id' })
  size_id: number;

  @ManyToOne(() => ProductEntity, (p) => p.product_size, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  product: ProductEntity;

  @ManyToOne(() => SizeEntity, (s) => s.product_size, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  size: SizeEntity;
}
