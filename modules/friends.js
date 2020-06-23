
module.exports.sendFriendRequest = function(req,res,con){
    let query = "INSERT INTO friendrequests (senderid,receiverid) VALUES('"+req.body.senderid+"','"+req.body.receiverid+"');";

    con.query(query,(err,rows,fields)=>{
        if(!err){
            res.set(200).json({
                "message" : "Friend request sent!"
            });
        }else{
            console.log(err)
            res.set(500).json(err);
        }
    });

}