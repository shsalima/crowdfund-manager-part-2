import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { ArrowLeft, Rocket } from "lucide-react";
import { createProject } from "../../store/slices/projectSlice";

export default function CreateProject() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    capital: "", 
    currentAmount: "", 
    maxPercentPerInvestor: 50, 
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ 
      ...formData, 
      [name]: name === "maxPercentPerInvestor" ? Number(value) : value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

  const result = await dispatch(createProject({
  title: formData.title,
  description: formData.description,
  capital: Number(formData.capital),
  initialInvestment: Number(formData.currentAmount) || 0, 
  maxPercentPerInvestor: formData.maxPercentPerInvestor,
}));

    setLoading(false);

    if (createProject.fulfilled.match(result)) {
      navigate("/projects"); 
    } else {
      setError(result.payload || "Something went wrong while creating the project");
    }
  };

  return (
    <div className="max-w-[800px] mx-auto pt-4 px-4 space-y-6">
      
      <button 
        onClick={() => navigate(-1)} 
        className="text-xs text-zinc-500 hover:text-white flex items-center gap-1.5 transition-all cursor-pointer bg-transparent border-none"
      >
        <ArrowLeft size={14} />
        <span>Back</span>
      </button>

      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight mb-2">New Campaign</h1>
        <p className="text-sm text-zinc-400">Enter the details for your crowdfunding project.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-[#111214] border border-zinc-800/50 rounded-2xl p-8 space-y-6 shadow-xl">
        
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-xl text-xs text-center font-medium">
            {error}
          </div>
        )}

        <div>
          <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">
            Project Title
          </label>
          <input 
            type="text" 
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="e.g. Urban Reforestation" 
            className="w-full bg-[#16171a] border border-zinc-800/80 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-700 transition-all"
          />
        </div>

        <div>
          <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">
            Description
          </label>
          <textarea 
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={4}
            placeholder="Tell investors about your mission..." 
            className="w-full bg-[#16171a] border border-zinc-800/80 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-700 transition-all resize-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">
              Target Capital ($)
            </label>
            <input 
              type="number" 
              name="capital"
              value={formData.capital}
              onChange={handleChange}
              required
              placeholder="500000" 
             
              className="w-full bg-[#16171a] border border-zinc-800/80 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-700 transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">
              Initial Investment ($)
            </label>
            <input 
              type="number" 
              name="currentAmount"
              value={formData.currentAmount}
              onChange={handleChange}
              placeholder="50000" 
              max={formData.capital }
              className="w-full bg-[#16171a] border border-zinc-800/80 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-700 transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
          </div>
        </div>

        <div className="space-y-3 pt-2">
          <div className="flex justify-between items-center text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
            <span>Max % per Investor</span>
            <span className="text-white font-bold text-xs bg-[#16171a] px-2 py-0.5 border border-zinc-800/80 rounded-md">
              {formData.maxPercentPerInvestor}%
            </span>
          </div>
          <input 
            type="range" 
            name="maxPercentPerInvestor"
            min="1" 
            max="100"
            value={formData.maxPercentPerInvestor}
            onChange={handleChange}
            className="w-full accent-white bg-zinc-800 h-1 rounded-lg appearance-none cursor-pointer"
          />
        </div>

      
        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-white hover:bg-zinc-200 disabled:bg-zinc-600 disabled:text-zinc-400 disabled:cursor-not-allowed text-[#0b0c0e] font-bold text-sm py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer mt-4 shadow-md"
        >
          <Rocket size={16} />
          <span>{loading ? "Launching Campaign..." : "Launch Campaign"}</span>
        </button>

      </form>
    </div>
  );
}