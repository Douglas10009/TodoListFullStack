CREATE DATABASE if not EXISTS todoList;

USE todoList 

CREATE TABLE
    IF NOT EXISTS tasks(
        id INT PRIMARY KEY AUTO_INCREMENT,
        title VARCHAR(45) NOT NULL,
        status VARCHAR(45) NOT NULL,
        created_at VARCHAR(45) NOT NULL
    );