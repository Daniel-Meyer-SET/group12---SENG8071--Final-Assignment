import { Request, Response } from "express";
import AppDataSource from "../../config/database";
import { Customer } from "../../entities/customer";
import { createCustomer, getCustomers, getCustomer, updateCustomer, deleteCustomer } from "../../controllers/customerController";

jest.mock("../../config/database", () => ({
  getRepository: jest.fn(),
}));

describe("customerController",()=>{
    let req: Partial<Request>;
  let res: Partial<Response>;
  let customerRepos: any

  beforeEach(() =>{
    jest.clearAllMocks();
    req = {
        body: {
            customerName: "Customer1",
            address: "222 street street",
            phone1: "555-555-3436",
            phone2: "333-444-2248",        
        },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
   
    customerRepos = {
      save: jest.fn(),
    };
    (AppDataSource.getRepository as jest.Mock).mockReturnValue(customerRepos);

  });
  // createCustomer Tests
  
    describe("createCustomer",() =>{
      //customer creation happy path

      test("create a new customer entry and return 201 to indicate success",async () =>{
        await createCustomer(req as Request, res as Response);
        expect(res.status).toHaveBeenCalledWith(201)
  
        expect(customerRepos.save).toHaveBeenCalledWith(expect.objectContaining({
          customerName: "Customer1",
              address: "222 street street",
              phone1: "555-555-3436",
              phone2: "333-444-2248", 
        }))
          
      });
      // customer creation edge case
  // input a special character to test potentially invalid data
    test("create a new customer entry with special characters and return 201 to indicate success",async () =>{
      // override default body with new data to better suit this test case
      req.body = { customerName: "n#@Me", address:"3# ave street",phone1: "555-555-3436",
      phone2: "333-444-2248"};
      await createCustomer(req as Request, res as Response);
      expect(res.status).toHaveBeenCalledWith(201)
      expect(customerRepos.save).toHaveBeenCalledWith(expect.objectContaining({
        customerName: "n#@Me",
            address: "3# ave street",
            phone1: "555-555-3436",
            phone2: "333-444-2248",
      }))

        
    });
      
    // negative test for creating customer 
    test("create a new customer entry with missing required parameters, return 400 to indicate creation failed",async () =>{
      req.body = { customerName: 1, 
      // address is missing
      // phone 1 is missing
      phone2: "333-444-2248"};
      await createCustomer(req as Request, res as Response);
      expect(res.status).toHaveBeenCalledWith(400)
    });
    
  });
   
    //test the get functions
    describe("getCustomer",() =>{

    test("get all customers from the database, should return 200 to indicate success",async () =>{
    const storedCustomers =[{customerID:1,customerName:"example name",address:"3# ave street",phone1: "555-555-3436",
    phone2: "333-444-2248"}];
    const getcustomerRepos = {find: jest.fn().mockResolvedValue(storedCustomers)};
    AppDataSource.getRepository = jest.fn().mockReturnValue(getcustomerRepos);
    await getCustomers(req as Request, res as Response)
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith(storedCustomers)
    });

    test("get a customer by ID from the database should return 200 to indicate successs",async () =>{
      req.params = {
        customerID:"3"
      }
      const storedCustomer ={customerID:3,customerName:"example name",address:"3# ave street",phone1: "555-555-3436",
      phone2: "333-444-2248"};
      const getcustomerRepos = {findOneBy: jest.fn().mockResolvedValue(storedCustomer)};
      AppDataSource.getRepository = jest.fn().mockReturnValue(getcustomerRepos);
      await getCustomer(req as Request, res as Response);
      

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(storedCustomer);
      });

      test("find a customer that does not exist should return 404 to indicate customer was not found",async () =>{
        req.params = {
          customerID:"2"
        }
        const storedCustomer =null;
        
        const getcustomerRepos = {findOneBy: jest.fn().mockResolvedValue(storedCustomer)};
        
        AppDataSource.getRepository = jest.fn().mockReturnValue(getcustomerRepos);
        await getCustomer(req as Request, res as Response);
        
  
        expect(res.status).toHaveBeenCalledWith(404);
        
        });  

      }); 
      describe("updateCustomer",() =>{

        test("update a customer by ID, should return 200 to indicate success",async () =>{
          req.params = {
            customerId:"3"
          }
          req.body = {
            customerName:"newCustomerName",
            address: "232 new street",
            phone1: "554-555-3436",
            phone2: "373-444-2248", 
          }
          const oldCustomer ={customerID:3,customerName:"example name",address:"3# ave street",phone1: "555-555-3436",
          phone2: "333-444-2248"};
          const customerRepos = {findOneBy: jest.fn().mockResolvedValue(oldCustomer),save: jest.fn().mockResolvedValue({...oldCustomer,...req.body}),
          merge: jest.fn().mockImplementation((old, updated) => Object.assign(old, updated))
        };
          AppDataSource.getRepository = jest.fn().mockReturnValue(customerRepos);
          await updateCustomer(req as Request, res as Response);     
          expect(res.status).toHaveBeenCalledWith(200);
          expect(res.json).toHaveBeenCalledWith({...oldCustomer,...req.body});
          });

          test("test updating a customer that does not exist, should return 404",async () =>{
        req.params = {
          customerID:"3"
        }
        
        const storedCustomer =null;
        
        const getcustomerRepos = {findOneBy: jest.fn().mockResolvedValue(storedCustomer)};
        
        AppDataSource.getRepository = jest.fn().mockReturnValue(getcustomerRepos);
        await updateCustomer(req as Request, res as Response);
        
  
        expect(res.status).toHaveBeenCalledWith(404);
        
        });  
      });
      describe("deleteCustomer",() =>{
        
        test("test deleting a customer from the database should return 200 to indicate success",async () =>{
          req.params = {
            customerID:"3"
          }
          const storedCustomer ={customerID:3,customerName:"example name",address:"3# ave street",phone1: "555-555-3436",
          phone2: "333-444-2248"};
          const getcustomerRepos = {findOneBy: jest.fn().mockResolvedValue(storedCustomer),delete: jest.fn().mockResolvedValue({affected:1})};
          AppDataSource.getRepository = jest.fn().mockReturnValue(getcustomerRepos);
          await deleteCustomer(req as Request, res as Response);
          
    
          expect(res.status).toHaveBeenCalledWith(200);
          expect(res.json).toHaveBeenCalledWith({message:"deleted successfully"});
          
        })
        test("test deleting a customer from the database should return 404 to indicate not found",async () =>{
          req.params = {
            customerID:"3"
          }
          const storedCustomer =null;
          const getcustomerRepos = {findOneBy: jest.fn().mockResolvedValue(storedCustomer),delete: jest.fn().mockResolvedValue({affected:1})};
          AppDataSource.getRepository = jest.fn().mockReturnValue(getcustomerRepos);
          await deleteCustomer(req as Request, res as Response);
          
    
          expect(res.status).toHaveBeenCalledWith(404);
          
        })
      });
      
       

})