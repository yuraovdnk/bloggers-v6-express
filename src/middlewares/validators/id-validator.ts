import {param} from "express-validator/src/middlewares/validation-chain-builders";
import {errorsValidation} from "./validation-errors";
import mongoose from "mongoose";
import {NextFunction, Request, Response} from "express";




export const idValidate = [
    param('id').custom(value =>{
        try {
            return new mongoose.Types.ObjectId(value)
        }
        catch (e){
            throw new Error
        }
    }).withMessage("in correct id"),
    errorsValidation
]


