-- Project Three: Tester
-- Use the univ_db database
-- @author Mark Holliday, Thomas Freeman & Emily Wilkie
-- @version 2025 March 30, 2025 April 24
use univ_db;

select 'Problem 1: Find the ID and name of each student who has taken at least one \n' as '';
select 'PARAM department course; make sure there are no duplicate names in the result. \n' as '';
select 'Display the result sorted by student ID.\n' 
as '';

select '\nResult should be: xxxx\n' as '';

select distinct student.ID, student.name
from student
join takes on student.ID = takes.ID
join course on takes.course_id = course.course_id
where course.dept_name = 'Computer Science'
order by student.ID;


select '\nProblem 2: Find the ID and name of each student who has not taken \n' as '';
select 'any course offered before the year PARAM. Display the result sorted by student ID. \n' as '';

select '\nResult should be: xxxx\n' as '';

select student.ID, student.name
from student
where student.ID not in (
    select takes.ID
    from takes
    where takes.year < 2017
)
order by student.ID;


select '\nProblem 3: For each department, find the maximum salary of instructors in \n' as '';
select 'that department. You may assume that every department has at least one  \n' as '';
select 'instructor. Display the result sorted by department name.  ' as '';

select 'Result should be: xxxxx\n' as '';

select dept_name, max(salary) as max_salary
from instructor
group by dept_name
order by dept_name;


select '\nProblem 4: Find the lowest, across all departments, of the per-department \n' as '';
select 'maximum salary computed by the preceding query. Display both the department name \n' as '';
select 'and the minimum salary and sorted by department name.\n' as '';

select '\nResult should be: xxxx\n' as '';

select min(max_salary) as min_salary
from (
    select dept_name, max(salary) as max_salary
    from instructor
    group by dept_name
) as dept_max_salaries;


select '\nProblem 5: Create a new course with course id of PARAM, entitled PARAM, \n' as '';
select 'with 1 credit. Both before and after your answer SQL statement also have a \n' as '';
select 'SQL statement that displays all the courses sorted by course ID.\n' as '';

select '\nResult should be: xxxxx\n' as '';

select * from course order by course_id;
insert into course (course_id, title, dept_name, credits)
values ('CS-001', 'Weekly Seminar', 'Computer Science', 1);
select * from course order by course_id;


select '\nProblem 6: Create a section of course id PARAM in PARAM PARAM, with section id of 1, \n' as '';
select 'and with the location of this section not yet specified. Both before and after your \n' as '';
select 'answer statement also have a SQL statement that displays all the sections sorted \n' as '';
select 'by course ID and then section ID.\n' as '';

select '\nResult should be: xxxxx\n' as '';

select * from section order by course_id, sec_id;
insert into section (course_id, sec_id, semester, year)
values ('CS-001', '1', 'Fall', '2017');
select * from section order by course_id, sec_id;

select '\nProblem 7: Enroll every student in the PARAM department in the \n' as '';
select 'section PARAM of course PARAM in PARAM PARAM. Both before and after your answer statement also have a SQL \n' as '';
select 'statement that uses the takes table to display all the times each student takes a \n' as '';
select 'course and section sorted by course ID, then section ID, and then student ID\n' as '';
select '(which is just named ID).\n' as '';


select '\nResult should be: xxxx\n' as '';

select * from takes order by course_id, sec_id, ID;
insert into takes (ID, course_id, sec_id, semester, year) 
select ID, 'CS-001', '1', 'Fall', '2017' 
from student 
where dept_name = 'Computer Science';
select * from takes order by course_id, sec_id, ID;

select '\nProblem 8: Delete enrollments in the above section where the ID of the student\n' as '';
select 'is PARAM. Both before and after your answer statement also have a SQL statement \n' as '';
select 'uses the takes table to display all the times each student takes a course and \n' as '';
select 'section sorted by course ID.\n' as '';

select '\nResult should be: xxxxxxx\n' as '';

select * from takes order by course_id, sec_id, ID;
delete from takes where ID = '12345' and course_id = 'CS-001'
and sec_id = '1' and semester = 'Fall' and year = '2017';
select * from takes order by course_id, sec_id, ID;
