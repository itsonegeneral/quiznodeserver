

module.exports.getoptions = function(req,res,con){
    const cat  = req.query.category;
    console.log()
    let query = "SELECT * from quizoptions,categories where categoryName='" + cat + "' and quizoptions.catid = categories.id;"
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

module.exports.setquizoptions = function(req,res,con){
}

module.exports.addLeaderboardEntry = function(req,res,con){
    console.log(req.body.playerid);
    let query = "UPDATE leaderboard"
    res.set(200).json({
        s:""
    })
}

module.exports.createLeaderboard = function(req,res,con){
    console.log(req.body.playerid);
    if(req.body.playerid === undefined){
        res.json({
            message:"Player ID required"
        });
    }
}