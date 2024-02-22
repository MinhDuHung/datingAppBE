import { userfriendsModal } from "../models/userFriends.js";
import { chatroomsModel } from "../models/chatRooms.js";
export const getAllFriends = async (req, res) => {
    const { userId } = req.query;
    try {
        const friends = await userfriendsModal.find({ userId });
        if (friends)
            res.status(200).json(friends);
        else res.status(404).json('NO');
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to get friends" });
    }
}

function concatenateAndSort(str1, str2) {
    return [str1, str2].sort((a, b) => a.localeCompare(b)).join('');
}

export const insertNewFriend = async (req, res) => {
    const { userId, friendId } = req.body;
    try {
        let user = await userfriendsModal.findOne({ userId });
        let friend = await userfriendsModal.findOne({ userId: friendId });

        if (!user) {
            // If the user doesn't exist, create a new user record
            user = new userfriendsModal({ userId, friendsId: [friendId] });
            await user.save();
        } else {
            // If the user exists, add the new friend to the friends array
            user.friendsId.push(friendId);
            await user.save();
        }

        if (!friend) {
            // If the friend doesn't exist, create a new friend record
            friend = new userfriendsModal({ userId: friendId, friendsId: [userId] });
            await friend.save();
        } else {
            // If the friend exists, add the user to the friends array
            friend.friendsId.push(userId);
            await friend.save();
        }
        const id = concatenateAndSort(userId, friendId)
        const createChatRoom = new chatroomsModel({ mainId: id, content: [] })
        if (createChatRoom){
            await createChatRoom.save()
            res.status(200).json("inserted friend")
        }
        else console.error('Failed to create chat room')
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to add new friend" });
    }
};
