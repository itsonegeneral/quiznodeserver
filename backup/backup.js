

const fs = require('fs');
const mysql = require('mysql');
const express = require('express');
const cors = require('cors');
var app = express();



app.use(cors());



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

    }else{
        console.log("Failed "+ JSON.stringify(err))
    }
});


app.listen(process.env.PORT||2580,()=>console.log('Listening to port %d'));


app.get('/restorequestion',(req,res)=>{

    let rawdata = fs.readFileSync('table.json');
    dataArray = JSON.parse(rawdata);


    for(let i=0;i<dataArray.length ; i++){
        console.log("Element " + i + " is " + dataArray[i]);
        saveQuestion(dataArray[i]);
    }

});

//Backup and restore
function saveQuestion(question){

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



app.get('/restorecategories',(req,res)=>{

    let rawdata = fs.readFileSync('categories.json');
    dataArray = JSON.parse(rawdata);


    for(let i=0;i<dataArray.length ; i++){
        console.log("Element " + i + " is " + dataArray[i].id);
        saveCategory(dataArray[i]);
    }
});

function saveCategory(category){
    let query = "INSERT INTO categories (categoryName,parentCategory,iconLink,type) VALUES ( '" + category.categoryName + "','" +
                        category.parentCategory +"','" + category.iconLink + "','"+ category.type + "');";
                        console.log(query);
    mysqlConnection.query(query,(err,rows,fields)=>{
        if(!err){
            console.log('Added ' + category.id);
        }else{
            console.log(err);
            console.log('Failed adding ' + category.id);
        }
    })
}


/*connection.query('select * from db.table;', function(err, results, fields) {
    if(err) throw err;

    fs.writeFile('table.json', JSON.stringify(results), function (err) {
      if (err) throw err;
      console.log('Saved!');
    });

    connection.end();
});

axios.get('https://node-server-quiz.herokuapp.com/getcategories').then(res=>{
    console.log(res.data.categories);

    fs.writeFile('categories.json', JSON.stringify(res.data.categories), function (err) {
        if (err) throw err;
        console.log('Saved!');
      });

}); */