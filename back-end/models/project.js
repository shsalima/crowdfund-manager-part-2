import mongoose from "mongoose"

const projectSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    capital:{
        type:Number,
        required:true
    },

    currentAmount: { 
        type: Number,
         default: 0
         }, 
    maxPercentPerInvestor: { 
        type: Number,
         default: 50 
        },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true

    },
    status:{
        type:String,
        enum:["open","closed"],
        default:"open"
    }
},
{
    timestamps:true
}
);
const Project =mongoose.model("Project",projectSchema)
export default Project