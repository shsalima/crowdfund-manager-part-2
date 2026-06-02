import mongoose from "mongoose";
import Project from "./project.js";

const investmentSchema=new mongoose.Schema({
    investor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    project:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Project",
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
     percentage: {
        type: Number
    }
},
{
    timestamps:true


}
);
const Investment= mongoose.model("Investment",investmentSchema)
export default Investment