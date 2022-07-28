import mongoose, {Schema} from "mongoose";
import {BloggerInputType} from "../types/types";

const bloggerSchema = new mongoose.Schema<BloggerInputType>({
        name: {
            type: String,
            min: 1,
            max: 15,
            required: true,
        },
        youtubeUrl: {
            type: String,
            min: 1,
            max: 100,
            required: true,
        }
    },
    { versionKey: false}

);
export const Blogger = mongoose.model('Blogger', bloggerSchema);



