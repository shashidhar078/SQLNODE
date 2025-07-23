//set up express and use routing 
const express=require("express");
const app=express();
const { faker } = require('@faker-js/faker');
const mysql =require('mysql2');
const path=require('path');
const methodOverride=require('method-override');

app.use(methodOverride('_method'));
app.use(express.urlencoded({extended:true}));

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

//Home route
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

//show users 
app.get("/user",(req,res)=>{
    let q="select * from user";
        try{
          connection.query(q,(err,users)=>{
          if(err)  throw err;
            res.render("showusers.ejs",{users});
        });
    }
    catch(err)
    {
        console.log(err);
        res.send(err);
    }

});

//Edit route
app.get("/user/:id/edit",(req,res)=>{
    let {id} = req.params;
    console.log(id);
    let q=`select * from user where id = '${id}'`;
        try{
          connection.query(q,(err,results)=>{
          if(err)  throw err;
          console.log(results);
          let user=results[0];
            res.render("edit.ejs",{user});
        });
    }
    catch(err)
    {
        console.log(err);
        res.send(err);
    }
    
});

app.patch("/user/:id",(req,res)=>{
    res.send("updated");
});

const port=8080;

app.listen(port,()=>{
    console.log(`app listens on ${port}`);
})





// connection.end();
//There is no need of connection.end() since connection will be closed
//automatically after the termination of the function or route responsible
