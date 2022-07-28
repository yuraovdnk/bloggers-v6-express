import {NextFunction, Request, Response} from "express";
import {AuthService} from "../domain/auth-service";
import {errorsGenerator} from "../utils/errors-generator";
import {ioc} from "../utils/composition-root";

const authService = ioc.resolve(AuthService)
export const existUser = async (req: Request, res: Response, next: NextFunction) => {

    const findByLogin = await authService.findByLogin(req.body.login)
    if(findByLogin){
        return res.status(400).send(errorsGenerator('Login is exist','login'))
    }
    const findByEmail = await authService.findByEmail(req.body.email)
    if (findByEmail) {
        return res.status(400).send(errorsGenerator('Email exist','login'))
    }

    next()



}