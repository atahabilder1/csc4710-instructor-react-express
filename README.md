
# CSC4710 Instructor Full Stack Project

A full stack web application designed for teaching and demonstration purposes in **CSC4710 (Database Systems)**. This project consists of a **React.js frontend** and an **Express.js + MySQL backend**. It showcases how to build and connect a dynamic user interface with a database-powered API.

GitHub Repo: [https://github.com/atahabilder1/csc4710-instructor-react-express](https://github.com/atahabilder1/csc4710-instructor-react-express)

---

## 📌 Project Description

This application serves as a **student records system**, where instructors or users can:

- View all student records
- Fetch individual student details by ID
- Learn how frontend components interact with backend routes
- Understand full stack CRUD operations (read-only for now)

The backend provides **RESTful API endpoints** built with **Express**, which interacts with a **MySQL database**. The frontend, developed with **React** and powered by **Vite**, consumes these APIs and displays dynamic data.

---

## 🧠 How the Components Interact

This project highlights the flow of data from the frontend (React) to the backend (Express) and into the MySQL database.

### 🔁 Component Communication Flow:

```
User → React Component → HTTP Request → Express API → MySQL → Response → React UI
```

### 💡 Example Breakdown


#### 1. React (Frontend)
```jsx
useEffect(() => {
  fetch('http://localhost:8081/listall')
    .then(res => res.json())
    .then(data => setData(data));
}, []);
```
- Sends a **GET** request to the backend endpoint `/listall`.
- Once the data is received, it's in **JSON format**.
- This JSON is then saved into React's state using `setData(data)`.

#### 2. Express (Backend)
```js
app.get('/listall', (req, res) => {
  db.query("SELECT * FROM students", (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});
```
- Receives the request from React.
- Executes the SQL query `SELECT * FROM students`.
- Converts the database result into JSON and sends it back to the frontend.

#### 3. MySQL (Database)
- Holds the actual student records.
- The query result from MySQL is structured into rows of data, such as:
```json
[
  { "id": 1, "name": "Ali", "birthday": "2000-01-01", "gpa": 3.9 },
  { "id": 2, "name": "Sara", "birthday": "1999-06-15", "gpa": 3.7 }
]
```

#### 4. React Rendering
- The frontend maps over the JSON array using `.map()`:
```jsx
{data.map((d, i) => (
  <tr key={i}>
    <td>{d.id}</td>
    <td>{d.name}</td>
    <td>{new Date(d.birthday).toLocaleDateString()}</td>
    <td>{d.gpa}</td>
  </tr>
))}
```
- Each student object becomes one row in the HTML table.

---

## ✨ Features

- Express-based backend with REST endpoints
- MySQL database for persistent data
- React + Vite frontend for interactive UI
- CORS-enabled API access
- Clean project structure for teaching modular development

---

## 🧰 Installation Tools and Their Purpose

| Tool         | Used In    | Purpose |
|--------------|------------|---------|
| `Node.js`    | Both       | Runtime for JavaScript on backend; required for npm scripts |
| `npm`        | Both       | Node package manager used to install dependencies |
| `nodemon`    | Backend    | Automatically restarts the server when file changes are detected |
| `express`    | Backend    | Web framework for building the REST API |
| `mysql`      | Backend    | Allows Node.js to connect to a MySQL database |
| `cors`       | Backend    | Enables cross-origin requests from frontend |
| `vite`       | Frontend   | Fast frontend build tool for React |
| `react`      | Frontend   | Builds the user interface |
| `react-dom`  | Frontend   | Renders React components to the DOM |

---

⚠️ **Note:** This project requires **Node.js version 20** or higher. Please ensure you have it installed before running the steps below.

## 🚀 Getting Started

### 🚀 Step 1: Install Node.js

Please follow the steps below to set up your development environment:

#### ✅ 1. Install Node.js 20.xxx (includes npm)
- Go to the official website:  
  👉 [https://nodejs.org/dist/v20.19.3/node-v20.19.3-x64.msi](https://nodejs.org/dist/v20.19.3/node-v20.19.3-x64.msi)
- Download the **LTS version (recommended)** for your operating system.
- Run the installer and complete the setup.

> Note: **npm (Node Package Manager)** is automatically installed with Node.js.

---

#### ✅ 2. Verify the installation

Open your terminal (Command Prompt, PowerShell, or Terminal) and run:

```bash
node -v
```

This should print something like:

```
v20.10.0
```

Then run:

```bash
npm -v
```

You should see something like:

```
10.2.1
```

If both versions show correctly, you're all set! ✅


Create a database named test. Create a table called students in the test database as follows:
```sql
-- Create the database
CREATE DATABASE test;

-- Use the database
USE test;

-- Create the students table
CREATE TABLE students (
    id SMALLINT,
    name VARCHAR(100),
    birthday DATE,
    gpa FLOAT
);

-- Insert records into students
INSERT INTO students VALUE (1, "peter", '1988-08-22', 3.1);
INSERT INTO students VALUE (2, "kathy", '1997-08-12', 3.2);
INSERT INTO students VALUE (3, "mike", '1999-08-02', 3.3);
INSERT INTO students VALUE (4, "john", '1998-06-13', 3.7);
```
###  Install tools

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/atahabilder1/csc4710-instructor-react-express.git
cd csc4710-instructor-react-express
```

---

### 2️⃣ Backend Setup (`/Backend`)

```bash
cd Backend
npm install
```

🛠 This installs:
- Express
- MySQL
- Cors
- Nodemon

🔌 Then configure your `mysql.createConnection()` in `server.js` to match your local DB setup.

#### Run the Backend Server:

```bash
npm start
```

The server will run at: [http://localhost:8081](http://localhost:8081)

---

### 3️⃣ Frontend Setup (`/Frontend`)

```bash
cd ../Frontend
npm install
```

🛠 This installs:
- React
- Vite
- React DOM

#### Run the Frontend App:

```bash
npm run dev
```

The frontend will run at: [http://localhost:5173](http://localhost:5173)

---

## 🔗 API Endpoints

| Endpoint        | Method | Description                |
|-----------------|--------|----------------------------|
| `/`             | GET    | Welcome message            |
| `/listall`      | GET    | List all students          |
| `/student/:id`  | GET    | Get a student by ID        |

---

## 📂 Folder Structure

```
csc4710-instructor-react-express/
│
├── Backend/
│   ├── server.js
│   ├── package.json
│
├── Frontend/
│   ├── src/
│   ├── index.html
│   ├── package.json
│
└── README.md
```

---
### Specific file location guidance for implementing each CRUD endpoint and its frontend/backend/database responsibilities

 

## 🗂️ Where to Add CRUD Code: File-by-File Breakdown

Here’s a clear guide on **what file to modify** and **what needs to be done** to implement each CRUD operation:

---

### 🔧 1. Create (Add New Student)

| Layer     | File                | What to Do |
|-----------|---------------------|------------|
| Database  | `students` table    | Ensure the table has columns: `id`, `name`, `birthday`, `gpa` |
| Backend   | `Backend/server.js` | Add a POST route `/student` to insert into the database |
| Frontend  | `Frontend/src/App.jsx` or separate form component | Add a form to collect student data and `fetch()` to POST it |

---

### 📝 2. Read (Get All / Get by ID)

✔️ Already Implemented

| Layer     | File                | What It Does |
|-----------|---------------------|--------------|
| Backend   | `Backend/server.js` | Routes: `/listall`, `/student/:id` |
| Frontend  | `Frontend/src/App.jsx` | Uses `useEffect()` and `fetch()` to get data and display in table |
| Database  | `students` table    | Must contain test data for display |

---

### ✏️ 3. Update (Edit Student)

| Layer     | File                | What to Do |
|-----------|---------------------|------------|
| Database  | `students` table    | Make sure existing student entries exist for update |
| Backend   | `Backend/server.js` | Add a PUT route `/student/:id` that updates fields by ID |
| Frontend  | `Frontend/src/App.jsx` or `EditStudent.jsx` | Add edit form and send PUT request using `fetch()` |

---

### ❌ 4. Delete (Remove Student)

| Layer     | File                | What to Do |
|-----------|---------------------|------------|
| Backend   | `Backend/server.js` | Add a DELETE route `/student/:id` that removes a student |
| Frontend  | `Frontend/src/App.jsx` | Add delete button next to each student and call DELETE using `fetch()` |
| Database  | `students` table    | Deletion will affect rows permanently unless soft-delete is implemented |

---

✅ Also, don't forget:
- Use `express.json()` in `server.js` to handle POST and PUT JSON requests:
  ```js
  app.use(express.json());

---

## 👨‍🏫 Designed For

This project is intended for **the students** in computer science or software engineering programs who want to:

- Understand the interaction between frontend and backend
- Learn how databases integrate with REST APIs
- Practice full stack web development with modern tools

---

## 📜 License

This project is open-source for educational use under the [MIT License](LICENSE).

---

## 🙋‍♂️ Need Help?

If you're stuck or want to extend this project (e.g., add Create/Update/Delete, or auth), feel free to fork, open an issue, or reach out.
