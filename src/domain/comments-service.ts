import {CommentsRepository} from "../repositories/comments-repository";
import {inject, injectable} from "inversify";
import mongoose from "mongoose";
import {CommentsMapper} from "../utils/dtos/comments-mapper";
import {CommentViewType} from "../types/types";

@injectable()
export class CommentsService{
    constructor(@inject(CommentsRepository) public commentsRepository:CommentsRepository,
                @inject(CommentsMapper) protected commentsMapper: CommentsMapper) {}

    async getCommentById(id:mongoose.Types.ObjectId):Promise<CommentViewType | null>{
        const comment = await this.commentsRepository.getCommentById(id)
        return this.commentsMapper.commonMapperComments(comment)
    }

    async updateComment(id: mongoose.Types.ObjectId,content:string):Promise<boolean> {
        return await this.commentsRepository.updateComment(id,content)
    }

    async deleteComment(id: mongoose.Types.ObjectId):Promise<boolean> {
        return await this.commentsRepository.deleteComment(id)
    }
}