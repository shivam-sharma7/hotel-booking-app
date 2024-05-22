import jwt from "jsonwebtoken";
import { User } from "../models/user.Model";
import { Request, Response } from "express";


export const getCurrentLoginUser = async (req: Request, res: Response) => {
   const userId = req.userId;

   try {
     const user = await User.findById(userId).select("-password"); // it will exclude password from the response
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      return res.status(200).json(user);
   } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    
   }
};

export const userRegister = async (req: Request, res: Response) => {
  try {
    let user = await User.findOne({
      email: req.body.email,
    });

    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    user = new User(req.body);
    await user.save();
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
    return res.status(200).send({ message: "User register successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};
