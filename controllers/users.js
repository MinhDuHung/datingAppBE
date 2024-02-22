import { usersModel } from "../models/users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
    const {
        firstName,
        lastName,
        dateOfBirth,
        isPremium,
        gender,
        job,
        about,
        emailAndPhone,
        password,
        location,
        images,
        interests
    } = req.body;


    try {
        // Tạo người dùng mới
        const newUser = new usersModel({
            firstName,
            lastName,
            dateOfBirth,
            isPremium,
            gender,
            job,
            about,
            emailAndPhone,
            password,
            location,
            images,
            interests,
            token: "nothing"
        });

        // Lưu người dùng mới vào CSDL
        const result = await newUser.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.log("Failed to register user", error);
        res.status(500).json({ error: "Failed to register user" });
    }
};

export const loginUser = async (req, res) => {
    const { emailAndPhone, password } = req.query;

    try {
        // Kiểm tra xem email/phone có tồn tại không
        let user = await usersModel.findOne({ emailAndPhone });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // So sánh mật khẩu
        const isPasswordValid = user.password == password
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid password" });
        }

        // Tạo token
        const token = jwt.sign({ userId: user._id }, "duhungminh", { expiresIn: "100h" });

        // Cập nhật token trong CSDL
        await usersModel.findByIdAndUpdate(user._id, { token });
        user = await usersModel.findOne({ emailAndPhone });
        res.status(200).json({ message: "Login successful", user });
    } catch (error) {
        console.log("Failed to login", error);
        res.status(500).json({ error: "Failed to login" });
    }
};

export const findUserById = async (req, res) => {
    const { _id } = req.query;

    try {
        // Kiểm tra xem email/phone có tồn tại không
        const user = await usersModel.findOne({ _id });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json({ message: "Finduser by id successfully", user });
    } catch (error) {
        console.log("Failed to Finduser by id", error);
        res.status(500).json({ error: "Failed to Finduser by id" });
    }
};

export const updateUser = async (req, res) => {
    const { token, firstName,
        lastName,
        dateOfBirth,
        job,
        about,
        images, } = req.body;

    try {
        // Kiểm tra xem email/phone có tồn tại không
        let user = await usersModel.findOne({ token });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Cập nhật data trong CSDL
        await usersModel.findByIdAndUpdate(user._id, {
            firstName,
            lastName,
            dateOfBirth,
            job,
            about,
            images,
        });
        user = await usersModel.findOne({ token });
        res.status(200).json({ message: "Updated successful", user });
    } catch (error) {
        console.log("Failed to Updat", error);
        res.status(500).json({ error: "Failed to Update" });
    }
};

export const updateLocation = async (req, res) => {
    const { _id, location } = req.body;
    try {
        // Kiểm tra xem email/phone có tồn tại không
        let user = await usersModel.findOne({ _id });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Cập nhật data trong CSDL
        await usersModel.findByIdAndUpdate(_id, {
            location
        });
        res.status(200).json({ message: "Updated successful", user });
    } catch (error) {
        console.log("Failed to Update location", error);
        res.status(500).json({ error: "Failed to Update" });
    }
};


export const logoutUser = async (req, res) => {
    const { token } = req.body;

    try {
        // Kiểm tra xem email/phone có tồn tại không
        const user = await usersModel.findOne({ token });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Cập nhật token trong CSDL
        await usersModel.findByIdAndUpdate(user._id, { token: "" });
        res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        console.log("Failed to Logout", error);
        res.status(500).json({ error: "Failed to Logout" });
    }
};

export const authPassword = async (req, res) => {
    const { token, password } = req.query;

    try {
        // Kiểm tra xem email/phone có tồn tại không
        const user = await usersModel.findOne({ token });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // So sánh mật khẩu
        const isPasswordValid = user.password == password
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid password" });
        }

        res.status(200).json({ message: "Corrected password" });
    } catch (error) {
        console.log("Failed to authpassword", error);
        res.status(500).json({ error: "Failed to authpassword" });
    }
};

export const authToken = async (req, res) => {
    const { token } = req.query;

    try {
        // Kiểm tra xem email/phone có tồn tại không
        const user = await usersModel.findOne({ token });
        if (!user) {
            return res.status(404).json({ error: "token not found" });
        }
        res.status(200).json({ message: "Corrected token" });
    } catch (error) {
        console.log("Failed to authtoken", error);
        res.status(500).json({ error: "Failed to authtoken" });
    }
};

export const compareToken = async (req, res) => {
    const { token } = req.query;

    try {
        // Kiểm tra xem email/phone có tồn tại không
        const user = await usersModel.findOne({ token });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json({ message: "Login successful", user });
    } catch (error) {
        console.log("Failed to login", error);
        res.status(500).json({ error: "Failed to login" });
    }
};

export const findUserByPagination = async (req, res) => {
    const { cursor, pageSize = 3, interests, gender } = req.query;

    try {
        const queryConditions = {
            interests: { $in: interests },
        };

        if (gender === 'Man') {
            queryConditions.gender = 'Woman';
        } else if (gender === 'Woman') {
            queryConditions.gender = 'Man';
        }

        let query = {};

        // Nếu có giá trị cursor, thêm điều kiện để xác định cursor
        if (cursor) {
            query = {
                ...queryConditions,
                $and: [
                    { createdAt: { $not: { $lt: cursor } } },
                    { createdAt: { $ne: cursor } }
                ]
            };
        } else {
            query = queryConditions;
        }
        const matchingUsers = await usersModel
            .find(query)
            .limit(parseInt(pageSize));
        res.status(200).json({ matchingUsers });
    } catch (error) {
        console.log("Failed to find users", error);
        res.status(500).json({ error: "Failed to find users" });
    }
};


