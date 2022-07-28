import {NextFunction, Request, Response} from "express";
import {subSeconds} from "date-fns";
import {IpAddress} from "../models/ip-address-model";

export const checkIp = async (req: Request, res: Response, next: NextFunction) => {

    const ipQuery = {
        ip: req.ip,
        endpoint: req.baseUrl + req.path,
        date: new Date()
    }
    await IpAddress.create(ipQuery)

    let currentDate = new Date()
    const pastDate = subSeconds(currentDate, 10)

    const count = await IpAddress.countDocuments({
        ip: ipQuery.ip,
        endpoint: ipQuery.endpoint,
        date: {$gte: pastDate, $lte: currentDate}
    })
    console.log(count)
    await IpAddress.deleteMany({
        ip: ipQuery.ip,
        endpoint: ipQuery.endpoint,
        date: {$lt: pastDate}
    })
    if (count > 5) {
        res.sendStatus(429)
        return
    }
    next()
}