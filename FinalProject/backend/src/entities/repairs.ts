import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Truck } from "./truck";
import { Mechanic } from "./mechanics";

@Entity()
export class Repair {
    @PrimaryGeneratedColumn()
    RepairID!: number;
    
    @Column()
    numberOfRepairDays!: number 

    @ManyToOne(() => Mechanic, mechanic => mechanic.Repairs)
    @JoinColumn({name: "mechanicID"})
    mechanicID!: Mechanic;

    @ManyToOne(() => Truck, truck => truck.Repairs)
    @JoinColumn({ name: "truckID" })

    truckID!: Truck;

}




