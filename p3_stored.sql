-- Project Three: Stored SQL
-- @author Thomas Freeman & Emily Wilkie
-- @version 2025 April 24
use univ_db;

-- Stored routine for Problem 1
delimiter //
create procedure get_students_in_dept(dept_name varchar(20))
begin
    select distinct student.ID, student.name
    from student
    join takes on student.ID = takes.ID
    join course on takes.course_id = course.course_id
    where course.dept_name = dept_name
    order by student.ID;
end //
delimiter ;

-- Stored routine for Problem 2
delimiter //
create procedure get_students_not_taken_before(year int)
begin
    select student.ID, student.name
    from student
    where student.ID not in (
        select takes.ID
        from takes
        where takes.year < year
    )
    order by student.ID;
end //
delimiter ;

-- Stored routine for Problem 3
delimiter //
create procedure get_max_salary_by_dept()
begin
    select dept_name, max(salary) as max_salary
    from instructor
    group by dept_name
    order by dept_name;
end //
delimiter ;

-- Stored routine for Problem 4
delimiter //
create procedure get_min_max_salary()
begin
    select min(max_salary) as min_salary
    from (
        select dept_name, max(salary) as max_salary
        from instructor
        group by dept_name
    ) as dept_max_salaries;
end //
delimiter ;

-- Stored routine for Problem 5
delimiter //
create procedure add_course(course_id varchar(8), title varchar(50),
                            dept_name varchar(20), credits decimal(2, 0))
begin
    if not exists (select 1 from course where course_id = course_id) then
        insert into course (course_id, title, dept_name, credits)
        values (course_id, title, dept_name, credits);
    else
        update course set title = title, dept_name = dept_name, credits = credits
        where course_id = course_id;
    end if;
end //
delimiter ;


-- Stored routine for Problem 6
delimiter //
create procedure add_section(course_id varchar(8), sec_id varchar(8),
                             semester varchar(6), year decimal(4, 0))
begin
    if not exists (select 1 from section where course_id = course_id and sec_id = sec_id
                   and semester = semester and year = year) then
        insert into section (course_id, sec_id, semester, year)
        values (course_id, sec_id, semester, year);
    end if;
end //
delimiter ;


-- Stored routine for Problem 7
delimiter //
create procedure enroll_students(dept_name varchar(20), course_id varchar(8), sec_id varchar(8),
                                 semester varchar(6), year decimal(4, 0))
begin
    insert into takes (ID, course_id, sec_id, semester, year) 
    select ID, course_id, sec_id, semester, year 
    from student 
    where dept_name = dept_name;
end //
delimiter ;

-- Stored routine for Problem 8
delimiter //
create procedure delete_enrollment(student_id varchar(5), course_id varchar(8), sec_id varchar(8),
                                   semester varchar(6), year decimal(4, 0))
begin
    delete from takes where ID = student_id and course_id = course_id and sec_id = sec_id
    and semester = semester and year = year;
end //
delimiter ;
