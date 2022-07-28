import {UsersRepository} from "../repositories/users-repository";
import {UserSchemaType, UserViewType} from "../types/types";
import {paginateRes, paginateType} from "../repositories/pagination";
import {inject, injectable} from "inversify";
import mongoose from "mongoose";
import {uuid} from "uuidv4";
import {add} from "date-fns";
import bcrypt from "bcrypt";
import {Mappers} from "../utils/dto";
import {UserDto} from "../utils/dtos/user-dto";

@injectable()
export class UsersService {
    constructor(@inject(UsersRepository) public usersRepository: UsersRepository) {
    }

    async getAllUsers(query: paginateType): Promise<paginateRes> {
        const users = await this.usersRepository.getAllUsers(query)
        users.items = UserDto.usersMapperPagination(users.items as [UserSchemaType])
        return users

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
                isConfirmed: false
            }
        }
        const createdUser = await this.usersRepository.createUser(newUser)
        return Mappers.usersMapper(createdUser)
    }

    async generateHash(password: string) {
        const hash = await bcrypt.hash(password, 10)
        return hash
    }

}