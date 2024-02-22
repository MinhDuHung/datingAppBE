import mongoose, { Schema } from "mongoose";

const contentSchema = new Schema({
    sender: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: false
    },
    text: {
        type: String,
        required: true
    },
    music: {
        type: String,
        required: false
    },
    video: {
        type: String,
        required: false
    },
    time: {
        type: Date,
        required: false
    }
}, { _id: false, });

const schema = new Schema({
    mainId: {
        type: String,
        required: true
    },
    content: [contentSchema],
}, { timestamps: true });

export const chatroomsModel = mongoose.model("chatrooms", schema);
