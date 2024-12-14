import { Router } from "express";   
import { createTrip,getTrip,getTrips,updateTrip,deleteTrip } from "../controllers/tripController";

const router: Router = Router();

router.post('/',createTrip);
router.get('/',getTrips);
router.get('/:tripId',getTrip);
router.put('/:tripId',updateTrip);
router.delete('/:tripId',deleteTrip);

export default router;