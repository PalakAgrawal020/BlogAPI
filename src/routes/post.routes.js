import express from 'express'
import { createPost, deletePost, getAllPosts, getOnePost } from '../controllers/post.controller.js'
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/posts', createPost);
router.get('/all-posts', getAllPosts);
router.get('/get-post/:id', getOnePost);
router.delete('/delete-post/:id', verifyJWT, deletePost);

export default router;