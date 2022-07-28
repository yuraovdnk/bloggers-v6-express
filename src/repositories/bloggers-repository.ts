import {paginateRes, paginateType, pagination} from "./pagination";
import {injectable} from "inversify";
import {Blogger} from "../models/blogger-model";
import mongoose from "mongoose";
import {BloggerSchemaType, BloggerInputType} from "../types/types";

@injectable()
export class BloggersRepository {
    async getBloggers(query: paginateType): Promise<paginateRes<BloggerSchemaType>> {
        let filter = query.SearchNameTerm ? {name: {$regex: query.SearchNameTerm}} : {}
        return await pagination<BloggerSchemaType>(query, filter, Blogger)
    }

    async getBloggerById(id: mongoose.Types.ObjectId): Promise<BloggerSchemaType> | null {
        return Blogger.findOne({_id: id}).lean()
    }

    async createBlogger(blogger: BloggerInputType): Promise<BloggerSchemaType> {
        return await Blogger.create(blogger)
    }

    async updateBlogger(id: mongoose.Types.ObjectId, body: BloggerInputType): Promise<boolean> {
        const query = await Blogger.updateOne({_id: id}, {name: body.name, youtubeUrl: body.youtubeUrl})
        return query.acknowledged
    }

    async deleteBlogger(id: mongoose.Types.ObjectId): Promise<boolean> {
        const result = await Blogger.deleteOne({_id: id})
        return result.acknowledged
    }
}
