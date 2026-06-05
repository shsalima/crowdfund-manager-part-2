import express from "express";
import { createBalance, getBalance } from "../controllers/balanceController.controller.js";
import { verferToken } from "../middlewares/authMiddleware.middleware.js";
import { CreateBL} from "../middlewares/balance.middleware.js";


const balanceRoute=express.Router()

balanceRoute.post("/createBalance",verferToken,CreateBL,createBalance)
balanceRoute.get("/",verferToken,getBalance)

export default balanceRoute