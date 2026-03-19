import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn
} from 'typeorm';

import { EggInventory } from './egg-inventory.entity';
import { EggProduction } from './egg-production.entity';

@Entity('Historial_Huevo')
export class EggHistory {

  @PrimaryGeneratedColumn('uuid')
  Id: string;

  @ManyToOne(() => EggInventory, inventory => inventory.history)
  Inventario: EggInventory;

  @ManyToOne(() => EggProduction)
  Produccion: EggProduction;

  @Column()
  UsuarioId: string;

  @Column()
  Cantidad: number;

  @CreateDateColumn()
  Fecha: Date;

}