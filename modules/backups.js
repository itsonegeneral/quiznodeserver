

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



connection.query('select * from db.table;', function(err, results, fields) {
    if(err) throw err;

    fs.writeFile('table.json', JSON.stringify(results), function (err) {
      if (err) throw err;
      console.log('Saved!');
    });

    connection.end();
});