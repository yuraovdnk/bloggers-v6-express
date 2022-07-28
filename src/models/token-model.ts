import mongoose, {Schema} from "mongoose";

const tokenSchema = new mongoose.Schema({
        userId: {
            type: Schema.Types.ObjectId,
            required: true
        },
        refreshToken: {
            type: String,
            required: true,
        }
    },
    { versionKey: false }
);
export const Token = mongoose.model('Token', tokenSchema);
