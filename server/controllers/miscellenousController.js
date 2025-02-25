import asyncHandler from "../middleware/asyncHandlerMiddleware.js";
import User from "../models/userModel.js";
import AppError from "../utils/AppError.js";
import SendEmail from "../utils/SendEmail.js";

export const contactUs = asyncHandler( async (req, res, next) => {
    const { name, email, message } = req.body;

    if(!name || !email || !message){
        return next(new AppError("All fields are required.", 400))
    }

    try {
        const subject = "Contact us form.";
        const textMessage = `${name} - ${email} <br /> ${message}`;

        await SendEmail(process.env.CONTACT_US_EMAIL, subject, textMessage);
    } catch (e) {
        return next(new AppError(e.message), 401)
    }

    res.status(200).json({
        success: true,
        message: "Your request has been submitted successfully."
    });
});


export const userStats = asyncHandler( async (req, res, next) => {
    const allUsersCount = await User.countDocuments();
    const subscribedUsersCount = await User.countDocuments({
        'subscription.status': 'active',
    });

    res.status(200).json({
        success: true,
        message: "Getting all registered users count",
        allUsersCount,
        subscribedUsersCount,
    });
})