// ==============================================
// 🎓 StudentLogin.jsx
// A login page for students using JWT auth
// This component submits credentials, gets a token,
// stores it in localStorage, updates auth state,
// and redirects to the dashboard.
// ==============================================

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const StudentLogin = ({ setIsAuthenticated }) => {
  // 🧠 State to hold form input
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(""); // ⚠️ To display errors from server
  const navigate = useNavigate(); // 🔁 Used to redirect on success

  // 📦 Updates form state when inputs change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🚀 Handles form submission and login
  const handleLogin = async (e) => {
    e.preventDefault(); // ❌ Prevent page reload
    setError(""); // Clear previous error

    try {
      // 📡 POST request to /login
      const res = await fetch("http://localhost:8081/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json(); // 📥 Parse JSON response

      if (data.token) {
        // ✅ Save token and user info in localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        // 🔁 Set auth state in App.jsx (if available)
        if (setIsAuthenticated) setIsAuthenticated(true);

        // ✅ Navigate to student dashboard
        navigate("/dashboard", { replace: true });
      } else {
        // ⚠️ Show server error if login failed
        setError(data.message || "Login failed.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Server error. Try again.");
    }
  };

  return (
    <div style={{
      maxWidth: "960px",
      margin: "0 auto",
      padding: "20px"
    }}>
      <h2>🎓 Student Login</h2>

      {/* ⚠️ Show error message if exists */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleLogin}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        /><br />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        /><br />

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default StudentLogin;
