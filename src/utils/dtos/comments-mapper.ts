import {CommentSchemaType, CommentViewType} from "../../types/types";
import {paginateRes} from "../../repositories/pagination";
import {injectable} from "inversify";

@injectable()
export class CommentsMapper {

    async mapperCommentsPagination(object:paginateRes<CommentSchemaType>):Promise<paginateRes<CommentViewType>>{
        const items =  await Promise.all(object.items.map((b=> this.commonMapperComments(b))))
        return {
            ...object,
            items
        }
    }

    commonMapperComments(comment: CommentSchemaType):CommentViewType{
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