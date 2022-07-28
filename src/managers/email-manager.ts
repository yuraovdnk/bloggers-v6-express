import {UserType} from "../types/types";
import {emailAdapter} from "../adapters/email-adapter";

export const emailManager = {
    async sendConfirmMail(user:UserType){
        return await emailAdapter.sendEmail(user)
    }
}