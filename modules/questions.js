const mysql = require('mysql');
const express = require('express');
const cors = require('cors');
var app = express();


module.exports.getquestions= function (req,res,con) {
        console.log('Get Questions');
        var category = req.query.category;
        var limit = req.query.limit;
        var query = "SELECT * from questions where category = '" + category +"' ORDER BY RAND() LIMIT " + limit + ";";
    
        con.query(query,(err,rows,fields)=>{
            if(!err){
                var response = {
                    status : "success",
                    data : JSON.parse(JSON.stringify(rows))
                }
               res.set(200).json(response);
            }
            else{
    
                res.set(200).json(err);
            }
        })
}

module.exports.addquestion = function(req,res,con){
    console.log(req.query.question);


    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    

    var quest = JSON.parse(req.query.question);
    var query = "INSERT INTO questions " +  '(question,option1,option2,option3,option4,answer,parentCategory,category,level,adminEmail) ' + 
                    " VALUES ( '" + quest.question + "','" + quest.option1 + "','" + quest.option2 + "','" + quest.option3 + "','" + quest.option4 + "','" + 
                     quest.answer + "','" + quest.parentCategory + "','" +quest.category + "'," +  quest.level + ",'" + quest.adminEmail+ "');";
    console.log("\n" + query +"\n");

    con.query(query,(err,rows,fields)=>{
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
}

module.exports.allquestions = function(req,res,con){
    var query = "SELECT * FROM questions;"
    con.query(query,(err,rows,fields)=>{
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
}