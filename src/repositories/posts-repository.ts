import {paginateRes, paginateType, pagination} from "./pagination";
import {ObjectId} from "mongodb";
import {Posts,} from "../models/post-model";
import {injectable} from "inversify";
import {Comment} from "../models/comment-model";
import mongoose from "mongoose";
import {PostSchemaType, PostInputType, CommentInputType, CommentSchemaType} from "../types/types";

@injectable()
export class PostsRepository  {

    async getPosts(query: paginateType):Promise<paginateRes<PostSchemaType>>{
        let filter = {}
        return await pagination<PostSchemaType>(query,filter,Posts)
    }

    async createPost(newPost: PostInputType):Promise<PostSchemaType>{
        const createdPost = await Posts.create(newPost)
        return createdPost.toObject()
    }

    async getPostById(id:ObjectId):Promise<PostSchemaType | null>{
        return await Posts.findOne({_id:id}).lean()
    }

    async updatePost(body : PostInputType, id:mongoose.Types.ObjectId):Promise<boolean>{
        const result = await Posts.updateOne({_id:id},{
            title: body.title,
            shortDescription:body.shortDescription,
            content:body.content,
            bloggerId:body.bloggerId
        })
        return result.acknowledged

    }
    async deletePost(id:mongoose.Types.ObjectId):Promise<boolean>{
        const result = await Posts.deleteOne({_id:id})
        return result.deletedCount === 1
    }

    async getPostsByBloggerId(bloggerId:mongoose.Types.ObjectId, query:paginateType):Promise<paginateRes<PostSchemaType>>{
        let filter = {bloggerId}
        return await pagination(query,filter,Posts)
    }
///comments
    async createComment(comment : CommentInputType):Promise<CommentSchemaType>{
        return await Comment.create(comment)
    }
    async getCommentsByPostId(postId:ObjectId, query:paginateType):Promise<paginateRes<CommentSchemaType>>{
        const filter = {postId}
        let options = {postId:0}
        return await pagination(query,filter,Comment,options)
    }

}