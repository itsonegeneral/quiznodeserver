
const mQuestions = require('./modules/questions');
const mAdmin = require('./modules/admin.js');
const mGameplay = require('./modules/gameplay');
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


app.listen(process.env.PORT||5000,()=>console.log('Listening to port %d'));


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

//User modules

app.get('/getcategories',(req,res)=>{
    mAdmin.getCategories(req,res,mysqlConnection);
});

app.get('/getquizoptions',(req,res)=>{
    mGameplay.getquizoptions(req,res,mysqlConnection);
})



//Backup and restore
/*function saveQuestion(question){

    var quest = question;
    var query = "INSERT INTO questions " +  '(question,option1,option2,option3,option4,answer,parentCategory,category,level,adminEmail) ' + 
                    " VALUES ( '" + quest.question + "','" + quest.option1 + "','" + quest.option2 + "','" + quest.option3 + "','" + quest.option4 + "','" + 
                     quest.answer + "','" + quest.parentCategory + "','" +quest.category + "'," +  quest.level + ",'" + quest.adminEmail+ "');";

    console.log("\n" + query +"\n");

    mysqlConnection.query(query,(err,rows,fields)=>{
        if(!err){
            console.log('success added ' + quest.id);
        }else{
           console.log('faield at ' + quest.id);
        }
    })
}




        let rawdata = fs.readFileSync('table.json');
        dataArray = JSON.parse(rawdata);
    
        
        for(let i=0;i<dataArray.length ; i++){
            console.log("Element " + i + " is " + dataArray[i]);
            saveQuestion(dataArray[i]);
        }



app.get('/restore',(req,res)=>{

    let rawdata = fs.readFileSync('table.json');
    dataArray = JSON.stringify(rawdata);
    
    for(let i=0;i<dataArray.length ; i++){
        saveQuestion(dataArray[i]);
    }

});
*/