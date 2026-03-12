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

@Entity('egg_production')
export class EggProduction {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Flock, flock => flock.eggProductions)
  flock: Flock;

  @Column()
  eggTypeId: string;

  @Column()
  quantity: number;

  @CreateDateColumn()
  productionDate: Date;

  @OneToMany(() => EggInventory, inventory => inventory.production)
  inventories: EggInventory[];

}