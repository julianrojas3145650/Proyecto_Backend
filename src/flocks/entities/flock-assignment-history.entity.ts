import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne
} from 'typeorm';

import { Flock } from './flock.entity';
import { Barn } from '../../barns/entities/barn.entity';

@Entity('flock_assignment_history')
export class FlockAssignmentHistory {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  assignedQuantity: number;

  @ManyToOne(() => Flock)
  flock: Flock;

  @ManyToOne(() => Barn)
  barn: Barn;

}