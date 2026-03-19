import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Insumo } from '../../supplies/entities/supply.entity';

@Entity('categoria_insumo')
export class SupplyCategory {
  @PrimaryGeneratedColumn()
  id_categoria: number;

  @Column({ type: 'varchar', length: 255 })
  nombre_categoria: string;

  @OneToMany(() => Insumo, (insumo) => insumo.categoria)
  insumos: Insumo[];
}