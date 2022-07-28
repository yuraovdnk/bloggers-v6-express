import {BloggerSchemaType, BloggerViewType, PostSchemaType, PostViewType} from "../../types/types";
import {BloggersService} from "../../domain/bloggers-service";
import {paginateRes} from "../../repositories/pagination";
import {ioc} from "../composition-root";
import {inject, injectable} from "inversify";

@injectable()
export class PostsMapper{

    constructor(@inject(BloggersService) public bloggerService:BloggersService) {
    }
    async mapperPostPagination(object:paginateRes<PostSchemaType>):Promise<paginateRes<PostViewType>>{
        const items =  await Promise.all(object.items.map((p=> this.commonMapperPost(p))))
        return {
            ...object,
            items
        }
    }

    async commonMapperPost(post: PostSchemaType): Promise<PostViewType> | null {
        if(!post) return null
        const infoBlogger = await this.bloggerService.getBloggerById(post.bloggerId)
        return {
            id: post._id,
            title: post.title,
            shortDescription: post.shortDescription,
            content: post.content,
            bloggerId: infoBlogger?.id ?? post.bloggerId,
            bloggerName: infoBlogger?.name ?? "No name"
        }
    }
}