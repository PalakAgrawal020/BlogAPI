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

export const getAllPosts = async (req, res) => {
    const allPosts = await Post.find();
    if (!allPosts) {
        res.status(400).json({ error: " error fetching all posts " });
    }
    res.status(200).json(allPosts);
}

export const getOnePost = async (req, res) => {
    const { id } = req.params;
    const getPost = await Post.findById(id);
    if (!getPost) {
        res.status(400).json({error : "Error fetching the post"})
    } else {
        res.status(200).json(getPost);
    }
}

export const deletePost = async (req, res) => {
    
}