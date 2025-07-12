
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// DB Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "BookNest",
  port: 3306
});

db.connect((err) => {
  if (err) {
    console.error('❌ DB connection failed: ' + err.stack);
    return;
  }
  console.log('✅ Connected to DB');
});

app.get('/', (req, res) => {
  return res.json("Welcome to the BookNest API.");
});

// GET all books
app.get('/books', (req, res) => {
  const stmt = "SELECT * FROM books";
  db.query(stmt, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

// GET book by ID
app.get('/books/:id', (req, res) => {
  const id = req.params.id;
  console.log(`Fetching book with ID: ${id}`);

  const sql = "SELECT * FROM books WHERE id = ?";
  db.query(sql, [id], (err, data) => {
    if (err) return res.json(err);
    if (data.length === 0) return res.status(404).json({ message: "Book not found" });
    return res.json(data[0]);
  });
});

// GET: Search book by title
app.get('/books/search/:title', (req, res) => {
  const title = req.params.title;
  const sql = "SELECT * FROM books WHERE title LIKE ?";
  db.query(sql, [`%${title}%`], (err, results) => {
    if (err) return res.status(500).json(err);
    return res.json(results);
  });
});

// POST: Add new book
app.post('/books', (req, res) => {
  const { title, isbn, price, publication_year, stock, author_name, category } = req.body;

  if (!title || !isbn || price === undefined || publication_year === undefined || stock === undefined || !author_name || !category) {
    return res.status(400).json({ message: "Missing required fields." });
  }

  const sql = "INSERT INTO books (title, isbn, price, publication_year, stock, author_name, category) VALUES (?, ?, ?, ?, ?, ?, ?)";
  db.query(sql, [title, isbn, price, publication_year, stock, author_name, category], (err, result) => {
    if (err) return res.status(500).json(err);
    return res.status(201).json({ message: "Book added", insertedId: result.insertId });
  });
});

// PUT: Update book
app.put('/books/:id', (req, res) => {
  const id = req.params.id;
  const { title, isbn, price, publication_year, stock, author_name, category } = req.body;

  const sql = "UPDATE books SET title = ?, isbn = ?, price = ?, publication_year = ?, stock = ?, author_name = ?, category = ? WHERE id = ?";
  db.query(sql, [title, isbn, price, publication_year, stock, author_name, category, id], (err, result) => {
    if (err) return res.status(500).json(err);
    if (result.affectedRows === 0) return res.status(404).json({ message: "Book not found" });
    return res.status(200).json({ message: "Book updated" });
  });
});

// DELETE: Remove book
app.delete('/books/:id', (req, res) => {
  const id = req.params.id;

  const sql = "DELETE FROM books WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json(err);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Book not found" });
    }
    return res.status(200).json({ message: "Book deleted" });
  });
});

app.listen(8081, () => {
  console.log("🚀 Server listening on port 8081");
});
