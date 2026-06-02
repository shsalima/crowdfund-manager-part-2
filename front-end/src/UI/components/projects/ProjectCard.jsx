import { CheckCircle, Clock, MoveRight, Trash2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router";
import { deleteProject } from "../../../store/slices/projectSlice";


export default function ProjectCard({ project }) {

  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  
  const isOpen = project.status === "open" && project.currentAmount < project.capital;
  
  const displayStatus = isOpen ? "open" : "closed";

  const progress =
    project.capital > 0
      ? Math.min(
          Math.round(((project.currentAmount ) / project.capital) * 100),
          100,
        )
      : 0;


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
    <div className="bg-[#111214] border border-zinc-800/50 rounded-2xl p-6 flex flex-col justify-between transition-all hover:border-zinc-700/80">
      <div>
        <div className="flex items-center justify-between mb-4">
          <span
            className={`text-[10px] font-bold px-2 py-1 rounded-md border flex items-center gap-1.5 uppercase ${
              isOpen
                ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
                : "text-red-400 bg-red-500/10 border-red-500/20"
            }`}
          >
            {isOpen ? <Clock size={12} /> : <CheckCircle size={12} />}
            {displayStatus}
          </span>
          <button 
          onClick={handleDelete} className="text-zinc-500 hover:text-red-400 p-2 hover:bg-red-500/10 rounded-xl transition-all cursor-pointer">
            <Trash2 size={16} />
          </button>
        </div>

        <h3 className="text-base font-bold text-white mb-2 tracking-wide capitalize">
          {project.title}
        </h3>
        <p className="text-xs text-zinc-400 leading-relaxed mb-6 line-clamp-2">
          {project.description}
        </p>

        <div className="mb-6">
          <div className="flex justify-between text-xs font-medium mb-2">
            <span className="text-zinc-500">Progress</span>
            <span className="text-white font-semibold">{progress}%</span>
          </div>
          <div className="w-full bg-[#16171a] h-1.5 rounded-full overflow-hidden border border-zinc-800/40">
            <div
              className="bg-white h-full rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div>
        <div className="grid grid-cols-2 gap-4 border-t border-zinc-800/40 pt-4 mb-5">
          <div>
            <span className="block text-[9px] font-bold text-zinc-500 uppercase tracking-wider mb-1">
              Invested
            </span>
            <span className="text-sm font-bold text-white">
              ${project.
currentAmount}
            </span>
          </div>
          <div className="text-right">
            <span className="block text-[9px] font-bold text-zinc-500 uppercase tracking-wider mb-1">
              Target
            </span>
            <span className="text-sm font-bold text-zinc-400">
              ${project.capital}
            </span>
          </div>
        </div>

        <Link to={`/project/${project._id}`} className="w-full bg-[#16171a] hover:bg-zinc-800 text-white font-medium text-xs py-3 rounded-xl border border-zinc-800/80 flex items-center justify-center gap-2 transition-all cursor-pointer">

          <span>View Details</span>
          <MoveRight size={14} />
        </Link>
      </div>
    </div>
  );
}
