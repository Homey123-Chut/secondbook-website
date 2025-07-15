import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
import sequelize from "./config/database.js";
import userRoutes from "./routes/userRoutes.js";
import fakeDataRoutes from "./routes/fakeDataRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

const allowedOrigins = ["http://localhost:5173", "http://localhost:5174"];
app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps, curl, etc.)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
app.use("/api/users", userRoutes);
app.use("/api/fake", fakeDataRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/cart", cartRoutes);

// Sync DB then start server
sequelize.sync({ alter: true }).then(() => {
  app.listen(3000, () => console.log("Server running on http://localhost:3000"));
}).catch(err => {
  console.error("Failed to sync database", err);
});
