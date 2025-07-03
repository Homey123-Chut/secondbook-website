import express from "express";
import { User, Book, BookImage, CartItem, Transaction } from "./models/index.js";
import sequelize from "./config/database.js";


const app = express();
const port = 3000;

// (Your middleware and routes here)

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