import { Exclude } from 'class-transformer';
import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

class EntityCommon {
  @CreateDateColumn({ name: 'createdAt' })
  @Exclude()
  createdAt: Date;

  @UpdateDateColumn({ name: 'updatedAt' })
  @Exclude()
  updatedAt: Date;
}

export class EntityIdIntCommon extends EntityCommon {
  @PrimaryGeneratedColumn()
  id: number;
}

export class EntityIdUuidCommon extends EntityCommon {
  @PrimaryGeneratedColumn('uuid')
  id: string;
}
