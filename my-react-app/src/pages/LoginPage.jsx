import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config";

export default function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log("Login response:", data); 

      if (res.ok) {
        localStorage.setItem("jwt", data.token); 
        navigate("/dashboard"); 
      } else {
        setError(data.message || "Login failed. Please check your credentials.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page" style={{ maxWidth: "400px", margin: "2rem auto" }}>
      <h2>Login</h2>

      <input
        type="text"
        name="username"
        placeholder="Username"
        className="form-input"
        value={formData.username}
        onChange={handleChange}
        disabled={loading}
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        className="form-input"
        value={formData.password}
        onChange={handleChange}
        disabled={loading}
      />

      <button
        className="primary-btn"
        onClick={handleLogin}
        disabled={loading || !formData.username || !formData.password}
      >
        {loading ? "Logging in..." : "Log In"}
      </button>

      {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}
    </div>
  );
}