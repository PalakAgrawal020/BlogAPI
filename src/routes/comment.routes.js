import express from 'express'
import { createComment, deleteComment, getAllComments } from '../controllers/comment.controller.js';


const router = express.Router();

router.post('/create-comment', createComment);
router.get('/all-comments', getAllComments);
router.delete('/delete-comment/:id', deleteComment)

export default router;