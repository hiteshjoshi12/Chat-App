import { Router } from "express";
import { getUserInfo, login, logout, signup,updateProfile } from "../controllers/Auth.controller.js";
import { verifyToken } from "../middlewares/Auth.middleware.js";

const authRoutes = Router();

authRoutes.post("/signup",signup);
authRoutes.post("/login",login);
authRoutes.get("/userInfo",verifyToken,getUserInfo)
authRoutes.post("/updateProfile", verifyToken, updateProfile)

authRoutes.post("/logout",logout);

export default authRoutes;


