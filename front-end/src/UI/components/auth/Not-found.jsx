import { useNavigate } from "react-router";

export default function NotFound() {
    const navigate = useNavigate();
    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh" }}>
            <h1>Not Found</h1>
            <p>The page you are looking for does not exist.</p>
            <button onClick={() => navigate("/")}>Go Home</button>
        </div>
    )
}