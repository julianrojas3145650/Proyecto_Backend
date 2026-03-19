import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne
} from 'typeorm';

import { Flock } from './flock.entity';

@Entity('Estado_lote')
export class FlockStatus {

  @PrimaryGeneratedColumn('uuid')
  Id: string;

  @Column()
  Estado: string;

  @ManyToOne(() => Flock, flock => flock.Estados)
  Lote: Flock;

}