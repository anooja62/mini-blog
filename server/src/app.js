import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/user.routes.js";
import postRoutes from "./routes/posts.routes.js";
import { authMiddleware } from "./middlewares/auth.middleware.js";

dotenv.config();
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json({ limit: "500mb" }));
app.use(express.urlencoded({ limit: "500mb", extended: true }));



// Routes
app.use("/api/users", userRoutes);
app.use("/api/posts", authMiddleware, postRoutes);


export default app;
app.get("/", (req, res) => {
    res.send("Welcome to the mini-blog API");
});

