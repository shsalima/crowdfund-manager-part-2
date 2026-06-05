import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { MoveRight } from "lucide-react";
import { clearError, registerUser } from "../../../store/slices/authSlice";

export default function RegisterForm() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    role: "project owner",
  });
  const [agree, setAgree] = useState(false);
  const [localError, setLocalError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) navigate("/");
  }, [token, navigate, dispatch]);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLocalError("");

    const { name, email, password, role } = userData;
    dispatch(registerUser({ name, email, password, role }));
  };

  console.log(userData);

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {(error || localError) && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-xl text-xs text-center">
          {localError || error}
        </div>
      )}

      <div>
        <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">
          Full Name
        </label>
        <input
          type="text"
          name="name"
          value={userData.name}
          onChange={handleChange}
          required
          placeholder="John Doe"
          className="w-full bg-[#16171a] border border-zinc-800/80 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-700 transition-all"
        />
      </div>

      <div>
        <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">
          Email Address
        </label>
        <input
          type="email"
          name="email"
          value={userData.email}
          onChange={handleChange}
          required
          placeholder="john@example.com"
          className="w-full bg-[#16171a] border border-zinc-800/80 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-700 transition-all"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
            required
            placeholder="••••••••"
            className="w-full bg-[#16171a] border border-zinc-800/80 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-700 transition-all"
          />
        </div>

        <div>
          <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">
            I want to register as
          </label>
          <div className="relative">
            <select
              name="role"
              value={userData.role}
              onChange={handleChange}
              className="w-full bg-[#16171a] border border-zinc-800/80 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-zinc-700 transition-all cursor-pointer appearance-none"
            >
              <option value="ivestor" className="bg-[#16171a] text-white">
                Investor
              </option>
              <option value="project owner" className="bg-[#16171a] text-white">
               Project Owner
              </option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-zinc-500">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-white hover:bg-zinc-200 disabled:bg-zinc-500 text-[#0b0c0e] font-semibold text-sm py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all duration-200"
      >
        {loading ? "Creating Account..." : "Create Account"}
        {!loading && <MoveRight size={16} />}
      </button>
    </form>
  );
}
