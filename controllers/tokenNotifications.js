import { tokenNotificationsModel } from "../models/tokenNotifications.js";

export const getNotificationsTokenByUserId = async (req, res) => {
    const { userId } = req.query;
    try {
        const tokenNotifications = await tokenNotificationsModel.find({ userId });
        res.status(200).json(tokenNotifications);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to get tokenNotifications" });
    }
}

export const insertTokenNotifications = async (req, res) => {
    const { userId, token } = req.body;
    try {
        const existingToken = await tokenNotificationsModel.findOne({ userId });

        if (existingToken) {
            // If the token already exists, update it
            existingToken.token = token;
            const result = await existingToken.save();

            if (result) {
                res.status(200).json({ message: "Token updated successfully" });
            }
        } else {
            // If the token doesn't exist, create a new one
            const newToken = new tokenNotificationsModel({ userId, token });
            const result = await newToken.save();

            if (result) {
                res.status(200).json({ message: "Token inserted successfully" });
            }
        }
    } catch (error) {
        console.log('Failed to insert/update token ', error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}


