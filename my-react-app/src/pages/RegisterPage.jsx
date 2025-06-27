import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    setError(""); 
    try {
      const res = await fetch(`${API_BASE_URL}/api/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData), 
      });

      const data = await res.json();
      if (res.ok) {
        alert("Registration successful! You can now log in.");
        navigate("/login");
      } else {
        setError(data.message || "Registration failed.");
      }
    } catch (err) {
      console.error("Registration error:", err);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="register-page" style={{ maxWidth: "400px", margin: "2rem auto" }}>
      <h2>Create Account</h2>

      <input
        type="text"
        name="username"
        placeholder="Username"
        className="form-input"
        value={formData.username}
        onChange={handleChange}
        style={{ marginBottom: "1rem", padding: "10px", width: "100%" }}
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        className="form-input"
        value={formData.password}
        onChange={handleChange}
        style={{ marginBottom: "1rem", padding: "10px", width: "100%" }}
      />

      <button
        className="primary-btn"
        onClick={handleRegister}
        style={{
          width: "100%",
          padding: "10px",
          backgroundColor: "#2d87f0",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Register
      </button>

      {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}
    </div>
  );
}