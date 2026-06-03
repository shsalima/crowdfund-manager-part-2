import { useSelector } from "react-redux";
import { ArrowUpRight, Briefcase, Percent, Layers } from "lucide-react";

export default function Portfolio() {
  // 1. Nzido njbdo l-investments state mn Redux (Mni t9ad investmentSlice)
  // local mockup data daba ghir bach tban lik l-UI b7al figma 100%
  const mockPortfolio = [
    {
      id: 1,
      name: "Solar Energy initiative",
      campaignId: "CAMPAIGN ID 1",
      fundedCapital: 50000,
      dateOfEntry: "01/02/2024",
      equityFraction: "10%",
    },
  ];

  // Global calculations (placeholder)
  const totalAssetsCommitted = 50000;
  const activeCampaigns = 1;
  const avgEquityRetrieved = "10.00%";

  return (
    <div className="space-y-8 bg-[#0b0c0e] min-h-screen text-white p-2">
      
      {/* --- HEADER SECTION --- */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Investment Portfolio</h1>
        <p className="text-zinc-400 text-sm mt-1">
          Analyze performance, check equity allocations, and review asset holdings.
        </p>
      </div>

      {/* --- 1. STATS CARDS GRID (Kif f tswera dyal portfolio) --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Card 1: Total Assets Committed */}
        <div className="bg-[#111214] border border-zinc-800/80 p-5 rounded-2xl flex justify-between items-center">
          <div>
            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block">
              Total Assets Committed
            </span>
            <div className="text-2xl font-bold mt-2">
              ${totalAssetsCommitted.toLocaleString()}
            </div>
          </div>
          <div className="bg-zinc-900 p-2.5 rounded-xl border border-zinc-800">
            <Layers size={18} className="text-zinc-400" />
          </div>
        </div>

        {/* Card 2: Project Representation */}
        <div className="bg-[#111214] border border-zinc-800/80 p-5 rounded-2xl flex justify-between items-center">
          <div>
            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block">
              Project Representation
            </span>
            <div className="text-2xl font-bold mt-2">
              {activeCampaigns} Active Campaign{activeCampaigns > 1 ? "s" : ""}
            </div>
          </div>
          <div className="bg-zinc-900 p-2.5 rounded-xl border border-zinc-800">
            <Briefcase size={18} className="text-zinc-400" />
          </div>
        </div>

        {/* Card 3: Avg Equity Retrieved */}
        <div className="bg-[#111214] border border-zinc-800/80 p-5 rounded-2xl flex justify-between items-center">
          <div>
            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block">
              Avg. Equity Retrieved
            </span>
            <div className="text-2xl font-bold mt-2 text-emerald-400 font-mono">
              {avgEquityRetrieved} Share
            </div>
          </div>
          <div className="bg-emerald-950/30 p-2.5 rounded-xl border border-emerald-900/40">
            <Percent size={18} className="text-emerald-400" />
          </div>
        </div>

      </div>

      {/* --- 2. ACTIVE SHAREHOLDINGS LEDGER (TABLE) --- */}
      <div className="bg-[#111214] border border-zinc-800/80 rounded-2xl overflow-hidden">
        
        {/* Table Header Section */}
        <div className="p-5 border-b border-zinc-800/60 flex justify-between items-center bg-[#141517]">
          <div className="flex items-center gap-2">
            <span className="text-zinc-400 text-xs">📊</span>
            <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-300">
              Active Shareholdings Ledger
            </h2>
          </div>
          <span className="text-[10px] text-zinc-500 font-mono">Last updated real-time</span>
        </div>

        {/* Table Rendering */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-800/60 text-[10px] uppercase tracking-wider text-zinc-500 bg-[#111214]">
                <th className="py-4 px-6 font-semibold">Venture / Campaign Name</th>
                <th className="py-4 px-6 font-semibold">Funded Equity Capital</th>
                <th className="py-4 px-6 font-semibold">Date of Entry</th>
                <th className="py-4 px-6 font-semibold">Equity Fraction</th>
                <th className="py-4 px-6 font-semibold text-right">Interactive Summary</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/40 text-sm">
              {mockPortfolio.map((item) => (
                <tr key={item.id} className="hover:bg-[#141517]/50 transition-colors duration-150">
                  
                  {/* Name + ID */}
                  <td className="py-5 px-6">
                    <div className="font-bold text-white">{item.name}</div>
                    <div className="text-[10px] text-zinc-500 font-mono mt-0.5">{item.campaignId}</div>
                  </td>
                  
                  {/* Funded Capital */}
                  <td className="py-5 px-6 font-semibold text-white">
                    ${item.fundedCapital.toLocaleString()}
                  </td>
                  
                  {/* Date of entry */}
                  <td className="py-5 px-6 text-zinc-400 text-xs font-mono">
                    📅 {item.dateOfEntry}
                  </td>
                  
                  {/* Equity fraction % */}
                  <td className="py-5 px-6 font-bold text-emerald-400">
                    {item.equityFraction}
                  </td>
                  
                  {/* Action Button */}
                  <td className="py-5 px-6 text-right">
                    <button className="bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-zinc-300 text-xs px-3 py-1.5 rounded-lg transition font-medium">
                      Detail Review &gt;
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty state handle (ila makanoch investments) */}
        {mockPortfolio.length === 0 && (
          <div className="p-10 text-center text-zinc-500 text-sm">
            You haven't invested in any project yet.
          </div>
        )}

      </div>

    </div>
  );
}