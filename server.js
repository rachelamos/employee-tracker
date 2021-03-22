// Dependencies
const mysql = require('mysql');
const inquirer = require('inquirer');

// Creating Connection to Server
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: process.env.PASSWORD,
  database: 'emp_trackerDB',
});

// Connecting to MySQL Server & SQL Database
connection.connect((err) => {
  if (err) throw err;
  console.log(`connected as id ${connection.threadId}`);
  start();
});

// Inquirer Prompts
const start = () => {
inquirer
  .prompt(
    {
      type: 'list',
      message: 'What would you like to do?',
      name: 'commands',
      choices: ['View All Employees', 'View All Departments', 'View All Roles', 'Add Department', 'Add Role', 'Add Employee', 'Update Employee Role'],
    }
  )
  .then((answer) => {
      console.log("Success!");
      switch(answer.commands) {
        case 'View All Employees':
          viewAllEmployees();
          break;
        
        case 'View All Departments':
          viewAllDepartments();
          break;

        case 'View All Roles':
          viewAllRoles();
          break;

        case 'Add Department':
          addDepartment();
          break;

        case 'Add Role':
          addRole();
          break;

        case 'Add Employee':
          addEmployee();
          break;

        case 'Update Employee Role':
          updateEmployeeRole();
          break;

        default:
          console.log(`Invalid action: ${answer.commands}`);
          break;
      }
    })
};

// Simple query that will display all employees - probably use console.table
const viewAllEmployees = () => {
  console.log('Will view all employees');
  start();
};

// First inquirer prompt to display which dept, then simple query that will display all employees - probably use console.table
const viewAllDepartments = () => {
  console.log('Will view all departments');
  start();
};

// First inquirer prompt to display which role, then simple query that will display all employees - probably use console.table
const viewAllRoles = () => {
  console.log('Will view all roles');
  start();
};

// Insert information using query
const addDepartment = () => {
  console.log('Will add a department');
  start();
};

// Insert information using query
const addRole = () => {
  console.log('Will add a role');
  start();
};

// Insert information using query
const addEmployee = () => {
  console.log('Will add an employee');
  start();
};

// Simple query that will display all employees - probably use console.table
const updateEmployeeRole = () => {
  console.log("Will update an employee's role");
  start();
};