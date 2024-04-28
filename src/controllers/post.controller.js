import { Post } from '../models/post.model.js'
import { User } from '../models/user.model.js';

export const createPost = async (req, res) => {
    try {
        const { title, content, author } = req.body;

        const existingUser = await User.findOne({ username: author })
        if (!existingUser) {
            res.status(500).json({error : 'this user does not exist'})
        }

        const post = await Post.create({
            title,
            content,
            author : existingUser._id
        })

        if (!post) {
            res.status(500).json({error: 'something went wrong while creating the post'})
        }

        const createdPost = await Post.findById(post._id)

        if (!createdPost) {
            res.status(500).json({error : 'something went wrong while retriving the post'})
        }

        res.status(201).json({ post : createdPost })

    } catch (error) {
        res.status(500).json({error : error});
    }
}
