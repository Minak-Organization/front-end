import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    navigate("/login");
  };

  return (
    <nav style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "1rem 2rem",
      backgroundColor: "#282c34",
      color: "#fff"
    }}>
      <h3 style={{ margin: 0 }}> MyMusicApp</h3>
      <div style={{ display: "flex", gap: "1.5rem" }}>
        <Link to="/dashboard" style={navLink}>Dashboard</Link>
        <Link to="/playlists" style={navLink}>Playlists</Link>
        <button onClick={handleLogout} style={logoutBtn}>Logout</button>
      </div>
    </nav>
  );
}

const navLink = {
  textDecoration: "none",
  color: "#fff",
  fontWeight: "500"
};

const logoutBtn = {
  backgroundColor: "#ff5555",
  border: "none",
  color: "#fff",
  padding: "6px 12px",
  borderRadius: "4px",
  cursor: "pointer"
};