import {Request, Response, Router} from "express";
import {Blogger} from "../models/blogger-model";
import {Posts} from "../models/post-model";
import {User} from "../models/user-model";
import {IpAddress} from "../models/ip-address-model";
import {Comment} from "../models/comment-model";


export const testingRoute = Router()

testingRoute.delete('/all-data',async (req: Request, res: Response)=>{

    try {
        await Blogger.deleteMany({})
        await Posts.deleteMany({})
        await User.deleteMany({})
        await Comment.deleteMany({})
        await IpAddress.deleteMany({})
        res.sendStatus(204)
    }
    catch (e){
        console.log(e)
    }
})