import {Comment} from "../models/comment-model";
import {injectable} from "inversify";
import mongoose from "mongoose";
import {CommentSchemaType} from "../types/types";

@injectable()
export class CommentsRepository{

    async getCommentById(id: mongoose.Types.ObjectId):Promise<CommentSchemaType | null> {
        return Comment.findOne({_id:id})
    }
    async updateComment(id: mongoose.Types.ObjectId, content: string):Promise<boolean> {
        const result = await Comment.updateOne({_id:id},{$set:{content}})
        return result.acknowledged
    }
    async deleteComment(id: mongoose.Types.ObjectId):Promise<boolean> {
       const result = await Comment.deleteOne({_id:id})
        return result.acknowledged
    }
}