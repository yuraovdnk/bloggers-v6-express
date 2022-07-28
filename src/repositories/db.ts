import {settings} from "../settings";
import mongoose from "mongoose";
import {disconnect} from "mongoose";

export async function runDb() {
    try {
        await mongoose.connect(settings.MONGODB + '/youtube')
        console.log("Succesfully connected to "+ settings.MONGODB)

    } catch (e) {
        console.log("Not connected to db ", e)
        await disconnect()
    }
}