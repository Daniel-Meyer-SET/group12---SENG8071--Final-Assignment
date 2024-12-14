import { Request,Response } from "express";
import {Customer} from  "../entities/customer";
import AppDataSource from "../config/database";

export const createCustomer = async (req:Request, res: Response): Promise<void> =>{
    const {customerName,address,phone1,phone2} = req.body;
    if(!customerName || !address || !phone1 || !phone2){
        res.status(400).json({message:"one or more required parameters missing, check request body"})
        
    }
    else{
    try{
        const customer = new Customer();
        customer.customerName = customerName;
        customer.address = address;
        customer.phone1 = phone1;
        customer.phone2 = phone2;
        //check that all parameters are included
        
        
        const customerRepos = AppDataSource.getRepository(Customer);
        const savedCustomer = await customerRepos.save(customer);
        res.status(201).json(savedCustomer);
        
    }
    catch(err:any){
    
        res.status(500).json({message:err.message});

        
    }
}
};
export const getCustomers = async(req:Request, res: Response): Promise<void> =>{
try{
    const customerRepos = AppDataSource.getRepository(Customer);
    const customers = await customerRepos.find();
    res.status(200).json(customers)
}
catch(err:any){

    res.status(500).json({message:err.message});
}

}
export const getCustomer = async (req:Request, res: Response): Promise<void> =>{
    
    try{
        
        const customerRepos = AppDataSource.getRepository(Customer);
        const customer = await customerRepos.findOneBy({customerID: parseInt(req.params.customerId)});
        if(customer){
            
            res.status(200).json(customer);

        }
        else{
            res.status(404).json({message:"customer Not Found"})
        }
        
    }
    catch(err:any){

        res.status(500).json({message:err.message});
    }
};

export const updateCustomer = async (req:Request, res: Response): Promise<void> =>{
  
    try{
        

        const customerRepos = AppDataSource.getRepository(Customer);
        const customer = await customerRepos.findOneBy({customerID: parseInt(req.params.customerId)});
        if(customer){
            customerRepos.merge(customer,req.body);
            const updatedcustomer = await customerRepos.save(customer);
            res.status(200).json(updatedcustomer);

        }
        else{
            res.status(404).json({message:"customer Not Found"})
        }
        
    }
    catch(err:any){
        console.error(err);
        res.status(500).json({message:err.message});
        
    }
};
export const deleteCustomer = async (req:Request, res: Response): Promise<void> =>{
   
    try{
        

        const customerRepos = AppDataSource.getRepository(Customer);
        const customer = await customerRepos.findOneBy({customerID: parseInt(req.params.customerId)});
        if(customer){
            
            const result = await customerRepos.delete(req.params.customerId);
           
            if(result.affected){
               
                
                res.status(200).json({message:"deleted successfully"});
    
            }
            else{
                res.status(500).json({message:"deletion failed"});

            }
        }

       
        else{
            res.status(404).json({message:"Customer Not Found"})
        }
        
    }
    catch(err:any){
        
        res.status(500).json({message:err.message});
    }
};

