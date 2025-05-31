import Joi from "joi";
import { createNewPost, getUserPosts, deleteUserPost } from "../services/posts.service.js";

const postSchema = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required()
});

export const createPost = async (req, res) => {
    const { error, value } = postSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details.map(e => e.message) });

    try {
        const post = await createNewPost(req.user.id, value);
        res.status(201).json(post);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getPosts = async (req, res) => {
    try {
        const posts = await getUserPosts(req.user.id);
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const deletePost = async (req, res) => {
    try {
        const deleted = await deleteUserPost(req.user.id, req.params.id);
        res.status(200).json({ message: "Post deleted", deleted });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
