create table user(
    id int primary key,
    userName varchar(20) NOT NULL,
    userEmail varchar(20) UNIQUE NOT NULL,
    password varchar(20) NOT NULL
);
-- show tables;