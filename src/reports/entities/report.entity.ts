import {
  Entity,
  Column,
  PrimaryGeneratedColumn
} from 'typeorm';

@Entity('reports')
export class Report {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  reportType: string;

}