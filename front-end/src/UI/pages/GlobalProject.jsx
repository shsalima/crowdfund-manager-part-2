import { useSelector } from "react-redux";
import InvestorProjects from "./InvestorProjects";
import Projects from "./Projects";


export default function GlobalProject() {
     const { role } = useSelector((state) => state.auth);
 if (role === "project owner") {
      return <Projects/>;
    } else if (role === "ivestor") {
      return <InvestorProjects/>;
    }
}