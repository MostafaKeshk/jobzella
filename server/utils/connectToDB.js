import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connectToDB = () => {
  mongoose
    .connect(process.env.DB_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Failed to connect to MongoDB", err));
};
