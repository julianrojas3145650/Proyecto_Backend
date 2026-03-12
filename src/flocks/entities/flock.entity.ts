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

@Entity('flocks')
export class Flock {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    totalBirds: number;

    @Column()
    observation: string;

    @Column()
    foodRation: string;

    @Column()
    status: string;

    @ManyToOne(() => Breed)
    breed: Breed;

    @OneToMany(() => FlockLocation, location => location.flock)
    locations: FlockLocation[];

    @OneToMany(() => FlockStatus, status => status.flock)
    statuses: FlockStatus[];

    @OneToMany(() => EggProduction, production => production.flock)
    eggProductions: EggProduction[];

    @OneToMany(() => EggInventory, inventory => inventory.flock)
    eggInventories: EggInventory[];
}