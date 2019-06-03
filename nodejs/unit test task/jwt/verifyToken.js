var jwt = require('jsonwebtoken');
var config = require('./config');

function verifytoken(req,res,next){

    var token = req.headers['x-access-token'];

    if(!token){
        return res.status(500).send({auth:false,message:"no token provide"});
    }

    jwt.verify(token,config.secret,(err,decoded)=>{
        if(err){
            res.status(500).send({auth:false,message:"failed to authenticate token"})
        }
        req.projectId=decoded.id;
        next();
    })
}

module.exports=verifytoken;