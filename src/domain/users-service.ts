import {UsersRepository} from "../repositories/users-repository";
import {UserSchemaType, UserViewType} from "../types/types";
import {paginateRes, paginateType} from "../repositories/pagination";
import {inject, injectable} from "inversify";
import mongoose from "mongoose";
import {uuid} from "uuidv4";
import {add} from "date-fns";
import bcrypt from "bcrypt";
import {UsersMapper} from "../utils/dtos/users-mapper";

@injectable()
export class UsersService {
    constructor(@inject(UsersRepository) public usersRepository: UsersRepository,
                @inject(UsersMapper) protected usersMapper : UsersMapper) {
    }

    async getAllUsers(query: paginateType): Promise<paginateRes<UserViewType>> {
        const users = await this.usersRepository.getAllUsers(query)
        return this.usersMapper.usersMapperPagination(users)

    }

    async deleteUser(id: mongoose.Types.ObjectId): Promise<boolean> {
        return await this.usersRepository.deleteUser(id)
    }

    async getUserById(id: mongoose.Types.ObjectId): Promise<UserSchemaType | null> {
        return this.usersRepository.findById(id)
    }

    async createUser(login: string, email: string, password: string): Promise<UserViewType | boolean> {
        const passwordHash = await this.generateHash(password)
        const newUser = {
            accountData: {
                login,
                email,
                passwordHash,
                createdAt: new Date()
            },
            emailConfirmation: {
                confirmationCode: uuid(),
                expirationDate: add(new Date(), {
                    hours: 1
                }),
                isConfirmed: true
            }
        }
        const createdUser = await this.usersRepository.createUser(newUser)
        return this.usersMapper.commonUsersMapper(createdUser)
    }

    async generateHash(password: string) {
        const hash = await bcrypt.hash(password, 10)
        return hash
    }

}