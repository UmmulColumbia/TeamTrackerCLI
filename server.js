const express = require("express");
const inquirer = require('inquirer');
const { Pool } = require('pg');

const PORT = process.env.PORT || 3001;
const app = express();
// PostgreSQL database configuration
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'employee_db',
  password: 'postgres',
  
});

const mainMenu = () => {
  inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: [
        'View All Departments',
        'View All Roles',
        'View All Employees',
        'Add a Department',
        'Add a Role',
        'Add an Employee',
        'Update an Employee Role',
        'Exit'
      ],
    }
  ]).then((answers) => {
    switch (answers.action) {
      case 'View All Departments':
        viewDepartments();
        break;
      case 'View All Roles':
        viewRoles();
        break;
      case 'View All Employees':
        viewEmployees();
        break;
      case 'Add a Department':
        addDepartment();
        break;
      case 'Add a Role':
        addRole();
        break;
      case 'Add an Employee':
        addEmployee();
        break;
      case 'Update an Employee Role':
        updateEmployeeRole();
        break;
      case 'Exit':
        process.exit();
      default:
        console.log(`Invalid action: ${answers.action}`);
        mainMenu();
        break;
    }
  });
};

const viewDepartments = async () => {
  const query = 'SELECT id AS "Department ID", name AS "Department Name" FROM department;';
  try {
    const res = await pool.query(query);
    console.table(res.rows);
  } catch (err) {
    console.error(err);
  }
  mainMenu();
};

const viewRoles = async () => {
  const query = `
    SELECT r.id AS "Role ID", r.title AS "Job Title", d.name AS "Department", r.salary AS "Salary"
    FROM role r
    JOIN department d ON r.department_id = d.id;
  `;
  try {
    const res = await pool.query(query);
    console.table(res.rows);
  } catch (err) {
    console.error(err);
  }
  mainMenu();
};

const viewEmployees = async () => {
  const query = `
  select * from employee
    
  `;
  try {
    const res = await pool.query(query);
    console.table(res.rows);
  } catch (err) {
    console.error(err);
  }
  mainMenu();
};

const addDepartment = () => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'departmentName',
      message: 'Enter the name of the new department:',
    }
  ]).then(async (answers) => {
    const query = 'INSERT INTO department (name) VALUES ($1);';
    try {
      await pool.query(query, [answers.departmentName]);
      console.log('Department added successfully!');
    } catch (err) {
      console.error(err);
    }
    mainMenu();
  });
};

//  functions for addRole, addEmployee, updateEmployeeRole
const addRole = () => {
    inquirer.prompt([
      {
        type: 'input',
        name: 'roleTitle',
        message: 'Enter the title of the new role:',
      },
      {
        type: 'input',
        name: 'salary',
        message: 'Enter the salary for the new role:',
      },
      {
        type: 'input',
        name: 'departmentId',
        message: 'Enter the department ID for the new role:',
      }
    ]).then(async (answers) => {
      const query = 'INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3);';
      try {
        await pool.query(query, [answers.roleTitle, parseFloat(answers.salary), parseInt(answers.departmentId)]);
        console.log('Role added successfully!');
      } catch (err) {
        console.error('Error adding role:', err.message);
      }
      mainMenu();
    });
  };
  

  //add  an employee
  const addEmployee = async () => {
    const employeeDetails = await inquirer.prompt([
      {
        type: 'input',
        name: 'firstName',
        message: 'Enter the first name of the employee:',
        validate: input => input.trim() === "" ? "This field cannot be empty." : true
      },
      {
        type: 'input',
        name: 'lastName',
        message: 'Enter the last name of the employee:',
        validate: input => input.trim() === "" ? "This field cannot be empty." : true
      },
      {
        type: 'input',
        name: 'roleId',
        message: 'Enter the role ID for the new employee:',
        validate: input => {
          if (!input.length) {
            return "Role ID cannot be empty.";
          } else if (!/^\d+$/.test(input)) {
            return "Please enter a valid numeric Role ID.";
          }
          return true;
        }
      },
      {
        type: 'input',
        name: 'managerId',
        message: 'Enter the manager ID for the new employee (leave blank if no manager):',
        validate: input => {
          if (input.length === 0) {
            return true; // Allow empty input for manager
          } else if (!/^\d+$/.test(input)) {
            return "Please enter a valid numeric Manager ID or leave this field empty.";
          }
          return true;
        }
      }
    ]);
  
    // Convert managerId to an integer or null
    const managerId = employeeDetails.managerId ? parseInt(employeeDetails.managerId) : null;
  
    const query = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)RETURNING *;';
    try {
        const res =  await pool.query(query, [
        employeeDetails.firstName,
        employeeDetails.lastName,
        parseInt(employeeDetails.roleId),
        managerId
      ]);
      console.log('Employee added successfully!');
      console.table(res.rows); // This will display the inserted employee's details in a table format
     
    } catch (err) {
      console.error('Error adding employee:', err.message);
    }
    mainMenu();
  };
  
mainMenu(); // Start the application
