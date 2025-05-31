import express from "express";
import { getPosts, createPost, deletePost,updatePost } from "../controllers/posts.controller.js";


const router = express.Router();

router.get("/", getPosts);
router.post("/", createPost);
router.delete("/:id", deletePost);
router.put("/:id", updatePost);
export default router;
