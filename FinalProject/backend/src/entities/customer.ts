import { Entity,PrimaryGeneratedColumn,Column,OneToMany } from "typeorm"; 
import { Shipment } from "./shipments";
@Entity()
export class Customer{
    @PrimaryGeneratedColumn()
    customerID!:number;

    @Column()
    customerName!:string;

    @Column()
    address!:string;
    
    @Column()
    phone1!:string;

    @Column()
    phone2!:string;

    @OneToMany(() => Shipment, shipment => shipment.customerID)
    Shipments!: Shipment[];
}