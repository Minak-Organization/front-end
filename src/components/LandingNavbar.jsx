import React from "react";
import { Link } from "react-router-dom";

export default function LandingNavbar() {
  return (
    <nav style={navStyle}>
      <h3 style={logoStyle}> MyMusic</h3>
      <div style={linkGroup}>
        <Link to="/login" style={linkStyle}>Login</Link>
        <Link to="/register" style={linkStyle}>Register</Link>
      </div>
    </nav>
  );
}

const navStyle = {
  background: "#1db954",
  color: "#fff",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "1rem 2rem",
};

const logoStyle = {
  margin: 0,
  fontSize: "1.5rem",
};

const linkGroup = {
  display: "flex",
  gap: "1.2rem",
};

const linkStyle = {
  color: "#fff",
  textDecoration: "none",
  fontWeight: "bold",
};