import express from "express";
import Balance from "../models/balance.js";
// import res from "express/lib/response.js";

export const checkBalance = async (req, res, next) => {
    try {
    const balance=await Balance.findOne({user:req.user.userId})
    if(!balance || balance.amount <req.body.amount){
        return res.status(400).json({message:"ne peut pas invester ton capital inferieur cette montant"})
    }
    req.balance=balance
    next()

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


export const isInvestor=async (req,res,next)=>{
    if(req.user.user.role !=="ivestor"){
        return res.status(403).json({message:"acces seulement investor"})
    }
    next()
}


export const CreateBL =(req,res,next)=>{
    // req.user jaya verifyToken
    if(req.user.user.role !=="ivestor"){
        return res.status(403).json({message:"acces seulement investor pour  crée balance"})

    }
   next()

}