import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn,OneToMany, Double } from "typeorm";
import { Truck } from "./truck";
import { Driver } from "./drivers";
import { Shipment } from "./shipments";


@Entity()
export class Trip {
    @PrimaryGeneratedColumn()
    tripID!: number;
    
    @Column()
    numberOfRepairDays!: number 


    @ManyToOne(() => Truck, truck => truck.trips)

    @JoinColumn({ name: "truckID" })

    truckID!: Truck;


    @OneToMany(() => Shipment, shipment => shipment.tripID)
    shipments!: Shipment[];
   
    @ManyToOne(() => Driver, driver => driver.tripsD1, { nullable: false })
    @JoinColumn({ name: "driver1ID" })
    driver1ID!: Driver;

    @ManyToOne(() => Driver, driver => driver.tripsD2, { nullable: true })
    @JoinColumn({ name: "driver2ID" })
    driver2ID!: Driver;

    
    @Column()
    routeFrom!: string;
    
    @Column() 
    routeTo!: string;
     


}




