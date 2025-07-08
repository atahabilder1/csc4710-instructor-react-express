// ================================
// 📦 Imports and React Setup
// ================================
import React, { useEffect, useState } from 'react';

function App() {

  // ================================
  // 🔐 Authentication State Setup
  // ================================
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'register'
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', birthday: '', gpa: ''
  });
  const [loggedInUser, setLoggedInUser] = useState(null); // Stores user data after login

  // 🔁 Handles login/register input changes
  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 📝 Handles registration form submission
  const handleRegister = (e) => {
    e.preventDefault();
    fetch('http://localhost:8081/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
      .then(res => res.json())
      .then(data => {
        alert(data.message);
        if (data.studentId) {
          setAuthMode('login'); // Redirect to login view
          setFormData({ name: '', email: '', password: '', birthday: '', gpa: '' });
        }
      });
  };

  // 🔑 Handles login form submission
  const handleLogin = (e) => {
    e.preventDefault();
    fetch('http://localhost:8081/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: formData.email, password: formData.password })
    })
      .then(res => res.json())
      .then(data => {
        if (data.user) {
          setLoggedInUser(data.user); // Save user data in state
          setFormData({ name: '', email: '', password: '', birthday: '', gpa: '' });
        } else {
          alert(data.message);
        }
      });
  };

  // ================================
  // 📋 Student CRUD State + Setup
  // ================================
  const [data, setData] = useState([]); // Holds student list
  const [form, setForm] = useState({ name: '', birthday: '', gpa: '' });
  const [editData, setEditData] = useState(null); // Selected student for editing

  // 📦 Fetch student list on page load
  useEffect(() => {
    fetch('http://localhost:8081/listall')
      .then(res => res.json())
      .then(data => setData(data))
      .catch(err => console.log(err));
  }, []);

  // 🔁 Handles student input form changes
  const handleStudentChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🟢 Add a new student to database
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:8081/student', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
      .then(res => res.json())
      .then(result => {
        setForm({ name: '', birthday: '', gpa: '' }); // Clear form
        return fetch('http://localhost:8081/listall')
          .then(res => res.json())
          .then(data => setData(data));
      })
      .catch(err => console.log(err));
  };

  // ✏️ Fill edit form with selected student
  const handleEditClick = (student) => {
    setEditData(student);
  };

  // 🟡 Update student details
  const handleUpdate = (e) => {
    e.preventDefault();
    fetch(`http://localhost:8081/student/${editData.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editData),
    })
      .then(res => res.json())
      .then(() => {
        setEditData(null);
        fetch('http://localhost:8081/listall')
          .then(res => res.json())
          .then(data => setData(data));
      })
      .catch(err => console.log(err));
  };

  // 🔴 Delete a student
  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this student?")) return;
    fetch(`http://localhost:8081/student/${id}`, {
      method: 'DELETE',
    })
      .then(res => res.json())
      .then(() => {
        fetch('http://localhost:8081/listall')
          .then(res => res.json())
          .then(data => setData(data));
      })
      .catch(err => console.log(err));
  };

  // ================================
  // 🎨 UI Rendering
  // ================================
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      {loggedInUser ? (
        // ✅ After login → Show dashboard
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h2>🎉 Welcome, {loggedInUser.name}</h2>
          <p>Email: {loggedInUser.email}</p>
          <p>Birthday: {loggedInUser.birthday}</p>
          <p>GPA: {loggedInUser.gpa}</p>
          <button onClick={() => setLoggedInUser(null)}>Logout</button>

          {/* ➕ Add Student Form */}
          <h2>Insert New Student</h2>
          <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
            <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleStudentChange} required />
            <input type="date" name="birthday" value={form.birthday} onChange={handleStudentChange} required />
            <input type="number" step="0.01" name="gpa" placeholder="GPA" value={form.gpa} onChange={handleStudentChange} required />
            <button type="submit">Add Student</button>
          </form>

          {/* 📋 Student Table */}
          <h2>Student Table</h2>
          <table style={{ borderCollapse: 'collapse', width: '100%', maxWidth: '600px', textAlign: 'center' }}>
            <thead>
              <tr style={{ backgroundColor: '#009879', color: '#fff' }}>
                <th>id</th><th>name</th><th>birthday</th><th>gpa</th><th>Edit</th><th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {data.map((d, i) => (
                <tr key={i} style={{ backgroundColor: i % 2 === 0 ? '#f3f3f3' : '#ffffff' }}>
                  <td>{d.id}</td>
                  <td>{d.name}</td>
                  <td>{new Date(d.birthday).toLocaleDateString()}</td>
                  <td>{d.gpa}</td>
                  <td><button onClick={() => handleEditClick(d)}>Edit</button></td>
                  <td><button onClick={() => handleDelete(d.id)}>Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* ✏️ Edit Form */}
          {editData && (
            <form onSubmit={handleUpdate} style={{ marginTop: '20px' }}>
              <input type="text" value={editData.name} onChange={(e) => setEditData({ ...editData, name: e.target.value })} />
              <input type="date" value={editData.birthday.split("T")[0]} onChange={(e) => setEditData({ ...editData, birthday: e.target.value })} />
              <input type="number" step="0.01" value={editData.gpa} onChange={(e) => setEditData({ ...editData, gpa: e.target.value })} />
              <button type="submit">Update</button>
            </form>
          )}
        </div>
      ) : (
        // 🔐 Login/Register view
        <div style={{ textAlign: 'center' }}>
          {authMode === 'login' ? (
            <>
              <h2 style={{ fontSize: '28px', color: '#2c3e50' }}>📚 BookNest Admin Login</h2>
              <p style={{ maxWidth: '500px', margin: '0 auto', marginBottom: '20px', color: '#555' }}>
                Welcome to the BookNest Admin Panel. Please log in using your registered email and password.
                After logging in, you'll be able to view, add, update, and delete student records securely.
              </p>
              <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                <input name="email" placeholder="Email" value={formData.email} onChange={handleFormChange} required style={{ padding: '8px', width: '250px' }} />
                <input name="password" type="password" placeholder="Password" value={formData.password} onChange={handleFormChange} required style={{ padding: '8px', width: '250px' }} />
                <button type="submit" style={{ padding: '8px 16px', backgroundColor: '#3498db', color: 'white', border: 'none', borderRadius: '4px' }}>Login</button>
              </form>
              <button onClick={() => setAuthMode('register')} style={{ marginTop: '10px', color: '#2980b9' }}>Register instead</button>
              <div style={{ marginTop: '30px', fontSize: '14px', color: '#666', maxWidth: '500px', margin: 'auto' }}>
                <strong>How it works:</strong>
                <ul style={{ textAlign: 'left' }}>
                  <li>🔐 Login checks credentials from MySQL.</li>
                  <li>🔒 Passwords are encrypted using bcrypt.</li>
                  <li>📁 After login, dashboard becomes visible.</li>
                  <li>📝 New admins can register below.</li>
                </ul>
              </div>
            </>
          ) : (
            <>
              <h2>Register</h2>
              <form onSubmit={handleRegister}>
                <input name="name" placeholder="Name" value={formData.name} onChange={handleFormChange} required />
                <input name="email" placeholder="Email" value={formData.email} onChange={handleFormChange} required />
                <input name="password" type="password" placeholder="Password" value={formData.password} onChange={handleFormChange} required />
                <input name="birthday" type="date" value={formData.birthday} onChange={handleFormChange} required />
                <input name="gpa" type="number" step="0.01" placeholder="GPA" value={formData.gpa} onChange={handleFormChange} required />
                <button type="submit">Register</button>
              </form>
              <button onClick={() => setAuthMode('login')} style={{ marginTop: '10px' }}>Already registered? Login</button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
