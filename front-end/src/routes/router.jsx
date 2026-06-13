import { createBrowserRouter } from "react-router";
import Login from "../UI/pages/Login";
import Register from "../UI/pages/Register";
import NotFound from "../UI/components/auth/Not-found";
import GlobalDashboard from "../UI/pages/GlobalDashboard";
import Projects from "../UI/pages/Projects";
import DetailsProject from "../UI/pages/DetailsProject";
import MainLayout from "../UI/layouts/MainLayout";
import Portfolio from "../UI/pages/Portfolio";
import Wallet from "../UI/pages/Wallet";
import GlobalProject from "../UI/pages/GlobalProject";
import GlobalDetail from "../UI/pages/GlobalDetail";
import CreateProject from "../UI/pages/CreateProject";
import WalletPage from "../UI/pages/WalletPage";


export const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/register",
        element: <Register />,
    },
    {
        path: "*",
        element: <NotFound />,
    },
    {
        path: "/",
        element: (
            <MainLayout>
                <GlobalDashboard />
            </MainLayout>
        ),
    },
    {
        path: "/projects",
        element: (
            <MainLayout>
                <GlobalProject />
            </MainLayout>
        ),
    },
    {
        path: "/projects/:id",
        element: (
            <MainLayout >
                <GlobalDetail />
            </MainLayout>
        ),
    },
    {
        path: "/portfolio",
        element: (
            <MainLayout  allowedRole="ivestor">
                <Portfolio />
            </MainLayout>
        ),
    },
    {
        path: "/wallet",
        element: (
            <MainLayout  allowedRole="ivestor">
                <WalletPage />
            </MainLayout>
        ),
    },
    {
        path: "/create-project",
        element: (
            <MainLayout  allowedRole="project owner">
                <CreateProject />
            </MainLayout>
        ),
    },
]);
// allowedRole="project owner"