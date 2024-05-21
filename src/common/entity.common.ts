import { Exclude } from 'class-transformer';
import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

class EntityCommon {
  @CreateDateColumn()
  @Exclude()
  createdAt: Date;

  @UpdateDateColumn()
  @Exclude()
  updatedAt: Date;
}

export class EntityIdIntCommon extends EntityCommon {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;
}

export class EntityIdUuidCommon extends EntityCommon {
  @PrimaryGeneratedColumn('uuid')
  id: string;
}

export class EntityIdIntDeletedAtCommon extends EntityIdIntCommon {
  @DeleteDateColumn()
  @Exclude()
  deletedAt: Date;
}

export class EntityIdUuidDeletedAtCommon extends EntityIdIntCommon {
  @DeleteDateColumn()
  @Exclude()
  deletedAt: Date;
}
