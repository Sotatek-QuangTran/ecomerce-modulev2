import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { ProductEntity } from './product.entity';
import { ColorEntity } from './color.entity';

@Entity()
export class ProductColorEntity {
  @PrimaryColumn({ type: 'integer' })
  productId: number;

  @PrimaryColumn({ type: 'integer' })
  colorId: number;

  @ManyToOne(() => ProductEntity, (p) => p.productColor, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'product_id' })
  product: ProductEntity;

  @ManyToOne(() => ColorEntity, (p) => p.color, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'color_id' })
  color: ColorEntity;
}
