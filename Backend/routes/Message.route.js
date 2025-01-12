import { Router } from "express";
import { verifyToken } from "../middlewares/Auth.middleware.js"
import { getMessage } from "../controllers/Messages.controller.js"

const messagesRoutes = Router();
 

messagesRoutes.post("/getMessages", verifyToken, getMessage)


 export default messagesRoutes;