import express, { Request, Response } from "express";
import { User } from "../models/userModel";
import { check, validationResult } from "express-validator";
import bycrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post(
  "/login",
  [
    check("email", "Email is required").isEmail(),
    check("password", "Password is required ").isLength({ min: 8 }),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
      // compare the password with the hashed password in the database
      const isMatch = await bycrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET_KEY as string,
        {
          expiresIn: "1d",
        }
      );
      res.cookie("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // will return true in production
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
      });
        res.status(200).json({ userId: user.id, message: "User logged in successfully"});
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
);

export default router;
