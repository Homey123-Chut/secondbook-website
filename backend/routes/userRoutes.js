import express from "express"
import { signupUser, loginUser, getUserProfile, updateUserProfile, deleteUser } from "../controllers/userController"

const router = express.Router()

