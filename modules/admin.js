
module.exports.totalstatus = function(req,res,con){
    var query = "SELECT count(*),category from questions group by category";

    con.query(query,(err,rows,fields)=>{
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
}

module.exports.adminstatus = function(req,res,con){
    var query = "SELECT count(*),adminemail from questions group by adminemail";
    con.query(query,(err,rows,fields)=>{
        if(!err){
            res.set(200).json(rows);
        }else{
            res.set(500).json(err);
        }
    });
}

module.exports.getCategories = function(req,res,con){
    let query = "SELECT * FROM categories";
    con.query(query,(err,rows,fields)=>{
        if(!err){
            
            var data = JSON.parse(JSON.stringify(rows));
            var categories  = [];
            var parentCategories = [];
            for(var i =0 ;i<data.length ;i ++){
                if(data[i].type === "subcategory"){
                    categories.push(data[i]);
                }else{
                    parentCategories.push(data[i]);
                }
            }
            var response = {
                status : "success",
                categories,
                parentCategories
            }
            res.set(200).json(response);
        }else{
            res.set(500).json(err);
        }
    });
}

module.exports.getSubCategories = function(req,res,con){
    let cat = req.query.category;
    let query ;
    if(cat === undefined){
        query= "SELECT * FROM categories WHERE type='subcategory' ;" 
    }else{
        query= "SELECT * FROM categories WHERE type='subcategory' AND parentCategory='" +cat  + "';" 
    }
    

    con.query(query,(err,rows,fields)=>{
        if(!err){
            res.set(200).json({
                status : "success",
                data : JSON.parse(JSON.stringify(rows))
            });
        }else{
            res.set(500).json(err);
        }
    });

}

module.exports.addquizoption = function(req,res,con){
    let option = JSON.parse(req.query.option);
    console.log(option);
    let query = "INSERT INTO quizoptions (title,catid,rewardcoins,description,entrycoins,gametime,questionsize,difficulty) VALUES ('" + option.title +"'," + 
                        option.catid + "," + option.rewardcoins + ",'" + option.description + "'," + option.entrycoins+ "," + option.gametime +"," +
                        option.questionsize + "," + option.difficulty + ");";

    console.log(query);
    con.query(query,(err,rows,fields)=>{
        if(!err){
            res.set(200).json({
                status : 'success'
            })
            console.log("Added question")
        }else{
            console.log(err);
            res.set(500).json(err);
        }
    });
}

module.exports.getquizoptions = function(req,res,con){
    let cat = req.query.cat;
    let query = '';
    if(cat === undefined){
        query = "SELECT * FROM quizoptions ;"
    }else{
        query = "SELECT * FROM quizoptions,categories WHERE quizoptions.catid = categories.id AND categoryName='" + cat  + "';"
    }
    con.query(query,(err,rows,fields)=>{
        if(!err){
            let resp ={
                status : 'success',
                data : JSON.parse(JSON.stringify(rows))
            }
            res.set(200).json(resp);
        }else{
            res.set(500).json(rows);
        }
    })

}
module.exports.getadminquestions = function(req,res,con){
    let email = req.query.email;
    let query;
    console.log(email);
    if(email === undefined){
        query = "SELECT * FROM questions ORDER BY id;"
    }else{
        console.log(email);
        query = "SELECT * FROM questions WHERE adminemail='" + email + "' ORDER BY id ASC;";
    }
    con.query(query,(err,rows,fields)=>{
        if(!err){
        
            res.set(200).json({
                status: 'success',
                data : JSON.parse(JSON.stringify(rows))
            })
        }else{
            res.set(500).json(err);
        
        }
    });
}

module.exports.deletequestion = function(req,res,con){
    if(req.query.id === undefined){
        res.set(200).json({
            status : 'failed',
            message : 'question id required'
        });
        return;
    }
    let id= req.query.id;
    let query = "DELETE FROM questions WHERE id=" + id + ";";
    con.query(query,(err,row,fields)=>{
        if(!err){
            res.set(200).json({
                status: 'success',
                message :'Question Deleted'
            })
        }else{
            res.set(500).json(err);
            console.log(err);
        }
    });
}
