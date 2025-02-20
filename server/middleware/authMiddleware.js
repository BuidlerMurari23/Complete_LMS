import AppError from "../utils/AppError.js";
import asyncHandler from "./asyncHandlerMiddleware.js";
import jwt from 'jsonwebtoken';


export const isLoggedIn = asyncHandler( async (req, res, next) => {
    const { token } = req.cookies;

    if(!token){
        return next( new AppError("Unauthorized. Please login to continue.", 402))
    }

    try {
        const decode = await jwt.verify(token, process.env.JWT_SECRET);
    
        if(!decode){
            return next( new AppError("Unauthorized. Please login again.", 402))
        }
        req.user = decode;
        next();
    
    } catch (e) {
        return next( new AppError("Session expired. Please login again.", 401))
    }
});


export const authorizedRoles = (...roles) => asyncHandler( async (req, _res, next) => {
    if(!roles.includes(req.user.role)){
        return next(new AppError("You are not authorize to view this route.", 400));
    }

    next();
});



export const authorizedSubscriber = asyncHandler( async (req, res, next) => {
    if (req.user.role !== "ADMIN" && req.user.subscription.status !== "active") {
        return next(new AppError("Please subscribe to excess this route.", 400))
    }

    next();
})

    
        