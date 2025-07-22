create table user(
    id varchar(40) primary key,
    userName varchar(40) NOT NULL,
    userEmail varchar(40) UNIQUE NOT NULL,
    password varchar(40) NOT NULL
);
-- show tables;