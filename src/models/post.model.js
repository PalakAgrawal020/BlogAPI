import mongoose, {Schema} from "mongoose";
import { User } from "./user.model.js";

const postSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: User,
    },
    published: {
        type: Boolean,
    }
}, { timestamps: true });

export const Post = mongoose.model("Post", postSchema)
