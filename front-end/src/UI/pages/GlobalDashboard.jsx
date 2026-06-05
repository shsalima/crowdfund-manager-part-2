import Dashboard from "./Dashboard";
import InvestorDashboard from "./InvestorDashboard";
import { useSelector } from "react-redux";



export default function GlobalDashboard() {
    const { role } = useSelector((state) => state.auth);
    

    if (role === "project owner") {
      return <Dashboard />;
    } else if (role === "ivestor") {
      return <InvestorDashboard />;
    } 
}