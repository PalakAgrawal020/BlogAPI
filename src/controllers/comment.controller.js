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
