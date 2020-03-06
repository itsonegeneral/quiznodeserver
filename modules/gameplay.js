

module.exports.getquizoptions = function(req,res,con){
    const cat  = req.query.category;

    let query = "SELECT * from questions where category='" + cat + "';"
    con.query(query,(err,rows,feilds)=>{
        if(!err){
            var data = {
                status : 'success',
                data : JSON.parse(JSON.stringify(rows))
            }
        }else{
            res.set(500).json(err);
        }
    });

}