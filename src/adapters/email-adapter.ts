import nodemailer from "nodemailer"
import {UserType} from "../types/types";

export const emailAdapter = {
    async sendEmail(user:UserType){
        let transporter = await nodemailer.createTransport({
                service: "Gmail",
                auth: {
                    user: "yuraovdnk@gmail.com",
                    pass: "puoowkujaurxnden",
                },
            })
        let info = await transporter.sendMail({
            from: '"Yura" <yuraovdnk@gmail.com>',
            to: user.accountData.email ,
            subject: "Confrim Email",

            text: `https://somesite.com/confirm-email?code=${user.emailConfirmation.confirmationCode}`
        })
       return info
    }
}