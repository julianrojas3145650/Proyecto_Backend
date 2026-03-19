import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';

import { Flock } from './flock.entity';

@Entity('Aves_fallecidas')
export class DeadBird {

  @PrimaryGeneratedColumn('uuid')
  Id: string;

  @Column()
  Cantidad: number;

  @ManyToOne(() => Flock)
  Lote: Flock;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

}