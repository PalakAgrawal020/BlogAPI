import express from "express";
import { createUser, getUser } from "../controllers/user.controller.js";

const router = express.Router();

router.post('/create-user', createUser)
router.post('/get-user', getUser)

export default router;