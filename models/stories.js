import mongoose, { Schema } from "mongoose";

const schema = new Schema({
    userId: {
        type: String,
        require: true
    },
    img: {
        type: String,
        require: true
    },
    viewCount: {
        type: Number,
        require: true
    },
    music: {
        type: String,
        require: true
    }
}, { timestamps: true })

export const storiesModel = mongoose.model("stories", schema)