import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, OneToMany } from 'typeorm';
import { Flock } from '../../flocks/entities/flock.entity';
import { EggInventory } from './egg-inventory.entity';

@Entity('produccion_huevo')
export class EggProduction {

  @PrimaryGeneratedColumn('uuid')
  id_produccion_huevo!: string;

  @ManyToOne(() => Flock, flock => flock.produccion_huevo)
  lote: Flock = new Flock;

  @Column()
  tipo_huevoId!: string;

  @Column()
  cantidady!: number;

  @CreateDateColumn()
  produccionFecha!: Date;

  @OneToMany(() => EggInventory, inventory => inventory.produccion)
  inventories!: EggInventory[];

}