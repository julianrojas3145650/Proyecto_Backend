import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Insumo } from '../../supplies/entities/supply.entity';
import { SupplyAction } from '../../supply-actions/entities/supply-action.entity';

@Entity('historial_insumo')
export class SupplyHistory {
  @PrimaryGeneratedColumn()
  id_historial_insumo: number;

  @Column()
  id_insumos: number;

  @Column()
  id_historial_accion: number;

  @Column({ type: 'float' })
  cantidad: number;

  @Column({ type: 'varchar', length: 255 })
  descripcion: string;

  @Column({ type: 'timestamp' })
  fecha: Date;

  // Relations
  @ManyToOne(() => Insumo, (insumo) => insumo.historial)
  @JoinColumn({ name: 'id_insumos' })
  insumo: Insumo;

  @ManyToOne(() => SupplyAction, (action) => action.historial)
  @JoinColumn({ name: 'id_historial_accion' })
  accion: SupplyAction;
}