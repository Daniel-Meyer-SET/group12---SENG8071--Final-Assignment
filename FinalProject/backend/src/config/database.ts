import { DataSource } from "typeorm";
import dotenv from "./dotenv";
import { Truck } from "../entities/truck";
import { Customer } from "../entities/customer";
import { Employee } from "../entities/employees";
import { Driver } from "../entities/drivers";
import { Mechanic } from "../entities/mechanics";
import { Shipment } from "../entities/shipments";
import { Trip } from "../entities/trips";
import { Repair } from "../entities/repairs";

const AppDataSource = new DataSource({
type: 'postgres',
host: dotenv.DB_HOST,
port: Number(dotenv.DB_PORT),
username:dotenv.DB_USER,
password:dotenv.DB_PASSWORD,
database:dotenv.DB_DATABASE,
entities:[Truck,Customer,Employee,Driver,Mechanic,Shipment,Trip,Repair],
synchronize: true,
logging: false,


});
export default AppDataSource;