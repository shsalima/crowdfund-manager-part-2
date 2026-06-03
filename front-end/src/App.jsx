import { Route, Routes, useLocation } from "react-router";
import MainLayout from "./UI/layouts/MainLayout";

import AppHeader from "./UI/layouts/AppHeader";
import Login from "./UI/pages/Login";
import Register from "./UI/pages/Register";
import Dashboard from "./UI/pages/Dashboard";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import Projects from "./UI/pages/Projects";
import CreateProject from "./UI/pages/CreateProject";
import ProjectDetails from "./UI/pages/DetailsProject";
import DetailsProject from "./UI/pages/DetailsProject";
import InvestorDashboard from "./UI/pages/InvestorDashboard";

import Portfolio from "./UI/pages/Portfolio";
import Wallet from "./UI/pages/Wallet";
import { RoleProtectedRoute } from "./UI/components/auth/RoleProtectedRoute";

import { useSelector } from "react-redux";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const { token, role } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }

    if (
      (token && location.pathname == "/login") ||
      location.pathname == "/register"
    ) {
      navigate("/");
    }
  }, [role, location.pathname, navigate]);

  return (
    <>
      <MainLayout>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/projects" element={<Projects />} />
          <Route path="/project/:id" element={<DetailsProject />} />

          <Route
            path="/"
            element={role === "ivestor" ? <InvestorDashboard /> : <Dashboard />}
          />
          <Route
            element={<RoleProtectedRoute allowedRoles={["project owner"]} />}
          >
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/create-project" element={<CreateProject />} />
          </Route>
          <Route element={<RoleProtectedRoute allowedRoles={["ivestor"]} />}>
            <Route path="/investor-dashboard" element={<InvestorDashboard />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/wallet" element={<Wallet />} />
          </Route>
          {/* </Route> */}
        </Routes>
      </MainLayout>
    </>
  );
}

export default App;
