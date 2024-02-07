import express from "express";
const router = express.Router();
import { userRegister } from "../controllers/usersController";
import { check } from "express-validator";
 
router.post("/register", [
    check("firstName", "First Name is required").isString(),
    check("lastName", "Last Name is required").isString(),
    check("email", "Email is required").isEmail(),
    check("password", "Password is required ").isLength({ min: 8 }),
], userRegister);


export default router;
