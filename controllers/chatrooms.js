import { chatroomsModel } from "../models/chatRooms.js";

export const getOneChatRoom = async (req, res) => {
    const { mainId, page } = req.query;
    const itemsPerPage = 50;
    const skip = (page - 1) * itemsPerPage; // Tính toán số lượng bản ghi cần bỏ qua

    try {
        const data = await chatroomsModel.aggregate([
            { $match: { mainId } },  // Lọc theo mainId
            { $unwind: "$content" },  // Giãn ra mảng content thành các bản ghi độc lập
            { $sort: { "content.time": -1 } },  // Sắp xếp theo trường time giảm dần
            { $skip: skip },  // Bỏ qua số lượng bản ghi cần bỏ qua
            { $limit: itemsPerPage },  // Giới hạn số lượng bản ghi trả về cho trang hiện tại
            {
                $group: {
                    _id: "$_id",  // Nhóm lại theo _id của bản ghi gốc
                    mainId: { $first: "$mainId" },
                    __v: { $first: "$__v" },
                    content: { $push: "$content" }  // Đưa các bản ghi content vào mảng content mới
                }
            },
        ]);

        res.status(200).json({ data: data[0] });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to get chatroom" });
    }
}


export const insertDataToChatRoom = async (req, res) => {
    const { mainId, content } = req.body;
    try {
        const existingChatRoom = await chatroomsModel.findOne({ mainId });
        if (existingChatRoom) {
            // Nếu phòng chat đã tồn tại, thêm dữ liệu vào mảng content
            existingChatRoom.content.push(content);

            const result = await chatroomsModel.findOneAndUpdate(
                { mainId },
                { $set: { content: existingChatRoom.content } },
                { new: true }
            );

            if (result) {
                res.status(200).json({ message: "Added chat successfully" });
            } else {
                res.status(500).json({ error: "Failed to add chat" });
            }
        } else {
            // Nếu phòng chat không tồn tại, tạo mới và thêm dữ liệu vào mảng content
            const newChat = new chatroomsModel({
                mainId,
                content: [content]
            });

            const result = await newChat.save();

            if (result) {
                res.status(200).json({ message: "Added chat successfully" });
            } else {
                res.status(500).json({ error: "Failed to add chat" });
            }
        }
    } catch (error) {
        console.log('Failed to add chat ', error);
        res.status(500).json({ error: "Failed to add chat" });
    }
}

