import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router";

import DashboardStats from "../components/dashboard/DashboardStats";
import ProjectCard from "../components/dashboard/ProjectCard"; 

import { fetchProjects } from "../../store/slices/projectSlice"; 
import { fetchUserBalance } from "../../store/slices/balanceSlice"; 

export default function InvestorDashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
 
  const userName = user?.name;
  const investorId = user?._id ;

const { amount, error: balanceError } = useSelector((state) => state.balance);
  const availableBalance = balanceError ? 0 : (amount || 0);
  
  const { items: projects, loading } = useSelector((state) => state.projects);
  console.log("Projects in dashboard:", projects);

  useEffect(() => {
    dispatch(fetchProjects());
    dispatch(fetchUserBalance()); 
  }, [dispatch]);


  // const availableBalance = currentBalance  


  const openProjects = Array.isArray(projects) 
    ? projects.filter(p => p.status?.toLowerCase() === "open") 
    : [];
  const totalOpenProjectsCount = openProjects.length;
  console.log("ch7al mn project open:", totalOpenProjectsCount);


  const fundedProjects = Array.isArray(projects)
    ? projects.filter(p => p.investors?.some(inv => {

     return inv.investorId === investorId;
    }))
    : [];
const fundedProjectsCount = fundedProjects.length;
  console.log("ch7al mn project kayn", fundedProjectsCount);

 const totalInvested = fundedProjects.reduce((total, p) => {
  const userInvestmentsInProject = p.investors?.reduce((sum, inv) => {
    return inv.investorId === investorId ? sum + (inv.amount || 0) : sum;
  }, 0) || 0;

  return total + userInvestmentsInProject;
}, 0);

console.log("Total clean money invested:", totalInvested);

  return (
    <div className="space-y-8 bg-[#0b0c0e] text-white p-2">
      
     
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome back, {userName}</h1>
          <p className="text-zinc-400 text-sm mt-1">Monitor your assets, investments, and open opportunities.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => navigate("/wallet")} className="bg-white text-black px-4 py-2.5 rounded-xl font-semibold text-sm hover:bg-zinc-200 transition">
            Add Funds
          </button>
          <button onClick={() => navigate("/portfolio")} className="bg-[#111214] border border-zinc-800 text-white px-4 py-2.5 rounded-xl font-semibold text-sm hover:bg-zinc-900 transition">
            My Portfolio
          </button>
        </div>
      </div>

      <DashboardStats 
       availableBalance={availableBalance}
        totalInvested={totalInvested}
        fundedProjectsCount={fundedProjectsCount}
        totalOpenProjectsCount={totalOpenProjectsCount}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
       
        {/* <div className="lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold"> Active Investment Opportunities</h2>
            <button onClick={() => navigate("/projects")} className="text-zinc-400 text-xs flex items-center gap-1 hover:text-white transition">
              Explore all <ArrowUpRight size={14}/>
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {loading ? (
              <p className="text-zinc-500 text-sm col-span-2">Loading open opportunities...</p>
            ) : openProjects.length > 0 ? (
              openProjects.slice(0, 2).map((project) => (
                <ProjectCard 
                  key={project._id || project.id} 
                  project={project} 
                  onNavigate={navigate}
                />
              ))
            ) : (
              <p className="text-zinc-500 text-sm col-span-2">No open opportunities at the moment.</p>
            )}
          </div> */}
        {/* </div> */}

      
        {/* <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold"> Recent Operations</h2>
            <span className="text-zinc-500 text-xs cursor-pointer hover:text-zinc-400">View history</span>
          </div>
          <div className="bg-[#111214] border border-zinc-800/80 p-5 rounded-2xl space-y-4">
            <div className="flex justify-between text-sm items-center">
              <div>
                <p className="font-medium text-zinc-200">Initial wallet funding</p>
                <span className="text-[10px] text-zinc-500">20/01/2024</span>
              </div>
              <span className="text-emerald-400 font-bold">+$250,000</span>
            </div>
            <div className="flex justify-between text-sm items-center border-t border-zinc-900/40 pt-3">
              <div>
                <p className="font-medium text-zinc-200">Investment in Solar Energy initiative</p>
                <span className="text-[10px] text-zinc-500">01/02/2024</span>
              </div>
              <span className="text-zinc-400 font-bold">-$50,000</span>
            </div>
          </div>
        </div> */}

      </div>
    </div>
  );
}