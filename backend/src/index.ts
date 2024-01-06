import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import { connectDB } from "./config/db";
import { notFound } from "./middleware/middlewareError";
import userRoutes from "./routes/usersRoutes";

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connectDB();

app.use('/api/users', userRoutes);

app.use(notFound);
console.log("Current working directory: " + process.cwd()),
  app.listen(PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
