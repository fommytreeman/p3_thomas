drop database if exists univ_db;
create database univ_db;
use univ_db;

create table student (
    ID   varchar(5),
    name  varchar(20) not null,
    dept_name  varchar(20),
    tot_cred   decimal(3, 0) check (tot_cred >= 0),
    primary key (ID)
);

create table instructor (
    ID  varchar(5),
    name   varchar(20)  not null,
    dept_name   varchar(20),
    salary  decimal(8,2) check (salary > 29000),
    primary key (ID)
);

create table course (
    course_id  varchar(8),
    title  varchar(50),
    dept_name  varchar(20),
    credits  decimal(2, 0) check (credits > 0), 
    primary key (course_id)
);

create table section (
    course_id  varchar(8),
    sec_id   varchar(8),
    semester varchar(6) check (semester in ('Fall', 'Winter', 'Spring', 'Summer')),
    year  decimal(4, 0)  check (year > 1900 and year < 2100),
    building  varchar(15),
    room_number  varchar(7),
    time_slot_id   varchar(4),
    primary key (course_id, sec_id, semester, year),
    foreign key (course_id) references course(course_id)
        on delete cascade
        on update cascade
);

create table takes (
    ID   varchar(5),
    course_id  varchar(8),
    sec_id  varchar(8),
    semester   varchar(6),
    year  decimal(4, 0),
    grade  varchar(2),
    primary key (ID, course_id, sec_id, semester, year),
    foreign key (course_id, sec_id, semester, year) 
        references section (course_id, sec_id, semester, year) 
        on delete cascade
        on update cascade,
    foreign key (ID) references student(ID)
        on delete cascade
        on update cascade
);

insert into course 
values 
('BIO-101', 'Intro. to Biology', 'Biology', '4'),
('BIO-301', 'Genetics', 'Biology', '4'),
('BIO-399', 'Computational Biology', 'Biology', '3'),
('CS-101', 'Intro. to Computer Science', 'Computer Science', '4'),
('CS-190', 'Game Design', 'Computer Science', '4'),
('CS-315', 'Robotics', 'Computer Science', '3'),
('CS-319', 'Image Processing', 'Computer Science', '3'),
('CS-347', 'Database System Concepts', 'Computer Science', '3'),
('EE-181', 'Intro. to Digital Systems', 'Elec. Eng.', '3'),
('FIN-201', 'Investment Banking', 'Finance', '3'),
('HIS-351', 'World History', 'History', '3'),
('MU-199', 'Music Video Production', 'Music', '3'),
('PHY-101', 'Physical Principles', 'Physics', '4');

insert into instructor 
values 
('10101', 'Srinivasan', 'Comp. Sci.', '65000'),
('12121', 'Wu', 'Finance', '90000'),
('15151', 'Mozart', 'Music', '40000'),
('22222', 'Einstein', 'Physics', '95000'),
('32343', 'El Said', 'History', '60000'),
('33456', 'Gold', 'Physics', '87000'),
('45565', 'Katz', 'Comp. Sci.', '75000'),
('58583', 'Califieri', 'History', '62000'),
('76543', 'Singh', 'Finance', '80000'),
('76766', 'Crick', 'Biology', '72000'),
('83821', 'Brandt', 'Comp. Sci.', '92000'),
('98345', 'Kim', 'Elec. Eng.', '80000');

insert into section 
values 
('BIO-101', '1', 'Summer', '2017', 'Painter', '514', 'B'),
('BIO-301', '1', 'Summer', '2018', 'Painter', '514', 'A'),
('CS-101', '1', 'Fall', '2017', 'Packard', '101', 'H'),
('CS-101', '1', 'Spring', '2018', 'Packard', '101', 'F'),
('CS-190', '1', 'Spring', '2017', 'Taylor', '3128', 'E'),
('CS-190', '2', 'Spring', '2017', 'Taylor', '3128', 'A'),
('CS-315', '1', 'Spring', '2018', 'Watson', '120', 'D'),
('CS-319', '1', 'Spring', '2018', 'Watson', '100', 'B'),
('CS-319', '2', 'Spring', '2018', 'Taylor', '3128', 'C'),
('CS-347', '1', 'Fall', '2017', 'Taylor', '3128', 'A'),
('EE-181', '1', 'Spring', '2017', 'Taylor', '3128', 'C'),
('FIN-201', '1', 'Spring', '2018', 'Packard', '101', 'B'),
('HIS-351', '1', 'Spring', '2018', 'Painter', '514', 'C'),
('MU-199', '1', 'Spring', '2018', 'Packard', '101', 'D'),
('PHY-101', '1', 'Fall', '2017', 'Watson', '100', 'A');

insert into student 
values 
('00128', 'Zhang', 'Comp. Sci.', '102'),
('12345', 'Shankar', 'Comp. Sci.', '32'),
('19991', 'Brandt', 'History', '80'),
('23121', 'Chavez', 'Finance', '110'),
('44553', 'Peltier', 'Physics', '56'),
('45678', 'Levy', 'Physics', '46'),
('54321', 'Williams', 'Comp. Sci.', '54'),
('55739', 'Sanchez', 'Music', '38'),
('70557', 'Snow', 'Physics', '0'),
('76543', 'Brown', 'Comp. Sci.', '58'),
('76653', 'Aoi', 'Elec. Eng.', '60'),
('98765', 'Bourikas', 'Elec. Eng.', '98'),
('98988', 'Tanaka', 'Biology', '120');

insert into takes 
values 
('00128', 'CS-101', '1', 'Fall', '2017', 'A'),
('00128', 'CS-347', '1', 'Fall', '2017', 'A-'),
('12345', 'CS-101', '1', 'Fall', '2017', 'C'),
('12345', 'CS-190', '2', 'Spring', '2017', 'A'),
('12345', 'CS-315', '1', 'Spring', '2018', 'A'),
('12345', 'CS-347', '1', 'Fall', '2017', 'A'),
('19991', 'HIS-351', '1', 'Spring', '2018', 'B'),
('23121', 'FIN-201', '1', 'Spring', '2018', 'C+'),
('44553', 'PHY-101', '1', 'Fall', '2017', 'B-'),
('45678', 'CS-101', '1', 'Fall', '2017', 'F'),
('45678', 'CS-101', '1', 'Spring', '2018', 'B+'),
('45678', 'CS-319', '1', 'Spring', '2018', 'B'),
('54321', 'CS-101', '1', 'Fall', '2017', 'A-'),
('54321', 'CS-190', '2', 'Spring', '2017', 'B+'),
('55739', 'MU-199', '1', 'Spring', '2018', 'A-'),
('76543', 'CS-101', '1', 'Fall', '2017', 'A'),
('76543', 'CS-319', '2', 'Spring', '2018', 'A'),
('76653', 'EE-181', '1', 'Spring', '2017', 'C'),
('98765', 'CS-101', '1', 'Fall', '2017', 'C-'),
('98765', 'CS-315', '1', 'Spring', '2018', 'B'),
('98988', 'BIO-101', '1', 'Summer', '2017', 'A'),
('98988', 'BIO-301', '1', 'Summer', '2018', null);
