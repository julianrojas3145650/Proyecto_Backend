import {
  Entity,
  Column,
  PrimaryGeneratedColumn
} from 'typeorm';

@Entity('reportes')
export class Report {

  @PrimaryGeneratedColumn('uuid')
  Id: string;

  @Column()
  Id_usuario: string;

  @Column()
  Tipo_reporte: string;

}