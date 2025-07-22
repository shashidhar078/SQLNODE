const { faker } = require('@faker-js/faker');
const mysql =require('mysql2');

// Create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'sigma',
  password: 'root',
});

// try{
//     connection.query('Select userEmail from user where userName="shashi"',(err,results)=>{
//     if(err) throw err;
//     console.log(results);
//     console.log(results.length);
//     console.log(results[0]);
//     console.log(results[1]);
//     });
// }
//inserting data into table only single 
// let q="Insert into user values(?,?,?,?)";
// let user=[2,"sai charan","charan@gmail.com","charan123"];
// try{
//     connection.query(q,user,(err,results)=>{
//     if(err) throw err;
//     console.log(results);
//     console.log(results.length);
//     console.log(results[0]);
//     console.log(results[1]);
//     });
// }
// catch(err)
// {
//     console.log(err);
// }

// inserting multiple data 
//we are actually keeping static our own data using placeholders
// let q="insert into user values ?";
// let users=[[3,"vignesh","vignesh@gmail.com","vignesh123"],
// [4,"ram charan","ram@gmail.com","ram123"]];

// try{
//     connection.query(q,[users],(err,results)=>{
//     if(err) throw err;
//     console.log(results);
//   });
// }
// catch(err)
// {
//   console.log(err);
// }
//now lets insert bulk data using faker
let createRandomUser = () => {
  return [
     faker.string.uuid(),
     faker.internet.username(), // before version 9.1.0, use userName()
     faker.internet.email(),
     faker.internet.password(),
  ];
}

let q="insert into user values ?";
let data=[];
for(let i=0;i<100;i++)
{
  data.push(createRandomUser());
}

try{
    connection.query(q,[data],(err,results)=>{
    if(err)  throw err;
    console.log(results);
  });
}
catch(err)
{
  console.log(err);
}
connection.end();



// console.log(createRandomUser());