import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn
} from 'typeorm';

import { Flock } from './flock.entity';
import { Barn } from '../../barns/entities/barn.entity';

@Entity('Ubicacion_lote')
export class FlockLocation {

  @PrimaryGeneratedColumn('uuid')
  Id: string;

  @ManyToOne(() => Flock, flock => flock.Ubicacion)
  Lote: Flock;

  @ManyToOne(() => Barn, barn => barn.Ubicacion_lote)
  Galpon: Barn;

  @CreateDateColumn()
  Fecha: Date;

}