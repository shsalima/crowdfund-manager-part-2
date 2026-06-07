import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { fetchUserBalance } from "../../../store/slices/balanceSlice";
import { fetchProjects } from "../../../store/slices/projectSlice";

export default function ParticipateSection({ project }) {
  const dispatch = useDispatch();
  const balance = useSelector((state) => state.balance.amount || 0);
  const [investAmount, setInvestAmount] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const minContribution = 50000;
  const maxShareLimit = project.capital * 0.2; // 20% max
  const remainingCapacity = project.capital - project.currentAmount;
  const userExistingShare = 50000; // Fetch from backend if you have this data

  const handleInvest = async () => {
    setError("");
    setSuccess("");

    const amount = Number(investAmount);
    
    if (!amount || amount <= 0) {
      setError("Enter a positive amount");
      return;
    }
    if (amount < minContribution) {
      setError(`Minimum contribution is $${minContribution.toLocaleString()}`);
      return;
    }
    if (amount > balance) {
      setError("Insufficient balance");
      return;
    }
    if (amount > remainingCapacity) {
      setError(`Only $${remainingCapacity.toLocaleString()} remaining for this project`);
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${import.meta.env.VITE_API_URL}/investment/${project._id}/invest`,
        { amount },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccess("Investment successful!");
      setInvestAmount("");
      dispatch(fetchUserBalance());
      dispatch(fetchProjects());
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Investment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#111214] border border-zinc-800/50 rounded-2xl p-6 flex flex-col gap-6 h-fit sticky top-20">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
          </div>
          <h2 className="text-lg font-bold text-white">Participate Now</h2>
        </div>
        <p className="text-xs text-zinc-400">
          Support this venture immediately. Ensure parameters match platform constraints below.
        </p>
      </div>

      {/* Wallet Balance Display */}
      <div className="bg-[#0f1012] rounded-xl p-4 border border-zinc-800/30">
        <div className="flex justify-between items-center">
          <span className="text-xs text-zinc-500">Wallet</span>
          <span className="text-sm font-semibold text-white">${balance.toLocaleString()}</span>
        </div>
      </div>

      {/* Amount Input */}
      <div>
        <label className="text-xs font-medium text-zinc-400 mb-2 block">Amount to Invest</label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white font-semibold">$</span>
          <input
            type="number"
            value={investAmount}
            onChange={(e) => setInvestAmount(e.target.value === "" ? "" : Number(e.target.value))}
            placeholder="50000"
            className="w-full bg-[#0f1012] border border-zinc-800 rounded-xl px-4 py-3 pl-8 text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-500/50 text-sm"
          />
        </div>
      </div>

      {/* Constraints Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-[#0f1012] rounded-xl p-3 border border-zinc-800/30">
          <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1">
            Min Contribution
          </p>
          <p className="text-sm font-semibold text-white">${minContribution.toLocaleString()}</p>
        </div>
        <div className="bg-[#0f1012] rounded-xl p-3 border border-zinc-800/30">
          <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1">
            Current Share Limit
          </p>
          <p className="text-sm font-semibold text-white">${maxShareLimit.toLocaleString()} max</p>
        </div>
      </div>

      {/* Your Existing Share */}
      <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-3">
        <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-wider mb-1">
          Your Existing Share
        </p>
        <p className="text-sm font-semibold text-emerald-400">${userExistingShare.toLocaleString()}</p>
      </div>

      {/* Error/Success Messages */}
      {error && (
        <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg p-3">
          {error}
        </p>
      )}
      {success && (
        <p className="text-sm text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3">
          {success}
        </p>
      )}

      {/* Submit Button */}
      <button
        onClick={handleInvest}
        disabled={loading || !investAmount}
        className="w-full bg-white text-black font-semibold text-sm py-3 rounded-xl hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        {loading ? "Processing..." : "Confirm & Transfer Funds"}
      </button>

      {/* Remaining Info */}
      <div className="text-center">
        <p className="text-xs text-zinc-500">
          ${remainingCapacity.toLocaleString()} still available for this project
        </p>
      </div>
    </div>
  );
}