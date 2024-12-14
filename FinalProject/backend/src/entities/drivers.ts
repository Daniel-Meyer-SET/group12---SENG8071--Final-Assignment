import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn,Unique,OneToMany } from "typeorm";
import { Employee } from "./employees";
import { Trip } from "./trips";

@Entity()
@Unique(["employeeID"])
export class Driver {
    @PrimaryGeneratedColumn()
    driverID!: number;

    @Column()
    category!: string;

    @ManyToOne(() => Employee, employee => employee.drivers)
    @JoinColumn({ name: "employeeID" })
    employeeID!: Employee;


    @OneToMany(() => Trip, trip => trip.driver1ID)
    tripsD1!: Trip[];

    @OneToMany(() => Trip, trip => trip.driver2ID)
    tripsD2!: Trip[];
}
