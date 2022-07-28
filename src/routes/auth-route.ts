
import {Router} from "express";
import {checkIp} from "../middlewares/check-ip";
import {
    ConfirmEmailValidator,
    EmailResendValidator,
    LoginValidator,
    RegistrationValidator
} from "../middlewares/validators/auth-validator";
import {existUser} from "../middlewares/exist-user";
import {ioc} from "../utils/composition-root";
import {AuthController} from "../controllers/auth-controller";
import {bearerAuth} from "../middlewares/bearer-auth";




export const authRoute = Router()

const authController = ioc.resolve(AuthController)

authRoute.post('/registration', checkIp, RegistrationValidator, existUser, authController.registration.bind(authController) )

authRoute.post('/registration-confirmation', checkIp, ConfirmEmailValidator, authController.registrationConfirm.bind(authController) )

authRoute.post('/registration-email-resending', checkIp, EmailResendValidator, authController.emailResending.bind(authController))

authRoute.post('/refresh-token', authController.refreshToken.bind(authController))

authRoute.post('/logout',authController.logout.bind(authController))

authRoute.post('/login', checkIp, LoginValidator, authController.login.bind(authController))

authRoute.get('/me',bearerAuth, authController.infoAboutMe.bind(authController))

