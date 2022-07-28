import {Router} from "express";
import {basicAuth} from "../middlewares/basic-auth";
import {idValidate} from "../middlewares/validators/id-validator";
import {UserController} from "../controllers/users-controller";
import {ioc} from "../utils/composition-root";
import {RegistrationValidator} from "../middlewares/validators/auth-validator";
import {existUser} from "../middlewares/exist-user";


export const usersRoute = Router()

const userController = ioc.resolve(UserController)
usersRoute.get('/', userController.getUsers.bind(userController))
usersRoute.post('/',basicAuth,RegistrationValidator, existUser, userController.createUser.bind(userController))
usersRoute.delete('/:id',basicAuth,idValidate, userController.deleteUser.bind(userController))


