// Dependencies
const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');

// Creating Connection to Server
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'etemeo930',
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
        choices: ['View All Employees', 'View All Employees by Department', 'View All Employees by Role', 'Add Department', 'Add Role', 'Add Employee', 'Update Employee Role', 'Exit'],
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
  let query = 'SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, employee.manager_id, department.name,'
  query += 'CONCAT(manager.first_name, " ", manager.last_name) AS manager FROM role INNER JOIN employee ON employee.role_id = role.id LEFT JOIN employee manager ON manager.id = employee.manager_id INNER JOIN department ON role.department_id = department.id;'
  connection.query(query, (err, res) => {
    const empArray = []
    res.forEach(({ id, first_name, last_name, title, salary, manager, name },) => {
      const empObject = {
        "ID": id,
        "First Name": first_name,
        "Last Name": last_name,
        "Title": title,
        "Salary": salary,
        "Manager": manager,
        "Department": name,
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
  let query = 'SELECT employee.id, employee.first_name, employee.last_name, role.title '
  query += 'FROM role INNER JOIN employee ON employee.role_id = role.id RIGHT JOIN department ON department.id = role.department_id '
  query += 'WHERE ?'
  inquirer
    .prompt({
      name: 'dept',
      type: 'list',
      message: "Which department's employees would you like to view?",
      choices: ['Sales', 'Engineering', 'Legal']
    })
    .then((answer) => {
      connection.query(query, { name: answer.dept }, (err, res) => {
        const empArray = [];
        res.forEach(({ id, first_name, last_name, title }) => {
          const empObject = {
            "ID": id,
            "First Name": first_name,
            "Last Name": last_name,
            "Title": title,
          }
          empArray.push(empObject);
        });
        console.table(empArray);
        start();
      })
    })
};

// First inquirer prompt to display which role, then simple query that will display all employees - probably use console.table
const viewAllEmpByRole = () => {
  console.log('Will view all roles');
  let query = 'SELECT employee.id, employee.first_name, employee.last_name, role.salary '
  query += 'FROM role INNER JOIN employee ON employee.role_id = role.id RIGHT JoIN department ON department.id = role.department_id '
  query += 'WHERE ?'
  inquirer
    .prompt({
      name: 'role',
      type: 'list',
      message: 'Which role would you like to view?',
      choices: ["Salesperson", "Sales Lead", "Software Engineer", "Lead Enginer", "Lawyer", "Legal Team Lead"]
    })
    .then((answer) => {
      connection.query(query, { title: answer.role }, (err, res) => {
        const empArray = []
        res.forEach(({ id, first_name, last_name, salary },) => {
          const empObject = {
            "ID": id,
            "First Name": first_name,
            "Last Name": last_name,
            "Salary": salary
          }
          empArray.push(empObject);
        })
        console.table(empArray);
        start();
      })
    })
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
  connection.query('SELECT * FROM department', (err, res) => {
    if (err) throw err;
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
          name: 'deptID',
          type: 'list',
          message: 'Please name the department the role will be in.',
          choices() {
            const deptArray = [];
            for (let i = 0; i < res.length; i++) {
              deptArray.push(`${i + 1} ${res[i].name}`);
            }
            return deptArray;
          },
        }])
      .then((answer) => {
        connection.query('INSERT INTO role SET ?',
          {
            title: answer.addRole,
            salary: answer.addRoleSalary,
            department_id: answer.deptID.split('')[0]
          },
          (err) => {
            if (err) throw err;
            console.log('Your role has been added.');
            start();
          });
      });
  })
};

// Insert information using query
const addEmployee = () => {
  console.log('Will add an employee');
  connection.query('SELECT * FROM role', (err, res) => {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: 'addEmpFirstName',
          type: 'input',
          message: "Please enter the first name of the employee you'd like to add.",
        },
        {
          name: 'addEmpLastName',
          type: 'input',
          message: "Please enter the last name of the employee you'd like to add.",
        },
        {
          name: 'roleID',
          type: 'list',
          message: 'Please name of the role the employee will have.',
          choices() {
            const roleArray = [];
            for (let i = 0; i < res.length; i++) {
              roleArray.push(`${i + 1} ${res[i].title}`);
            }
            return roleArray;
          },
        }])
      .then((answer) => {
        connection.query('INSERT INTO employee SET ?',
          {
            first_name: answer.addEmpFirstName,
            last_name: answer.addEmpLastName,
            role_id: answer.roleID.split('')[0]
          },
          (err) => {
            if (err) throw err;
            console.log('Your role has been added.');
            start();
          });
      });
  })
};
const updateEmployeeRole = () =>{
  connection.query("SELECT employee.id, concat(employee.first_name, ' ' ,  employee.last_name) AS Employee FROM employee ;",  
      function (err, empRes)  {
        inquirer
          .prompt([
            {
              name: 'name',
              type: 'list',
              message: 'Select employee?',
              choices: function(){
                    var empArray=[];
                    console.log(empRes.length)
                    for(let i=0; i < empRes.length; i++){
                      empArray.push(empRes[i].Employee);
                    }
                    return empArray;
                  }
              },
            ]).then(function(answer){
                          let empId;
                          for (let i=0; i < empRes.length; i++){
                                if(empRes[i].Employee===answer.name){
                                  empId=empRes[i].id;
                                  console.log(empId);
                                }
                          }
                      connection.query("SELECT * FROM role ORDER BY title;",
                      function (err, res)  {
                          inquirer
                          .prompt([
                                {name: 'role',
                                  type: 'list',
                                  message: "What is the employee's role?",
                                  choices: function(){
                                    var roleArray=[];
                                    for(let i=0; i < res.length; i++){
                                      roleArray.push(res[i].title);
                                    }
                                    return roleArray;
                                  }
                                  },
                                ]).then (function (answer){
                                  let roleId;
                                  for (let i=0; i < res.length; i++){
                                    if(res[i].title===answer.role){
                                      roleId=res[i].id;
                                      console.log(roleId);
                                    }
                                  }
                                connection.query('UPDATE employee SET role_id=? WHERE id=?;',
                                  [roleId, empId]
                                  , function(err){
                                    if (err) throw err;
                                    console.log("Employee role updated")
                                    start();
                                  }
                                )
                          })
                      })
          })
  })
}

