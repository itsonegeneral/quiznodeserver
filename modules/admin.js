
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
