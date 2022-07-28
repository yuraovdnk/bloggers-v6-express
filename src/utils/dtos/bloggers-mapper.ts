import {BloggerSchemaType, BloggerViewType} from "../../types/types";
import {paginateRes} from "../../repositories/pagination";
import {injectable} from "inversify";

@injectable()
export class BloggersMapper {
    async bloggersMapperPagination(object:paginateRes<BloggerSchemaType>):Promise<paginateRes<BloggerViewType>>{
        const items =  await Promise.all(object.items.map((b=> this.commonBloggersMapper(b))))
        return {
            ...object,
            items
        }
    }

    commonBloggersMapper(blogger:BloggerSchemaType):BloggerViewType | null{
        if(!blogger) return null
        return {
            id:blogger._id,
            name: blogger.name,
            youtubeUrl:blogger.youtubeUrl
        }
    }
}