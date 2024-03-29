import express, { Request, Response } from "express";
import { User } from "../models/user.Model";
import { check, validationResult } from "express-validator";
import bycrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { verifyToken } from "../middleware/auth";

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
        return res.status(400).json({ message: "This account does't exist" });
      }
      // compare the password with the hashed password in the database
      const isMatch = await bycrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "please enter right password"});
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
      res
        .status(200)
        .json({ userId: user.id, message: "User logged in successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
);
// this route is used to validate the token stored in the http cookie when the user is logged in.
router.get("/validate-token", verifyToken, (req: Request, res: Response) => {
  res.status(200).json({ userId: req.userId, message: "Token is valid" });
});

router.post("/logout", (req: Request, res: Response) => {
  res.cookie("auth_token", "", {
    expires: new Date(0),
  });
  res.send("User logged out successfully");
});

export default router;
