import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn
} from 'typeorm';

import { EggInventory } from './egg-inventory.entity';
import { EggProduction } from './egg-production.entity';

@Entity('egg_history')
export class EggHistory {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => EggInventory, inventory => inventory.history)
  inventory: EggInventory;

  @ManyToOne(() => EggProduction)
  production: EggProduction;

  @Column()
  userId: string;

  @Column()
  quantity: number;

  @CreateDateColumn()
  date: Date;

}