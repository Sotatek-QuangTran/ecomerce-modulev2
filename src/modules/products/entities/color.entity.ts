import { EntityIdIntCommon } from 'src/common';
import { Column, Entity, OneToMany } from 'typeorm';
import { ProductVariantEntity } from './product-variant.entity';

@Entity()
export class ColorEntity extends EntityIdIntCommon {
  @Column()
  color: string;

  @OneToMany(() => ProductVariantEntity, (pc) => pc.colorId, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  productVariants: ProductVariantEntity[];
}
