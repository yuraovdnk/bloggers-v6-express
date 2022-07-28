import {BloggerSchemaType, BloggerViewType, PostSchemaType, PostViewType} from "../../types/types";
import {BloggersService} from "../../domain/bloggers-service";
import {paginateRes} from "../../repositories/pagination";
import {ioc} from "../composition-root";


export class PostDto{
    static async postsMapperPagination(object:paginateRes<PostSchemaType>):Promise<paginateRes<PostViewType>>{
        const items =  await Promise.all(object.items.map((p=> this.postMapper(p))))
        return {
            ...object,
            items
        }
    }

    static async postMapper(post: PostSchemaType): Promise<PostViewType> | null {
        if(!post) return null
        const bloggerService = ioc.resolve(BloggersService)
        const infoBlogger = await bloggerService.getBloggerById(post.bloggerId)
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