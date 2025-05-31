import Post from "../models/post.model.js";

export const createNewPost = async (userId, { title, content }) => {
    const post = new Post({ title, content, author: userId });
    await post.save();
    return post;
};

export const getUserPosts = async (userId) => {
    return await Post.find({ author: userId })
        .sort({ createdAt: -1 })
        .populate("author", "username");
};


export const updateUserPost = async (userId, postId, { title, content }) => {
    const post = await Post.findOne({ _id: postId, author: userId });
    if (!post) throw new Error("Post not found or unauthorized");

    post.title = title;
    post.content = content;
    await post.save();
    return post;
};



export const deleteUserPost = async (userId, postId) => {
    const post = await Post.findOne({ _id: postId, author: userId });
    if (!post) throw new Error("Post not found or unauthorized");

    await post.deleteOne();
    return post;
};
