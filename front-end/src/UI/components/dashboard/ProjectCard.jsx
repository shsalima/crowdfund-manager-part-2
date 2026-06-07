import { ArrowRight } from "lucide-react";

export default function ProjectCard({ project, onNavigate }) {
  const progress =
    project.targetAmount > 0
      ? Math.min(
          Math.round((project.raisedAmount / project.targetAmount) * 100),
          100,
        )
      : 0;

  return (
    <div className="bg-[#111214] border border-zinc-800/80 p-5 rounded-2xl space-y-4 flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-center">
          <span className="bg-emerald-950/50 text-emerald-400 text-[10px] px-2 py-0.5 rounded-md font-bold uppercase tracking-wider">
            {project.status || "Open"}
          </span>
        </div>

        <h3 className="font-bold text-base mt-3">{project.title}</h3>
        <p className="text-xs text-zinc-400 mt-1 line-clamp-2">
          {project.description}
        </p>
      </div>

      <div className="space-y-2 mt-4">
        <div className="flex justify-between text-xs font-medium">
          <span className="text-zinc-500">Progress</span>
          <span className="text-zinc-300">{progress}%</span>
        </div>
        <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
          <div
            className="bg-white h-full"
            style={{
              width: `${progress}%`,
              transition: "width 3s ease-in-out",
            }}
          />
        </div>
      </div>

      <div className="flex justify-between items-center text-xs pt-2 border-t border-zinc-900">
        <div>
          <span className="text-[10px] text-zinc-500 block uppercase font-semibold">
            Invested
          </span>
          <span className="font-bold text-zinc-200">
            ${project.raisedAmount?.toLocaleString() || "0"}
          </span>
        </div>
        <div className="text-right">
          <span className="text-[10px] text-zinc-500 block uppercase font-semibold">
            Target
          </span>
          <span className="font-bold text-zinc-200">
            ${project.targetAmount?.toLocaleString() || "0"}
          </span>
        </div>
      </div>

      <button
        onClick={() => onNavigate(`/projects/${project._id || project.id}`)}
        className="w-full mt-2 bg-zinc-900 border border-zinc-800 text-zinc-300 py-2 rounded-xl text-xs font-semibold hover:bg-zinc-800 hover:text-white transition flex items-center justify-center gap-1"
      >
        View Details <ArrowRight size={12} />
      </button>
    </div>
  );
}
