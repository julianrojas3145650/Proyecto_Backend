import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany
} from 'typeorm';

import { Flock } from '../../flocks/entities/flock.entity';
import { EggProduction } from './egg-production.entity';
import { DamagedEgg } from './damaged-egg.entity';
import { EggHistory } from './egg-history.entity';

@Entity('egg_inventory')
export class EggInventory {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  eggTypeId: string;

  @ManyToOne(() => Flock, flock => flock.eggInventories)
  flock: Flock;

  @ManyToOne(() => EggProduction, production => production.inventories)
  production: EggProduction;

  @Column()
  quantity: number;

  @OneToMany(() => DamagedEgg, damaged => damaged.inventory)
  damagedEggs: DamagedEgg[];

  @OneToMany(() => EggHistory, history => history.inventory)
  history: EggHistory[];

}