import express from "express";
import { signupUser, loginUser, getUserProfile, updateUserProfile, deleteUser } from "../controllers/user.controller.js";

const router = express.Router();

// Register a new user
router.post("/signup", signupUser);

// Login
router.post("/login", loginUser);

// Get user profile
router.get("/:id", getUserProfile);

// Update user profile
router.put("/:id", updateUserProfile);

// Delete user
router.delete("/:id", deleteUser);

export default router;

