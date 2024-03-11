import { Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { ProductEntity } from './product.entity';
import { ColorEntity } from './color.entity';

@Entity({ name: 'product_color' })
export class ProductColorEntity {
  @PrimaryColumn({ name: 'product_id', type: 'integer' })
  product_id: number;

  @PrimaryColumn({ name: 'color_id', type: 'integer' })
  color_id: number;

  @ManyToOne(() => ProductEntity, (p) => p.product_size, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  product: ProductEntity;

  @ManyToOne(() => ColorEntity, (p) => p.color, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  color: ColorEntity;
}
