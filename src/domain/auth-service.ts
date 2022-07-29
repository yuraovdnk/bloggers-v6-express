import bcrypt from "bcrypt";
import {UserSchemaType} from "../types/types";
import {uuid} from "uuidv4";
import {add} from 'date-fns'
import {emailManager} from "../managers/email-manager";
import {UsersRepository} from "../repositories/users-repository";
import {inject, injectable} from "inversify";
import {JWTService} from "./application/jwt-service";



@injectable()
export class AuthService {
    constructor(@inject(UsersRepository) public usersRepository: UsersRepository,
                @inject(JWTService) public jwtService: JWTService) {}

    async createUser(login: string, email: string, password: string): Promise<boolean> {
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
        try {
             await emailManager.sendConfirmMail(createdUser)
        } catch (e) {
            await this.usersRepository.deleteUser(createdUser._id)
            return false
        }
        return true
    }

    async confirmEmail(user: UserSchemaType, code: string):Promise<boolean> {

        if (user.emailConfirmation.isConfirmed) return false

        if (user.emailConfirmation.confirmationCode !== code) return false

        if (user.emailConfirmation.expirationDate < new Date()) return false

        return await this.usersRepository.updateConfirm(user._id)

    }

    async resendEmail(user: UserSchemaType):Promise<boolean | null>{
        if(user.emailConfirmation.isConfirmed) return false
        const newConfirmCode = uuid()
        await this.usersRepository.updateCode(user._id,newConfirmCode)
        const userWithUpdated = await this.usersRepository.findByConfirmCode(newConfirmCode)
        try {
            await emailManager.sendConfirmMail(userWithUpdated!)
            return true
        }
        catch (e){
            return null
        }
    }

    async findByLogin(login:string):Promise<UserSchemaType | null>{
        return await this.usersRepository.findByLogin(login)
    }

    async findByEmail(email:string):Promise<UserSchemaType | null>{
        return await this.usersRepository.findByEmail(email)
    }

    async checkCredentials(login: string, password: string):Promise<UserSchemaType | null> {
        const candidate = await this.usersRepository.findByLogin(login)

        if (!candidate) {
            return null
        }
        if(!candidate.emailConfirmation.isConfirmed) return null

        const validPassword = await bcrypt.compare(password,candidate.accountData.passwordHash)

        if (!validPassword) {
            return null
        }
        return candidate
    }

    async generateHash(password: string) {
        return await bcrypt.hash(password, 10)

    }

    async finUserByCode(code:string):Promise<UserSchemaType | null>{
        return await this.usersRepository.findByConfirmCode(code)
    }

    async refreshToken(refreshToken:string){
        if(!refreshToken){
            return null
        }
        const UserIdByToken = await this.jwtService.verifyToken(refreshToken)
        const findToken = await this.jwtService.findToken(refreshToken)
        if(!UserIdByToken) return null
        if(!findToken) return null
        const user = await this.usersRepository.findById(UserIdByToken)
        const newToken = await this.jwtService.createJWT(user)
        await this.jwtService.saveToken(user._id,newToken.refreshToken)
        return newToken

    }

    async revokedToken(refreshToken:string):Promise<boolean>{
        const payloadToken = await this.jwtService.verifyToken(refreshToken)
        const findToken = await this.jwtService.findToken(refreshToken)
        if(!payloadToken) return false
        if(!findToken) return false
        return await this.jwtService.deleteToken(refreshToken)
    }
}