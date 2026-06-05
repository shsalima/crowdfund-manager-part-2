import { useSelector } from "react-redux";
import DetailsProject from "./DetailsProject";
import DetailsProjectInvestor from "./DetailsProjctInvestor";


export default function GlobalDetail() {
    const { role } = useSelector((state) => state.auth);

    if (role === "project owner") {
      return <DetailsProject />;
    } else if (role === "ivestor") {
      return <DetailsProjectInvestor />;
    }
}