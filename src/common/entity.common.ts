import { Exclude } from 'class-transformer';
import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

class EntityCommon {
  @CreateDateColumn()
  @Exclude()
  created_at: Date;

  @UpdateDateColumn()
  @Exclude()
  updated_at: Date;
}

export class EntityIdIntCommon extends EntityCommon {
  @PrimaryGeneratedColumn()
  id: number;
}

export class EntityIdUuidCommon extends EntityCommon {
  @PrimaryGeneratedColumn('uuid')
  id: string;
}
