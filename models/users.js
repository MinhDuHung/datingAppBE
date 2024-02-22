import mongoose, { Schema } from "mongoose";

const schema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    isPremium: {
        type: Boolean,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    job: {
        type: String,
        required: true
    },
    about: {
        type: String,
        required: true
    },
    emailAndPhone: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    images: {
        type: [String],
        required: true
    },
    token:{
        type: String,
        required: true
    },
    interests:{
        type: [String],
        required: true
    }
}, { timestamps: true });

export const usersModel = mongoose.model("users", schema);
