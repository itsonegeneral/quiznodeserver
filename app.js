
const mQuestions = require('./modules/questions');
const mAdmin = require('./modules/admin.js');
const mysql = require('mysql');
const express = require('express');
const cors = require('cors');
var app = express();

app.use(cors());


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

var mysqlConnection = mysql.createConnection({
    host:'knackdb.cigwhmgnsi5e.us-east-2.rds.amazonaws.com',
    user : 'knackrootadmin',
    password:'adminknack',
    port:'3306',
    database : 'knackapp'
});

mysqlConnection.connect((err)=>{
    if(!err){
        console.log('Connected');
    }else{
        console.log("Failed "+ JSON.stringify(err))
    }
});


app.listen(process.env.PORT||8080,()=>console.log('Listening to port %d'));

app.get('/test',(req,res)=>{
    mQuestions.allquestions(req,res,mysqlConnection);
});

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

//Admin Dashboard routes

app.get('/totalstatus',(req,res)=>{
   mAdmin.totalstatus(req,res,mysqlConnection);
});

app.get('/adminstatus',(req,res)=>{
    mAdmin.adminstatus(req,res,mysqlConnection);
});
