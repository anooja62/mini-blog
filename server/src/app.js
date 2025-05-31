import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";


dotenv.config();
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());


// Routes

export default app;
app.get("/", (req, res) => {
    res.send("Welcome to the API");
});

