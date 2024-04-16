
--View all departments
SELECT id AS "Department ID", name AS "Department Name"
FROM department;

--View all roles
SELECT r.id AS "Role ID", r.title AS "Job Title", d.name AS "Department", r.salary AS "Salary"
FROM role r
JOIN department d ON r.department_id = d.id;

--View all employees
SELECT e.id AS "Employee ID", e.first_name AS "First Name", e.last_name AS "Last Name", r.title AS "Job Title", d.name AS "Department", r.salary AS "Salary", CONCAT(m.first_name, ' ', m.last_name) AS "Manager"
FROM employee e
JOIN role r ON e.role_id = r.id
JOIN department d ON r.department_id = d.id
LEFT JOIN employee m ON e.manager_id = m.id;

--Add a department
INSERT INTO department (name)
VALUES ('New Department Name'); -- Replace 'New Department Name' with the user input

--add arole
INSERT INTO role (title, salary, department_id)
VALUES ('New Role Title', New Role Salary, Department ID); -- Replace placeholders with user input

--Add an employee
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('First Name', 'Last Name', Role ID, Manager ID); -- Replace placeholders with user input

--Update an employee's role
UPDATE employee
SET role_id = New Role ID -- Replace with the new role ID
WHERE id = Employee ID; -- Replace with the employee's ID

--Update employee manager
UPDATE employee
SET manager_id = New Manager ID -- Replace with the new manager's ID or NULL if no manager
WHERE id = Employee ID; -- Replace with the employee's ID

--View employees by manager
SELECT e.id, e.first_name, e.last_name, r.title
FROM employee e
INNER JOIN employee m ON e.manager_id = m.id
INNER JOIN role r ON e.role_id = r.id
WHERE m.id = Manager ID; -- Replace with the manager's ID

--View employees by department
SELECT e.id, e.first_name, e.last_name, r.title
FROM employee e
INNER JOIN role r ON e.role_id = r.id
INNER JOIN department d ON r.department_id = d.id
WHERE d.id = Department ID; -- Replace with the department's ID

--Delete a department (including related roles and cascading to employees)
DELETE FROM department
WHERE id = Department ID; -- Replace with the department's ID

--View the total utilized budget of a department
SELECT d.name AS "Department", SUM(r.salary) AS "Total Salary"
FROM employee e
JOIN role r ON e.role_id = r.id
JOIN department d ON r.department_id = d.id
WHERE d.id = Department ID -- Replace with the department's ID
GROUP BY d.name;

ALTER TABLE employee DROP CONSTRAINT IF EXISTS fk_role;
DELETE FROM employee WHERE last_name = 'Shafee';
ALTER SEQUENCE employee_id_seq RESTART WITH <correct_value>;
ALTER SEQUENCE employee_id_seq RESTART WITH 7;

