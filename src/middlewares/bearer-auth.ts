import {NextFunction, Request, Response} from "express";
import {UsersService} from "../domain/users-service";
import {JWTService} from "../domain/application/jwt-service";
import {ioc} from "../utils/composition-root";

const jwtService = ioc.resolve(JWTService)
const usersService = ioc.resolve(UsersService)

export const bearerAuth = async (req: Request, res: Response, next:NextFunction)=>{
    if(!req.headers.authorization){
        return res.sendStatus(401)
    }
    const token = req.headers.authorization.split(' ')[1]
    const userId = await jwtService.getUserIdByToken(token)
    if(userId){
        req.user = await usersService.getUserById(userId)
        next()
        return 
    }
    res.send(401)
}