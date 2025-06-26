
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
