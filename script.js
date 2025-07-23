//set up express and use routing 
const express=require("express");
const app=express();
const { faker } = require('@faker-js/faker');
const mysql =require('mysql2');
const path=require('path');

// Create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'sigma',
  password: 'root',
});

let createRandomUser = () => {
  return [
     faker.string.uuid(),
     faker.internet.username(), // before version 9.1.0, use userName()
     faker.internet.email(),
     faker.internet.password(),
  ];
}

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));

app.get("/",(req,res)=>{
    let q="select count(*) from user";
        try{
        connection.query(q,(err,results)=>{
        if(err)  throw err;
        console.log(results);
        let count=results[0]["count(*)"];
        console.log(results[0]["count(*)"]);
        res.render("home.ejs",{count});
        
    });
    }
    catch(err)
    {
        console.log(err);
        res.send(err);
    }
});
const port=8080;

app.listen(port,()=>{
    console.log(`app listens on ${port}`);
})





// connection.end();
