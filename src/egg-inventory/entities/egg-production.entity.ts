import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  OneToMany
} from 'typeorm';

import { Flock } from '../../flocks/entities/flock.entity';
import { EggInventory } from './egg-inventory.entity';

@Entity('Produccion_huevo')
export class EggProduction {

  @PrimaryGeneratedColumn('uuid')
  Id: string;

  @ManyToOne(() => Flock, flock => flock.Produccion_huevo)
  Lote: Flock;

  @Column()
  Tipo_huevoId: string;

  @Column()
  Cantidady: number;

  @CreateDateColumn()
  ProduccionFecha: Date;

  @OneToMany(() => EggInventory, inventory => inventory.Produccion)
  inventories: EggInventory[];

}