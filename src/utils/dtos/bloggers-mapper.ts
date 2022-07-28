import {BloggerSchemaType, BloggerViewType} from "../../types/types";
import {paginateRes} from "../../repositories/pagination";

export class BloggerDto{
    static async bloggersMapperPagination(object:paginateRes<BloggerSchemaType>):Promise<paginateRes<BloggerViewType>>{
        const items =  await Promise.all(object.items.map((b=> this.bloggersMapper(b))))
        return {
            ...object,
            items
        }
    }

    static bloggersMapper(blogger:BloggerSchemaType):BloggerViewType | null{
        if(!blogger) return null
        return {
            id:blogger._id,
            name: blogger.name,
            youtubeUrl:blogger.youtubeUrl
        }
    }
}