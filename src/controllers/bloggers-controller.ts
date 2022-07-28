import {inject, injectable} from "inversify";
import {BloggersService} from "../domain/bloggers-service";
import {Request, Response} from "express";
import {paginateType} from "../repositories/pagination";
import {PostsService} from "../domain/posts-service";
import mongoose from "mongoose";


@injectable()
export class BloggersController {
    constructor(@inject(BloggersService) protected bloggersService: BloggersService,
                @inject(PostsService) protected postsService: PostsService) {}

    async createBlogger(req: Request, res: Response) {
        const newBlogger = await this.bloggersService.createBlogger(req.body)
        if (newBlogger) {
            res.status(201).send(newBlogger)
            return
        }
        res.sendStatus(404)
    }

    async updateBlogger(req: Request, res: Response) {
        const foundBlogger = await this.bloggersService.getBloggerById(new mongoose.Types.ObjectId(req.params.id))
        if (foundBlogger) {
            const isUpdated = await this.bloggersService.updateBlogger(new mongoose.Types.ObjectId(req.params.id), req.body)
            if (isUpdated) {
                res.sendStatus(204)
                return
            }
            res.sendStatus(400)
            return
        }
        res.sendStatus(404)
    }

    async getBloggers(req: Request, res: Response) {
        const bloggers = await this.bloggersService.getBloggers(req.query as paginateType)
        res.status(200).send(bloggers)
    }

    async getBloggerById(req: Request, res: Response) {
        const blogger = await this.bloggersService.getBloggerById(new mongoose.Types.ObjectId(req.params.id))
        if (blogger) {
            res.status(200).send(blogger)
            return
        }
        res.sendStatus(404)
    }

    async deleteBlogger(req: Request, res: Response) {
        const isDeleted = await this.bloggersService.deleteBlogger(new mongoose.Types.ObjectId(req.params.id))
        if (isDeleted) {
            res.sendStatus(204)
            return
        }
        res.sendStatus(404)
    }

    async getPostsByBloggerId(req: Request, res: Response) {
        const bloggerExist = await this.bloggersService.getBloggerById(new mongoose.Types.ObjectId(req.params.bloggerId))
        if (bloggerExist) {
            const post = await this.postsService.getPostsByBloggerId(new mongoose.Types.ObjectId(req.params.bloggerId), req.query as paginateType)
            res.status(200).send(post)
            return
        }
        res.sendStatus(404)
    }

    async createPostForSpecificBlogger(req: Request, res: Response) {
        const blogger = await this.bloggersService.getBloggerById(new mongoose.Types.ObjectId(req.params.bloggerId))
        if (blogger) {
            const createdPost = await this.postsService.createPost(req.body, blogger)
            return res.status(201).send(createdPost)
        }
        res.sendStatus(404)
    }
}