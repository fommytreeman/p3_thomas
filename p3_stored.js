/**
 * Project Three: Stored JS
 * @author Thomas Freeman & Emily Wilkie
 * @date 2025 April 24
 */

const mysql = require('mysql2/promise');

/**
 * Main function to execute the stored routines and display results (console)
 * Connects to the MySQL database and executes the stored routines for each problem.
 */
async function main() {
    // Create a connection to the MySQL database
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'Heather1', // Replace with MySQL root password 
        database: 'univ_db'
    });

    // Call stored routine for Problem 1
    const [rows1] = await connection.execute('CALL get_students_in_dept(?)', ['Computer Science']);
    console.log('Problem 1:', rows1);

    // Call stored routine for Problem 2
    const [rows2] = await connection.execute('CALL get_students_not_taken_before(?)', [2017]);
    console.log('Problem 2:', rows2);

    // Call stored routine for Problem 3
    const [rows3] = await connection.execute('CALL get_max_salary_by_dept()');
    console.log('Problem 3:', rows3);

    // Call stored routine for Problem 4
    const [rows4] = await connection.execute('CALL get_min_max_salary()');
    console.log('Problem 4:', rows4);

    // Call stored routine for Problem 5
    await connection.execute(
        'CALL add_course(?, ?, ?, ?)', ['CS-001', 'Weekly Seminar', 'Computer Science', 1]
    );
    const [rows5] = await connection.execute('SELECT * FROM course ORDER BY course_id');
    console.log('Problem 5:', rows5);

    // Call stored routine for Problem 6
    await connection.execute(
        'CALL add_section(?, ?, ?, ?)', ['CS-001', '1', 'Fall', '2017']
    );
    const [rows6] = await connection.execute('SELECT * FROM section ORDER BY course_id, sec_id');
    console.log('Problem 6:', rows6);

    // Call stored routine for Problem 7
    await connection.execute(
        'CALL enroll_students(?, ?, ?, ?, ?)', ['Computer Science', 'CS-001', '1', 'Fall', '2017']
    );
    const [rows7] = await connection.execute('SELECT * FROM takes ORDER BY course_id, sec_id, ID');
    console.log('Problem 7:', rows7);

    // Call stored routine for Problem 8
    await connection.execute(
        'CALL delete_enrollment(?, ?, ?, ?, ?)', ['12345', 'CS-001', '1', 'Fall', '2017']
    );
    const [rows8] = await connection.execute('SELECT * FROM takes ORDER BY course_id, sec_id, ID');
    console.log('Problem 8:', rows8);

    // Terminate the connection
    await connection.end();
}
// Call the main function and handle any errors
main().catch(console.error);
