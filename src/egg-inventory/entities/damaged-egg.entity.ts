import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn
} from 'typeorm';

import { EggInventory } from './egg-inventory.entity';

@Entity('damaged_eggs')
export class DamagedEgg {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => EggInventory, inventory => inventory.damagedEggs)
  inventory: EggInventory;

  @Column()
  quantity: number;

  @Column()
  reason: string;

  @CreateDateColumn()
  registeredAt: Date;

}