import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPortfolio } from "../../store/slices/portfolioSlice";
import { Briefcase, DollarSign, Percent, Calendar, PieChart } from "lucide-react";

export default function Portfolio() {
  const dispatch = useDispatch();
  const { items: portfolioItems, loading } = useSelector((state) => state.portfolio);

  useEffect(() => {
    dispatch(fetchPortfolio());
  }, []);

  const totalInvestedInPortfolio = Array.isArray(portfolioItems)
    ? portfolioItems.reduce((sum, item) => sum + item.montantInvesti, 0)
    : 0;
    
  const totalProjectsCount = portfolioItems?.length || 0;

  return (
    <div className="space-y-8 bg-[#0b0c0e] text-white p-6 min-h-screen">
      
    
      <div>
<h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
  <PieChart className="text-emerald-400" size={32} /> 
  My Investment Portfolio
</h1>        <p className="text-zinc-400 text-sm mt-1"></p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-[#111214] border border-zinc-800/80 p-5 rounded-2xl flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">Total Capital Deployed</span>
            <div className="text-2xl font-bold mt-1">${totalInvestedInPortfolio.toLocaleString()}</div>
          </div>
          <div className="bg-zinc-900 p-3 rounded-xl border border-zinc-800">
            <DollarSign className="text-emerald-400" size={20}/>
          </div>
        </div>
        
        <div className="bg-[#111214] border border-zinc-800/80 p-5 rounded-2xl flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">Backed Ventures</span>
            <div className="text-2xl font-bold mt-1">{totalProjectsCount} Projects</div>
          </div>
          <div className="bg-zinc-900 p-3 rounded-xl border border-zinc-800">
            <Briefcase className="text-zinc-400" size={20}/>
          </div>
        </div>
      </div>

      
      <div className="bg-[#111214] border border-zinc-800/80 rounded-2xl overflow-hidden">
        <div className="p-5 border-b border-zinc-900">
          <h2 className="text-base font-bold">Assets Allocation</h2>
        </div>

        {loading ? (
          <div className="p-8 text-center text-zinc-500 text-sm animate-pulse">Loading portfolio assets...</div>
        ) : portfolioItems && portfolioItems.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-zinc-900 text-zinc-400 text-xs uppercase font-semibold bg-[#141517]/30">
                  <th className="p-4">Project Name</th>
                  <th className="p-4">Status</th>
                  <th className="p-4"><DollarSign size={12} className="inline mr-0.5"/> Invested Amount</th>
                  <th className="p-4"><Percent size={12} className="inline mr-1"/> Share Owned</th>
                  <th className="p-4"><Calendar size={12} className="inline mr-1"/> Joining Date</th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-zinc-900/60">
                {portfolioItems.map((item) => (
                  <tr key={item.investmentId} className="hover:bg-zinc-900/40 transition">
                    <td className="p-4 font-semibold text-zinc-200">{item.title}</td>
                    <td className="p-4">
                      <span className={`text-[10px] px-2 py-0.5 rounded-md font-bold uppercase border ${
                        item.status === 'open' 
                          ? 'bg-emerald-950/40 text-emerald-400 border-emerald-900/30' 
                          : 'bg-zinc-950/40 text-zinc-400 border-zinc-900'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="p-4 font-bold text-zinc-100">${item.montantInvesti.toLocaleString()}</td>
                    <td className="p-4 text-zinc-300 font-medium">{item.pourcentageDetenu}%</td>
                    <td className="p-4 text-zinc-400 text-xs">
                      {new Date(item.dateParticipation).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric"
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center text-zinc-500 text-sm">
            You haven't invested in any project yet.
          </div>
        )}
      </div>
    </div>
  );
}