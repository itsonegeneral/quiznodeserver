

module.exports.getoptions = function(req,res,con){
    const cat  = req.query.category;
    console.log()
    let query = "SELECT * from questions where category='" + cat + "';"
    con.query(query,(err,rows,feilds)=>{
        if(!err){
            var data = {
                status : 'success',
                data : JSON.parse(JSON.stringify(rows))
            }
            res.set(200).json(data);
        }else{
            res.set(500).json(err);
        }
    });
}