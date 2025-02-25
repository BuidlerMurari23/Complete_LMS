import { Router } from 'express';
import { contactUs, userStats } from '../controllers/miscellenousController.js';
import { authorizedRoles, isLoggedIn } from '../middleware/authMiddleware.js';

const router = Router();

router.post("/contact", contactUs);
router.get("/admin/stats/users", isLoggedIn, authorizedRoles("ADMIN"), userStats)


export default router;