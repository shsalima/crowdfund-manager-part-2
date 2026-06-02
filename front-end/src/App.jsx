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


function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const isAuth = !!localStorage.getItem("token");

  useEffect(() => {
    if (!isAuth && location.pathname !== "login" && location.pathname !== "/register") {

      navigate("/login");
    }
    if(isAuth && (location.pathname === "login" || location.pathname === "register")){
      navigate("/dashboard");
    }
  }, [isAuth, location.pathname, navigate]);

  return (
    <>
      <MainLayout>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/projects" element={<Projects/>} />
          <Route path="/project/:id" element={<DetailsProject/>}/>
          <Route path="/create-project" element={<CreateProject/>} />
          <Route path="/" element={isAuth ? <Dashboard/> : <Login/>}/>
        </Routes>
      </MainLayout>
    </>
  );
}

export default App;
