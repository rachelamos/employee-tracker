DROP DATABASE IF EXISTS emp_trackerDB;

CREATE DATABASE emp_trackerDB;

USE emp_trackerDB;

CREATE TABLE department (
    id INT PRIMARY KEY
    name VARCHAR(30)
);

CREATE TABLE role (
    id INT PRIMARY KEY
    title VARCHAR(30)
    salary DECIMAL
    department_id INT
);

CREATE TABLE employee (
    id INT PRIMARY KEY
    first_name VARCHAR(30)
    last_name VARCHAR(30)
    role_id INT
    manager_id INT
);

INSERT INTO department (name)
VALUES ("Sales"), ("Engineering"), ("Legal");

INSERT INTO role (title, salary, department_id)
VALUES ("Salesperson", 80000, 1), ("Sales Lead", 120000, 1), ("Software Engineer", 115000, 2), ("Lead Engineer", 160000, 2), ("Lawyer", 160000, 3), ("Legal Team Lead", 210000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Rachel", "Amos", 1), ("Payton", "Whinnery", 2), ("Caroline", "Miller", 3), ("Jackie", "Hodges", 4), ("Molly", "Gilbert", 5), ("Walter", "Perry", 6), ("Natalie", "Guidry", 7), ("Arwen", "Amos", 8), ("Sarah", "Bishop", 9), ("Jordan", "Watson", 10);