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