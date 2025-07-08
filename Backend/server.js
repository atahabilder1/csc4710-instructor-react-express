// ==============================
// 📦 Imports and Middleware Setup
// ==============================
const bcrypt = require('bcrypt');             // encrypt pass

const express = require('express');           // Web framework for handling HTTP requests
const mysql = require('mysql');               // MySQL database connection for Node.js
const cors = require('cors');                 // Enable cross-origin requests

const app = express();                        // Create an Express application
app.use(cors());                              // Enable CORS for all routes
app.use(express.json());                      // Enable parsing JSON request bodies

// ==============================
// 🛢️ MySQL Database Configuration
// ==============================

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "test",
  port: 3306
});

// ✅ Test DB Connection
db.connect((err) => {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to the database.');
});

// ==============================
// 🌐 Endpoint: GET /
// 👉 Triggered when: Browser accesses http://localhost:8081/
// 📤 Response: Simple welcome message (no database query)
// ==============================

app.get('/', (req, res) => {
  return res.json("Welcome to the DB class.");
});

// ==============================
// 📥 Endpoint: GET /listall
// 👉 Triggered when: useEffect() in frontend runs on page load
// 🔍 Backend Query: SELECT * FROM students
// 📤 Response: List of all students (id, name, birthday, gpa)
// ==============================

app.get('/listall', (req, res) => {
  const stmt = "SELECT * FROM students";
  db.query(stmt, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});





// ==============================
// 👤 Endpoint: POST /register
// 👉 Triggered when: User submits "Register" form in frontend
// 📝 Request Body: { name, email, password, birthday, gpa }
// 🔒 Backend Logic: Hash password and store user in students table
// 📤 Response: Success or error message
// ==============================

app.post('/register', async (req, res) => {
  const { name, email, password, birthday, gpa } = req.body;

  // 🚫 Check for missing required fields
  if (!name || !email || !password || !birthday || gpa === undefined) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    // 🔐 Hash the password with bcrypt (10 salt rounds)
    const hashedPassword = await bcrypt.hash(password, 10);

    // 🧾 Insert new student into the database
    const sql = `INSERT INTO students (name, email, password, birthday, gpa) VALUES (?, ?, ?, ?, ?)`;
    db.query(sql, [name, email, hashedPassword, birthday, gpa], (err, result) => {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(409).json({ message: "Email already exists" });
        }
        return res.status(500).json(err);
      }

      // ✅ Registration successful
      res.status(201).json({ message: "Registration successful", studentId: result.insertId });
    });
  } catch (err) {
    console.error("Hashing error:", err);
    res.status(500).json({ message: "Server error during registration." });
  }
});




// ==============================
// 🔐 Endpoint: POST /login
// 👉 Triggered when: User submits "Login" form in frontend
// 📝 Request Body: { email, password }
// 🔍 Backend Logic: Verify password with bcrypt
// 📤 Response: Success with student info or failure message
// ==============================

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // 🔎 Check if the email exists in the database
  const sql = "SELECT * FROM students WHERE email = ?";
  db.query(sql, [email], async (err, results) => {
    if (err) return res.status(500).json(err);

    if (results.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const student = results[0];

    try {
      // ✅ Compare submitted password with hashed password in DB
      const isMatch = await bcrypt.compare(password, student.password);

      if (!isMatch) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      // 🧾 Successful login: return student profile info (except password)
      res.status(200).json({
        message: "Login successful",
        user: {
          id: student.id,
          name: student.name,
          email: student.email,
          birthday: student.birthday,
          gpa: student.gpa
        }
      });
    } catch (err) {
      console.error("Comparison error:", err);
      res.status(500).json({ message: "Server error during login." });
    }
  });
});




















// ==============================
// 📥 Endpoint: GET /student/:id
// 👉 Triggered when: Viewing details of a student by ID (not shown in UI here)
// 🔍 Backend Query: SELECT * FROM students WHERE id = ?
// 📤 Response: Single student object (id, name, birthday, gpa)
// ==============================

app.get('/student/:id', (req, res) => {
  const studentId = req.params.id;
  console.log(`Fetching student with ID: ${studentId}`);

  const sql = "SELECT * FROM students WHERE id = ?";
  db.query(sql, [studentId], (err, data) => {
    if (err) return res.json(err);
    if (data.length === 0) return res.status(404).json({ message: "Student not found" });
    return res.json(data[0]);
  });
});

// ==============================
// ➕ Endpoint: POST /student
// 👉 Triggered when: User submits "Add Student" form in frontend
// 📝 Request Body: { name, birthday, gpa }
// 🔍 Backend Query: INSERT INTO students (name, birthday, gpa)
// 📤 Response: Confirmation message with insertedId
// ==============================

app.post('/student', (req, res) => {
  const { name, birthday, gpa } = req.body;

  if (!name || !birthday || gpa === undefined) {
    return res.status(400).json({ message: "Missing required fields." });
  }

  const sql = "INSERT INTO students (name, birthday, gpa) VALUES (?, ?, ?)";
  db.query(sql, [name, birthday, gpa], (err, result) => {
    if (err) return res.status(500).json(err);
    return res.status(201).json({ message: "Student added", insertedId: result.insertId });
  });
});

// ==============================
// ✏️ Endpoint: PUT /student/:id
// 👉 Triggered when: User clicks "Edit" → updates fields → clicks "Update"
// 📝 Request Body: { name, birthday, gpa }
// 🔍 Backend Query: UPDATE students SET ... WHERE id = ?
// 📤 Response: Success message or 404 if ID not found
// ==============================

app.put('/student/:id', (req, res) => {
  const studentId = req.params.id;
  const { name, birthday, gpa } = req.body;

  const sql = "UPDATE students SET name = ?, birthday = ?, gpa = ? WHERE id = ?";
  db.query(sql, [name, birthday, gpa, studentId], (err, result) => {
    if (err) return res.status(500).json(err);
    if (result.affectedRows === 0) return res.status(404).json({ message: "Student not found" });
    return res.status(200).json({ message: "Student updated" });
  });
});

// ==============================
// ❌ Endpoint: DELETE /student/:id
// 👉 Triggered when: User clicks "Delete" and confirms
// 🔍 Backend Query: DELETE FROM students WHERE id = ?
// 📤 Response: Success or 404 if not found
// ==============================

app.delete('/student/:id', (req, res) => {
  const studentId = req.params.id;

  const sql = "DELETE FROM students WHERE id = ?";
  db.query(sql, [studentId], (err, result) => {
    if (err) return res.status(500).json(err);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Student not found" });
    }
    return res.status(200).json({ message: "Student deleted" });
  });
});

// ==============================
// 🚀 Start the Web Server
// ==============================

app.listen(8081, () => {
  console.log("I am listening on port 8081.");
});
