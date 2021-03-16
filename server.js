var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "your_new_password",
  database: "employees_db"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    trackerQuestions();
  });

  function trackerQuestions(){
    inquirer.prompt({
        message: "Please select an action",
        type: "list",
        choices: [
            "View Departments",
            "Add Department",
            "View Employees",
            "Add Employee",
            "Update Employee Role",
            "Add Role",
            "View Roles",
            "Exit"
        ],
        name: "choice"
    }).then(answers => {
        console.log(answers.choice + " it is!");
        switch (answers.choice) {
            case "View Departments":
                viewDepartments()
                break;
            case "Add Department":
                addDepartment()
                break;
            case "View Employees":
                viewEmployees()
                break;
            case "Add Employee":
                addEmployee()
                break;
            case "Update Employee Role":
                updateEmployeeRole()
                 break;
            case "Add Role":
                addRole()
                break;
            case "View Roles":
                viewRoles()
                break;
        }
    })
  }

  function viewDepartments() {
      connection.query("SELECT * FROM department", function (err, data) {
          console.table(data);
          trackerQuestions();
      })
  }

  function addDepartment() {
      inquirer.prompt([
          {
          type: "input",
          name: "name",
          message: "Please enter the name of the department you wish to add"
      } ]).then(function(res) {
          console.log(res, "response")
          connection.query("INSERT INTO departments SET ?", res.name, function(err, data) {
              if (err) throw (err);
              console.table("Success!");
              trackerQuestions();
          })
      })
  }

function viewEmployees() {
    connection.query("Select * from employee", function (err, data) {
        console.table(data);
        trackerQuestions();
    })
}

function addEmployee() {
    inquirer.prompt([{
        type: "input",
        name: "firstName",
        message: "Please enter the first name of the employee you wish to add"
},
{
    type: "input",
    name: "lastName",
    message: "Please enter the last name of the employee you wish to add"

},
{
    type: "input",
    name: "roleId",
    message: "Please enter the role ID of the employee you wish to add"
},
{
    type: "number",
    name: "managerId",
    message: "Please enter the ID of the manager of the employee you wish to add"
}]).then(function(res) {
    connection.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [res.firstName, res.lastName, res.roleId, res.managerId], function(err, data) {
        if (err) throw err;
        console.table("Success!");
        trackerQuestions();
    })
})
}

function updateEmployeeRole() {
    inquirer.prompt([
        {
         message: "Please enter the first name of the employee you wish to update",
         type: "input",
         name: "name"   
        },
        {
            message: "Please enter the role ID you wish to update",
            type: "number",
            name: "role_id"
        }
    ]).then(function (response) {
        connection.query("UPDATE employee SET role_id = ? WHERE first_name = ?", [response.role_id, response.name], function (err, data){
            console.table(data);
        })
    })
}
function addRole() {
    inquirer.prompt([
        {
            message: "Please enter the title of the role you wish to add",
            type: "input",
            name: "title"
        },
        {
            message: "Please enter the salary of the role you wish to add",
            type: "number",
            name: "salary"
        },
        {
            message: "Please enter the department ID of the role you wish to add",
            type: "number",
            name: "department_id"
        }
    ]).then(function (response) {
        connection.query("INSERT INTO role (title, salary, department_id) values (?, ?, ?)", [response.title, response.salary, response.department_id], function (err, data) {
            console.table(data);
        })
        trackerQuestions();
    })
}

function viewRoles() {
    connection.query("SELECT * FROM role", function (err, data) {
        console.table(data);
        trackerQuestions();
    })
}