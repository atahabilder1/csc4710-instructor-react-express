// ============================================
// 🎓 StudentDashboard.jsx
// This page displays the currently logged-in student's details.
// It fetches user info using the JWT token stored in localStorage
// and shows ID, name, email, birthday, and GPA.
// Protected route: Requires valid token to access.
// ============================================

import React, { useEffect, useState } from 'react';

function StudentDashboard() {
  // 🧠 Local state to hold the fetched student info
  const [student, setStudent] = useState(null);

  // 🛑 Error message state if token is missing or fetch fails
  const [error, setError] = useState("");

  // 🌀 useEffect runs once when the component is mounted
  useEffect(() => {
    // 🔐 Get the JWT token stored in browser after login
    const token = localStorage.getItem('token');

    // ⚠️ If no token is found, show an error and don't fetch
    if (!token) {
      setError("No token found. Please login.");
      return;
    }

    // 📡 Fetch student data from protected endpoint /me
    fetch('http://localhost:8081/me', {
      headers: {
        // 📩 Send token in the Authorization header (Bearer token)
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => {
        // 🚨 Handle unauthorized cases explicitly
        if (!res.ok) throw new Error("Unauthorized or invalid token");
        return res.json(); // ✅ Parse the response as JSON
      })
      .then(data => setStudent(data)) // 🧾 Save student data in state
      .catch(err => setError(err.message)); // ❌ Catch and store any error message
  }, []);

  return (
    <div style={{ maxWidth: "960px", margin: "0 auto", padding: "20px" }}>
      <h2>🎓 Student Dashboard</h2>

      {/* 🛑 Show error message in red if one exists */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* ✅ Show student details if data is available */}
      {student && (
        <div>
          <p><strong>ID:</strong> {student.id}</p>
          <p><strong>Name:</strong> {student.name}</p>
          <p><strong>Email:</strong> {student.email}</p>
          <p><strong>Birthday:</strong> {new Date(student.birthday).toLocaleDateString()}</p>
          <p><strong>GPA:</strong> {student.gpa}</p>
        </div>
      )}
    </div>
  );
}

export default StudentDashboard;
