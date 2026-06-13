import { Route, RouterProvider, Routes, useLocation } from "react-router";
import MainLayout from "./UI/layouts/MainLayout";

// import AppHeader from "./UI/layouts/AppHeader";
// import Login from "./UI/pages/Login";
// import Register from "./UI/pages/Register";
// import Dashboard from "./UI/pages/Dashboard";
// import { useEffect } from "react";
// import { useNavigate } from "react-router";
// import Projects from "./UI/pages/Projects";
// import CreateProject from "./UI/pages/CreateProject";
// import ProjectDetails from "./UI/pages/DetailsProject";
// import DetailsProject from "./UI/pages/DetailsProject";
// import InvestorDashboard from "./UI/pages/InvestorDashboard";

// import Portfolio from "./UI/pages/Portfolio";
// import Wallet from "./UI/pages/Wallet";
// import { RoleProtectedRoute } from "./UI/components/auth/RoleProtectedRoute";

// import { useSelector } from "react-redux";
// import GlobalDashboard from "./UI/pages/GlobalDashboard";
import { router } from "./routes/router";

function App() {
  return (
    <>
      <RouterProvider router={router}>
        <MainLayout />
      </RouterProvider>
    </>
  );
}

export default App;
