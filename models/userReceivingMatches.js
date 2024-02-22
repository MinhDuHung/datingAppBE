import mongoose, { Schema } from "mongoose";

const schema = new Schema({
    userId: {
        type: String,
        required: true
    },
    sender: [{
        senderId: {
            type: String
        },
        time: {
            type: Date
        }
    }],
}, { timestamps: true });


export const userreceivingmatchesModal = mongoose.model("userreceivingmatches", schema);
