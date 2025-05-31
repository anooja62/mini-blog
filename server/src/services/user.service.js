import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/user.model.js";

dotenv.config();

const generateToken = (user) => {
    return jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });
};

export const registerUser = async ({ email, password, username }) => {
    const existingUser = await User.findOne({ email });
    if (existingUser) throw new Error("Email is already registered");

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ email, password: hashedPassword, username });
    await user.save();

    const token = generateToken(user);
    return { token, user: { id: user._id, email: user.email, username: user.username } };
};

export const loginUser = async ({ email, password }) => {
    const user = await User.findOne({ email });
    if (!user) throw new Error("Invalid email or password");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid email or password");

    const token = generateToken(user);
    return { token, user: { id: user._id, email: user.email, username: user.username } };
};
