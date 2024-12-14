import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn, Unique, OneToOne, ManyToOne } from "typeorm";
import { Employee } from "./employees";
import { Repair } from "./repairs";

@Entity()
@Unique(["employeeID"])
export class Mechanic {
    @PrimaryGeneratedColumn()
    mechanicID!: number;

    @ManyToOne(() => Employee, employee => employee.mechanics)
    @JoinColumn({ name: "employeeID" })
    employeeID!: Employee;


    @Column()
    SpecializedBrand!: string;
    
    @OneToMany(() => Repair, repair => repair.truckID)
    Repairs!: Repair[];
}
