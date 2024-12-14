import { Request,Response } from "express";
import {Truck} from  "../entities/truck";
import AppDataSource from "../config/database";

export const createTruck = async (req:Request, res: Response): Promise<void> =>{
    const {brand,load,capacity,buildYear,numberOfRepairs} = req.body;
    if( !brand || !load || !capacity || !buildYear || !numberOfRepairs){
            res.status(400).json({message:"one or more required parameters missing, check request body"})    
    }
else{
    try{
        const truck = new Truck();
        
        truck.brand = brand;
        truck.load = load;
        truck.capacity = capacity;
        truck.buildYear = buildYear;
        truck.numberOfRepairs = numberOfRepairs;

        const truckRepos = AppDataSource.getRepository(Truck);
        const savedTruck = await truckRepos.save(truck);
        res.status(201).json(savedTruck);
    }
    catch(err:any){

        res.status(500).json({message:err.message});
    }
}
};
export const getTrucks = async(req:Request, res: Response): Promise<void> =>{
try{
    const truckRepos = AppDataSource.getRepository(Truck);
    const trucks = await truckRepos.find();
    res.status(200).json(trucks)
}
catch(err:any){

    res.status(500).json({message:err.message});
}

}

export const getTruck = async (req:Request, res: Response): Promise<void> =>{
    
    try{
        

        const truckRepos = AppDataSource.getRepository(Truck);
        const truck = await truckRepos.findOneBy({truckID: parseInt(req.params.truckId)});
        if(truck){
            
            res.status(200).json(truck);

        }
        else{
            res.status(404).json({message:"Truck Not Found"})
        }
        
    }
    catch(err:any){

        res.status(500).json({message:err.message});
    }
};

export const updateTruck = async (req:Request, res: Response): Promise<void> =>{
  
    try{
        

        const truckRepos = AppDataSource.getRepository(Truck);
        const truck = await truckRepos.findOneBy({truckID: parseInt(req.params.truckId)});
        if(truck){
            truckRepos.merge(truck,req.body);
            const updatedTruck = await truckRepos.save(truck);
            res.status(200).json(updatedTruck);

        }
        else{
            res.status(404).json({message:"Truck Not Found"})
        }
        
    }
    catch(err:any){

        res.status(500).json({message:err.message});
    }
};
export const deleteTruck = async (req:Request, res: Response): Promise<void> =>{
   
    try{
        

        const truckRepos = AppDataSource.getRepository(Truck);
        const truck = await truckRepos.findOneBy({truckID: parseInt(req.params.truckId)});
        if(truck){
            
            const result = await truckRepos.delete(req.params.truckId);
           
            if(result.affected){
               
                
                res.status(200).json({message:"deleted successfully"});
    
            }
            else{
                res.status(400).json({message:"deletion failed"});

            }
        }

       
        else{
            res.status(404).json({message:"Truck Not Found"})
        }
        
    }
    catch(err:any){

        res.status(500).json({message:err.message});
    }
};
