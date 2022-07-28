import {Router} from "express";
import {bearerAuth} from "../middlewares/bearer-auth";
import {idValidate} from "../middlewares/validators/id-validator";
import {commentValidation} from "../middlewares/validators/comment-validators";
import {ioc} from "../utils/composition-root";
import {CommentsController} from "../controllers/comments-controller";


export const commentsRoute = Router()
const commentsController = ioc.resolve(CommentsController)

commentsRoute.get('/:id',idValidate, commentsController.getCommentById.bind(commentsController))

commentsRoute.put('/:id',bearerAuth,commentValidation,idValidate, commentsController.updateComment.bind(commentsController))

commentsRoute.delete('/:id', bearerAuth,idValidate,commentsController.deleteComment.bind(commentsController))