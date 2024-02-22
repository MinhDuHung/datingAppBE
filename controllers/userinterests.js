import { userinterestsModel } from "../models/userInterests.js";

export const addInterests = async (req, res) => {
    const { userId, interests } = req.body;
    try {
        const result = await userinterestsModel.findOneAndUpdate(
            { userId },
            { $push: { interests: { $each: interests } } },
            { new: true }
        );

        if (result) {
            res.status(200).json(result);
        } else {
            // Nếu không có bản ghi với userId, tạo mới và thêm interests
            const newUserInterest = new userinterestsModel({
                userId,
                interests
            });

            const newResult = await newUserInterest.save();

            if (newResult) {
                res.status(200).json(newResult);
            } else {
                res.status(500).json({ error: "Failed to add interests" });
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to add interests" });
    }
}
