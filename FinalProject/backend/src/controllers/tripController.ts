import { Request,Response } from "express";
import {Trip} from  "../entities/trips";
import { Truck } from "../entities/truck";
import AppDataSource from "../config/database";
import { Driver } from "../entities/drivers";



export const createTrip = async (req: Request, res: Response): Promise<void> => {
    const { truckID, routeFrom, routeTo, driver1ID, driver2ID } = req.body;
    if(!truckID|| ! routeFrom || ! routeTo || !driver1ID){
            res.status(400).json({message:"one or more required parameters missing, check request body"})

        
    }
    else{
    try {
        const tripRepos = AppDataSource.getRepository(Trip);
        const truckRepos = AppDataSource.getRepository(Truck);
        const driverRepos = AppDataSource.getRepository(Driver);

        const truck = await truckRepos.findOneBy({ truckID: parseInt(truckID) });
        const driver1 = await driverRepos.findOneBy({ driverID: parseInt(driver1ID) });
        let isValid : boolean = true;

        if (!truck) {
            res.status(404).json({ message: "Truck Not Found, create a Truck first" });
            isValid = false;
            
        } 

        if(!driver1){
            res.status(404).json({ message: "Driver1 Not Found, create a Driver first" });
            isValid = false;
        }       
        const trip = new Trip();
        trip.truckID = truckID;
        trip.routeFrom = routeFrom;
        trip.routeTo = routeTo;
        trip.driver1ID = driver1ID;

        if (driver2ID) {
            const driver2 = await driverRepos.findOneBy({ driverID: parseInt(driver2ID) });
            if (!driver2) {
                 res.status(404).json({ message: "Driver2 Not Found, create a Driver first" });
                 isValid = false;
            }
            if(driver1ID == driver2ID){
                res.status(400).json({message:"Bad Request: Driver1 must not the same as Driver2"})
                isValid = false
            }
    
            trip.driver2ID = driver2ID;
        } 

        if(isValid == true){
            const savedTrip = await tripRepos.save(trip);
            res.status(201).json(savedTrip);
        }
       
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
}
};

export const getTrips = async(req:Request, res: Response): Promise<void> =>{
    try{
        const tripRepos = AppDataSource.getRepository(Trip);
        const trips = await tripRepos.find();
        res.status(200).json(trips)
    }
    catch(err:any){
    
        res.status(500).json({message:err.message});
    }
    
    }
export const getTrip = async (req:Request, res: Response): Promise<void> =>{
    
    try{
        

        const tripRepos = AppDataSource.getRepository(Trip);
        const trip = await tripRepos.findOneBy({tripID: parseInt(req.params.tripId)});
        if(trip){
            
            res.status(200).json(trip);

        }
        else{
            res.status(404).json({message:"Trip Not Found"})
        }
        
    }
    catch(err:any){

        res.status(500).json({message:err.message});
    }
};

export const updateTrip = async (req:Request, res: Response): Promise<void> =>{
  
    try{
        

        const tripRepos = AppDataSource.getRepository(Trip);
        const trip = await tripRepos.findOneBy({tripID: parseInt(req.params.tripId)});
        if(trip){
            tripRepos.merge(trip,req.body);
            const updatedTrip = await tripRepos.save(trip);
            res.status(200).json(updatedTrip);

        }
        else{
            res.status(404).json({message:"Trip Not Found"})
        }
        
    }
    catch(err:any){

        res.status(500).json({message:err.message});
    }
};
export const deleteTrip = async (req:Request, res: Response): Promise<void> =>{
   
    try{
        

        const tripRepos = AppDataSource.getRepository(Trip);
        const trip = await tripRepos.findOneBy({tripID: parseInt(req.params.tripId)});
        if(trip){
            
            const result = await tripRepos.delete(req.params.tripId);
           
            if(result.affected){
               
                
                res.status(200).json({message:"deleted successfully"});
    
            }
            else{
                res.status(400).json({message:"deletion failed"});

            }
        }

       
        else{
            res.status(404).json({message:"Trip Not Found"})
        }
        
    }
    catch(err:any){

        res.status(500).json({message:err.message});
    }
};
