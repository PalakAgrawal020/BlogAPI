import mongoose, {Schema} from "mongoose";
import { Post } from "./post.model";

const commentSchema = new Schema({
    content: {
        type: String,
        required: true 
    },
    author: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: Post,
    }
}, { timestamps: true });

export const Comment = mongoose.model("Comment", commentSchema)