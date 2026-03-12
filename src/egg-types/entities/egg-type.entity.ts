import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('EggType')
export class EggType {
    @PrimaryGeneratedColumn()
    id_tipo: number;

    @Column({length: 255})
    tipo: string;

    @Column({type: 'decimal', precision: 10, scale: 2})
    peso_min: number;

    @Column({type: 'decimal', precision: 10, scale: 2})
    peso_max: number;
}
