import { EntityIdIntCommon } from 'src/common';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class WhitePaperEntity extends EntityIdIntCommon {
  @Column({ name: 'content', type: 'text', nullable: true })
  content: string;

  @Column({ name: 'tag', type: 'varchar', length: 45 })
  tag: string;

  @Column({ name: 'url', type: 'text' })
  url: string;

  @OneToMany(() => WhitePaperRelateEntity, (w) => w.parent, {
    createForeignKeyConstraints: false,
  })
  childs: WhitePaperRelateEntity[];
}

@Entity()
export class WhitePaperRelateEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  parentId: number;

  @Column({ type: 'int' })
  childId: number;

  @ManyToOne(() => WhitePaperEntity, (w) => w.childs, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'parent_id' })
  parent: WhitePaperEntity;
}
