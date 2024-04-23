import { EntityIdIntCommon } from 'src/common';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { PurchaseEntity } from './purchase.entity';
import { ProductVariantEntity } from 'src/modules/products/entities/product-variant.entity';

@Entity()
export class OrderEntity extends EntityIdIntCommon {
  @Column({ type: 'integer' })
  purchaseId: number;

  @Column({ type: 'integer' })
  productVariantId: number;

  @Column({ name: 'price', type: 'float', default: 0 })
  price: number;

  @Column({ name: 'quantity', type: 'integer', default: 0 })
  quantity: number;

  @ManyToOne(() => PurchaseEntity, (o) => o.orders, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'purchase_id' })
  purchase: PurchaseEntity;

  @ManyToOne(() => ProductVariantEntity, (p) => p.orders, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'product_variant_id' })
  productVariant: ProductVariantEntity;
}
