import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { randomUUID } from 'crypto'

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id_user: string

    @Column({nullable: false})
    name: string

    @Column({nullable: false, unique: true})
    email: string

    @Column({nullable: false})
    password: string

    @Column({nullable: false})
    balance: number

    constructor(
        name: string,
        email: string,
        password: string,
    ) {
        this.id_user = randomUUID()
        this.name = name
        this.email = email
        this.password = password
        this.balance = 0
    }
}