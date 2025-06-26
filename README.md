In this project, you will create a simple Web-based app using mysql, nodejs and react.

**Exercise description**
1. Watch video: https://www.youtube.com/watch?v=Q3ixb1w-QaY
2. Run the sample code according to the video and the instructions given below.
3. Install nodejs and npm, and packages including express, mysql, cors, and nodemon.
4. Change the frontend code (index.html, main.jsx, and App.jsx) and the backend code (server.js) from the sample code to display the results of running 10 SELECT statements, each of them should select from at least TWO tables and its where clause has at least two conditions.  

     Example 1: ```SELECT crscode FROM Students, Transcript WHERE students.id = Transcript.studentid AND transcipt.semester = 'Fall2007'```
     Exmaple 2: ```SELECT People.name FROM People, Hobbies WHERE People.id = Hobbies.peopleid and Hobbies.hobby = 'swimming' ```

5. The code should be running to deserve full credits. Submit all SQL statements in a file called sql.txt. 

Note: grading is based on your fluency of SQL, the success execution result of server.js showing on the web browser and your explanation skill of the result. 

---------------------------------------------------------------------------------------------------------

**How to run the given sample code**

To get the sample project working: 
1. In your file system, create a directory called ```reactmysql``` as your project directory. 
2. Under ```reactmysql```, create directory ```Backend```. 
3. Copy the files under Backend (under https://github.com/shiyonglu/database_javascript/tree/main/exercise3) to Backend.
4. Create a table called students in the ``test`` database as follows:

```SQL
CREATE TABLE students (id SMALLINT, name VARCHAR(100), birthday DATE, gpa FLOAT);

INSERT INTO students VALUE (1, "peter", '1988-08-22', 3.1);

INSERT INTO students VALUE (2, "kathy", '1997-08-12', 3.2);

INSERT INTO students VALUE (3, "mike", '1999-08-02', 3.3);

INSERT INTO students VALUE (4, "john", '1998-06-13', 3.7);

```

5. cd Backend
6. npm init -y
7. npm install express mysql cors nodemon
8. Modify the scripts section of the Backend/package.json as follows:

```javascript
 "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "nodemon server.js"
  },
```
9. Start the backend: 1) ```cd Backend```, and run ```npm start```.
10. Now you can access the Backend endoints directly. For example, you can point your brower to [http://localhost:8081](http://localhost:8081) and [http://localhost:8081/listall](http://localhost:8081/listall). The later should show the content of the students table in JSON format.
12. At the project home directory, run ```npm create vite@latest```, type ```Frontend``` as the project name, and choose ```react``` and ```javascript```.
14. Replace the App.jsx file under Frontend/src by the one under https://github.com/shiyonglu/database_javascript/tree/main/exercise3/Frontend. Open a new terminal to run the following commands.
15. cd Frontend
16. Run ```npm install```
17. Run ```npm run dev``` and then point your browser to ```http://localhost:5173/``` which should show the page that displays the query result of the students table. 


