import express from "express";
import cors from "cors";
import "dotenv/config";
import { connectDB } from "./config/db";
import { notFound } from "./middleware/middlewareError";
import userRoutes from "./routes/usersRoutes";
import authRoutes from "./routes/auth";
import coockieParser from "cookie-parser";
 

const PORT = process.env.PORT || 5000;
connectDB();

const app = express();
app.use(coockieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: process.env.CORS_ORIGIN, 
  credentials: true
}));

app.use("/api/auth", authRoutes)
app.use('/api/users', userRoutes);

app.use(notFound);
console.log("Current working directory: " + process.cwd()),
  app.listen(PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
