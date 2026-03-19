import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne
} from 'typeorm';

import { Flock } from './flock.entity';
import { Barn } from '../../barns/entities/barn.entity';

@Entity('Historial_asignacion_lote')
export class FlockAssignmentHistory {

  @PrimaryGeneratedColumn('uuid')
  Id: string;

  @Column()
  Cantidad_asignada: number;

  @ManyToOne(() => Flock)
  Lote: Flock;

  @ManyToOne(() => Barn)
  Galpon: Barn;

}