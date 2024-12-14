import { Router } from "express";   
import { createTruck,getTruck,getTrucks,updateTruck,deleteTruck } from "../controllers/truckController";

const router: Router = Router();

router.post('/',createTruck);
router.get('/',getTrucks);
router.get('/:truckId',getTruck);
router.put('/:truckId',updateTruck);
router.delete('/:truckId',deleteTruck);

export default router;