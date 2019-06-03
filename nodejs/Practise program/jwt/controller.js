var jwt1 = require('jsonwebtoken');
var config = require('./config');

module.exports = function (router) {
    router.post('/login', (req, res) => {
        if (req.body.userName == "admin" && req.body.password == "password") {
            res.json({
                id: 1,
                userName: 'admin',
                jwt1: jwt1.sign({
                    id: 1,
                }, config.JWT_SECRET, { expiresIn: 60 * 60 })
            })
        } else {
            res.status(401).json({
                error: {
                    message: 'Wrong username or password!'
                }
            });
        }
    });
    return router;
}