import {BloggerSchemaType, BloggerViewType, CommentSchemaType, CommentViewType} from "../../types/types";
import {paginateRes} from "../../repositories/pagination";

export class CommentDto{

    static async commentsMapperPagination(object:paginateRes<CommentSchemaType>):Promise<paginateRes<CommentViewType>>{
        const items =  await Promise.all(object.items.map((b=> this.commentMapper(b))))
        return {
            ...object,
            items
        }
    }

    static commentMapper(comment: CommentSchemaType):CommentViewType{
        if(!comment) return null
        return {
            id:comment._id,
            content: comment.content,
            userId:comment.userId,
            userLogin:comment.userLogin,
            addedAt:comment.addedAt
        }
    }
}