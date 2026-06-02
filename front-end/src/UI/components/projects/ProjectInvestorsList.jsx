import { Users } from "lucide-react";

export default function ProjectInvestorsList({ project }) {
  const investorsList = project && project.investors ? project.investors : [];
  
  const topThreeInvestors = investorsList.slice(0, 3);

  return (
    <div className="bg-[#111214] border border-zinc-800/50 rounded-2xl p-6 space-y-5 shadow-xl w-full lg:col-span-1 h-fit">
      
      <div className="flex items-center gap-2 text-zinc-400 pb-2 border-b border-zinc-800/60">
        <Users size={16} className="text-zinc-500" />
        <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-300">
          Top Investors
        </h3>
      </div>

      <div className="space-y-4">
        {topThreeInvestors.length > 0 ? (
          topThreeInvestors.map((investor) => (
            <div 
              key={investor._id} 
              className="flex justify-between items-center text-sm py-1 border-b border-zinc-900/40 last:border-none"
            >
              <span className="text-zinc-400 font-medium capitalize">
                {investor.name}
              </span>
              <span className="text-white font-bold tracking-tight">
                ${investor.amount?.toLocaleString()}
              </span>
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center py-8">
            <p className="text-xs text-zinc-600 font-medium text-center">
              No investors yet for this project.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}