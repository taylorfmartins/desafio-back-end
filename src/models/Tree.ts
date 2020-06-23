import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import Species from './Species';
import TreeGroup from './TreeGroup';

@Entity('trees')
class Tree {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  description: string;

  @Column()
  age: number;

  @Column()
  species_id: string;

  @ManyToOne(() => Species)
  @JoinColumn({ name: 'species_id' })
  species: Species;

  @Column()
  tree_group_id: string;

  @ManyToOne(() => Species)
  @JoinColumn({ name: 'tree_group_id' })
  tree_group: TreeGroup;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Tree;
