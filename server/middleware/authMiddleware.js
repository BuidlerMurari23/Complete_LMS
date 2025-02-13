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

})
    
        