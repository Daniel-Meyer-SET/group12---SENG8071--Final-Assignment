import { Router } from "express";   
import { createEmployee,getEmployee,getEmployees,updateEmployee,deleteEmployee } from "../controllers/employeeController";

const router: Router = Router();

router.post('/',createEmployee);
router.get('/',getEmployees);
router.get('/:employeeId',getEmployee);
router.put('/:employeeId',updateEmployee);
router.delete('/:employeeId',deleteEmployee);

export default router;