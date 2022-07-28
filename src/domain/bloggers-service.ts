import {BloggersRepository} from "../repositories/bloggers-repository";
import {paginateRes, paginateType} from "../repositories/pagination";
import {inject, injectable} from "inversify";
import mongoose from "mongoose";
import {BloggerInputType, BloggerViewType} from "../types/types";
import {BloggerDto} from "../utils/dtos/blogger-dto";

@injectable()
export class BloggersService {
    constructor(@inject(BloggersRepository) protected bloggersRepository: BloggersRepository) {
    }

    async getBloggers(query: paginateType): Promise<paginateRes<BloggerViewType>> {
        const bloggers = await this.bloggersRepository.getBloggers(query)
        return await BloggerDto.bloggersMapperPagination(bloggers)

    }

    async getBloggerById(id: mongoose.Types.ObjectId): Promise<BloggerViewType> | null {
        const blogger = await this.bloggersRepository.getBloggerById(id)
        return BloggerDto.bloggersMapper(blogger)

    }

    async createBlogger(body: BloggerInputType): Promise<BloggerViewType> {
        const newBlogger = {
            name: body.name,
            youtubeUrl: body.youtubeUrl
        }
        const createdBlogger = await this.bloggersRepository.createBlogger(newBlogger)
        return BloggerDto.bloggersMapper(createdBlogger)

    }

    async updateBlogger(id: mongoose.Types.ObjectId, body: BloggerInputType): Promise<boolean> {
        return await this.bloggersRepository.updateBlogger(id, body)
    }

    async deleteBlogger(id: mongoose.Types.ObjectId): Promise<boolean> {
        return await this.bloggersRepository.deleteBlogger(id)
    }
}
