import Joi from "joi";
import { registerUser, loginUser } from "../services/user.service.js";

const registerSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    username: Joi.string().optional(),
});

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

export const register = async (req, res) => {
    const { error, value } = registerSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details.map(e => e.message) });

    try {
        const { token, user } = await registerUser(value);
        res.status(201).json({ message: "User registered", token, user });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export const login = async (req, res) => {
    const { error, value } = loginSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details.map(e => e.message) });

    try {
        const { token, user } = await loginUser(value);
        res.status(200).json({ message: "Login successful", token, user });
    } catch (err) {
        res.status(401).json({ error: err.message });
    }
};
