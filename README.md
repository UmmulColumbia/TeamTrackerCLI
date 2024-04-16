# TeamTrackerCLI
## Description
This TeamTrackerCLI is a command-line application for Employee Management System.It is designed to help business owners view and manage departments, roles, and employees within their company. Built using Node.js, Inquirer, and PostgreSQL, this application offers a robust solution for organizing and planning business operations.

## Features
- View All Departments: Display a formatted table showing department names and IDs.
- View All Roles: Show all roles including job titles, role IDs, department, and salaries.
- View All Employees: List all employees with details such as IDs, names, roles, departments, salaries, and managers.
- Add a Department: Add a new department to the database.
- Add a Role: Create a new role with associated salary and department.
- Add an Employee: Add a new employee with details including their role and manager.
- Update an Employee Role: Modify the role of an existing employee.

## Installation
## Prerequisites
- Node.js
- PostgreSQL
- npm (Node Package Manager)
## Setting Up the Project
- Clone the repository
- Install dependencies
- Set up the PostgreSQL database:
Ensure PostgreSQL is installed and running on your system.
Create a new database named employee_db.
Import the provided SQL schema and seed data
- Configure your database connection:
- Update the PostgreSQL connection settings in server.js to match database configuration:
- const pool = new Pool({
  user: 'yourUsername',
  host: 'localhost',
  database: 'employee_db',
  password: 'yourPassword',
});

## Usage
To run the application, navigate to the project directory in your terminal and run:
- node server.js
- Follow the on-screen prompts to manage your company's employee database.

## License
This project is licensed under the MIT License

#### Start managing your company’s workforce today—effortlessly and efficiently!

