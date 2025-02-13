import nodemailer from 'nodemailer';
import asyncHandler from "../middleware/asyncHandlerMiddleware.js";


const SendEmail = asyncHandler( async (email, subject, message) => {
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_POST,
        secure: false,
        auth: {
            user: process.env.SMTP_USERNAME,
            pass: process.env.SMTP_PASSWORD,
        }
    });

    await transporter.sendMail({
        from: process.env.SMTP_FROM_EMAIL,
        to: email,
        subject: subject,
        html: message
    })
});

export default SendEmail;