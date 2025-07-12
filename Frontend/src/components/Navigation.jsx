// ============================================
// 📁 src/components/Navigation.jsx
// 🔗 Navigation bar with React Router links
// This component provides navigation to all 
// the main routes: Login, Register, Dashboard, GPA Report.
// ============================================

import React from "react";
import { Link } from "react-router-dom"; // 🧭 React Router's Link for client-side navigation

const Navigation = () => {
  return (
    <nav style={{
      padding: "10px",            // 🧱 Add space inside nav bar
      background: "#f0f0f0"       // 🎨 Light gray background for visibility
    }}>
      {/* 🔑 Login page link */}
      <Link to="/login" style={{ marginRight: "10px" }}>
        Login
      </Link>

      {/* 📝 Registration page link */}
      <Link to="/register" style={{ marginRight: "10px" }}>
        Register
      </Link>

      {/* 🎓 Dashboard (protected) */}
      <Link to="/dashboard" style={{ marginRight: "10px" }}>
        Dashboard
      </Link>

      {/* 📊 GPA report (protected) */}
      <Link to="/gpa-report">
        GPA Report
      </Link>
    </nav>
  );
};

export default Navigation;
