import Investment from "../models/investment.js";
import Project from "../models/project.js";



export const investInProject = async (req, res) => {

      // const { id } = req.params; //id project 
      // const { amount } = req.body;

      // const project=await Project.findById

    
      try{
            const {amount}= req.body;
            const project=req.project
            const balance=req.balance



            const percentage=(amount / project.capital )* 100
                
        if(percentage > project.maxPercentPerInvestor){
            return res.status(400).json({error : "vous ne pouvez pas dépasser 50 en investissement"})
        }

        if(amount>balance){
            return res.status(400).json({message:"ne peut pas invester avec ce montant ,cette montant sépérieur balance"})
        }
            const investment=await Investment.create({
                  investor:req.user.user._id,
                  project:project._id,
                  amount,
                  percentage

            })

            // update f balance 
            balance.amount -=amount
            await balance.save()


            // update f projet bnsba cuurentAmont
            project.currentAmount +=amount

            if(project.currentAmount == project.capital){
                  project.status="closed"
            }

            await project.save()
            res.status(201).json({
                  message:"Investment successful",
                  investment,
                  project
            })





      }catch (err) {
        res.status(500).json({ message: err.message });
    }

}