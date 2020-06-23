import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import Tree from './Tree';

@Entity('harvests')
class Species {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  information: string;

  @Column()
  date: Date;

  @Column()
  gross_weight: number;

  @Column()
  tree_id: string;

  @ManyToOne(() => Tree)
  @JoinColumn({ name: 'tree_id' })
  tree: Tree;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Species;
