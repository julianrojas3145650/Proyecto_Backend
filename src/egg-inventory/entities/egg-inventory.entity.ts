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

@Entity('Inventario_huevo')
export class EggInventory {

  @PrimaryGeneratedColumn('uuid')
  Id: string;

  @Column()
  Tipo_huevoId: string;

  @ManyToOne(() => Flock, flock => flock.Inventario_huevo)
  Lote: Flock;

  @ManyToOne(() => EggProduction, production => production.inventories)
  Produccion: EggProduction;

  @Column()
  Cantidad: number;

  @OneToMany(() => DamagedEgg, damaged => damaged.Inventario)
  damagedEggs: DamagedEgg[];

  @OneToMany(() => EggHistory, history => history.Inventario)
  history: EggHistory[];

}