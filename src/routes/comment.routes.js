import express from 'express'
import { createComment, deleteComment, getAllComments } from '../controllers/comment.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';


const router = express.Router();

router.post('/create-comment', verifyJWT, createComment);
router.get('/all-comments', getAllComments);
router.delete('/delete-comment/:id', verifyJWT, deleteComment)

export default router;