import { Request,Response } from "express";
import {Shipment} from  "../entities/shipments";
import { Customer } from "../entities/customer";
import { Trip } from "../entities/trips";
import AppDataSource from "../config/database";

export const createShipment = async (req:Request, res: Response): Promise<void> =>{
    const {customerID,tripId,weightKg,shipmentValue,origin,destination} = req.body;
    if(!customerID || !tripId || !weightKg || !shipmentValue || !origin || !destination ){
        res.status(400).json({message:"one or more required parameters missing, check request body"})

    } else{
    try{ 
       

        const shipmentRepos = AppDataSource.getRepository(Shipment);
        const tripRepos = AppDataSource.getRepository(Trip);
        const customerRepos = AppDataSource.getRepository(Customer);

         const trip = await tripRepos.findOneBy({tripID: parseInt(req.body.tripId)});
         const customer = await customerRepos.findOneBy({customerID: parseInt(req.body.customerId)});

        
        if(trip && customer){
            const shipment = new Shipment();
        
        shipment.tripID = tripId;

        
        shipment.customerID = customerID;
        shipment.weightKg  = weightKg;
        shipment. shipmentValue = shipmentValue;
        shipment.origin = origin;
        shipment.destination = destination;


        const savedShipment = await shipmentRepos.save(shipment);
        res.status(201).json(savedShipment);
        }
        else if(!customer){
            res.status(404).json({message:"Customer Not Found, create a Customer First"});

        }
        else if(!trip){
            res.status(404).json({message:"Trip Not Found, create a Trip First"});
        }


        
    }
    catch(err:any){

        res.status(500).json({message:err.message});
    }
}
};
export const getShipments = async(req:Request, res: Response): Promise<void> =>{
try{
    const shipmentRepos = AppDataSource.getRepository(Shipment);
    const shipments = await shipmentRepos.find();
    res.status(200).json(shipments)
}
catch(err:any){

    res.status(500).json({message:err.message});
}

}

export const getShipment = async (req:Request, res: Response): Promise<void> =>{
    
    try{
        

        const shipmentRepos = AppDataSource.getRepository(Shipment);
        const shipment = await shipmentRepos.findOneBy({shipmentID: parseInt(req.params.shipmentId)});
        if(shipment){
            
            res.status(200).json(shipment);

        }
        else{
            res.status(404).json({message:"Shipment Not Found"})
        }
        
    }
    catch(err:any){

        res.status(500).json({message:err.message});
    }
};

export const updateShipment = async (req:Request, res: Response): Promise<void> =>{
  
    try{
        

        const shipmentRepos = AppDataSource.getRepository(Shipment);
        const shipment = await shipmentRepos.findOneBy({shipmentID: parseInt(req.params.shipmentId)});
        if(shipment){
            shipmentRepos.merge(shipment,req.body);
            const updatedShipment = await shipmentRepos.save(shipment);
            res.status(200).json(updatedShipment);

        }
        else{
            res.status(404).json({message:"Shipment Not Found"})
        }
        
    }
    catch(err:any){

        res.status(500).json({message:err.message});
    }
};
export const deleteShipment = async (req:Request, res: Response): Promise<void> =>{
   
    try{
        

        const shipmentRepos = AppDataSource.getRepository(Shipment);
        const shipment = await shipmentRepos.findOneBy({shipmentID: parseInt(req.params.shipmentId)});
        if(shipment){
            const result = await shipmentRepos.delete(req.params.shipmentId);
            
            
            if(result.affected){
               
                
                res.status(200).json({message:"deleted successfully"});
    
            }
            else{
                res.status(400).json({message:"deletion failed"});

            }
        }

       
        else{
            res.status(404).json({message:"Shipment Not Found"})
        }
        
    }
    catch(err:any){

        res.status(500).json({message:err.message});
    }
};
