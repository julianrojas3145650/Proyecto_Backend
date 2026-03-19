import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';

import { FlockLocation } from '../../flocks/entities/flock-location.entity';
import { FlockAssignmentHistory } from '../../flocks/entities/flock-assignment-history.entity';

@Entity('Galpon')
export class Barn {

  @PrimaryGeneratedColumn('uuid')
  Id: string;

  @Column()
  Codigo: string;

  @Column()
  Nombre: string;

  @Column()
  Capacidad_max_aves: number;

  @Column('decimal')
  Longitud: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => FlockLocation, location => location.Galpon)
  Ubicacion_lote: FlockLocation[];

  @OneToMany(() => FlockAssignmentHistory, history => history.Galpon)
  Asignacion_historial: FlockAssignmentHistory[];

}