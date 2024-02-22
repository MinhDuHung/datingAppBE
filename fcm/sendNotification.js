import { getMessaging } from "firebase-admin/messaging";

export const sendNotification = async (req, res) => {
    const { receivedToken, title, body } = req.body;
    const message = {
        notification: {
            title: title,
            body: body
        },
        token: receivedToken
    };

    getMessaging()
        .send(message)
        .then((response) => {
            res.status(200).json({
                message: "Successfully sent message",
                token: receivedToken,
            });
            console.log("Successfully sent message:", response);
        })
        .catch((error) => {
            res.status(400);
            res.send(error);
            console.log("Error sending message:", error);
        });

}