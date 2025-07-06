import express from "express";
import { User, Book, BookImage, CartItem, Transaction } from "./models/index.js";
import sequelize from "./config/database.js";
import userRoutes from "./routes/userRoutes.js";
// Import other route files as needed
// import bookRoutes from "./routes/bookRoutes.js";
// import cartRoutes from "./routes/cartRoutes.js";
// import transactionRoutes from "./routes/transactionRoutes.js";

const app = express();
const port = 3000;

// Middleware
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
// app.use("/api/books", bookRoutes);
// app.use("/api/cart", cartRoutes);
// app.use("/api/transactions", transactionRoutes);

app.get("/", (req, res) => {
  res.send(`<h2>Backend Server Running!</h2>
    <p>Go to <a href="/api/users">/api/users</a> for user endpoints.</p>`);
});

const startServer = async () => {
  try {
    await sequelize.sync(); // or .sync({ alter: true }) for dev, or .sync({ force: true }) to drop & recreate tables
    console.log("Database synced!");
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}/`);
    });
  } catch (error) {
    console.error("Error syncing database:", error);
  }
};

startServer();