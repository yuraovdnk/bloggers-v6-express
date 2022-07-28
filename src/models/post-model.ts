import mongoose, {Schema} from "mongoose";
import {PostInputType} from "../types/types";

export const postSchema = new mongoose.Schema<PostInputType>({
        title: {
            type: String,
            max: 30,
            required: true,
        },
        shortDescription: {
            type: String,
            min: 1,
            max: 100,
            required: true,
        },
        content: {
            type: String,
            min: 1,
            max: 1000,
            required: true,
        },
        bloggerId: {
            type: Schema.Types.ObjectId,
            required: true,
        },

    },
    { versionKey: false }
);
export const Posts = mongoose.model('Post', postSchema);
