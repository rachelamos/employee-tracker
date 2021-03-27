DROP DATABASE IF EXISTS emp_trackerDB;

CREATE DATABASE emp_trackerDB;

USE emp_trackerDB;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(12) NOT NULL,
    department_id INT NOT NULL,
    -- INDEX dept_id (department_id),
    PRIMARY KEY (id),
    FOREIGN KEY (department_id) REFERENCES department(id),
        -- REFERENCES department(id)
        -- ON DELETE CASCADE,
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT NULL,
    -- INDEX roleIndex_id (role_id),
    PRIMARY KEY (id),
    FOREIGN KEY (role_id) REFERENCES role(id),
        -- REFERENCES role(id)
        -- ON DELETE CASCADE,

    -- INDEX mgr_id (manager_id),
    FOREIGN KEY (manager_id) REFERENCES employee(id),
        -- REFERENCES employee(id)
        -- ON DELETE SET NULL,
);

INSERT INTO department (name)
VALUES ("Sales"), ("Engineering"), ("Legal");

INSERT INTO role (title, salary, department_id)
VALUES ("Salesperson", 80000, 1), ("Sales Lead", 120000, 1), ("Software Engineer", 115000, 2), ("Lead Engineer", 160000, 2), ("Lawyer", 160000, 3), ("Legal Team Lead", 210000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Rachel", "Amos", 3, 7), ("Payton", "Whinnery", 3, 1), ("Caroline", "Miller", 1, 4), ("Jackie", "Hodges", 2, NULL), ("Molly", "Gilbert", 5, 6), ("Walter", "Perry", 5, 6), ("Natalie", "Guidry", 4, NULL), ("Arwen", "Amos", 1, 4), ("Sarah", "Bishop", 5, 6), ("Jordan", "Watson", 6, NULL);
