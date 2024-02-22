import { userreceivingmatchesModal } from "../models/userReceivingMatches.js";
import { userfriendsModal } from "../models/userFriends.js";
export const getAllSenderUsers = async (req, res) => {
    const { userId } = req.query;
    try {
        const result = await userreceivingmatchesModal.find({ userId });

        if (result.length > 0) {
            res.status(200).json({ result: result[0] });
        } else {
            res.status(404).json({ error: "User not found with the provided userId" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to get userReceivingMatches" });
    }
};


export const addSenderUser = async (req, res) => {
    const { userId, senderId } = req.body;
    try {
        // Tìm người dùng với userId đã có trong CSDL
        const existingUser = await userfriendsModal.findOne({ userId });
        const existingFriend = await userfriendsModal.findOne({ userId: senderId });
        if (existingUser) {
            // Sao chép toàn bộ dữ liệu của người dùng hiện tại
            const updatedUser = { ...existingUser.toObject() };

            // Thêm sendingUser mới vào mảng senderId
            updatedUser.friendsId.push(senderId);

            // Cập nhật người dùng với dữ liệu mới
            const result = await userfriendsModal.findOneAndUpdate({ userId }, updatedUser, { new: true });
        } else {
            // Nếu không tìm thấy người dùng, tạo mới và thêm sendingUser vào mảng senderId
            const newUser = new userfriendsModal({
                userId: userId,
                friendsId: [senderId]
            });
            const result = await newUser.save();
        }

        if (existingFriend) {
            // Sao chép toàn bộ dữ liệu của người dùng hiện tại
            const updatedUser = { ...existingFriend.toObject() };

            // Thêm sendingUser mới vào mảng senderId
            updatedUser.friendsId.push(userId);

            // Cập nhật người dùng với dữ liệu mới
            const result = await userfriendsModal.findOneAndUpdate({ userId: senderId }, updatedUser, { new: true });

            if (result) {
                res.status(200).json({ message: "added successfully" });
            }
        } else {
            // Nếu không tìm thấy người dùng, tạo mới và thêm sendingUser vào mảng senderId
            const newUser = new userfriendsModal({
                userId: senderId,
                friendsId: [userId]
            });
            const result = await newUser.save();
            if (result) {
                res.status(200).json({ message: "added friend successfully" });
            }
        }

    } catch (error) {
        console.log('failed to add sending user ', error);
        res.status(500).json({ error: "Failed to add friend sending user" });
    }
}

export const removeSenderId = async (req, res) => {
    const { userId, senderId } = req.body;

    try {
        if (!senderId) {
            return res.status(400).json({ error: "senderId to remove cannot be null or undefined" });
        }

        const result = await userreceivingmatchesModal.findOneAndUpdate(
            { userId },
            { $pull: { sender: { senderId } } },
            { new: true }
        );

        if (result) {
            return res.status(200).json({ message: "senderId removed successfully" });
        } else {
            return res.status(404).json({ error: "User not found with the provided userId" });
        }
    } catch (error) {
        console.log('Failed to remove senderId ', error);
        return res.status(500).json({ error: "Failed to remove senderId" });
    }
};


