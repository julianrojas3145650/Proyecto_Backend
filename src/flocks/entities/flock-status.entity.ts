import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne
} from 'typeorm';

import { Flock } from './flock.entity';

@Entity('flock_status')
export class FlockStatus {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  status: string;

  @ManyToOne(() => Flock, flock => flock.statuses)
  flock: Flock;

}