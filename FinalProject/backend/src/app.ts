import 'reflect-metadata';
import express,{Application} from 'express';
import AppDataSource from './config/database';
import truckRoutes from './routes/truckRoutes';
import customerRoutes from './routes/customerRoutes'
import employeeRoutes from './routes/employeeRoutes'
import driverRoutes from './routes/driverRoutes'
import mechanicRoutes from './routes/mechanicRoutes'
import shipmentRoutes from './routes/shipmentRoutes'
import tripRoutes from './routes/tripRoutes'
import repairRoutes from './routes/repairRoutes'


const app: Application = express();

app.use(express.json());

app.use('/api/trucks',truckRoutes);
app.use('/api/customers',customerRoutes);
app.use('/api/employees',employeeRoutes);
app.use('/api/drivers',driverRoutes);
app.use('/api/mechanics',mechanicRoutes);
app.use('/api/shipments',shipmentRoutes)
app.use('/api/trips',tripRoutes)
app.use('/api/repairs',repairRoutes)




app.get("/", (req, res) => {
    res.send("API is running...");
  });
  

AppDataSource.initialize().then(()=>{console.log('Data Source Intialized')}).catch((err)=>{console.error('Error intializing dataSource',err)});
export default app;





