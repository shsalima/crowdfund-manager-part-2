import express from "express";
import { checkBalance, verferToken } from "../middlewares/authMiddleware.middleware.js";
import { validateInvestment } from "../middlewares/investment.middleware.js";
import { checkProject } from "../middlewares/projectMiddleware.middleware.js";
import { checkMaxPercent } from "../middlewares/maxPercent.middleware.js";
import { investInProject } from "../controllers/investmentController.controller.js";
import { isInvestor } from "../middlewares/balance.middleware.js";
import { getInvestorPortfolio } from "../controllers/portfolioController.js";

const investRoute=express.Router()


investRoute.post("/:id/invest",verferToken,isInvestor,validateInvestment,checkProject,checkBalance,checkMaxPercent,investInProject)
investRoute.get("/portfolio", verferToken, getInvestorPortfolio);


export default investRoute