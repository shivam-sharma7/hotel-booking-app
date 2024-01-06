import express from "express";
const router = express.Router();
import { userRegister } from "../controllers/usersController";
 

router.post("/register", userRegister);

export default router;
