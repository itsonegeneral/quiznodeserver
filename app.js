
const mQuestions = require('./modules/questions');
const mAdmin = require('./modules/admin.js');
const mGameplay = require('./modules/gameplay.js');
const mysql = require('mysql');
const express = require('express');
const cors = require('cors');
var app = express();
var dataArray = [];
const fs = require('fs');


app.use(cors());


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  /*
var mysqlConnection = mysql.createConnection({
    host:'knackdb.cigwhmgnsi5e.us-east-2.rds.amazonaws.com',
    user : 'knackrootadmin', 
    password:'adminknack',
    port:'3306',
    database : 'knackapp'
});

*/
var mysqlConnection = mysql.createConnection({
    host:'sql12.freemysqlhosting.net',
    user : 'sql12326048',
    password:'tulp2jG9H3',
    port:'3306',
    database : 'sql12326048'
});


mysqlConnection.connect((err)=>{
    if(!err){
    console.log('Connected');

    }else{
        console.log("Failed "+ JSON.stringify(err))
    }
});


app.listen(process.env.PORT||8080,()=>console.log('Listening to port %d'));


app.get('/time',(req,res)=>{
    var response= {
        time : new Date().getTime(),
        questions : [
        ]
    };
    res.send(response);
});

//Question Routes

app.get('/addquestion',(req,res)=>{
    mQuestions.addquestion(req,res,mysqlConnection);
});


app.get('/getquestions',(req,res)=>{
    mQuestions.getquestions(req,res,mysqlConnection);
});

//Admin Dashboard

app.get('/totalstatus',(req,res)=>{
   mAdmin.totalstatus(req,res,mysqlConnection);
});

app.get('/adminstatus',(req,res)=>{
    mAdmin.adminstatus(req,res,mysqlConnection);
});

app.get('/getsubcategories',(req,res)=>{
    mAdmin.getSubCategories(req,res,mysqlConnection);
})

app.get('/addquizoption',(req,res)=>{
    mAdmin.addquizoption(req,res,mysqlConnection);
})

//User modules

app.get('/getcategories',(req,res)=>{
    mAdmin.getCategories(req,res,mysqlConnection);
});

app.get('/getquizoptions',(req,res)=>{
    mGameplay.getoptions(req,res,mysqlConnection);
});