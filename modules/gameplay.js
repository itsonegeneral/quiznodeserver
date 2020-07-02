

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
    let score = parseInt(req.body.score);
    let query = "UPDATE leaderboard SET totalScore=totalScore+"+score+" WHERE playerID='"+req.body.playerid+"';"
    res.set(200).json({
        s:""
    })
    con.query(query,(err,rows,feilds)=>{
        if(!err){

        }else{
            console.log(err);
        }
    });
}

module.exports.createLeaderboard = function(req,res,con){
    console.log(req.body.playerid);
    let query = "INSERT INTO leaderboard (playerID,playerName,profileURL) VALUES ('"+req.body.playerid+"','"+req.body.name+"','"+req.body.profileurl+"');"
    if(req.body.playerid === undefined){
        res.json({
            message:"Player ID required"
        });
    }
    con.query(query,(err,rows,fields)=>{
        if(!err){
            
        }else{
            res.set(err);
        }
    });
}

module.exports.getLeaderBoard = function(req,res,con){
    let query = "SELECT * FROM leaderboard ORDER BY totalScore;"
    con.query(query,(err,rows,fields)=>{
        if(!err){
            let response = {
                status : "success",
                data : JSON.parse(JSON.stringify(rows))
            }
            res.set(200).json(response);
        }else{
            res.set(rows);
        }
    });
}