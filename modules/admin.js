
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