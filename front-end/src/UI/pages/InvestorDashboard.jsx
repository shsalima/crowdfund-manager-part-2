import { useSelector } from "react-redux";
import { ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router";

export default function InvestorDashboard() {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const userName = user?.name || "Mehdi";

  return (
    <div className="space-y-8 bg-[#0b0c0e] text-white p-2">
      
      {/* Header Row */}
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

      {/* Grid Stats (Mock data placeholder for design) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-[#111214] border border-zinc-800/80 p-5 rounded-2xl">
          <div className="flex justify-between items-start text-zinc-400">
            <span className="text-[11px] font-bold tracking-wider uppercase">Available Balance</span>
            <span className="bg-emerald-950/50 text-emerald-400 text-[10px] px-2 py-0.5 rounded-full font-medium">Ready to Invest</span>
          </div>
          <div className="text-2xl font-bold mt-4">$200,000</div>
        </div>

        <div className="bg-[#111214] border border-zinc-800/80 p-5 rounded-2xl">
          <div className="flex justify-between items-start text-zinc-400">
            <span className="text-[11px] font-bold tracking-wider uppercase">Total Invested</span>
            <span className="bg-emerald-950/50 text-emerald-400 text-[10px] px-2 py-0.5 rounded-full font-medium">+15.2% Yield</span>
          </div>
          <div className="text-2xl font-bold mt-4">$50,000</div>
        </div>

        <div className="bg-[#111214] border border-zinc-800/80 p-5 rounded-2xl">
          <span className="text-[11px] font-bold tracking-wider text-zinc-400 uppercase">Funded Projects</span>
          <div className="text-2xl font-bold mt-4">1</div>
        </div>

        <div className="bg-[#111214] border border-zinc-800/80 p-5 rounded-2xl">
          <span className="text-[11px] font-bold tracking-wider text-zinc-400 uppercase">Total Platform Projects</span>
          <div className="text-2xl font-bold mt-4">3</div>
        </div>
      </div>

      {/* Bottom Layout sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold">🔥 Active Investment Opportunities</h2>
            <button onClick={() => navigate("/projects")} className="text-zinc-400 text-xs flex items-center gap-1">Explore all <ArrowUpRight size={14}/></button>
          </div>
          
          <div className="bg-[#111214] border border-zinc-800/80 p-5 rounded-2xl space-y-4">
            <span className="bg-emerald-950/50 text-emerald-400 text-[10px] px-2 py-0.5 rounded-md font-bold uppercase">Open</span>
            <h3 className="font-bold text-base">Solar Energy Initiative</h3>
            <p className="text-xs text-zinc-400">A project to install solar panels in urban residential areas...</p>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-bold">🕒 Recent Operations</h2>
          <div className="bg-[#111214] border border-zinc-800/80 p-5 rounded-2xl">
            <div className="flex justify-between text-sm">
              <span>Initial wallet funding</span>
              <span className="text-emerald-400 font-bold">+$250,000</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}