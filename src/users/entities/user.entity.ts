import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({length: 255})
    firstName: string

    @Column({length: 255})
    lastName: string

    @Column()
    document: number

    @CreateDateColumn()
    createAt: Date

    @UpdateDateColumn()
    lastAccess: Date

    @Column({unique: true})
    email: string

    @Column()
    password: string

    @Column({default: true})
    isActive: boolean
}
