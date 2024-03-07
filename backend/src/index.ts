import express from "express";
import cors from "cors";
import "dotenv/config";
import { connectDB } from "./config/db";
import { notFound } from "./middleware/middlewareError";
import userRoutes from "./routes/usersRoutes";
import authRoutes from "./routes/auth";
import myHotelsRoutes from "./routes/my-hotels";
import coockieParser from "cookie-parser";
import path from 'path'
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});
 

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

app.use(express.static(path.join(__dirname, '../../frontend/dist'))); // Serve the static files from the React app

app.use("/api/auth", authRoutes)
app.use('/api/users', userRoutes);
app.use('/api/my-hotels', myHotelsRoutes);

app.use(notFound);
console.log("Current working directory: " + process.cwd()),
  app.listen(PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
