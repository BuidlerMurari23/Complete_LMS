import cloudinary from "cloudinary";
import asyncHandler from "../middleware/asyncHandlerMiddleware.js";
import User from "../models/userModel.js";
import AppError from "../utils/AppError.js";
import SendEmail from "../utils/SendEmail.js"
import fs from "fs/promises";
import crypto from 'crypto';

const cookieOptions = {
    secure: process.env.NODE_ENV === "production" ? true : false,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
} 

export const registerUser = asyncHandler( async ( req, res, next) => {
    const { fullName, email, password } = req.body;
    // console.log(`this is data:`, req.body);
        
    if(!fullName || !email || !password){
        return next( new AppError("All fields are required.", 400))
    };

    const userExist = await User.findOne({email});
    if(userExist){
        return next( new AppError(`User already exists with emailId: ${email}`, 400))
    }

    const user = await User.create({
        fullName,
        email,
        password,
        avatar:{
            public_id: email,
            secure_url: 'https://res.cloudinary.com/du9jzqlpt/image/upload/v1674647316/avatar_drzgxv.jpg',
        },
    });

    if(!user){
        return next( new AppError("User registration failed. Please try again later.", 400))
    }

    
    // console.log(`this is req.file`, req.file);
    // console.log("req.file.path", req.file.path);
    if(req.file){
        
        try {
            const result = await cloudinary.v2.uploader.upload(req.file.path, {
                folder: "Complete_LMS",
                height: 250,
                width: 250,
                gravity: "faces",
                crop: "fill"
            });

            if(result){
                user.avatar.public_id = result.public_id;
                user.avatar.secure_url = result.secure_url;

                // removing the uploaded files from the uploads folder
                fs.rm(`uploads/${req.file.filename}`);
            }
        } catch (e) {
            return next( new AppError(e.message, 400))
        }
        
    }

    await user.save();
    user.password = undefined;

    const token = user.generateJWTToken();
    console.log("token", token)
    res.cookie('token', token, cookieOptions);

    res.status(200).json({
        success: true,
        message: "User registered successfully.",
        user,
    })
});


export const loginUser = asyncHandler( async (req, res, next) => {
    const { email, password } = req.body;

    if(!email || !password){
        return next( new AppError("Email and Password are required.", 400))
    }

    const user = await User.findOne({ email });

    if(!user &&  !user.comparePassword(password)){
        return next( new AppError("Email or Password doesnot match. Please try again.", 401))
    }

    const token = await user.generateJWTToken();

    res.cookie('token', token, cookieOptions);

    user.password = undefined;

    res.status(200).json({
        success: true,
        message: "User Loggged in successfully.",
        user,
    })
});


export const logoutUser = asyncHandler( async (req, res, next) => {
    res.cookie('token', null, {
        secure: process.env.NODE_ENV === "production" ? true : false,
        maxAge: 0,
        httpOnly: true,
    });

    res.status(200).json({
        success: true,
        message: "User Loggged out successfully."
    })
});


export const getLoggedInUserDetails = asyncHandler( async (req, res, next) => {
    const user = await User.findById(req.user.id);

    if(!user){
        return next( new AppError(`User doesnot exists with the id: ${req.user.id}`, 400));
    }

    res.status(200).json({
        success: true,
        message: "Getting the user details.",
        user,
    });
});


export const forgotPassword = asyncHandler( async (req, res, next) => {
    const { email } = req.body;

    if(!email){
        return next( new AppError("Please enter the email id", 400));
    }

    const user = await User.findOne({email});

    if(!user){
        return next( new AppError(`User doesnot exists with email id: ${email}`));
    }

    const resetToken = await user.generatePasswordResetToken();

    await user.save();

    const resetPasswordURL = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
    
    const subject = "Reset Password";
    const message = `You can reset your password by clicking <a href=${resetPasswordURL} target="_blank">Reset your password</a>\nIf the above link does not work for some reason then copy paste this link in new tab ${resetPasswordURL}.\n If you have not requested this, kindly ignore.`;

    try {
        await SendEmail(email, subject, message);

        res.status(200).json({
            success: true,
            message: `Reset password token has been send to email id: ${email} successfully.`
        })

    } catch (e) {
        user.forgotPasswordToken = undefined;
        user.forgotPasswordExpiry = undefined;

        await user.save();

        return next( new AppError(e.message || "Something went wrong !!!", 402));
    }

});


export const resetPassword = asyncHandler( async (req, res, next) => {
    const { resetToken } = req.params;
    const { password } = req.body;

    if(!resetToken){
        return next( new AppError("Please enter the reset token."));
    }

    const forgotPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    if(!password){
        return next( new AppError("Please Enter the Password", 400));
    }
   
    const user = await User.findOne({
        forgotPasswordToken,
        forgotPasswordExpiry:{ $gt: Date.now },
    });

    if(!user){
        return next( new AppError("Token is invalid or expired. Please try again."))
    }

    user.password = undefined;
    user.forgotPasswordToken = undefined;
    user.forgotPasswordExpiry = undefined;

    res.status(200).json({
        success: true,
        message: "Password is Reset successfully.",
        user,
    })
});


export const changePassword = asyncHandler( async (req, res, next) => {
    const { oldPassword, newPassword } = req.body;
    
    const { id }  = req.user;

    console.log("This is Id:>>", id);
    console.log("This is req.user data: >> ", req.user);

    if(!oldPassword || !newPassword){
        return next( new AppError("Old Password and New Password are required"));
    }

    const user = await User.findById(id).select('+password');

    if(!user){
        return next( new AppError(`User doesnot exists with the id: ${id}`, 400));
    }

    const isPasswordValid = await user.comparePassword(oldPassword);
    if(!isPasswordValid){
        return next( new AppError(`invalid old password: ${oldPassword}. Please try again`, 400))
    }

    user.password = newPassword;
    await user.save();

    user.password = undefined;

    res.status(200).json({
        success: true,
        message: "Password is changed successfully.",
        user,
    });

});


export const updateUser = asyncHandler( async (req, res, next) => {
    const { id } = req.params;
    const { fullName } = req.body;

    const user = await User.findById(id);

    if(!user){
        return next( new AppError(`User doesnot exists with id: ${id}`, 400));
    }

    if(fullName){
        user.fullName = fullName;
    }

    if(req.file){
        await cloudinary.v2.uploader.destroy(user.avatar.public_id);

        try {
            const result = await cloudinary.v2.uploader.upload(req.file.path, {
                folder: "Complete_LMS",
                height: 250,
                width: 250,
                gravity: "faces",
                crop: "fill" 
            });

            if(result){
                user.avatar.public_id = result.public_id;
                user.avatar.secure_url = result.secure_url;

                fs.rm(`uploads/${req.file.filename}`)
            }
        } catch (e) {
            return next( new AppError(e || "File not uploaded. Please try again", 400))
        }
    }

    await user.save();
    
    res.status(200).json({
        success: true,
        message: "User is updated successfully.",
        user,
    });
});







