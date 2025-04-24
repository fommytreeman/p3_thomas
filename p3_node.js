/**
 * Project Three: Node JS
 * @author Thomas Freeman & Emily Wilkie
 * @date 2025 April 24
 */

const mysql = require('mysql2/promise');

/**
 * Main function to execute the SQL queries and display results (console)
 * Connects to the MySQL database and executes the SQL queries for each problem.
 */
async function main() {
    // Create a connection to the MySQL database (as root)
    const connection = await mysql.createConnection({
        host: 'localhost', 
        user: 'root', 
        password: 'Heather1', // Replace with MySQL root password
        database: 'univ_db'
    });

    // Problem 1
    const [rows1] = await connection.execute(`
        select distinct student.ID, student.name
        from student
        join takes on student.ID = takes.ID
        join course on takes.course_id = course.course_id
        where course.dept_name = 'Computer Science'
        order by student.ID
    `);
    console.log('Problem 1:', rows1);

    // Problem 2
    const [rows2] = await connection.execute(`
        select student.ID, student.name
        from student
        where student.ID not in (
            select takes.ID
            from takes
            where takes.year < 2017
        )
        order by student.ID
    `);
    console.log('Problem 2:', rows2);

    // Problem 3
    const [rows3] = await connection.execute(`
        select dept_name, max(salary) as max_salary
        from instructor
        group by dept_name
        order by dept_name
    `);
    console.log('Problem 3:', rows3);

    // Problem 4
    const [rows4] = await connection.execute(`
        select min(max_salary) as min_salary
        from (
            select dept_name, max(salary) as max_salary
            from instructor
            group by dept_name
        ) as dept_max_salaries
    `);
    console.log('Problem 4:', rows4);

    // Problem 5
    const [existingCourse] = await connection.execute(
        'SELECT * FROM course WHERE course_id = ?', ['CS-001']
    );
    // Check if the course (CS-001) already exists
    if (existingCourse.length === 0) {
        // Insert the new course if it doesn't exist
        await connection.execute(`
            insert into course (course_id, title, dept_name, credits)
            values ('CS-001', 'Weekly Seminar', 'Computer Science', 1)
        `);
    }
    const [rows5] = await connection.execute('SELECT * FROM course ORDER BY course_id');
    console.log('Problem 5:', rows5);

    // Problem 6
    const [existingSection] = await connection.execute(
        'SELECT * FROM section WHERE course_id = ? AND sec_id = ? AND semester = ? AND year = ?',
        ['CS-001', '1', 'Fall', '2017']
    );
    // Check if this specific section already exists
    if (existingSection.length === 0) {
        // Only insert the new section if it doesn't already exist
        await connection.execute(`
            insert into section (course_id, sec_id, semester, year)
            values ('CS-001', '1', 'Fall', '2017')
        `);
    }
    const [rows6] = await connection.execute('SELECT * FROM section ORDER BY course_id, sec_id');
    console.log('Problem 6:', rows6);

    // Problem 7
    await connection.execute(`
        insert into takes (ID, course_id, sec_id, semester, year) 
        select ID, 'CS-001', '1', 'Fall', '2017' 
        from student 
        where dept_name = 'Computer Science'
    `);
    const [rows7] = await connection.execute('SELECT * FROM takes ORDER BY course_id, sec_id, ID');
    console.log('Problem 7:', rows7);

    // Problem 8
    await connection.execute(`
        delete from takes where ID = '12345' and course_id = 'CS-001'
        and sec_id = '1' and semester = 'Fall' and year = '2017'
    `);
    const [rows8] = await connection.execute('SELECT * FROM takes ORDER BY course_id, sec_id, ID');
    console.log('Problem 8:', rows8);

    // Terminate the connection
    await connection.end();
}
// // Call the main function and handle any errors
main().catch(console.error);
