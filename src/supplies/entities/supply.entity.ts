import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import { SupplyCategory } from '../../supply-categories/entities/supply-category.entity';
import { MeasurementUnit } from '../../measurement-units/entities/measurement-unit.entity';
import { CallUser } from '../../users/entities/call-user.entity';
import { SupplyHistory } from '../../supply-history/entities/supply-history.entity';
// import { Alimentacion } from '../../feedings/entities/feeding.entity';

@Entity('insumo')
export class Insumo {
  @PrimaryGeneratedColumn()
  id_insumos: number;

  @Column()
  id_categoria: number;

  @Column()
  id_unidad_medida: number;

  @Column()
  id_llamar_usuario: number;

  @Column({ type: 'varchar', length: 255 })
  nombre: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  cantidad: number;

  @Column({ type: 'timestamp' })
  fecha: Date;

  // Relations
  @ManyToOne(() => SupplyCategory, (cat) => cat.insumos)
  @JoinColumn({ name: 'id_categoria' })
  categoria: SupplyCategory;

  @ManyToOne(() => MeasurementUnit, (unit) => unit.insumos)
  @JoinColumn({ name: 'id_unidad_medida' })
  unidadMedida: MeasurementUnit;
/*
  @ManyToOne(() => CallUser, (lu) => lu.insumos)
  @JoinColumn({ name: 'id_llamar_usuario' })
  llamarUsuario: CallUser;
*/
  @OneToMany(() => SupplyHistory, (hist) => hist.insumo)
  historial: SupplyHistory[];
/*
  @OneToMany(() => Alimentacion, (ali) => ali.insumo)
  alimentaciones: Alimentacion[];
*/
}