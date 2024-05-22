import express from "express";
const router = express.Router();
import { userRegister, getCurrentLoginUser } from "../controllers/usersController";
import { verifyToken } from "../middleware/auth";

router.get('/me', verifyToken, getCurrentLoginUser)
 
router.post("/register", userRegister);


export default router;
