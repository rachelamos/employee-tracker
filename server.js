// Dependencies
const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');

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

// Starts the app--gives user list of all choices for functions.
const start = () => {
  inquirer
    .prompt(
      {
        type: 'list',
        message: 'What would you like to do?',
        name: 'commands',
        choices: ['View All Employees', 'View All Departments', 'View All Roles', 'Add Department', 'Add Role', 'Add Employee', 'Update Employee Role', 'Exit'],
      }
    )
    .then((answer) => {
      // console.log("Success!");
      switch (answer.commands) {
        case 'View All Employees':
          viewAllEmployees();
          break;

        case 'View All Employees by Department':
          viewAllEmpByDepartment();
          break;

        case 'View All Employees by Role':
          viewAllEmpByRole();
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

        case 'Exit':
          console.log("You've successfully exited the application.")
          connection.end();
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
  let query = 'SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, employee.manager_id, department.name'
  query += 'CONCAT(manager.first_name, " ", manager.last_name) AS manager FROM employee INNER JOIN role ON employee.role_id = role.id LEFT JOIN employee manager ON manager.id = employee.manager_id INNER JOIN department ON '
  connection.query(query, (err, res) => {
    const empArray = []
    res.forEach(({ id, first_name, last_name, title, salary, manager },) => {
      const empObject = {
        "ID": id,
        "First Name": first_name,
        "Last Name": last_name,
        "Title": title,
        "Salary": salary,
        "Manager": manager,
      }
      empArray.push(empObject);
    });
    console.table(empArray);
    start();
  })
};

// First inquirer prompt to display which dept, then simple query that will display all employees - probably use console.table
const viewAllEmpByDepartment = () => {
  console.log('Will view all employees by department');
  inquirer
    .prompt({
      name: 'dept',
      type: 'list',
      message: "Which department's employees would you like to view?",
      choices: ['Sales', 'Engineering', 'Legal']
    })
    .then((answer) => {
      let query =
        'SELECT ';
      query +=
        'FROM  INNER JOIN  ON ( = )';
      connection.query(query, [answer.department, answer.employee], (err, res) => {
        res.forEach(({ first_name, last_name, title, salary }, i) => {
          const num = i + 1;
          console.table(
            `ID: ${num} || Name: ${first_name} ${last_name} || Title: ${title} || Salary: ${salary}`
          );
        });
        start();
      })
    })
};

// First inquirer prompt to display which role, then simple query that will display all employees - probably use console.table
const viewAllEmpByRole = () => {
  console.log('Will view all roles');
  start();
};

// Insert information using query
const addDepartment = () => {
  console.log('Will add a department');
  inquirer
    .prompt({
      name: 'addDept',
      type: 'input',
      message: 'Please enter the name of the department you would like to add.',
    })
    .then((answer) => {
      connection.query('INSERT INTO department SET ?',
        {
          name: answer.addDept,
        },
        (err) => {
          if (err) throw err;
          console.log('Your department has been added.');
          start();
        });
    });
};

// Insert information using query
const addRole = () => {
  console.log('Will add a role');
  inquirer
    .prompt([
      {
        name: 'addRole',
        type: 'input',
        message: 'Please enter the name of the role you would like to add.',
      },
      {
        name: 'addRoleSalary',
        type: 'input',
        message: 'Please enter the salary of the role you just added.'
      },
      {
        name: 'addRoleDepartment',
        type: 'input',
        message: 'Please name the department the role will be in.'
      }])
    .then((answer) => {
      connection.query('INSERT INTO role SET ?',
        {
          title: answer.addRole,
          salary: answer.addRoleSalary,
          department_id: 
        },
        (err) => {
          if (err) throw err;
          console.log('Your role has been added.');
          start();
        });
    });
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