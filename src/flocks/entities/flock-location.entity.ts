import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn
} from 'typeorm';

import { Flock } from './flock.entity';
import { Barn } from '../../barns/entities/barn.entity';

@Entity('flock_locations')
export class FlockLocation {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Flock, flock => flock.locations)
  flock: Flock;

  @ManyToOne(() => Barn, barn => barn.flockLocations)
  barn: Barn;

  @CreateDateColumn()
  date: Date;

}