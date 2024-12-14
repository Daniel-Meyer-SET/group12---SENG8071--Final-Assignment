import { Entity,PrimaryGeneratedColumn,Column,OneToMany} from "typeorm"; 
import { Repair } from "./repairs";
import { Trip } from "./trips";

@Entity()
export class Truck{
    @PrimaryGeneratedColumn()
    truckID!:number;

    @Column()
    brand!:string;

    @Column()
    load!:number;

    @Column()
    capacity!:number;

    @Column()
    buildYear!: number;

    @Column()
    numberOfRepairs!:number;

    @OneToMany(() => Repair, repair => repair.truckID)
    Repairs!: Repair[];

    @OneToMany(() => Trip, trip => trip.truckID)
    trips!: Trip[];
    

}