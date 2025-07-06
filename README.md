# BookNest Inventory Manager

BookNest is a full-stack inventory management system built as a group project for CSC4710 (Database Systems) at Wayne State University. It enables users to perform Create, Read, Update, Delete (CRUD) operations and search for books by title. The project demonstrates the integration of a React.js frontend, an Express.js backend, and a MySQL database.

## Technologies Used

| Layer     | Stack             |
|-----------|------------------|
| Frontend  | React + Vite     |
| Backend   | Node.js + Express|
| Database  | MySQL            |

## Features

- List all books
- Search books by title
- Add a new book
- Edit book details
- Delete a book

## Folder Structure

```
booknest/
├── Backend/
│ ├── server.js
│ ├── db.js
│ └── routes/
│ └── books.js
├── Frontend/
│ ├── src/
│ │ ├── components/
│ │ │ ├── BookList.jsx
│ │ │ ├── BookForm.jsx
│ │ │ └── SearchBar.jsx
│ │ ├── App.jsx
│ ├── index.html
```

## Setup Instructions

### Backend Setup

1. Navigate to the `Backend` folder:

   ```bash
   cd Backend
   npm install
Configure your MySQL database connection in db.js.
Set up your MySQL database:
CREATE DATABASE booknest;
USE booknest;

CREATE TABLE books (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255),
  isbn VARCHAR(20),
  price DECIMAL(6,2),
  publication_year INT,
  stock INT
);
Start the backend server:
node server.js
The server will run at: http://localhost:3001
Frontend Setup
Navigate to the Frontend folder:
cd ../Frontend
npm install
Start the React development server:
npm run dev
The frontend will run at: http://localhost:5173
API Endpoints

Method	Endpoint	Description
GET	/books	List all books
GET	/books/search/:title	Search books by title
POST	/books	Add a new book
PUT	/books/:id	Edit a book by ID
DELETE	/books/:id	Delete a book by ID
Team Members and Demo

Video Demonstration: [Insert Google Drive or YouTube Link Here]
Team Members: Fabian Sedlmayr, Hashir Ahmad
Contribution Report: See ContributionReport.pdf for breakdown of responsibilities
