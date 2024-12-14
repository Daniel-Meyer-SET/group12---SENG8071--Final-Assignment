import { Router } from "express";   
import { createMechanic,getMechanic,getMechanics,updateMechanic,deleteMechanic } from "../controllers/mechanicController";

const router: Router = Router();

router.post('/',createMechanic);
router.get('/',getMechanics);
router.get('/:mechanicId',getMechanic);
router.put('/:mechanicId',updateMechanic);
router.delete('/:mechanicId',deleteMechanic);

export default router;