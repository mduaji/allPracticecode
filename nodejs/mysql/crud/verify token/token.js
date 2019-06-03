var jwt = require('jsonwebtoken');

const verifytoken = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decode = jwt.verify(token, 'secret');
        next();
    }
    catch (err) {
        return res.status(404).json({
            message: "auth error"
        })

    }
}
module.exports = verifytoken;