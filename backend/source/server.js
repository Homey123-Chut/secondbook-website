import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
import sequelize from "./config/database.js";
import userRoutes from "./routes/userRoutes.js";
import fakeDataRoutes from "./routes/fakeDataRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";
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
app.use("/api/fake", fakeDataRoutes);
app.use("/api/books", bookRoutes);

// Sync DB then start server
sequelize.sync({ alter: true }).then(() => {
  app.listen(3000, () => console.log("Server running on http://localhost:3000"));
}).catch(err => {
  console.error("Failed to sync database", err);
});
