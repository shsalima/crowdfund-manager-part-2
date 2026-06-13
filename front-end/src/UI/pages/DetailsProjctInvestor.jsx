import { useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { ArrowLeft, Clock, CheckCircle } from "lucide-react";
import { fetchProjects } from "../../store/slices/projectSlice";
import ProjectMainInfo from "../components/projects/ProjectMainInfo";
import ProjectInvestorsList from "../components/projects/ProjectInvestorsList";
import ParticipateSection from "../components/projects/ParticipateSection";

export default function DetailsProjectInvestor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { items: projects, loading } = useSelector((state) => state.projects);
  const project = projects.find((p) => p._id === id);

  useEffect(() => {
    if (projects.length === 0) {
      dispatch(fetchProjects());
    }
  }, [dispatch, projects.length]);

  if (loading) return <div className="text-zinc-400 text-sm text-center py-20">Loading project details...</div>;
  if (!project) return <div className="text-red-400 text-sm text-center py-20">Project not found!</div>;

  const isOpen = project.status === "open";

  return (
    <div className="max-w-[1400px] mx-auto pt-4 px-4 space-y-8">
      
      {/* Back Button */}
      <div className="flex justify-between items-center">
        <button 
          onClick={() => navigate("/projects")}
          className="text-xs text-zinc-500 hover:text-white flex items-center gap-1.5 transition-all cursor-pointer bg-transparent border-none"
        >
          <ArrowLeft size={14} />
          <span>Back to projects</span>
        </button>
      </div>

      {/* Project Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border flex items-center gap-1 uppercase tracking-wider ${
            isOpen 
              ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" 
              : "text-red-400 bg-red-500/10 border-red-500/20"
          }`}>
            {isOpen ? <Clock size={11} /> : <CheckCircle size={11} />}
            {project.status}
          </span>
          <span className="text-[11px] font-medium text-zinc-500">
            {new Date(project.createdAt).toLocaleDateString(undefined, {
              year: "numeric",
              month: "short",
              day: "numeric"
            })}
          </span>
        </div>
        
        <h1 className="text-4xl font-extrabold text-white tracking-tight capitalize">
          {project.title}
        </h1>
        <p className="text-base text-zinc-400 max-w-[800px] leading-relaxed">
          {project.description}
        </p>
      </div>

      {/* Main Content + Invest Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left: Project Info + Investors List (2 columns) */}
        <div className="lg:col-span-2 space-y-6">
          <ProjectMainInfo project={project} />
          <ProjectInvestorsList project={project} />
        </div>

        {/* Right: Participate Section (1 column, sticky) */}
        {isOpen && (
          <ParticipateSection project={project} />
        )}
      </div>
    </div>
  );
}