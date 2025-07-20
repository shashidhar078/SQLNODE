const { faker } = require('@faker-js/faker');
const mysql =require('mysql2');

// Create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'sigma',
  password: 'root',
});

try{
    connection.query("SHOW TABLES",(err,results)=>{
    if(err) throw err;
    console.log(results);
    });
}
catch(err)
{
    console.log(err);
}

connection.end();

let createRandomUser = () => {
  return {
    userId: faker.string.uuid(),
    username: faker.internet.username(), // before version 9.1.0, use userName()
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
}

// console.log(createRandomUser());