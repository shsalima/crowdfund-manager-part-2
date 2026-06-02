import express from "express"
import { getAllInvestors, getAllOwners, login, registerUser } from "../controllers/authController.controller.js"
import { checkAdminExists, checkEmail, isAdmin, loginValidation, registerValidation, verferToken } from "../middlewares/authMiddleware.middleware.js"


const router=express.Router()

router.post("/signUp",registerValidation,checkEmail,checkAdminExists,registerUser)
router.post("/login",loginValidation,login,verferToken)
router.get("/investors",verferToken,isAdmin,getAllInvestors)
router.get("/owners",verferToken,isAdmin,getAllOwners)



export default router;