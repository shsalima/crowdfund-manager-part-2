import express from "express"
import Investment from "../models/investment.js"
import mongoose from "mongoose"



export const checkMaxPercent =async (req,res,next)=>{
    const {amount}= req.body
    const project=req.project

    //  calcule total investement  de meme investor
    const total=await Investment.aggregate([
        {
            $match:{
                // investor:req.user.userId,
                // project:project.id
                investor: new mongoose.Types.ObjectId(req.user.user._id),
                project: new mongoose.Types.ObjectId(req.project._id)
            }
        },
      {  
        $group:{
            _id:null,
            total:{$sum: "$amount"}
        }
    }
    ])
    const investe=total[0]?.total ||0
    const percent=((investe+amount)/project.capital) *100
    if(percent > project.maxPercentPerInvestor){
        return res.status(400).json({message: " pourcentage maximal a dépassé"})
    }
    next()
}