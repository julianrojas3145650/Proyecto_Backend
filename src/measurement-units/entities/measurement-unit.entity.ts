import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Insumo } from '../../supplies/entities/supply.entity';

@Entity('unidad_medida')
export class MeasurementUnit {
  @PrimaryGeneratedColumn()
  id_unidad_medida: number;

  @Column({ type: 'varchar', length: 255 })
  nombre: string;

  @Column({ type: 'varchar', length: 255 })
  abreviatura: string;

  @OneToMany(() => Insumo, (insumo) => insumo.unidadMedida)
  insumos: Insumo[];
}