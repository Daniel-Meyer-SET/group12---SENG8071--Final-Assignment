import { Entity, PrimaryGeneratedColumn, Column,JoinColumn ,ManyToOne, Double, } from "typeorm";
import { Customer } from "./customer";
import { Trip } from "./trips";


@Entity()

export class Shipment {
    @PrimaryGeneratedColumn()
    shipmentID!: number;
    
    @ManyToOne(() => Customer, Customer => Customer.Shipments)
    @JoinColumn({ name: "customerID" })
    customerID!: Customer;

    @Column({type:"decimal",precision:10,scale:2})
    weightKg!: number;

    @Column({ type: "decimal", precision: 10, scale: 2 })
    shipmentValue!: number;

    @Column()
    origin!: string;

    @Column()
    destination!: string;

    @ManyToOne(() => Trip, trip => trip.shipments)
    @JoinColumn({ name: "tripID" })
    tripID!: Trip;
    
    
}
