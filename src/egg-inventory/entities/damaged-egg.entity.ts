import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn
} from 'typeorm';

import { EggInventory } from './egg-inventory.entity';

@Entity('huevos_dañados')
export class DamagedEgg {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => EggInventory, inventory => inventory.damagedEggs)
  Inventario: EggInventory;

  @Column()
  Cantidad: number;

  @Column()
  Razon: string;

  @CreateDateColumn()
  registeredAt: Date;

}