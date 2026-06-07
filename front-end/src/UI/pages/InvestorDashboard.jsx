import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";

import DashboardStats from "../components/dashboard/DashboardStats";

import { fetchProjects } from "../../store/slices/projectSlice";
import { fetchUserBalance } from "../../store/slices/balanceSlice";

export default function InvestorDashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const userName = user?.name;
  const investorId = user?._id;

  const { amount: availableBalance } = useSelector((state) => state.balance);

  const { items: projects, loading } = useSelector((state) => state.projects);

  useEffect(() => {
    dispatch(fetchProjects());
    dispatch(fetchUserBalance());
  }, [dispatch]);

  // Debug
  useEffect(() => {
    console.log("Current User:", user);
    console.log("Current Investor ID:", investorId);
    console.log("Projects:", projects);
  }, [user, investorId, projects]);

  const openProjects = Array.isArray(projects)
    ? projects.filter((p) => p.status?.toLowerCase() === "open")
    : [];

  const totalOpenProjectsCount = openProjects.length;

  const fundedProjects = Array.isArray(projects)
    ? projects.filter((p) =>
        p.investors?.some((inv) => {
          const match =
            String(inv.investorId) === String(investorId);

          console.log(
            "Comparing:",
            String(inv.investorId),
            String(investorId),
            "=>",
            match
          );

          return match;
        })
      )
    : [];

  const fundedProjectsCount = fundedProjects.length;

  const totalInvested = fundedProjects.reduce((total, project) => {
    const amountInvestedByUser =
      project.investors?.reduce((sum, inv) => {
        return String(inv.investorId) === String(investorId)
          ? sum + Number(inv.amount || 0)
          : sum;
      }, 0) || 0;

    return total + amountInvestedByUser;
  }, 0);

  console.log("Funded Projects:", fundedProjects);
  console.log("Funded Projects Count:", fundedProjectsCount);
  console.log("Total Invested:", totalInvested);

  return (
    <div className="space-y-8 bg-[#0b0c0e] text-white p-2">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Welcome back, {userName}
          </h1>
          <p className="text-zinc-400 text-sm mt-1">
            Monitor your assets, investments, and open opportunities.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => navigate("/wallet")}
            className="bg-white text-black px-4 py-2.5 rounded-xl font-semibold text-sm hover:bg-zinc-200 transition"
          >
            Add Funds
          </button>

          <button
            onClick={() => navigate("/portfolio")}
            className="bg-[#111214] border border-zinc-800 text-white px-4 py-2.5 rounded-xl font-semibold text-sm hover:bg-zinc-900 transition"
          >
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
        {/* Your other sections */}
      </div>
    </div>
  );
}