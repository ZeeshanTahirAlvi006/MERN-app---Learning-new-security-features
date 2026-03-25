import express from "express";
import { getProfileById, getProfileByRole, registerUser } from "./user_controller.js";
import { loginUser } from "../auth/auth_controller.js";
import { protect, restrictTo } from "../auth/auth_middleware.js";
const Router = express.Router(); // to create a router

Router.post("/register", registerUser);
Router.post("/login", loginUser);
Router.get("/profile", protect, getProfileById);
Router.get("/profile/:role", protect, restrictTo("admin"), getProfileByRole)
export default Router;