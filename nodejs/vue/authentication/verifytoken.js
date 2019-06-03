var jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        //split the Bearer and Token 
        const token = req.headers.authorization.split(" ")[1];
        //verify token and public key
        const decoded = jwt.verify(token, 'secret');
        req.projectData = decoded;
        next();
    }
    catch (err) {
        return res.status(404).json({
            message: 'Auth failed'
        })
    }
}