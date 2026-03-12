import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('breeds')
export class Breed {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 255 })
  description: string;

}