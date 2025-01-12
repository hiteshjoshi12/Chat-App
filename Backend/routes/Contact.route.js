import {Router } from "express"
import {verifyToken} from '../middlewares/Auth.middleware.js'
import { getContactsForDmList, searchContacts } from "../controllers/Contact.controller.js";

const contactRoutes = Router();


contactRoutes.post("/search", verifyToken , searchContacts )
contactRoutes.get("/getContactsForDm", verifyToken,getContactsForDmList)

export default contactRoutes;