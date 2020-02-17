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


app.listen(process.env.PORT||5000,()=>console.log('Listening to port'));

app.get('/test',(req,res)=>{
    var query = "SELECT * FROM questions;"
    mysqlConnection.query(query,(err,rows,fields)=>{
        if(!err){
            res.set(200).json({
                status: 'ok',
                questions : rows
            });
        }else{
            res.set(500).json({
                status : 'Error',
                message : JSON.stringify(err)
            });
        }
    });
});

app.get('/time',(req,res)=>{
    var response= {
        time : new Date().getTime(),
        questions : [
        ]
    };
    res.send(response);
});

app.get('/addquestion',(req,res)=>{
    console.log(req.query.question);


    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    

    var quest = JSON.parse(req.query.question);
    var query = "INSERT INTO questions " +  '(question,option1,option2,option3,option4,answer,parentCategory,category,level,adminEmail) ' + 
                    " VALUES ( '" + quest.question + "','" + quest.option1 + "','" + quest.option2 + "','" + quest.option3 + "','" + quest.option4 + "','" + 
                    quest.answer + "','" + quest.parentCategory + "','" +quest.category + "'," +  quest.level + ",'" + quest.adminEmail+ "');";
    console.log("\n" + query +"\n");

    mysqlConnection.query(query,(err,rows,fields)=>{
        if(!err){
            res.json({
                status : 'sucess'
            })
        }else{
            res.set(500).json({
                status : "Error",
                message : JSON.stringify(err)
            })
        }
    })
});

app.get('/totalstatus',(req,res)=>{
    var query = "SELECT count(*),category from questions group by category";

    mysqlConnection.query(query,(err,rows,fields)=>{
        if(!err){
            var array = [];

            var response = {
                status : 'success',
                data : JSON.parse(JSON.stringify(rows))
            }
            res.set(200).json(response);
        }else{
            res.set(500).json(err);
        }
    });
});


app.get('/userstatus',(req,res)=>{
    var query = "SELECT count(*),adminemail from questions group by adminemail";
    mysqlConnection.query(query,(err,rows,fields)=>{
        if(!err){
            res.set(200).json(rows);
        }else{
            res.set(500).json(err);
        }
    });
});

app.get('/getquestions',(req,res)=>{
    console.log('Get Questions');
    var category = req.query.category;
    var limit = req.query.limit;
    var query = "SELECT * from questions where category = '" + category +"' ORDER BY RAND() LIMIT " + limit + ";";

    mysqlConnection.query(query,(err,rows,fields)=>{
        if(!err){
           res.set(200).json(rows);
        }
        else{
            res.set(200).json(err);
        }
    })
});
