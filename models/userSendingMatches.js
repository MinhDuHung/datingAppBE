import mongoose, { Schema } from "mongoose";

const schema = new Schema({
    userId: {
        type: String,
        required: true
    },
    receiver: [{
        receiverId: {
            type: String
        },
        time: {
            type: Date
        }
    }],
}, { timestamps: true });

export const usersendingmatchesModal = mongoose.model("usersendingmatches", schema);
