import { storiesModel } from "../models/stories.js";
import { userfriendsModal } from "../models/userFriends.js";

export const getStories = async (req, res) => {
    const { userId } = req.query;
    try {
        // Bước 1: Lấy danh sách bạn bè của user
        const userFriends = await userfriendsModal.findOne({ userId });

        if (!userFriends) {
            return res.status(200).json([]); // Trả về mảng trống nếu không có bạn bè
        }

        let friendIds = userFriends.friendsId;

        // Đẩy userId của người dùng hiện tại lên đầu mảng
        friendIds.unshift(userId);

        // Bước 2: Lấy tất cả stories của các bạn bè
        let stories = await storiesModel.find({ userId: { $in: friendIds } });

        // Sắp xếp lại mảng để đảm bảo stories của userId luôn ở đầu
        stories.sort((a, b) => {
            if (a.userId === userId) return -1; // stories của userId đứng đầu
            if (b.userId === userId) return 1; // stories của userId đứng đầu
            return 0; // Không thay đổi vị trí
        });

        const seenIds = [];
        const resultArray = [];

        stories.forEach(story => {
            const { userId } = story;
            if (seenIds.includes(userId)) {
                resultArray[resultArray.length - 1].push(story);
            } else {
                seenIds.push(userId);
                resultArray.push([story]);
            }
        });

        res.status(200).json(resultArray);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to get recent stories" });
    }
};


export const postStories = async (req, res) => {
    const { userId, img, viewCount, music } = req.body;
    try {
        const newStory = new storiesModel({
            userId: userId,
            img: img,
            viewCount: viewCount,
            music
        })
        const result = await newStory.save()
        if (result) {
            res.status(200).json({ message: "posted successfully" })
        }

    } catch (error) {
        console.log('failed to post story ', error)
    }
}
export const getStoriesByUserIds = async (req, res) => {
    try {
        const { userIds } = req.body;

        // Sử dụng $in operator để tìm kiếm các bài viết chứa các userId trong mảng userIds
        const userStories = await storiesModel.find({ userId: { $in: userIds } });

        res.status(200).json(userStories);
    } catch (error) {
        console.log('failed to get user stories ', error);
        res.status(500).json({ error: "Failed to get user stories" });
    }
}

