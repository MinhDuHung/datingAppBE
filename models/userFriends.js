import mongoose, { Schema } from "mongoose";

const schema = new Schema({
    userId: {
        type: String,
        required: true
    },
    friendsId: [String],
}, { timestamps: true });

export const userfriendsModal = mongoose.model("userfriends", schema);
