import { EntityIdIntCommon } from 'src/common';
import { Column, Entity, OneToMany } from 'typeorm';
import { ProductColorEntity } from './product-color.entity';

@Entity()
export class ColorEntity extends EntityIdIntCommon {
  @Column(['color', 'column'])
  color: string;

  @OneToMany(() => ProductColorEntity, (pc) => pc.colorId, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  productColor: ProductColorEntity[];
}
