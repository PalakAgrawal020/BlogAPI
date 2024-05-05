import express from 'express'
import { createPost, getAllPosts, getOnePost } from '../controllers/post.controller.js'

const router = express.Router();

router.post('/posts', createPost);
router.get('/all-posts', getAllPosts);
router.get('/get-post', getOnePost);

export default router;