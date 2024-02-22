import { vertifiedCodeModal } from '../models/vertifiedCode.js';
import { usersModel } from '../models/users.js';
import twilio from 'twilio';
const accountSid = 'AC8b17c934ed53716353d0a520f89eb530';
const authToken = 'b5eaa2aa27c4e81216bfa4c5c2bd92cc';
const client = twilio(accountSid, authToken);

export const sendphone = async (req, res) => {
    const { mainId } = req.body;

    const min = 1000000;
    const max = 9999999;
    const code = Math.floor(Math.random() * (max - min + 1)) + min;

    try {
        const existingUser = await usersModel.findOne({ emailAndPhone: mainId });
        if (existingUser) {
            return res.status(400).json({ error: "Email/Phone is already in use" });
        }
        client.messages
            .create({
                body: `Hello there, from datingApp. Your code is ${code}`,
                to: mainId, // Text your number
                from: '+12017293774', // From a valid Twilio number
            })
            .then((message) => {
                console.log(message)
                updateCode(mainId, code)
                return res.status(200).json({ code: code })
            })
            .catch((error) => {
                console.log(error)
                return res.status(400).json({ message: 'failed to otp phone' })
            })

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to send phone" });
    }
};

export const compareCode = async (req, res) => {
    const { code, mainId } = req.query;
    try {
        const result = await vertifiedCodeModal.findOne({ mainId });
        console.log(result)
        if (result && result.code == code) {
            res.status(200).json({ result: "ok" });
        } else {
            res.status(404).json({ result: "mismatched code" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to get code" });
    }
};

async function updateCode(mainId, code) {
    try {
        let result = await vertifiedCodeModal.findOne({ mainId });
        if (result) {
            // If record with mainId exists, update the code
            await vertifiedCodeModal.updateOne({ mainId }, { code: code });
        } else {
            // If record with mainId doesn't exist, create a new record
            result = await vertifiedCodeModal.create({ mainId, code });
        }
        return true
    } catch (error) {
        console.log(error);
        return false;
    }
};
