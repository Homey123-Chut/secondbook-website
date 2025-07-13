import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
import userRoutes from "./routes/userRoutes.js";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
app.use("/api/users", userRoutes);

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
