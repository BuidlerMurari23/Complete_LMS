import { Router } from 'express';
import { contactUs } from '../controllers/miscellenousController.js';

const router = Router();

router.post("/contact", contactUs);


export default router;