import { Link } from "react-router";
import ProjectCard from "../projects/ProjectCard";

export default function RecentProjects({ projects }) {
  
  const recentItems = projects.slice(-3).reverse();

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-200">
          Recent Projects
        </h2>
        <Link 
          to="/projects" 
          className="text-xs text-zinc-500 hover:text-white transition-all font-medium"
        >
          View all projects ↗
        </Link>
      </div>

      {recentItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentItems.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      ) : (
        <div className="bg-[#111214] border border-zinc-800/40 border-dashed rounded-2xl p-12 text-center">
          <p className="text-xs text-zinc-500">No projects found. Create your first campaign!</p>
        </div>
      )}
    </div>
  );
}