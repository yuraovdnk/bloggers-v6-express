import {Router} from "express";
import {basicAuth} from "../middlewares/basic-auth";
import {postsValidate} from "../middlewares/validators/posts-validator";
import {bearerAuth} from "../middlewares/bearer-auth";
import {idValidate} from "../middlewares/validators/id-validator";
import {commentValidation} from "../middlewares/validators/comment-validators";
import {PostsController} from "../controllers/posts-contollers";
import {ioc} from "../utils/composition-root";


export const postsRoute = Router()

const postsController = ioc.resolve(PostsController)

postsRoute.get('/', postsController.getPosts.bind(postsController))
postsRoute.get('/:id', idValidate, postsController.getPostById.bind(postsController))
postsRoute.post('/', basicAuth, postsValidate, postsController.createPost.bind(postsController))
postsRoute.put('/:id', basicAuth, idValidate, postsValidate, postsController.updatePost.bind(postsController))
postsRoute.delete('/:id', basicAuth, idValidate, postsController.deletePost.bind(postsController))
///comments
postsRoute.post('/:postId/comments', bearerAuth, commentValidation, idValidate, postsController.createCommentsForSpecificPost.bind(postsController))
postsRoute.get('/:postId/comments', idValidate, postsController.getCommentsForSpecificPost.bind(postsController))
 