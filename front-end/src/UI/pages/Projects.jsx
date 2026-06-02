import { Plus } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"

import { useEffect } from "react"
import { Link } from "react-router"
import { fetchProjects } from "../../store/slices/projectSlice"
import ProjectCard from "../components/projects/ProjectCard"


export default function Projects() {
    const dispatch= useDispatch()

    const {items:projects, loading, error}= useSelector((state)=> state.projects)
  


    useEffect(()=>{
        dispatch(fetchProjects())
    }, [dispatch])

    return (
        <div className="space-y-10 max-w-[1200px] mx-auto pt-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Projects</h1>
          <p className="text-sm text-zinc-400">Manage and monitor all your current and past campaigns.</p>
        </div>
        <Link 
          to="/create-project" 
          className="bg-white hover:bg-zinc-200 text-[#0b0c0e] font-semibold text-sm px-4 py-2.5 rounded-xl flex items-center gap-2 transition-all shadow-md cursor-pointer"
        >
          <Plus size={16} />
          <span>Create Project</span>
        </Link>
      </div>

      {loading && <div className="text-zinc-400 text-sm text-center py-10">Loading projects...</div>}
      {error && <div className="text-red-400 text-sm text-center py-10">{error}</div>}

      {!loading && !error && projects.length === 0 && (
        <div className="text-zinc-500 text-sm text-center py-12 border border-dashed border-zinc-800 rounded-2xl">
          No projects found. Create your first campaign!
        </div>
      )}

      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((proj) => (
            <ProjectCard key={proj._id} project={proj} />
          ))}
        </div>
      )}
    </div>
    )
}