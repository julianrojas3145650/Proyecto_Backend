import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

<<<<<<< HEAD
@Entity('Tipo_huevo')
export class EggType {
    @PrimaryGeneratedColumn()
    id_tipo: number;
=======
@Entity('tipo_huevo')
export class EggType {
    @PrimaryGeneratedColumn('uuid')
    id_tipo: string;
>>>>>>> chauxdev

    @Column({length: 255})
    tipo: string;

    @Column({type: 'decimal', precision: 10, scale: 2})
    peso_min: number;

    @Column({type: 'decimal', precision: 10, scale: 2})
    peso_max: number;
}
