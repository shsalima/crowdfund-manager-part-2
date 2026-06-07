import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import { fetchProjects } from "../../store/slices/projectSlice";
import ProjectCard from "../components/projects/ProjectCard";

export default function InvestorProjects() {
  const dispatch = useDispatch();
  const { items: projects, loading } = useSelector((state) => state.projects);

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="text-zinc-400 text-sm text-center py-20">
        Loading projects...
      </div>
    );
  }

  if (!projects || projects.length === 0) {
    return (
      <div className="text-zinc-400 text-sm text-center py-20">
        No projects available
      </div>
    );
  }

  return (
    <div className="max-w-[1200px] mx-auto pt-4 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-white mb-2">
          Investment Opportunities
        </h1>
        <p className="text-zinc-400">
          Browse and invest in projects that match your goals.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Link
            key={project._id}
            to={`/projects/${project._id}`}
            className="block"
          >
            <ProjectCard project={project} />
          </Link>
        ))}
      </div>
    </div>
  );
}
