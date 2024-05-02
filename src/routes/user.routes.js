import express from "express";
import { registerUser, getUser, loginUser } from "../controllers/user.controller.js";

const router = express.Router();

router.post('/register-user', registerUser)
router.post('/login', loginUser)
router.post('/get-user', getUser)

export default router;