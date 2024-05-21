import { EntityIdIntCommon } from 'src/common';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { ProductEntity } from './product.entity';
import { SizeEntity } from './size.entity';
import { ColorEntity } from './color.entity';
import { OrderEntity } from 'src/modules/purchases/entities/order.entity';

@Entity()
export class ProductVariantEntity extends EntityIdIntCommon {
  @Column({ type: 'bigint' })
  productId: number;

  @Column({ type: 'int' })
  sizeId: number;

  @Column({ type: 'int' })
  colorId: number;

  @Column({ type: 'int', default: 0 })
  stock: number;

  @ManyToOne(() => ProductEntity, (p) => p.productVariants, {
    cascade: true,
    onDelete: 'CASCADE',
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'product_id' })
  product: ProductEntity;

  @ManyToOne(() => SizeEntity, (p) => p.productVariants, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'size_id' })
  size: SizeEntity;

  @ManyToOne(() => ColorEntity, (p) => p.productVariants, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'color_id' })
  color: SizeEntity;

  @OneToMany(() => OrderEntity, (o) => o.productVariant, {
    createForeignKeyConstraints: false,
    cascade: true,
    onDelete: 'CASCADE',
  })
  orders: OrderEntity[];
}
