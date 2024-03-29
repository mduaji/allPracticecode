var jwt = require('jsonwebtoken');

module.exports = (req,res,next) =>{
    try{
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, config.secret);
    req.employeeData = decoded;
    next();
} catch (err) {
    return res.status(401).json({
        message : 'Auth failed'
    })
}
}