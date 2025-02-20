import crypto from 'crypto';
import asyncHandler from '../middleware/asyncHandlerMiddleware.js';
import User from '../models/userModel.js';
import AppError from '../utils/AppError.js';
import { razorpay } from '../server.js';
import Payment from '../models/paymentModel.js';


export const buySubscription = asyncHandler( async (req, res, next) => {
    const { id } = req.user;

    const user = await User.findById(id);

    if(!user){
        return next( new AppError(`User doesnot exists with given id: ${id}`, 400))
    }

    if(user.role === "ADMIN"){
        return next(new AppError("ADMIN doesnot need to purchase course or do subscription.", 400))
    }

    const subscription = await razorpay.subscriptions.create({
        plan_id: process.env.RAZORPAY_PLAN_ID,
        customer_notify: 1,
        total_count: 12,
    });

    user.subscription.id = subscription.id;
    user.subscription.status = subscription.status;

    await user.save();

    res.status(200).json({
        success: true,
        message: "subscribed successfully.",
        subscription_id: subscription.id,
    });
});


export const verifySubscription = asyncHandler( async (req, res, next) => {
    const { id } = req.user;
    const { razorpay_payment_id, razorpay_subscription_id, razorpay_signature } = req.body;

    const user = await User.findById(id);

    if(!user){
        return next(new AppError(`User doesnot exist with the given the id: ${id}`, 400))
    }

    const subscriptionID = user.subscription.id;
    
    const generatedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_SECRET)
                                     .update(`${razorpay_payment_id}|${subscriptionID}`)
                                     .digest('hex');
                                     
    if(generatedSignature !== razorpay_signature){
        return next(new AppError("Payment is not verified. Please try again."))
    }

    await Payment.create({
        razorpay_payment_id,
        razorpay_subscription_id,
        razorpay_signature,
    });

    user.subscription.status = "active";

    await user.save();

    res.status(200).json({
        success: true,
        message: "Payment verified successfully."
    });
});


export const cancelSubscription = asyncHandler( async (req, res, next) => {
     const { id } = req.user;

     const user = await User.findById(id);
     if(!user){
        return next(new AppError(`User does not exist with the given id: ${id}`, 400));
     }

     if(user.role === "ADMIN"){
        return next(new AppError("ADMIN does not to cancel any subscription.", 400));
     }

     const subscriptionID = user.subscription.id;

     try {
        const subscription = await razorpay.subscriptions.cancel(subscriptionID);
        user.subscription.status = subscription.status
     } catch (e) {
        return next(new AppError(e.message, 401));
     }

     const payment = await Payment.findById({
        razorpay_subscription_id: subscriptionID
     });

     const timeSinceSubscribed = Date.now() - payment.createdAt;

     const refundPeriod = 14 * 24 * 60 * 60 * 1000;

     if( refundPeriod < timeSinceSubscribed){
        return next(new AppError("refundPeriod is over so, there will not be any refund provided."))
     }

     await razorpay.payments.refund(payment.razorpay_payment_id, {speed: "optimum"});

     user.subscription.id = undefined;
     user.subscription.status = undefined;

     await payment.remove();
     await user.save();

     res.status(200).json({
        success: true,
        message: "Subscription cancel successfully."
     });
});


export const getRazorpayApiKey = asyncHandler( async (req, res, next) => {
    res.status(200).json({
        success: true,
        message: "Razorpay Api Key.",
        key: process.env.RAZORPAY_KEY_ID,
    });
});


export const allPayments = asyncHandler( async (req, res, next) => {
    const { count, skip } = req.user;
    const allPayment = await razorpay.subscriptions.all({
        count: count ? count : 10,
        skip: skip ? skip : 0,
    });

    const monthNames = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ];

      const finalMonths = {
        January: 0,
        February: 0,
        March: 0,
        April: 0,
        May: 0,
        June: 0,
        July: 0,
        August: 0,
        September: 0,
        October: 0,
        November: 0,
        December: 0,
      };


      const monthlyWisePayments = allPayment.items.map((payment) => {
        const monthsInNumbers = new Data(payment.start_at*1000);
        return monthNames[monthsInNumbers.getMonth()]; 
      });

      monthlyWisePayments.map((month) => {
        Object.keys(finalMonths).forEach((objMonth) => {
            if(month === objMonth){
                finalMonths[month] +=1
            }
        })
      });

      const monthlySalesRecord = [];

      Object.keys(finalMonths).forEach((monthName) => {
        monthlySalesRecord.push(finalMonths[monthName]);
      });

      res.status(200).json({
        success: true,
        message: "All Payments.",
        allPayment,
        finalMonths,
        monthlySalesRecord,
      });
});
    
    
