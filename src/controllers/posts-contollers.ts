import {Request, Response} from "express";
import {PostsService} from "../domain/posts-service";
import {paginateType} from "../repositories/pagination";
import {errorsGenerator} from "../utils/errors-generator";
import {inject, injectable} from "inversify";
import {BloggersService} from "../domain/bloggers-service";
import mongoose from "mongoose";

@injectable()
export class PostsController{
    constructor(@inject(PostsService) protected postsService:PostsService,
                @inject(BloggersService) protected bloggersService:BloggersService){}

    async getPosts(req:  Request, res: Response){
        const bloggers = await this.postsService.getPosts(req.query as paginateType)
        res.send(bloggers)
    }
    async getPostById(req:  Request, res: Response){
        const post = await this.postsService.getPostById(new mongoose.Types.ObjectId(req.params.id))
        if (!post) {
            return res.sendStatus(404)
        }
        res.status(200).send(post)
    }
    async createPost(req:  Request, res: Response){
        const blogger = await this.bloggersService.getBloggerById(new mongoose.Types.ObjectId(req.body.bloggerId))
        if (!blogger) {
            res.status(400).send(errorsGenerator("Invalid 'bloggerId': such blogger doesn't exist" , "bloggerId"))
            return
        }

        const post = await this.postsService.createPost(req.body, blogger)

        if (!post) {
            res.sendStatus(400)
            return
        }

        res.status(201).send(post)
    }
    async updatePost(req:  Request, res: Response){
        const isExistPost = await this.postsService.getPostById(new mongoose.Types.ObjectId(req.params.id))

        if (!isExistPost) {
            res.sendStatus(404)
            return
        }

        const isExistBlogger = await this.bloggersService.getBloggerById(new mongoose.Types.ObjectId(req.body.bloggerId))

        if (!isExistBlogger) {
            res.status(400).send(errorsGenerator("Invalid 'bloggerId': such blogger doesn't exist" , "bloggerId"))
            return
        }

        const isUpdated = await this.postsService.updatePost(req.body, new mongoose.Types.ObjectId(req.params.id))

        if (!isUpdated) {
            res.sendStatus(400)
            return
        }
        res.sendStatus(204)
    }
    async deletePost(req:  Request, res: Response){
        const isDeleted = await this.postsService.deletePost(new mongoose.Types.ObjectId(req.params.id))
        if(isDeleted){
            res.sendStatus(204)
            return
        }
        res.sendStatus(404)
    }

    async createCommentsForSpecificPost(req:  Request, res: Response){
        const existPost = await this.postsService.getPostById(new mongoose.Types.ObjectId(req.params.postId))
        if(existPost){
            const createPost = await this.postsService.createComment(new mongoose.Types.ObjectId(req.params.postId),req.body.content, req.user!)
            if(createPost){
                return res.status(201).send(createPost)
            }
        }
        res.sendStatus(404)
    }
    async getCommentsForSpecificPost(req:  Request, res: Response){
        const existPost = await this.postsService.getPostById(new mongoose.Types.ObjectId(req.params.postId))
        console.log(existPost)
        if(existPost){
            const allComments = await this.postsService.getCommentsByPostId(new mongoose.Types.ObjectId(req.params.postId),req.query as paginateType)
            return res.status(200).send(allComments)
        }
        res.sendStatus(404)
    }

}