import axios from "axios";
import { HOST } from "@/utils/constants";

export const apiFrontend = axios.create({
    baseURL:"http://localhost:5001",
    
})


