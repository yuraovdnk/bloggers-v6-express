import {Request, Response} from "express";
import {inject, injectable} from "inversify";
import {UsersService} from "../domain/users-service";
import {paginateType} from "../repositories/pagination";
import mongoose from "mongoose";


@injectable()
export class UserController {
    constructor(@inject(UsersService) public usersService: UsersService) {
    }

    async getUsers(req: Request, res: Response) {
        const allUsers = await this.usersService.getAllUsers(req.query as paginateType)
        res.send(allUsers)
    }

    async deleteUser(req: Request, res: Response) {
        const isDeleted = await this.usersService.deleteUser(new mongoose.Types.ObjectId(req.params.id))
        if (isDeleted) {
            return res.sendStatus(204)
        }
        res.sendStatus(404)
    }

    async createUser(req: Request, res: Response) {
        const newUser = await this.usersService.createUser(req.body.login, req.body.email, req.body.password)
        if (newUser) {
            res.status(201).send(newUser)
            return
        }
        res.sendStatus(400)
    }
}