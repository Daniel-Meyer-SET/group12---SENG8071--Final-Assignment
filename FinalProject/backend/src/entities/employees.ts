import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, JoinColumn } from "typeorm";
import { Driver } from "./drivers";
import { Mechanic } from "./mechanics";

@Entity()

export class Employee {
    @PrimaryGeneratedColumn()
    employeeID!: number;

    @Column()
    firstName!: string;

    @Column()
    surname!: string;

    @Column()
    seniority!: string;

    @OneToMany(() => Driver, driver => driver.employeeID)
    @JoinColumn()
    drivers!: Driver[];

    @OneToMany(() => Mechanic, mechanic => mechanic.employeeID)
    @JoinColumn()
    mechanics!: Mechanic[];
}
