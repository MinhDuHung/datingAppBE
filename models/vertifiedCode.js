import mongoose, { Schema } from "mongoose";

const schema = new Schema({
    mainId: {
        type: String,
        required: true
    },
    code: {
        type: Number,
        required: true
    },
}, { timestamps: true });

export const vertifiedCodeModal = mongoose.model("vertifiedcode", schema);
