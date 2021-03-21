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

// Inquirer Prompts
const start = () => {
inquirer
  .prompt([
    {
      type: 'list',
      message: 'What would you like to do?',
      name: 'commands',
      choices: ['View All Employees', 'View All Departments', 'View All Roles', 'Add Department', 'Add Role', 'Add Employee', 'Update Employee Role'],
    }
  ])
  .then((answer) => {
      console.log("Success!");
      // switch case for each choice - find in Great Bay
        connection.end();

    })
};
// Connecting to MySQL Server & SQL Database
connection.connect((err) => {
  if (err) throw err;
  console.log(`connected as id ${connection.threadId}`);
  start();
});