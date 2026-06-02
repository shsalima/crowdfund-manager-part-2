import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { ArrowLeft, Settings, Trash2, Clock, CheckCircle } from "lucide-react";
import {  deleteProject, fetchProjects } from "../../store/slices/projectSlice";
import ProjectMainInfo from "../components/projects/ProjectMainInfo";
import ProjectInvestorsList from "../components/projects/ProjectInvestorsList";


export default function DetailsProject() {
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



const handleDelete = async () => {
  if (window.confirm("Are you sure you want to permanently delete this project?")) {
    const result = await dispatch(deleteProject(project._id));
    
    if (deleteProject.fulfilled.match(result)) {
      navigate("/projects"); 
    } else {
      alert(result.payload || "Failed to delete the project");
    }
  }
};

  return (
    <div className="max-w-[1200px] mx-auto pt-4 px-4 space-y-8">
      
      <div className="flex justify-between items-center">
        <button 
          onClick={() => navigate("/projects")}
          className="text-xs text-zinc-500 hover:text-white flex items-center gap-1.5 transition-all cursor-pointer bg-transparent border-none"
        >
          <ArrowLeft size={14} />
          <span>Back to projects</span>
        </button>

        <div className="flex items-center gap-2">
          <button className="text-zinc-400 hover:text-white bg-[#111214] border border-zinc-800/80 p-2.5 rounded-xl transition-all cursor-pointer">
            <Settings size={15} />
          </button>
          <button 
            onClick={handleDelete}
            className="text-red-400 hover:bg-red-500/10 bg-[#111214] border border-red-500/20 p-2.5 rounded-xl transition-all cursor-pointer"
          >
            <Trash2 size={15} />
          </button>
        </div>
      </div>

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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        <ProjectMainInfo project={project} />
        <ProjectInvestorsList project={project} />
      </div>
    </div>
  );
}