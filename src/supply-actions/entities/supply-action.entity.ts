import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { SupplyHistory } from '../../supply-history/entities/supply-history.entity';

@Entity('accion_historial_movimientos')
export class SupplyAction {
  @PrimaryGeneratedColumn()
  id_historial_accion: number;

  @Column({ type: 'varchar', length: 255 })
  nombre_accion: string;

  @OneToMany(() => SupplyHistory, (hist) => hist.accion)
  historial: SupplyHistory[];
}