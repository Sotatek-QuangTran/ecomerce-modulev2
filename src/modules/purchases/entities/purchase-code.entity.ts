import { Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class PurchaseCodeEntity {
  @PrimaryColumn({ type: 'bigint' })
  code: number;
}
