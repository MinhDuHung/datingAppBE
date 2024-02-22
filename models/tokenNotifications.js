import mongoose, { Schema } from "mongoose";

const schema = new Schema({
    userId: {
        type: String,
        require: true
    },
    token: {
        type: String,
        require: true
    }
}, { timestamps: true })

export const tokenNotificationsModel = mongoose.model("tokenNotifications", schema)