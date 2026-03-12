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

@Entity('barns')
export class Barn {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  code: string;

  @Column()
  name: string;

  @Column()
  maxBirdCapacity: number;

  @Column('decimal')
  length: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relación con ubicación de lotes
  @OneToMany(() => FlockLocation, location => location.barn)
  flockLocations: FlockLocation[];

  // Relación con historial de asignaciones
  @OneToMany(() => FlockAssignmentHistory, history => history.barn)
  assignmentHistory: FlockAssignmentHistory[];

}