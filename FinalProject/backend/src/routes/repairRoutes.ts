import { Router } from "express";   
import { createRepair,getRepair,getRepairs,updateRepair,deleteRepair } from "../controllers/repairController";

const router: Router = Router();

router.post('/',createRepair);
router.get('/',getRepairs);
router.get('/:repairId',getRepair);
router.put('/:repairId',updateRepair);
router.delete('/:repairId',deleteRepair);

export default router;