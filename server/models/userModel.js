import  bcrypt  from 'bcryptjs';
import { model, Schema } from "mongoose";
import jwt from 'jsonwebtoken';
import crypto from 'crypto';


const userSchema = new Schema({
    fullName: {
        type: String,
        required: [true, "Name of the user is required."],
        minLength: [3, "Name of the user must be atleast of 3 Charactes."],
        maxLength: [50, "Name of the user should be less than 50 Charactes."],
        lowercase: true,
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Email of the user is required."],
        unique: true,
        lowercase: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please fill in a valid email address',
          ],
    },
    password: {
        type: String,
        required: [true, "Password of the user is required."],
        minLength: [8, "Password of the user must be of 8 Characters."],
        select: false,  // will not select the password upon/while looking up the document.
    },
    avatar: {
        public_id: {
            type: String,
        },
        secure_url: {
            type: String,
        }
    },
    subscription: {
        id: String,
        status: String,
    },
    role: {
        type: String,
        enum: ["USER", "ADMIN", "SUPERADMIN"],
        default: "USER",
    },
    forgotPasswordToken: String,
    forgotPasswordExpiry: Date,
},{
    timestamps: true,
});

userSchema.pre('save', async function (next){
    // if password is not modified no to hass it.
    if(!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 10);

});


userSchema.methods = {
    comparePassword:  function (plainPassword){
        return  bcrypt.compare(plainPassword, this.password);
    },

    generateJWTToken: function (){
        return  jwt.sign(
            { id: this._id, role: this.role, subscription: this.subscription },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRY }
        )
    },

    generatePasswordResetToken:  function (){

        const resetToken = crypto.randomBytes(20).toString('hex');

        this.forgotPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

        this.forgotPasswordExpiry = Date.now() + 15 * 60 * 1000;

        return resetToken;
    }
}


const User = model("user", userSchema);

export default User;