import {
  LayoutDashboard,
  FolderKanban,
  PlusCircle,
  LogOut,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router";
import AppHeader from "./AppHeader";
import { useDispatch } from "react-redux";
import { logout } from "../../store/slices/authSlice";

export default function MainLayout({ children }) {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  

  const getLinkStyle = (path) => {
    const isActive = pathname === path;
    return (
      `w-full px-4 py-3 rounded-xl flex items-center gap-3 font-medium text-sm transition-all duration-200 ` +
      (isActive
        ? "bg-white text-[#0b0c0e]" 
        : "text-zinc-400 hover:bg-[#111214] hover:text-white") 
    );
  };


  const handleLogout = () => {
    dispatch(logout()); 
    navigate("/login"); 
  };



  const isAuthPage = pathname === "/login" || pathname === "/register";

  return (
    <div className="flex min-h-screen bg-[#0b0c0e] text-white font-sans">
      {isAuthPage == false && (
        <aside className="bg-[#0b0c0e] w-[260px] h-screen border-r border-zinc-800/60 flex flex-col justify-between shrink-0 sticky top-0">
          <div>
            <div className="flex items-center gap-3 p-6 mb-4">
              <div className="bg-[#111214] border border-zinc-800 w-9 h-9 rounded-xl flex items-center justify-center">
                <span className="text-sm font-bold text-white">$</span>
              </div>
              <h1 className="secondary-font text-lg font-bold tracking-wide text-white">
                CROWDFLOW
              </h1>
            </div>

            <div className="px-4 space-y-6">
              <div>
                <h2 className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold mb-3 px-3">
                  Overview
                </h2>

                <nav className="space-y-1">
                  <Link to="/dashboard" className={getLinkStyle("/dashboard")}>
                    <LayoutDashboard size={18} />
                    <span>Dashboard</span>
                  </Link>

                  <Link to="/projects" className={getLinkStyle("/projects")}>
                    <FolderKanban size={18} />
                    <span>Projects</span>
                  </Link>

                  <Link
                    to="/create-project"
                    className={getLinkStyle("/create-project")}
                  >
                    <PlusCircle size={18} />
                    <span>Create Project</span>
                  </Link>
                </nav>
              </div>
            </div>
          </div>

          <div className="p-4 border-t border-zinc-800/60">
            <Link

              to="/login"
              onClick={handleLogout}
              className="w-full px-4 py-3 rounded-xl flex items-center gap-3 font-medium text-sm text-zinc-400 hover:bg-[#111214] hover:text-white transition-all duration-200"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </Link>
          </div>
        </aside>
      )}
      <div className="flex-1 ">
        {isAuthPage == false && <AppHeader />}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
