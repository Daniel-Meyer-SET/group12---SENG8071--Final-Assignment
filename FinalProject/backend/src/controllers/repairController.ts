import { Request,Response } from "express";
import {Repair} from  "../entities/repairs";
import { Mechanic } from "../entities/mechanics";
import { Truck } from "../entities/truck";
import AppDataSource from "../config/database";

export const createRepair = async (req:Request, res: Response): Promise<void> =>{
    const {numberOfRepairDays,mechanicId,truckId} = req.body;
    if(! numberOfRepairDays || ! mechanicId || !truckId){
        res.status(400).json({message:"one or more required parameters missing, check request body"})

    } else{
    try{
    

        const repairRepos = AppDataSource.getRepository(Repair);
        const mechanicRepos = AppDataSource.getRepository(Mechanic);
        const truckRepos = AppDataSource.getRepository(Truck);

         const mechanic = await mechanicRepos.findOneBy({mechanicID: parseInt(req.body.mechanicID)});
         const truck = await truckRepos.findOneBy({truckID: parseInt(req.body.truckId)});

        
        if(mechanic && truck){
            const repair = new Repair();
        
        repair.mechanicID = mechanicId;
        
        repair.numberOfRepairDays= numberOfRepairDays
        repair.truckID = truckId

        const savedRepair = await repairRepos.save(repair);
        res.status(201).json(savedRepair);
        }
        else if(!mechanic){
            res.status(404).json({message:"Mechanic Not Found, create a Mechanic first"})

        }
        else if(!truck){
            res.status(404).json({message:"Truck Not Found, create a Truck first"})
        }


        
    }
    catch(err:any){

        res.status(500).json({message:err.message});
    }
}
};
export const getRepairs = async(req:Request, res: Response): Promise<void> =>{
try{
    const repairRepos = AppDataSource.getRepository(Repair);
    const repairs = await repairRepos.find();
    res.status(200).json(repairs)
}
catch(err:any){

    res.status(500).json({message:err.message});
}

}

export const getRepair = async (req:Request, res: Response): Promise<void> =>{
    
    try{
        

        const repairRepos = AppDataSource.getRepository(Repair);
        const repair = await repairRepos.findOneBy({RepairID: parseInt(req.params.repairId)});
        if(repair){
            
            res.status(200).json(repair);

        }
        else{
            res.status(404).json({message:"Repair Not Found"})
        }
        
    }
    catch(err:any){

        res.status(500).json({message:err.message});
    }
};

export const updateRepair = async (req:Request, res: Response): Promise<void> =>{
  
    try{
        

        const repairRepos = AppDataSource.getRepository(Repair);
        const repair = await repairRepos.findOneBy({RepairID: parseInt(req.params.repairId)});
        if(repair){
            repairRepos.merge(repair,req.body);
            const updatedRepair = await repairRepos.save(repair);
            res.status(200).json(updatedRepair);

        }
        else{
            res.status(404).json({message:"Repair Not Found"})
        }
        
    }
    catch(err:any){

        res.status(500).json({message:err.message});
    }
};
export const deleteRepair = async (req:Request, res: Response): Promise<void> =>{
   
    try{
        

        const repairRepos = AppDataSource.getRepository(Repair);
        const repair = await repairRepos.findOneBy({RepairID: parseInt(req.params.repairId)});
        if(repair){
            const result = await repairRepos.delete(req.params.repairId);
            
            
            if(result.affected){
               
                
                res.status(200).json({message:"deleted successfully"});
    
            }
            else{
                res.status(400).json({message:"deletion failed"});
            }
        }

       
        else{
            res.status(404).json({message:"Repair Not Found"})
        }
        
    }
    catch(err:any){

        res.status(500).json({message:err.message});
    }
};
