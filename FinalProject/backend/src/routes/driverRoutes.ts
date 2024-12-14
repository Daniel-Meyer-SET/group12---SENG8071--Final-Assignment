import { Router } from "express";   
import { createDriver,getDriver,getDrivers,updateDriver,deleteDriver } from "../controllers/driverController";

const router: Router = Router();

router.post('/',createDriver);
router.get('/',getDrivers);
router.get('/:driverId',getDriver);
router.put('/:driverId',updateDriver);
router.delete('/:driverId',deleteDriver);

export default router;