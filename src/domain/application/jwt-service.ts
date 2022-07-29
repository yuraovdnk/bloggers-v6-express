import {UserSchemaType} from "../../types/types";
import jwt from 'jsonwebtoken'
import {settings} from "../../settings";
import {Token} from "../../models/token-model";
import {injectable} from "inversify";
import mongoose from "mongoose";

@injectable()
export class JWTService {

    async createJWT(user: UserSchemaType) {
        console.log(user)
        const accessToken = jwt.sign({userId: user._id}, settings.JWT_SECRET, {expiresIn: '10s'})
        const refreshToken = jwt.sign({userId: user._id}, settings.JWT_SECRET, {expiresIn: '20s'})
        return {
            accessToken,
            refreshToken
        }
    }
    async getUserIdByToken(token: string):Promise<mongoose.Types.ObjectId | null>{
        try {
            const result:any = jwt.verify(token, settings.JWT_SECRET)
            return new mongoose.Types.ObjectId( result.userId)
        } catch (e) {
            return null
        }
    }
    async saveToken(userId: mongoose.Types.ObjectId, refreshToken: string){
        const token = await Token.findOne({userId}).exec()
        if(token){
            token.refreshToken = refreshToken
            return await token.save()
        }

         await Token.create({userId, refreshToken})

    }
    async verifyToken(token:string):Promise<mongoose.Types.ObjectId | false>{
        try{
            const result:any = jwt.verify(token,settings.JWT_SECRET)
            return new mongoose.Types.ObjectId( result.userId)
        }
        catch (e){
            return false
        }
    }
    async findToken(refreshToken:string) {
        const result= await Token.findOne({refreshToken})
        return result
    }
    async deleteToken(refreshToken:string):Promise<boolean>{
        const result = await Token.deleteOne({refreshToken})
        return result.acknowledged
    }
}
