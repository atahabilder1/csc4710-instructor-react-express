import React, { useEffect, useState } from 'react';

function App() {
  // 🔹 Holds the list of all students fetched from the backend
  const [data, setData] = useState([]);

  // 🔹 Holds the input values when creating a new student
  const [form, setForm] = useState({ name: '', birthday: '', gpa: '' });

  // 🔹 Holds the selected student data for editing
  const [editData, setEditData] = useState(null);

  // 🔸 On first render, fetch the full student list from the backend (GET /listall)
  useEffect(() => {
    fetch('http://localhost:8081/listall')
      .then(res => res.json())
      .then(data => setData(data))
      .catch(err => console.log(err));
  }, []);

  // 🔸 Triggered when user types into input fields in the add student form
  // 🔁 Updates the `form` state based on input field name and value
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔸 Called when "Edit" button is clicked → fills the edit form
  const handleEditClick = (student) => {
    setEditData(student);
  };

  // 🟢 Function: Add a new student (POST /student)
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:8081/student', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
      .then(res => res.json())
      .then(result => {
        console.log(result);
        setForm({ name: '', birthday: '', gpa: '' }); // Clear form

        // 🔁 Refresh the student list after insertion
        return fetch('http://localhost:8081/listall')
          .then(res => res.json())
          .then(data => setData(data));
      })
      .catch(err => console.log(err));
  };

  // 🟡 Function: Update student information (PUT /student/:id)
  const handleUpdate = (e) => {
    e.preventDefault();
    fetch(`http://localhost:8081/student/${editData.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editData),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("Update response:", res);
        setEditData(null); // Clear edit form after update

        // 🔁 Refresh the student list after update
        fetch('http://localhost:8081/listall')
          .then(res => res.json())
          .then(data => setData(data));
      })
      .catch(err => console.log(err));
  };

  // 🔴 Function: Delete a student by ID (DELETE /student/:id)
  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this student?")) return;

    fetch(`http://localhost:8081/student/${id}`, {
      method: 'DELETE',
    })
      .then(res => res.json())
      .then(result => {
        console.log(result);
        // 🔁 Refresh the list after deletion
        fetch('http://localhost:8081/listall')
          .then(res => res.json())
          .then(data => setData(data));
      })
      .catch(err => console.log(err));
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      fontFamily: 'Arial, sans-serif',
      padding: '20px'
    }}>
      
      {/* 🔹 Section: Add Student Form → Uses POST /student */}
      <h2>Insert New Student</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        {/* 🔁 onChange updates 'form.name' in React state */}
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
          style={{ margin: '5px', padding: '5px' }}
        />

        {/* 🔁 onChange updates 'form.birthday' in state */}
        <input
          type="date"
          name="birthday"
          value={form.birthday}
          onChange={handleChange}
          required
          style={{ margin: '5px', padding: '5px' }}
        />

        {/* 🔁 onChange updates 'form.gpa' in state */}
        <input
          type="number"
          step="0.01"
          name="gpa"
          placeholder="GPA"
          value={form.gpa}
          onChange={handleChange}
          required
          style={{ margin: '5px', padding: '5px' }}
        />

        {/* Submit button → Triggers handleSubmit → Sends POST request */}
        <button type="submit" style={{ margin: '5px', padding: '5px 10px' }}>
          Add Student
        </button>
      </form>

      {/* 🔹 Section: Display Student Table */}
      <h2>Student Table</h2>
      <div style={{ overflowX: 'auto' }}>
        <table className="styled-table" style={{ borderCollapse: 'collapse', width: '100%', maxWidth: '600px', textAlign: 'center' }}>
          <thead>
            <tr style={{ backgroundColor: '#009879', color: '#ffffff' }}>
              <th style={{ padding: '10px' }}>id</th>
              <th style={{ padding: '10px' }}>name</th>
              <th style={{ padding: '10px' }}>birthday</th>
              <th style={{ padding: '10px' }}>gpa</th>
              <th style={{ padding: '10px' }}>Edit</th>
              <th style={{ padding: '10px' }}>Delete</th>
            </tr>
          </thead>
          <tbody>
            {data.map((d, i) => (
              <tr key={i} style={{ backgroundColor: i % 2 === 0 ? '#f3f3f3' : '#ffffff' }}>
                <td style={{ padding: '8px' }}>{d.id}</td>
                <td style={{ padding: '8px' }}>{d.name}</td>
                <td style={{ padding: '8px' }}>{new Date(d.birthday).toLocaleDateString()}</td>
                <td style={{ padding: '8px' }}>{d.gpa}</td>
                <td style={{ padding: '8px' }}>
                  <button onClick={() => handleEditClick(d)}>Edit</button>
                </td>
                <td style={{ padding: '8px' }}>
                  <button onClick={() => handleDelete(d.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 🟡 Section: Edit Student Form (Only shown if editData exists) */}
      {editData && (
        <div style={{ marginTop: "20px" }}>
          <h3>Edit Student</h3>
          <form onSubmit={handleUpdate}>
            {/* 🔁 Update name inside editData state */}
            <input
              type="text"
              placeholder="Name"
              value={editData.name}
              onChange={(e) => setEditData({ ...editData, name: e.target.value })}
            />
            {/* 🔁 Update birthday inside editData */}
            <input
              type="date"
              value={editData.birthday.split("T")[0]}
              onChange={(e) => setEditData({ ...editData, birthday: e.target.value })}
            />
            {/* 🔁 Update GPA inside editData */}
            <input
              type="number"
              placeholder="GPA"
              step="0.01"
              value={editData.gpa}
              onChange={(e) => setEditData({ ...editData, gpa: e.target.value })}
            />
            <button type="submit">Update</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default App;
