// ==============================================
// 📝 StudentRegisterPage.jsx
// This page handles student registration
// It collects name, email, password, birthday, and GPA,
// submits to the backend, and redirects to login on success.
// ==============================================

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function StudentRegisterPage() {
  // 🧠 State to manage form inputs
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    birthday: '',
    gpa: ''
  });

  const navigate = useNavigate(); // 🔁 Navigation hook

  // 🔄 Update form state on input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🚀 Submit form data to backend
  const handleRegister = (e) => {
    e.preventDefault(); // ❌ Prevent default form reload

    // 📡 Send POST request to backend
    fetch('http://localhost:8081/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
      .then(res => res.json())
      .then(data => {
        alert(data.message); // ✅ Show feedback
        if (data.studentId) navigate('/login'); // 🔁 Redirect to login on success
      });
  };

  return (
    <div style={{
      maxWidth: "960px",
      margin: "0 auto",
      padding: "20px"
    }}>
      <h2>📝 Register Student</h2>

      <form onSubmit={handleRegister}>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Full Name"
          required
        /><br />

        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          required
        /><br />

        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          required
        /><br />

        <input
          name="birthday"
          type="date"
          value={form.birthday}
          onChange={handleChange}
          required
        /><br />

        <input
          name="gpa"
          type="number"
          step="0.01"
          value={form.gpa}
          onChange={handleChange}
          placeholder="GPA"
          required
        /><br />

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default StudentRegisterPage;
