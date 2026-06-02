import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import RecentProjects from "../components/dashboard/RecentProjects";
import StatsCards from "../components/dashboard/StatsCards";
import { fetchProjects } from "../../store/slices/projectSlice";


export default function Dashboard() {
  const dispatch = useDispatch();
  
  const { items: projects, loading } = useSelector((state) => state.projects);

  useEffect(() => {
    if (projects.length === 0) {
      dispatch(fetchProjects());
    }
  }, [dispatch, projects.length]);

  if (loading) return <div className="text-zinc-400 text-sm text-center py-20">Loading Dashboard...</div>;

  return (
    <div className="max-w-[1200px] mx-auto pt-4 px-4 space-y-10">
      
      <div className="space-y-1">
        <h1 className="text-2xl font-black text-white tracking-tight">
          Welcome back, here's your dashboard.
        </h1>
        <p className="text-xs text-zinc-500 font-medium">
          Here's what's happening with your projects today.
        </p>
      </div>

      <StatsCards projects={projects} />

      <RecentProjects projects={projects} />

    </div>
  );
}