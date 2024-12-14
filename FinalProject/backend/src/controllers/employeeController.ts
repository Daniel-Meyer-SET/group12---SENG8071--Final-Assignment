import { Request,Response } from "express";
import {Employee} from  "../entities/employees";
import AppDataSource from "../config/database";

export const createEmployee = async (req:Request, res: Response): Promise<void> =>{
    const {FirstName,Surname,Seniority} = req.body;
    if(!FirstName || !Surname || !Seniority){
    res.status(400).json({message:"one or more required parameters missing, check request body"})

    }
    else{
    try{
        const employee = new Employee();
        
        employee.firstName = FirstName;
        employee.surname = Surname;
        employee.seniority = Seniority;
        

        const employeeRepos = AppDataSource.getRepository(Employee);
        const savedEmployee = await employeeRepos.save(employee);
        res.status(201).json(savedEmployee);
    }
    catch(err:any){

        res.status(500).json({message:err.message});
    }
}
};
export const getEmployees = async(req:Request, res: Response): Promise<void> =>{
try{
    const employeeRepos = AppDataSource.getRepository(Employee);
    const employees = await employeeRepos.find();
    res.status(200).json(employees)
}
catch(err:any){

    res.status(500).json({message:err.message});
}

}

export const getEmployee = async (req:Request, res: Response): Promise<void> =>{
    
    try{
        

        const employeeRepos = AppDataSource.getRepository(Employee);
        const employee = await employeeRepos.findOneBy({employeeID: parseInt(req.params.employeeId)});
        if(employee){
            
            res.status(200).json(employee);

        }
        else{
            res.status(404).json({message:"Employee Not Found"})
        }
        
    }
    catch(err:any){

        res.status(500).json({message:err.message});
    }
};

export const updateEmployee = async (req:Request, res: Response): Promise<void> =>{
  
    try{
        

        const employeeRepos = AppDataSource.getRepository(Employee);
        const employee = await employeeRepos.findOneBy({employeeID: parseInt(req.params.employeeId)});
        if(employee){
            employeeRepos.merge(employee,req.body);
            const updatedEmployee = await employeeRepos.save(employee);
            res.status(200).json(updatedEmployee);

        }
        else{
            res.status(404).json({message:"Employee Not Found"})
        }
        
    }
    catch(err:any){

        res.status(500).json({message:err.message});
    }
};
export const deleteEmployee = async (req:Request, res: Response): Promise<void> =>{
   
    try{
        

        const employeeRepos = AppDataSource.getRepository(Employee);
        
        const employee = await employeeRepos.findOneBy({employeeID: parseInt(req.params.employeeId)});

        if(employee){
           const result = await employeeRepos.delete(req.params.employeeId);
            if(result.affected){
            res.status(200).json({message:"deleted successfully"});
            }
            else{
                res.status(400).json({message:"deletion failed"})
            }

        }
        else{
            res.status(404).json({message:"Employee Not Found"})
        }
        
    }
    catch(err:any){

        res.status(500).json({message:err.message});
    }
};
