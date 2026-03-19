import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Raza')
export class Breed {

  @PrimaryGeneratedColumn('uuid')
  Id: string;

  @Column({ length: 255 })
  Nombre: string;

  @Column({ length: 255 })
  Descripcion: string;

}