import { Request,Response } from "express";
import {Driver} from  "../entities/drivers";
import { Employee } from "../entities/employees";
import AppDataSource from "../config/database";

export const createDriver = async (req:Request, res: Response): Promise<void> =>{
    const {EmployeeID,Category} = req.body;
    if(!EmployeeID || !Category){
        res.status(400).json({message:"one or more required parameters missing, check request body"})

        }
        else{

    try{
        
        const driverRepos = AppDataSource.getRepository(Driver);
        const employeeRepos = AppDataSource.getRepository(Employee);
        
        const employee = await employeeRepos.findOneBy({employeeID: parseInt(req.body.EmployeeID)});
        if(employee ){
            const driver = new Driver();
        
        driver.employeeID = EmployeeID;
        driver.category = Category;
         
        const savedDriver = await driverRepos.save(driver);
        res.status(201).json(savedDriver);
        
        }
        else{
        res.status(404).json({message:"Employee Not Found, create an Employee first"})
        }

    }
    catch(err:any){        
    res.status(500).json({message:err.message});
            
    }
}
};
export const getDrivers = async(req:Request, res: Response): Promise<void> =>{
try{
    const driverRepos = AppDataSource.getRepository(Driver);
    const drivers = await driverRepos.find();
    res.status(200).json(drivers)
}
catch(err:any){

    res.status(500).json({message:err.message});
}

}

export const getDriver = async (req:Request, res: Response): Promise<void> =>{
    
    try{
        

        const driverRepos = AppDataSource.getRepository(Driver);
        const driver = await driverRepos.findOneBy({driverID: parseInt(req.params.driverId)});
        if(driver){
            
            res.status(200).json(driver);

        }
        else{
            res.status(404).json({message:"Driver Not Found"})
        }
        
    }
    catch(err:any){

        res.status(500).json({message:err.message});
    }
};

export const updateDriver = async (req:Request, res: Response): Promise<void> =>{
  
    try{
        

        const driverRepos = AppDataSource.getRepository(Driver);
        const driver = await driverRepos.findOneBy({driverID: parseInt(req.params.driverId)});
        if(driver){
            driverRepos.merge(driver,req.body);
            const updatedDriver = await driverRepos.save(driver);
            res.status(200).json(updatedDriver);

        }
        else{
            res.status(404).json({message:"Driver Not Found"})
        }
        
    }
    catch(err:any){

        res.status(500).json({message:err.message});
    }
};
export const deleteDriver = async (req:Request, res: Response): Promise<void> =>{
   
    try{
        

        const driverRepos = AppDataSource.getRepository(Driver);
        
        const driver = await driverRepos.findOneBy({driverID: parseInt(req.params.driverId)});

        if(driver){
           const result = await driverRepos.delete(req.params.driverId);
            if(result.affected){
            res.status(200).json({message:"deleted successfully"});
            }
            else{
                res.status(400).json({message:"deletion failed"})
            }

        }
        else{
            res.status(404).json({message:"Driver Not Found"})
        }
        
    }
    catch(err:any){

        res.status(500).json({message:err.message});
    }
};
