INSERT INTO department (name) VALUES
('Human Resources'),
('Engineering'),
('Finance'),
('Marketing');


INSERT INTO role (title, salary, department_id) VALUES
('HR Manager', 65000.00, 1),
('Software Engineer', 85000.00, 2),
('Senior Engineer', 115000.00, 2),
('Accountant', 55000.00, 3),
('Marketing Coordinator', 48000.00, 4);


INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
('John', 'Doe', 1, NULL), -- HR Manager has no manager
('Jane', 'Smith', 2, 1), -- Software Engineer reports to HR Manager
('Emily', 'Johnson', 2, 1), -- Another Software Engineer reports to HR Manager
('Robert', 'Brown', 3, 1), -- Senior Engineer reports to HR Manager
('Michael', 'Davis', 4, 1), -- Accountant reports to HR Manager
('Jennifer', 'Wilson', 5, 1); -- Marketing Coordinator reports to HR Manager
