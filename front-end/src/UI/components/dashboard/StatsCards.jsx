import { Wallet, Clock, Briefcase, CheckCircle } from "lucide-react";

export default function StatsCards({ projects }) {
  const totalRaised = projects.reduce((acc, p) => acc + (p.currentAmount ), 0);

  const activeProjects = projects.filter(p => p.status === "open" && p.currentAmount < p.capital).length;
const closedProjects = projects.filter(p => p.status === "closed" || p.currentAmount >= p.capital).length;
  const totalProjects = projects.length;



  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-[#111214] border border-zinc-800/50 rounded-2xl p-6 relative overflow-hidden">
        <div className="flex justify-between items-start mb-4">
          <div className="p-2.5 bg-zinc-800/30 border border-zinc-800/60 rounded-xl text-zinc-400">
            <Wallet size={18} />
          </div>
          
        </div>
        <span className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1">
          Total Capital Raised
        </span>
        <h3 className="text-2xl font-black text-white tracking-tight">
          ${totalRaised}
        </h3>
      </div>

      <div className="bg-[#111214] border border-zinc-800/50 rounded-2xl p-6">
        <div className="mb-4 text-zinc-400 p-2.5 bg-zinc-800/30 border border-zinc-800/60 rounded-xl w-fit">
          <Clock size={18} />
        </div>
        <span className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1">
          Active Projects
        </span>
        <h3 className="text-2xl font-black text-white tracking-tight">
          {activeProjects}
        </h3>
      </div>

     

      <div className="bg-[#111214] border border-zinc-800/50 rounded-2xl p-6">
        <div className="mb-4 text-zinc-400 p-2.5 bg-zinc-800/30 border border-zinc-800/60 rounded-xl w-fit">
          <CheckCircle size={18} />
        </div>
        <span className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1">
            Closed Projects
        </span>
        <h3 className="text-2xl font-black text-white tracking-tight">
          {closedProjects}
        </h3>
      </div>

       <div className="bg-[#111214] border border-zinc-800/50 rounded-2xl p-6">
        <div className="mb-4 text-zinc-400 p-2.5 bg-zinc-800/30 border border-zinc-800/60 rounded-xl w-fit">
          <Briefcase size={18} />
        </div>
        <span className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1">
          Total Projects
        </span>
        <h3 className="text-2xl font-black text-white tracking-tight">
          {totalProjects}
        </h3>
      </div>




    </div>
  );
}