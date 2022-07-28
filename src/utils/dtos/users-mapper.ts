import {UserSchemaType, UserViewType} from "../../types/types";
import {injectable} from "inversify";
import {paginateRes} from "../../repositories/pagination";

@injectable()
export class UsersMapper {

    async usersMapperPagination(users:paginateRes<UserSchemaType>):Promise<paginateRes<UserViewType>>{
        const items =  await Promise.all(users.items.map((b=> this.commonUsersMapper(b))))
        return {
            ...users,
            items
        }
    }
    commonUsersMapper(user:UserSchemaType):UserViewType{
        return {
            id:user._id,
            login:user.accountData.login
        }
    }

}