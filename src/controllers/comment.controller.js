import { Comment } from "../models/comment.model.js";
import { Post } from "../models/post.model.js";

export const createComment = async (req, res) => {
    try {
        const { content, author, email, post } = req.body;

        const existingPost = await Post.findOne({title : post})
        if (!existingPost) { 
            res.status(500).json({error : 'post does not exist'})
        }

        const comment = await Comment.create({
            content, 
            author,
            email,
            post : existingPost._id
        })

        if (!comment) {
            res.status(500).json({error : 'comment not created'})
        }

        const createdComment = await Comment.findById(comment._id)

        if (!createdComment) {
            res.status(500).json({error : 'comment not retrieved'})
        }

        res.status(201).json({comment : createdComment})

    } catch (error) {
        console.log(error)
        res.status(500).json({error : 'something went wrong'})
    }
}

export const getAllComments = async (req, res) => {
    try {
        const comments = await Comment.find();
        return res.status(200).json(comments)
    } catch (error) {
        return res.status(400).json({error : "Error fetching all comments"})
    }
}

export const deleteComment = async (req, res) => {
    const { id } = req.params;
    const deletedComment = await Comment.findByIdAndDelete(id);

    if (!deletedComment) {
        res.status(400).json({ error: 'comment not found' });
    }

    res.status(200).json({message : "comment deleted successfully"})
}