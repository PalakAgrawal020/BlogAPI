import { Post } from '../models/post.model.js'

export const createPost = async (req, res) => {
    try {
        const { title, content, author } = req.body;
        const post = new Post({ title, content, author });
        await post.save()
        res.status(201).json(post)
    } catch (error) {
        res
            .status(500)
            .json({error : error});
    }
}