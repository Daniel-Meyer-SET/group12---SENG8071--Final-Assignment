import { Router } from "express";   
import { createShipment,getShipment,getShipments,updateShipment,deleteShipment } from "../controllers/shipmentController";

const router: Router = Router();

router.post('/',createShipment);
router.get('/',getShipments);
router.get('/:shipmentId',getShipment);
router.put('/:shipmentId',updateShipment);
router.delete('/:shipmentId',deleteShipment);

export default router;