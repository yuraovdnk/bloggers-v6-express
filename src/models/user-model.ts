import mongoose, {ObjectId} from "mongoose";
import {Schema} from "mongoose";

const emailConfirmSchema =  new mongoose.Schema( {
    confirmationCode:{
        type:String
    },
    expirationDate: {
        type:Date
    },
    isConfirmed:{
       type: Boolean
    }
})
const accountDataSchema =  new mongoose.Schema({
    login:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true
    },
    passwordHash:{
        type:String,
        required: true
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
})
const userSchema = new mongoose.Schema({
        accountData: accountDataSchema,
        emailConfirmation: emailConfirmSchema
    },
    { versionKey: false }
);
export const User = mongoose.model('User', userSchema);


