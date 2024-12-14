import { Request,Response } from "express";
import {Mechanic} from  "../entities/mechanics";
import { Employee } from "../entities/employees";
import AppDataSource from "../config/database";

export const createMechanic = async (req:Request, res: Response): Promise<void> =>{
    const {EmployeeID,SpecializedBrand} = req.body;
    if(! EmployeeID || !SpecializedBrand){
        res.status(400).json({message:"one or more required parameters missing, check request body"})

    } else{
    try{
        
        
        const mechanicRepos = AppDataSource.getRepository(Mechanic);
        const employeeRepos = AppDataSource.getRepository(Employee);

        const employee = await employeeRepos.findOneBy({employeeID: parseInt(req.body.EmployeeID)});
        if(employee){
            const mechanic = new Mechanic();
        
        mechanic.employeeID = EmployeeID;
        
        mechanic.SpecializedBrand = SpecializedBrand;

        const savedMechanic = await mechanicRepos.save(mechanic);
        res.status(201).json(savedMechanic);
        }
        else{
            res.status(404).json({message:"Employee Not Found, create a Mechanic first"})

        }
      
    }
    catch(err:any){

        res.status(500).json({message:err.message});
    }
}
};
export const getMechanics = async(req:Request, res: Response): Promise<void> =>{
try{
    const mechanicRepos = AppDataSource.getRepository(Mechanic);
    const mechanics = await mechanicRepos.find();
    res.status(200).json(mechanics)
}
catch(err:any){

    res.status(500).json({message:err.message});
}

}

export const getMechanic = async (req:Request, res: Response): Promise<void> =>{
    
    try{
        

        const mechanicRepos = AppDataSource.getRepository(Mechanic);
        const mechanic = await mechanicRepos.findOneBy({mechanicID: parseInt(req.params.mechanicId)});
        if(mechanic){
            
            res.status(200).json(mechanic);

        }
        else{
            res.status(404).json({message:"Mechanic Not Found"})
        }
        
    }
    catch(err:any){

        res.status(500).json({message:err.message});
    }
};

export const updateMechanic = async (req:Request, res: Response): Promise<void> =>{
  
    try{
        const mechanicRepos = AppDataSource.getRepository(Mechanic);
        const mechanic = await mechanicRepos.findOneBy({mechanicID: parseInt(req.params.mechanicId)});
        if(mechanic){
            mechanicRepos.merge(mechanic,req.body);
            const updatedMechanic = await mechanicRepos.save(mechanic);
            res.status(200).json(updatedMechanic);

        }
        else{
            res.status(404).json({message:"Mechanic Not Found"})
        }
        
    }
    catch(err:any){

        res.status(500).json({message:err.message});
    }
};
export const deleteMechanic = async (req:Request, res: Response): Promise<void> =>{
   
    try{
        

        
        const mechanicRepos = AppDataSource.getRepository(Mechanic);
        
        const mechanic = await mechanicRepos.findOneBy({mechanicID: parseInt(req.params.mechanicId)});

        if(mechanic){
           const result = await mechanicRepos.delete(req.params.mechanicId);
            if(result.affected){
            res.status(200).json({message:"deleted successfully"});
            }
            else{
                res.status(400).json({message:"deletion failed"})
            }

        }
        else{
            res.status(404).json({message:"Mechanic Not Found"})
        }
        
    }
    catch(err:any){

        res.status(500).json({message:err.message});
    }
};
