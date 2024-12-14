import { Router } from "express";   
import { createCustomer,getCustomer,getCustomers,updateCustomer,deleteCustomer } from "../controllers/customerController";

const router: Router = Router();

router.post('/',createCustomer);
router.get('/',getCustomers);
router.get('/:customerId',getCustomer);
router.put('/:customerId',updateCustomer);
router.delete('/:customerId',deleteCustomer);

export default router;