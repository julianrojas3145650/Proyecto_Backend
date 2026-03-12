import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn
} from 'typeorm';

import { Flock } from './flock.entity';

@Entity('finished_flocks')
export class FinishedFlock {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  quantity: number;

  @Column()
  reason: string;

  @CreateDateColumn()
  date: Date;

  @ManyToOne(() => Flock)
  flock: Flock;

}