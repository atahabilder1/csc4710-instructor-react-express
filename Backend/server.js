const express = require('express') // Imports the express module, which is a web application framework for Node.js. It simplifies routing and handling HTTP requests.

const mysql = require('mysql')  //  Imports the mysql module, which allows Node.js to interact with MySQL databases.

const cors = require ('cors') // Imports the cors module, which enables Cross-Origin Resource Sharing, allowing your server to handle requests from different origins.


const app = express() // Creates an instance of an Express application.
app.use(cors()) // Applies the CORS middleware to the Express app.


const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "test",
    port: 3306
})

// let's see whether we can connect to the database successfully or not
db.connect((err) => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to the database.');
});


app.use(cors());

// when the browser points to localhost:8081/
app.get('/', (request, response) => { 
     return response.json("Welcome to the DB class.")
});

// when the browser points to localhost:8081/listall
app.get('/listall', (request, response) => {
    const stmt = "SELECT * FROM students"
    db.query(stmt, (err, data) => {
        if(err) return response.json(err)
        else return response.json(data)
    })
});

// when the browser points to localhost:8081/student/x, where x = 1, 2, 3...
app.get('/student/:id', (request, response) => {
    const studentId = request.params.id; // Extract the ID from the URL
    console.log(`Fetching student with ID: ${studentId}`);
    
    const sql = "SELECT * FROM students WHERE id = ?";
    db.query(sql, [studentId], (err, data) => {
        if (err) return response.json(err);
        if (data.length === 0) return response.status(404).json({ message: "Student not found" });
        return response.json(data[0]); // Return the student object
    });
});


// set up the web server listener
app.listen(8081, () => {
    console.log("I am listening.")
});
