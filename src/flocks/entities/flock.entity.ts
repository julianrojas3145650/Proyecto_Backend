import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    OneToMany
} from 'typeorm';

import { Breed } from '../../breeds/entities/breed.entity';
import { FlockLocation } from './flock-location.entity';
import { FlockStatus } from './flock-status.entity';
import { EggProduction } from '../../egg-inventory/entities/egg-production.entity';
import { EggInventory } from '../../egg-inventory/entities/egg-inventory.entity';

@Entity('lotes')
export class Flock {

    @PrimaryGeneratedColumn('uuid')
    Id: string;

    @Column()
    Nombre: string;

    @Column()
    Total_aves: number;

    @Column()
    Observacion: string;

    @Column()
    Racion_alimento: string;

    @Column()
    Estado: string;

    @ManyToOne(() => Breed)
    Raza: Breed;

    @OneToMany(() => FlockLocation, location => location.Lote)
    Ubicacion: FlockLocation[];

    @OneToMany(() => FlockStatus, status => status.Lote)
    Estados: FlockStatus[];

    @OneToMany(() => EggProduction, production => production.Lote)
    Produccion_huevo: EggProduction[];

    @OneToMany(() => EggInventory, inventory => inventory.Lote)
    Inventario_huevo: EggInventory[];
}