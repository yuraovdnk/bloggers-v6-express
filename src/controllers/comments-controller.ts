import {inject, injectable} from "inversify";
import {CommentsService} from "../domain/comments-service";
import {Request, Response} from "express";
import {ObjectId} from "mongodb";
import mongoose from "mongoose";

@injectable()
export class CommentsController {
    constructor(@inject(CommentsService) public commentsService: CommentsService) {}

    async getCommentById(req: Request, res: Response) {
        const comment = await this.commentsService.getCommentById(new mongoose.Types.ObjectId(req.params.id))
        if (comment) {
            res.status(200).send(comment)
            return
        }
        res.sendStatus(404)
    }

    async updateComment(req: Request, res: Response) {
        const comment = await this.commentsService.getCommentById(new mongoose.Types.ObjectId(req.params.id))

        if (!comment) {
            res.sendStatus(404)
            return
        }

        if (comment.userId.toString() !== req.user!._id.toString()) {
            res.sendStatus(403)
            return
        }
        const isUpdated = await this.commentsService.updateComment(new mongoose.Types.ObjectId(req.params.id), req.body.content);
        if (isUpdated) {
            res.sendStatus(204)
            return
        }
    }

    async deleteComment(req: Request, res: Response) {
        const comment = await this.commentsService.getCommentById(new mongoose.Types.ObjectId(req.params.id))
        if (!comment) {
            res.sendStatus(404)
            return
        }
        if (comment.userId.toString() !== req.user!._id.toString()) {
            res.sendStatus(403)
            return
        }
        const isDeleted = await this.commentsService.deleteComment(new mongoose.Types.ObjectId(req.params.id))
        if (isDeleted) {
            res.sendStatus(204)
            return
        }
    }

}