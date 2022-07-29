import {Request, Response} from "express";
import {AuthService} from "../domain/auth-service";
import {errorsGenerator} from "../utils/errors-generator";
import {JWTService} from "../domain/application/jwt-service";
import {inject, injectable} from "inversify";


@injectable()
export class AuthController{
    constructor(@inject(AuthService) public authService: AuthService,
                @inject(JWTService) public jwtService: JWTService) {}

    async registration(req: Request, res: Response){
        const newUser = await this.authService.createUser(req.body.login, req.body.email, req.body.password)
        if (newUser) {
            res.status(204).send("Email with confirmation code will be send to passed email address")
            return
        }
        res.sendStatus(400)
    }

    async registrationConfirm(req: Request, res: Response){
        const user = await this.authService.finUserByCode(req.body.code)
        if(!user){
            return res.status(400).send(errorsGenerator("Ivalid code","code"))
        }
        const resultConfirmation = await this.authService.confirmEmail(user, req.body.code)
        if (resultConfirmation) {
            res.sendStatus(204)
            return
        }
        res.status(400).send(errorsGenerator("Something wrong with field code","code"))
    }

    async emailResending(req: Request, res: Response){
        const user = await this.authService.findByEmail(req.body.email)
        if(!user){
            return res.status(400).send(errorsGenerator("User with such email is not exist","email"))
        }
        const isResending = await this.authService.resendEmail(user)
        if (isResending) {
            res.sendStatus(204)
            return
        }
        res.status(400).send(errorsGenerator("is confirmed","email"))
    }

    async login(req: Request, res: Response){
        const user = await this.authService.checkCredentials(req.body.login, req.body.password)
        if (user) {
            const token = await this.jwtService.createJWT(user)
            await this.jwtService.saveToken(user._id,token.refreshToken)
            res.cookie('refreshToken', token.refreshToken,{maxAge:10000,httpOnly:true,secure:true})
            res.status(200).send({accessToken: token.accessToken})
            return
        }
        res.sendStatus(401)
    }

    async refreshToken(req: Request, res: Response){
        const refreshToken = req.cookies.refreshToken
        const token = await this.authService.refreshToken(refreshToken)
        if(token){
            res.cookie('refreshToken', token.refreshToken,{maxAge:10000,httpOnly:true,secure:true})
            res.status(200).send({accessToken: token.accessToken})
            return
        }
        res.sendStatus(400)

    }

    async logout (req: Request, res: Response){
        const refreshToken = req.cookies.refreshToken
        const deleteToken = await this.authService.revokedToken(refreshToken)
        if(deleteToken){
            res.cookie('refreshToken',{maxAge:0})
            return res.sendStatus(200)
        }
        res.sendStatus(401)
    }

    async infoAboutMe(req: Request, res: Response){
        const infoObj = {
            email: req.user.accountData.email,
            login: req.user.accountData.login,
            userId: req.user._id
        }
       return res.status(200).send(infoObj)

    }

}