import { EntityIdIntCommon } from 'src/common';
import { Column, Entity, OneToMany } from 'typeorm';
import { ProductColorEntity } from './product-color.entity';

@Entity({ name: 'Colors' })
export class ColorEntity extends EntityIdIntCommon {
  @Column({ name: 'color', type: 'varchar', length: 10 })
  color: string;

  @OneToMany(() => ProductColorEntity, (pc) => pc.color_id, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  product_color: ProductColorEntity;
}
