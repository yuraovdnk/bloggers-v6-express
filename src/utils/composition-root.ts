import "reflect-metadata"
import {BloggersRepository} from "../repositories/bloggers-repository";
import {BloggersService} from "../domain/bloggers-service";
import {Container} from "inversify";
import {BloggersController} from "../controllers/bloggers-controller";
import {PostsController} from "../controllers/posts-contollers";
import {PostsService} from "../domain/posts-service";
import {PostsRepository} from "../repositories/posts-repository";
import {CommentsController} from "../controllers/comments-controller";
import {CommentsService} from "../domain/comments-service";
import {CommentsRepository} from "../repositories/comments-repository";
import {AuthController} from "../controllers/auth-controller";
import {AuthService} from "../domain/auth-service";
import {UsersRepository} from "../repositories/users-repository";
import {JWTService} from "../domain/application/jwt-service";
import {UsersService} from "../domain/users-service";
import {UserController} from "../controllers/users-controller";



export const ioc = new Container()
//bloggers
ioc.bind(BloggersController).to(BloggersController)
ioc.bind(BloggersService).to(BloggersService)
ioc.bind(BloggersRepository).to(BloggersRepository)
//posts
ioc.bind(PostsController).to(PostsController)
ioc.bind(PostsService).to(PostsService)
ioc.bind(PostsRepository).to(PostsRepository)
//comments
ioc.bind(CommentsController).to(CommentsController)
ioc.bind(CommentsService).to(CommentsService)
ioc.bind(CommentsRepository).to(CommentsRepository)

ioc.bind(AuthController).to(AuthController)
ioc.bind(AuthService).to(AuthService)

ioc.bind(UserController).to(UserController)
ioc.bind(UsersService).to(UsersService)
ioc.bind(UsersRepository).to(UsersRepository)

ioc.bind(JWTService).to(JWTService)



