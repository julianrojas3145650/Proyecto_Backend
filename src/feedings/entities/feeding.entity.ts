import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn
} from 'typeorm';

import { Flock } from '../../flocks/entities/flock.entity';

@Entity('feeding')
export class Feeding {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @ManyToOne(() => Flock)
  flock: Flock;

  @Column()
  supplyId: string;

  @Column('decimal')
  quantity: number;

  @CreateDateColumn()
  date: Date;

}