import { Navigate, Outlet } from "react-router";
import { useSelector } from "react-redux";

export const RoleProtectedRoute = ({ allowedRoles }) => {
  const { role } = useSelector((state) => state.auth);

  const currentRole = role || localStorage.getItem("role");

  if (!allowedRoles.includes(currentRole)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};