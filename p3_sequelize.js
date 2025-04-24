/**
 * Project Three: Sequelize JS
 * @author Thomas Freeman & Emily Wilkie
 * @date 2025 April 24
 */

const { Sequelize, DataTypes } = require('sequelize');
const mysql = require('mysql2/promise');
const app = require('express')();
const port = 3000;

// Create a connection to the MySQL database
const sequelize = new Sequelize(
    'univ_db',  // database name
    'root',     // username
    'Heather1', // password (Replace with MySQL root password)
    {
        host: 'localhost',
        dialect: 'mysql'
    }
);

// Define Student model
const Student = sequelize.define('Student', {
    ID: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    name: DataTypes.STRING,
    dept_name: DataTypes.STRING,
    tot_cred: DataTypes.DECIMAL
}, {
    tableName: 'student',
    timestamps: false
});

// Define Takes model
const Takes = sequelize.define('Takes', {
    ID: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    course_id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    sec_id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    semester: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    year: {
        type: DataTypes.DECIMAL,
        primaryKey: true
    },
    grade: DataTypes.STRING
}, {
    tableName: 'takes',
    timestamps: false
});

// Define Course model
const Course = sequelize.define('Course', {
    course_id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    title: DataTypes.STRING,
    dept_name: DataTypes.STRING,
    credits: DataTypes.DECIMAL
}, {
    tableName: 'course',
    timestamps: false
});

// Define Instructor model
const Instructor = sequelize.define('Instructor', {
    ID: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    name: DataTypes.STRING,
    dept_name: DataTypes.STRING,
    salary: DataTypes.DECIMAL
}, {
    tableName: 'instructor',
    timestamps: false
});

// Define Section model
const Section = sequelize.define('Section', {
    course_id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    sec_id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    semester: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    year: {
        type: DataTypes.DECIMAL,
        primaryKey: true
    },
    building: DataTypes.STRING,
    room_number: DataTypes.STRING,
    time_slot_id: DataTypes.STRING
}, {
    tableName: 'section',
    timestamps: false
});

// Define Student -> Takes association
Student.hasMany(Takes, { foreignKey: 'ID' });
Takes.belongsTo(Student, { foreignKey: 'ID' });

// Define Takes -> Course association
Takes.belongsTo(Course, { foreignKey: 'course_id' });
Course.hasMany(Takes, { foreignKey: 'course_id' });

// Problem 1
app.get('/problem1', async (req, res) => {
    const students = await Student.findAll({
        include: [{
            model: Takes,
            include: [{
                model: Course,
                where: { dept_name: 'Computer Science' }
            }]
        }],
        distinct: true,
        order: [['ID', 'ASC']]
    });
    res.json(students);
});

// Problem 2
app.get('/problem2', async (req, res) => {
    const students = await Student.findAll({
        where: {
            ID: {
                [Sequelize.Op.notIn]: sequelize.literal(`
                    (select ID from takes where year < 2017)
                `)
            }
        },
        order: [['ID', 'ASC']]
    });
    res.json(students);
});

// Problem 3
app.get('/problem3', async (req, res) => {
    const maxSalaries = await Instructor.findAll({
        attributes: ['dept_name', [sequelize.fn('max', sequelize.col('salary')), 'max_salary']],
        group: ['dept_name'],
        order: [['dept_name', 'ASC']]
    });
    res.json(maxSalaries);
});

// Problem 4
app.get('/problem4', async (req, res) => {
    const minMaxSalary = await sequelize.query(`
        select min(max_salary) as min_salary
        from (
            select dept_name, max(salary) as max_salary
            from instructor
            group by dept_name
        ) as dept_max_salaries
    `, { type: sequelize.QueryTypes.SELECT });
    res.json(minMaxSalary);
});

// Problem 5
app.get('/problem5', async (req, res) => {
    try {
        await Course.create({ 
            course_id: 'CS-001', 
            title: 'Weekly Seminar', 
            dept_name: 'Computer Science', 
            credits: 1 
        });
        const courses = await Course.findAll({
            order: [['course_id', 'ASC']]
        });
        res.json(courses);
    } catch (error) {
        console.error('Error inserting into course table:', error);
        res.status(500).json({ error: 'Failed to insert into course table' });
    }
});

// Problem 6
app.get('/problem6', async (req, res) => {
    try {
        await Section.create({ 
            course_id: 'CS-001', 
            sec_id: '1', 
            semester: 'Fall', 
            year: 2017 
        });
        const sections = await Section.findAll({
            order: [['course_id', 'ASC'], ['sec_id', 'ASC']]
        });
        res.json(sections);
    } catch (error) {
        console.error('Error inserting into section table:', error);
        res.status(500).json({ error: 'Failed to insert into section table' });
    }
});
   
// Problem 7
app.get('/problem7', async (req, res) => {
    const students = await Student.findAll({
        where: {
            dept_name: 'Computer Science'
        }
    });
    for (const student of students) {
        await Takes.create({
            ID: student.ID,
            course_id: 'CS-001',
            sec_id: '1',
            semester: 'Fall',
            year: 2017
        });
    }
    const takes = await Takes.findAll({
        order: [['course_id', 'ASC'], ['sec_id', 'ASC'], ['ID', 'ASC']]
    });
    res.json(takes);
});

// Problem 8
app.get('/problem8', async (req, res) => {
    await Takes.destroy({
        where: {
            ID: '12345',
            course_id: 'CS-001',
            sec_id: '1',
            semester: 'Fall',
            year: 2017
        }
    });
    const takes = await Takes.findAll({
        order: [['course_id', 'ASC'], ['sec_id', 'ASC'], ['ID', 'ASC']]
    });
    res.json(takes);
});

// Connect to the server, display confirmation message.
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
