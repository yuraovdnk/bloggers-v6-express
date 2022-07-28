import {body} from "express-validator";
import {errorsValidation} from "./validation-errors";

const contentValidators = body('content')
    .exists().withMessage('The content field is required.')
    .isString().withMessage('The content field must be string')
    .notEmpty().withMessage("The content field must be not empty")
    .isLength({min:20,max:300}).withMessage(`The content field must be a string or array type with a min length of \'20\' and a max length of \'300\'.`)


export const commentValidation =[
    contentValidators,
    errorsValidation
]