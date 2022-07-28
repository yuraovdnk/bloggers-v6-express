import mongoose from "mongoose";

const ipAddressSchema = new mongoose.Schema({
        ip: {
            type: String,
            min: 1,
            max: 15,
            required: true,
        },
        endpoint: {
            type: String,
            required: true,
        },
        date:{
            type: Date,
            default: Date.now()
        }
    },
    { versionKey: false }
);
export const IpAddress = mongoose.model('Ip-address', ipAddressSchema);


