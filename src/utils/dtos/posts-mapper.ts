import {PostSchemaType, PostViewType} from "../../types/types";
import {BloggersService} from "../../domain/bloggers-service";
import {paginateRes} from "../../repositories/pagination";
import {inject, injectable} from "inversify";

@injectable()
export class PostsMapper{

    constructor(@inject(BloggersService) public bloggerService:BloggersService) {}

    async mapperPostPagination(object:paginateRes<PostSchemaType>):Promise<paginateRes<PostViewType>>{
        console.log(object)
        const items =  await Promise.all(object.items.map((p=> this.commonMapperPost(p))))
        return {
            ...object,
            items
        }
    }

    async commonMapperPost(post: PostSchemaType): Promise<PostViewType> | null {
        if(!post) return null
        return {
            id: post._id,
            title: post.title,
            shortDescription: post.shortDescription,
            content: post.content,
            bloggerId: post.blogger._id,
            bloggerName: post.blogger.name
        }
    }
}