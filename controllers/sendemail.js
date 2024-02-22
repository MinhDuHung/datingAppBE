import nodemailer from 'nodemailer';
import { vertifiedCodeModal } from '../models/vertifiedCode.js';
import { usersModel } from '../models/users.js';

export const sendemail = async (req, res) => {
    const { mainId } = req.body;
    try {
        const existingUser = await usersModel.findOne({ emailAndPhone: mainId });
        if (existingUser) {
            return res.status(400).json({ error: "Email/Phone is already in use" });
        }
        const code = await sendEmailService(mainId);
        if (code) {
            const update = await updateCode(mainId, code)
            res.status(200).json({ result: update, code });
        }
        else res.status(401).json({ result: "false" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to send email" });
    }
};

export const compareCode = async (req, res) => {
    const { code, mainId } = req.query;
    try {
        const result = await vertifiedCodeModal.findOne({ mainId });
        if (result && result.code == code) {
            res.status(200).json({ result: "ok" });
        } else {
            res.status(404).json({ result: "Mismatched code" });
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

const sendEmailService = async (mainId) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: "duhungminh222@gmail.com",
            pass: "fpjx kxve stnm gwcw",
        },
    });

    const min = 1000000;
    const max = 9999999;
    const code = Math.floor(Math.random() * (max - min + 1)) + min;

    await transporter.sendMail({
        from: 'From :" <duhungminh222@gmail.com>',
        to: mainId,
        subject: "Vertified email",
        text: "Hello world?",
        html: `<b>Your code is: <h2>${code}</h2></b>`,
    });

    return code;
};
