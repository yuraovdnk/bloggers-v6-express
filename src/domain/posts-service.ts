import {paginateRes, paginateType} from "../repositories/pagination";
import {PostsRepository} from "../repositories/posts-repository";
import {
    BloggerViewType,
    CommentViewType,
    PostInputType,PostViewType, UserSchemaType,
} from "../types/types";
import {inject, injectable} from "inversify";
import mongoose from "mongoose";
import {BloggersService} from "./bloggers-service";
import {CommentsMapper} from "../utils/dtos/comments-mapper";
import {PostsMapper} from "../utils/dtos/posts-mapper";


@injectable()
export class PostsService {
    constructor(@inject(PostsRepository) protected postsRepository: PostsRepository,
                @inject(BloggersService) protected bloggersService: BloggersService,
                @inject(PostsMapper) protected postsMapper : PostsMapper,
                @inject(CommentsMapper) protected commentsMapper : CommentsMapper){
    }

    async getPosts(query: paginateType): Promise<paginateRes<PostViewType>> {
        const posts = await this.postsRepository.getPosts(query)
        return this.postsMapper.mapperPostPagination(posts)
    }

    async getPostById(id: mongoose.Types.ObjectId): Promise<PostViewType | null> {
        const post = await this.postsRepository.getPostById(id)
        return this.postsMapper.commonMapperPost(post)
    }

    async createPost(body: PostInputType, blogger: BloggerViewType): Promise<PostViewType> {
        const newPost = {
            title: body.title,
            shortDescription: body.shortDescription,
            content: body.content,
            bloggerId: blogger.id,
            blogger: blogger.id,
        }
        const createdPost = await this.postsRepository.createPost(newPost)
        return this.postsMapper.commonMapperPost(createdPost)
    }

    async updatePost(body: PostInputType, id: mongoose.Types.ObjectId): Promise<boolean> {
        return await this.postsRepository.updatePost(body, id)
    }

    async deletePost(id: mongoose.Types.ObjectId): Promise<boolean> {
        return await this.postsRepository.deletePost(id)
    }

    async getPostsByBloggerId(bloggerId: mongoose.Types.ObjectId, query: paginateType): Promise<paginateRes> {
        const bloggerPosts = await this.postsRepository.getPostsByBloggerId(bloggerId, query)
        return this.postsMapper.mapperPostPagination(bloggerPosts)
    }

///comment
    async createComment(postId: mongoose.Types.ObjectId, content: string, user: UserSchemaType): Promise<CommentViewType> {
        const newComment = {
            content,
            postId,
            userId: user._id,
            userLogin: user.accountData.login,
            addedAt: new Date()
        }
        const comment = await this.postsRepository.createComment(newComment)
        return this.commentsMapper.commonMapperComments(comment)
    }

    async getCommentsByPostId(postId: mongoose.Types.ObjectId, query: paginateType): Promise<paginateRes> {
        const comments = await this.postsRepository.getCommentsByPostId(postId, query)
        return this.commentsMapper.mapperCommentsPagination(comments)
    }
}