import mongoose from "mongoose";
import {Schema} from "mongoose";

const commentSchema = new mongoose.Schema({

        content: {
            type: String,
            required: true,
        },
        postId:{
            type:  Schema.Types.ObjectId,
            required: true,
        },
        userId: {
            type:  Schema.Types.ObjectId,
            required: true,
        },
        userLogin:{
            type: String,
            required:true
        },
        addedAt:{
            type:Date,
            default: Date.now()
        }
    },
    { versionKey: false }
);
export const Comment = mongoose.model('Comment', commentSchema);

