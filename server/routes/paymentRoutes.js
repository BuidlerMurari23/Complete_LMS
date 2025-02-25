import { Router } from "express";
import { authorizedRoles, 
         authorizedSubscriber, 
         isLoggedIn } from "../middleware/authMiddleware.js";

import { allPayments, 
         buySubscription, 
         cancelSubscription, 
         getRazorpayApiKey, 
         verifySubscription } from "../controllers/paymentController.js";

const router = Router();

router.route('/subscribe').post(isLoggedIn, buySubscription);
router.route('/verify').post(isLoggedIn, verifySubscription);
router.route('/unsubscribe').post(isLoggedIn, authorizedSubscriber, cancelSubscription);
router.route('/razorpay-key').get(isLoggedIn, getRazorpayApiKey);
router.route('/').get(isLoggedIn, authorizedRoles("ADMIN"), allPayments);


export default router;