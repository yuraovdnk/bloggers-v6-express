import {UserSchemaType, UserViewType} from "../../types/types";

export class UserDto{
    static usersMapper(user:UserSchemaType):UserViewType{
        return {
            id:user._id,
            login:user.accountData.login
        }
    }
    static usersMapperPagination(users:Array<UserSchemaType>){
         const res = users.map(i =>{
            return this.usersMapper(i)
        })
        return res
    }

}