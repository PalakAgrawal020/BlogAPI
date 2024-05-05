import express from 'express'
import { createPost, deletePost, getAllPosts, getOnePost } from '../controllers/post.controller.js'

const router = express.Router();

router.post('/posts', createPost);
router.get('/all-posts', getAllPosts);
router.get('/get-post/:id', getOnePost);
router.delete('/delete-post/:id', deletePost);

export default router;