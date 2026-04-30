import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { FlockLocation } from '../../flocks/entities/flock-location.entity';
import { FlockAssignmentHistory } from '../../flocks/entities/flock-assignment-history.entity';

@Entity('galpon')
export class Barn {

  @PrimaryGeneratedColumn('uuid')
  id_galpon!: string;

  @Column()
  codigo!: string;

  @Column()
  nombre!: string;

  @Column()
  capacidad_max_aves!: number;

  @Column('decimal')
  longitud!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @OneToMany(() => FlockLocation, location => location.galpon)
  ubicacion_lote!: FlockLocation[];

  @OneToMany(() => FlockAssignmentHistory, history => history.galpon)
  asignacion_historial!: FlockAssignmentHistory[];

}