// const updateEmployeeRole = () => {
//   connection.query('SELECT role.title, employee.role_id, CONCAT(first_name, " ", last_name) AS employee_name FROM employee INNER JOIN role ON employee.role_id = role.id', (err, res) => {
//     inquirer
//       .prompt([
//         {
//           name: 'name',
//           type: "list",
//           message: "What is the employee's name that needs the job title change?",
//           choices() {
//             const empArray = [];
//             res.forEach(({ employee_name }) => {
//               empArray.push(employee_name);
//             })
//             return empArray;
//           },
//         },
//         {
//           name: 'role',
//           type: "list",
//           message: "What is their new role?",
//           choices() {
//             const roleArray = [];
//             res.forEach(({ title }) => {
//               roleArray.push(title);
//             })
//             return roleArray;
//           },
//         }
//       ])
//       .then((answer) => {
//         connection.query(
//           'UPDATE role SET ? WHERE ?',
//           [{
//             title: answer.role
//           },
//           {
//             first_name: answer.name.split(' ')[0]
//           }],
//           (err) => {
//             if (err) throw err;
//             console.log("The employee's role has been updated.");
//             start();
//           }
//         )
//       });
//   })
// };

// Simple query that will display all employees - probably use console.table
// const updateEmployeeRole = () => {
//   console.log("Will update an employee's role");
//   connection.query('SELECT * FROM employee', (err, res) => {
//     if (err) throw err;
//     inquirer
//       .prompt([
//         {
//           name: 'empFirstName',
//           type: 'list',
//           message: "Please select the first name of the employee whose role you'd like to update.",
//           choices() {
//             const firstNameArray = [];
//             for (let i = 0; i < res.length; i++) {
//               firstNameArray.push(`${i + 1} ${res[i].first_name}`);
//             }
//             return firstNameArray;
//           }
//         }
//       ])
//       .then((answer) => {
//         connection.query('UPDATE employee SET ? WHERE ? =', (err, res) => {
//           if (err) throw err;
//           inquirer
//             .prompt([
//               {
//                 name: 'updateEmpRole',
//                 type: 'list',
//                 message: "Please select the role you'd like to update for the employee.",
//                 choices() {
//                   const roleArray = [];
//                   for (let i = 0; i < res.length; i++) {
//                     roleArray.push(`${i + 1} ${res[i].title}`);
//                   }
//                   return roleArray;
//                 }
//               },
//             ])
//             .then((answer) => {
//               connection.query('INSERT INTO role SET ?',
//                 {
//                   title: answer.udateEmpRole.split('')[0],
//                 },
//                 (err) => {
//                   if (err) throw err;
//                   console.log("Your employee'sole has been updated.");
//                   start();
//                 });
//             });
//        });