import express from "express";
import { getProfileById, getProfileByRole, registerUser } from "./user_controller.js";
import { loginUser } from "../auth/auth_controller.js";
import { protect, restrictTo } from "../auth/auth_middleware.js";
const userRouter = express.Router(); // to create a router

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/profile", protect, getProfileById);
userRouter.get("/profile/:role", protect, restrictTo("admin"), getProfileByRole)
export default userRouter;