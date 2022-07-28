import {Router} from "express";
import {basicAuth} from "../middlewares/basic-auth";
import {postsValidate} from "../middlewares/validators/posts-validator";
import {bloggersValidate} from "../middlewares/validators/bloggers-validator";
import {idValidate} from "../middlewares/validators/id-validator";
import {ioc} from "../utils/composition-root";
import {BloggersController} from "../controllers/bloggers-controller";

export const bloggersRoute = Router()

const bloggersController = ioc.resolve(BloggersController)


bloggersRoute.get('/', bloggersController.getBloggers.bind(bloggersController))
bloggersRoute.get('/:id', idValidate, bloggersController.getBloggerById.bind(bloggersController))
bloggersRoute.post('/', basicAuth, bloggersValidate, bloggersController.createBlogger.bind(bloggersController))
bloggersRoute.put('/:id', basicAuth, idValidate, bloggersValidate, bloggersController.updateBlogger.bind(bloggersController))
bloggersRoute.delete('/:id', basicAuth, idValidate, bloggersController.deleteBlogger.bind(bloggersController))

bloggersRoute.get('/:bloggerId/posts', idValidate, bloggersController.getPostsByBloggerId.bind(bloggersController))
bloggersRoute.post('/:bloggerId/posts', basicAuth, idValidate, postsValidate, bloggersController.createPostForSpecificBlogger.bind(bloggersController))


