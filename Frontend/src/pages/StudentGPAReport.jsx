import React, { useEffect, useState } from 'react';

function StudentGPAReport() {
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token'); // Use the correct key
    fetch('http://localhost:8081/me', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setStudent(data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      <h2>📊 GPA Report</h2>
      {student ? (
        <p>{student.name} – GPA: {student.gpa}</p>
      ) : (
        <p>Loading student info...</p>
      )}
    </div>
  );
}

export default StudentGPAReport;
