import { userreceivingmatchesModal } from "../models/userReceivingMatches.js";
import { usersendingmatchesModal } from "../models/userSendingMatches.js";


const handleError = (res, message, status = 500) => {
    console.log(`Failed to add sending user: ${message}`);
    res.status(status).json({ error: message });
};

const updateUser = async (modal, query, update) => {
    try {
        const result = await modal.findOneAndUpdate(query, update, { new: true });
        return result;
    } catch (error) {
        throw error;
    }
};

export const getAllReceiverUsers = async (req, res) => {
    const { userId } = req.body
    try {
        const result = await usersendingmatchesModal.find({ userId });
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to get userSendingMatches" });
    }
}

export const addReceiverUser = async (req, res) => {
    const { userId, receiver } = req.body;

    try {
        const existingUser = await usersendingmatchesModal.findOne({ userId });

        if (existingUser) {
            const updatedUser = { ...existingUser.toObject() };
            updatedUser.receiver.push(receiver);

            const result = await updateUser(usersendingmatchesModal, { userId }, updatedUser);

            if (result) {
                try {
                    const ex = await userreceivingmatchesModal.findOne({ userId: receiver.receiverId });
                    if (ex) {
                        const thisUpdatedUser = { ...ex.toObject() }
                        thisUpdatedUser.sender.push({
                            senderId: userId,
                            time: new Date()
                        });
                        const thisResult = await updateUser(userreceivingmatchesModal, { userId: receiver.receiverId }, thisUpdatedUser);
                        if (thisResult) {
                            res.status(200).json({ message: "added successfully" });
                        }
                    } else {
                        const newUser = new userreceivingmatchesModal({
                            userId: receiver.receiverId,
                            sender: [{
                                senderId: userId,
                                time: new Date()
                            }]
                        });
                        await newUser.save();
                        res.status(200).json({ message: "added successfully" });
                    }
                } catch (error) {
                    handleError(res, "Failed to add sending user");
                }
            }
        } else {
            const newUser = new usersendingmatchesModal({
                userId: userId,
                receiver: [receiver]
            });

            const result = await newUser.save();

            if (result) {
                try {
                    const ex = await userreceivingmatchesModal.findOne({ userId: receiver.receiverId });
                    if (ex) {
                        const thisUpdatedUser = { ...ex.toObject() }
                        thisUpdatedUser.sender.push({
                            senderId: userId,
                            time: new Date()
                        });
                        const thisResult = await updateUser(userreceivingmatchesModal, { userId: receiver.receiverId }, thisUpdatedUser);
                        if (thisResult) {
                            res.status(200).json({ message: "added successfully" });
                        }
                    } else {
                        const newUser = new userreceivingmatchesModal({
                            userId: receiver.receiverId,
                            sender: [{
                                senderId: userId,
                                time: new Date()
                            }]
                        });
                        await newUser.save();
                        res.status(200).json({ message: "added successfully" });
                    }
                } catch (error) {
                    handleError(res, "Failed to add sending user");
                }
            }
        }
    } catch (error) {
        handleError(res, "Failed to add sending user");
    }
};

export const removeReceiverId = async (req, res) => {
    const { userId, receiverId } = req.body;

    try {
        if (!receiverId) {
            return res.status(400).json({ error: "ReceiverId to remove cannot be null or undefined" });
        }

        const result = await usersendingmatchesModal.findOneAndUpdate(
            { userId },
            { $pull: { receiver: { receiverId } } },
            { new: true }
        );

        if (result) {
            return res.status(200).json({ message: "ReceiverId removed successfully" });
        } else {
            return res.status(404).json({ error: "User not found with the provided userId" });
        }
    } catch (error) {
        console.log('Failed to remove receiverId ', error);
        return res.status(500).json({ error: "Failed to remove receiverId" });
    }
};


