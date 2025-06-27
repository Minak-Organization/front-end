import React from "react";
import LandingNavbar from "./LandingNavbar";

export default function LandingPage() {
  return (
    <div style={pageStyle}>
      <LandingNavbar />
      <div style={contentStyle}>
        <h1 style={headlineStyle}>Welcome to Your Music App</h1>
        <p style={subtitleStyle}>
          Discover beats. Build playlists. Share your vibe.
        </p>
      </div>
    </div>
  );
}

const pageStyle = {
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  background: "linear-gradient(135deg, #1db954, #1ed760)",
};

const contentStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
};

const headlineStyle = {
  fontSize: "3rem",
  color: "#fff",
  marginBottom: "1rem",
};

const subtitleStyle = {
  fontSize: "1.2rem",
  color: "#f0f0f0",
};