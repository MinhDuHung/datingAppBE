import mongoose, { Schema } from "mongoose";

const schema = new Schema({
    userId: {
        type: String,
        required: true
    },
    interests: [String],
}, { timestamps: true });

export const userinterestsModel = mongoose.model("userinterests", schema);
