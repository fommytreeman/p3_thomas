/**
 * Project Three: Express JS
 * @author Thomas Freeman & Emily Wilkie
 * @date 2025 April 24
 */

const mysql = require('mysql2/promise');
const app = require('express')();
const port = 3000;

/**
 * Function to create a connection to the MySQL database
 * This function establishes a connection to the MySQL database using the mysql2 library.
 * 
 * @returns {Promise<mysql.Connection>} A promise that resolves to a MySQL connection.
 */
async function getConnection() {
    // Create a connection to the MySQL database (as root)
    return mysql.createConnection({
        host: 'localhost', 
        user: 'root', 
        password: 'Heather1', // Replace with MySQL root password
        database: 'univ_db'
    });
}

// Define Problem 1 endpoint
app.get('/problem1', async (req, res) => {
    const connection = await getConnection();
    const [rows] = await connection.execute(`
        select distinct student.ID, student.name
        from student
        join takes on student.ID = takes.ID
        join course on takes.course_id = course.course_id
        where course.dept_name = 'Computer Science'
        order by student.ID
    `);
    await connection.end();
    res.json(rows);
});

// Define Problem 2 endpoint
app.get('/problem2', async (req, res) => {
    const connection = await getConnection();
    const [rows] = await connection.execute(`
        select student.ID, student.name
        from student
        where student.ID not in (
            select takes.ID
            from takes
            where takes.year < 2017
        )
        order by student.ID
    `);
    await connection.end();
    res.json(rows);
});

// Define Problem 3 endpoint
app.get('/problem3', async (req, res) => {
    const connection = await getConnection();
    const [rows] = await connection.execute(`
        select dept_name, max(salary) as max_salary
        from instructor
        group by dept_name
        order by dept_name
    `);
    await connection.end();
    res.json(rows);
});

// Define Problem 4 endpoint
app.get('/problem4', async (req, res) => {
    const connection = await getConnection();
    const [rows] = await connection.execute(`
        select min(max_salary) as min_salary
        from (
            select dept_name, max(salary) as max_salary
            from instructor
            group by dept_name
        ) as dept_max_salaries
    `);
    await connection.end();
    res.json(rows);
});

// Define Problem 5 endpoint
app.get('/problem5', async (req, res) => {
    const connection = await getConnection();
    // Check if the course already exists
    const [existingCourse] = await connection.execute(
        'SELECT * FROM course WHERE course_id = ?', ['CS-001']
    );
    if (existingCourse.length === 0) {
        // Only insert the new course if it doesn't exist
        await connection.execute(`
            insert into course (course_id, title, dept_name, credits)
            values ('CS-001', 'Weekly Seminar', 'Computer Science', 1)
        `);
    }
    // Retrieve and display all courses
    const [rows] = await connection.execute('SELECT * FROM course ORDER BY course_id');
    await connection.end();
    res.json(rows);
});
  
// Define Problem 6 endpoint
app.get('/problem6', async (req, res) => {
    const connection = await getConnection();
    // Check if this specific section already exists
    const [existingSection] = await connection.execute(
        'SELECT * FROM section WHERE course_id = ? AND sec_id = ? AND semester = ? AND year = ?',
        ['CS-001', '1', 'Fall', '2017']
    );
    if (existingSection.length === 0) {
        // Only insert the new section if it doesn't exist
        await connection.execute(`
            insert into section (course_id, sec_id, semester, year)
            values ('CS-001', '1', 'Fall', '2017')
        `);
    }
    // Retrieve and display all sections
    const [rows] = await connection.execute('SELECT * FROM section ORDER BY course_id, sec_id');
    await connection.end();
    res.json(rows);
});

// Define Problem 7 endpoint
app.get('/problem7', async (req, res) => {
    const connection = await getConnection();
    await connection.execute(`
        insert into takes (ID, course_id, sec_id, semester, year) 
        select ID, 'CS-001', '1', 'Fall', '2017' 
        from student 
        where dept_name = 'Computer Science'
    `);
    const [rows] = await connection.execute('SELECT * FROM takes ORDER BY course_id, sec_id, ID');
    await connection.end();
    res.json(rows);
});

// Define Problem 8 endpoint
app.get('/problem8', async (req, res) => {
    const connection = await getConnection();
    await connection.execute(`
        delete from takes where ID = '12345' and course_id = 'CS-001'
        and sec_id = '1' and semester = 'Fall' and year = '2017'
    `);
    const [rows] = await connection.execute('SELECT * FROM takes ORDER BY course_id, sec_id, ID');
    await connection.end();
    res.json(rows);
});

// Connect, display confirmation message, and start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
