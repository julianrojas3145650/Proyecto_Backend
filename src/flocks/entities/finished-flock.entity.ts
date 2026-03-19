import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn
} from 'typeorm';

import { Flock } from './flock.entity';

@Entity('Finalizacion_lote')
export class FinishedFlock {

  @PrimaryGeneratedColumn('uuid')
  Id: string;

  @Column()
  Cantidad: number;

  @Column()
  Razon: string;

  @CreateDateColumn()
  Fecha: Date;

  @ManyToOne(() => Flock)
  Lote: Flock;

}