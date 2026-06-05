export default function DashboardStats({ availableBalance, totalInvested, fundedProjectsCount, totalOpenProjectsCount }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="bg-[#111214] border border-zinc-800/80 p-5 rounded-2xl">
        <div className="flex justify-between items-start text-zinc-400">
          <span className="text-[11px] font-bold tracking-wider uppercase">Available Balance</span>
          <span className="bg-emerald-950/50 text-emerald-400 text-[10px] px-2 py-0.5 rounded-full font-medium">Ready to Invest</span>
        </div>
        <div className="text-2xl font-bold mt-4">${availableBalance}</div>
      </div>

      <div className="bg-[#111214] border border-zinc-800/80 p-5 rounded-2xl">
        <div className="flex justify-between items-start text-zinc-400">
          <span className="text-[11px] font-bold tracking-wider uppercase">Total Invested</span>
          <span className="bg-emerald-950/50 text-emerald-400 text-[10px] px-2 py-0.5 rounded-full font-medium">+15.2% Yield</span>
        </div>
        <div className="text-2xl font-bold mt-4">${totalInvested}</div>
      </div>

      <div className="bg-[#111214] border border-zinc-800/80 p-5 rounded-2xl">
        <span className="text-[11px] font-bold tracking-wider text-zinc-400 uppercase">Funded Projects</span>
        <div className="text-2xl font-bold mt-4">{fundedProjectsCount} {fundedProjectsCount === 1 ? 'Project' : 'Projects'}</div>
      </div>

      <div className="bg-[#111214] border border-zinc-800/80 p-5 rounded-2xl">
        <span className="text-[11px] font-bold tracking-wider text-zinc-400 uppercase">Total Platform Projects</span>
        <div className="text-2xl font-bold mt-4">{totalOpenProjectsCount} {totalOpenProjectsCount === 1 ? 'Active' : 'Active'}</div>
      </div>
    </div>
  );
}