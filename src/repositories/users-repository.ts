import {UserSchemaType, UserType} from "../types/types";
import {paginateType, pagination, paginateRes} from "./pagination";
import {User} from "../models/user-model";
import {injectable} from "inversify";
import mongoose from "mongoose";



@injectable()
export class UsersRepository {
    async createUser(newUser: UserType): Promise<UserSchemaType> {
        return await User.create(newUser)
    }

    async getAllUsers(query: paginateType):Promise<paginateRes<UserSchemaType>>{
        const filter = {}
        return await pagination(query, filter, User)
    }

    async findByLogin(login:string):Promise<UserSchemaType | null>{
        return User.findOne({"accountData.login":login})
    }

    async findByEmail(email:string):Promise<UserSchemaType | null>{
        return User.findOne({"accountData.email":email})
    }

    async findById(id: mongoose.Types.ObjectId):Promise<UserSchemaType | null>{
        return User.findOne({_id: id})
    }

    async deleteUser(id: mongoose.Types.ObjectId):Promise<boolean>{
        const res = await User.deleteOne({_id:id})
        return res.acknowledged
    }

    async findByConfirmCode(code:string):Promise<UserSchemaType | null>{
        return await User.findOne({"emailConfirmation.confirmationCode":code}).lean()
    }

    async updateConfirm(id:mongoose.Types.ObjectId):Promise<boolean>{
        const res = await User.updateOne({_id: id},{"emailConfirmation.isConfirmed":true})
        return res.acknowledged
    }
    async updateCode(id:mongoose.Types.ObjectId,code:string):Promise<boolean>{
        const res = await User.updateOne({id},{$set:{"emailConfirmation.confirmationCode":code}})
        return res.acknowledged
    }
}