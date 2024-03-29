var jwt = require('jsonwebtoken');

module.exports = (req,res,next) =>{
    try{
    const token = req.headers.authorization.split(" ")[1];
    console.log(token);
    const decoded = jwt.verify(token, 'secret');
    req.projectData = decoded;
    next();
} catch (err) {
    return res.status(401).json({
        message : 'Auth failed'
    })
}
}