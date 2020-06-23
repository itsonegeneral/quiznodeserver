
const mQuestions = require('./modules/questions');
const mAdmin = require('./modules/admin.js');
const mGameplay = require('./modules/gameplay.js');
const mFriends = require('./modules/friends.js');
const mysql = require('mysql');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
var app = express();
var dataArray = [];
const axios = require('axios');
const fs = require('fs');



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
//to remove the huge latency of serving web pages
app.use(express.static(__dirname + '/html'));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

var mysqlConnection = mysql.createConnection({
    host:'mysql5025.site4now.net',
    user : 'a56f9c_knackap',
    password:'knackdatabase1',
    port:'3306',
    database : 'db_a56f9c_knackap'
}); 

mysqlConnection.connect((err)=>{
    if(!err){
    console.log('Connected');
    setInterval(()=>{
        console.log("Server refreshed");
        mysqlConnection.query("SELECT * from categories");
    },7000);
    }else{
        console.log("Failed with errorno :"+err.errno + " and Errorcode : "+ err.code);
        mysqlConnection.connect((err)=>{});
    }
});



app.listen(process.env.PORT||8080,()=>console.log('Listening to port %d',process.env.PORT));


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

app.get('/',(req,res)=>{
    res.writeHead(200,{'Content-Type':'text/html'});
    fs.readFile('./html/index.html',(error,data)=>{
        if(error){
            res.write(error);
        }
        else{
          res.write(data);
        }
    })
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
app.get('/getquizoptions',(req,res)=>{
    mAdmin.getquizoptions(req,res,mysqlConnection);
})

app.get('/getadminquestions',(req,res)=>{
    mAdmin.getadminquestions(req,res,mysqlConnection);
});

app.get('/deletequestion',(req,res)=>{
    mAdmin.deletequestion(req,res,mysqlConnection);
});
//User modules

app.get('/getcategories',(req,res)=>{
    mAdmin.getCategories(req,res,mysqlConnection);
});

app.get('/getquizoptions',(req,res)=>{
    mGameplay.getoptions(req,res,mysqlConnection);
});

//Friend management

app.post('/friends/sendrequest',(req,res)=>{
    mFriends.sendFriendRequest(req,res,mysqlConnection);
})