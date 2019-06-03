const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const con = require('../model/user');

const postregister = (req, res) => {
    var sql = "INSERT INTO emptbl set ?"
    var hash = bcrypt.hashSync(req.body.password, 10);
    var value = {
        id: req.body.id,
        name: req.body.name,
        age: req.body.age,
        address: req.body.address,
        password: hash
    }
    con.query(sql, value, (err, result) => {
        if (err)
            res.status(404).json('register is error')
        else {
            res.json(result);
        }
    });
};
const postauth = (req, res) => {
    const id = parseInt(req.body.id);
    var sql = `SELECT * FROM emptbl where id =${id}`;
    con.query(sql, function (err, userInfo) {
        const user1 = userInfo[0];
        console.log(user1)
        if (!userInfo) {
            res.status(405);
            res.send('the userinfo is not found');
        }
        else
            bcrypt.compare(req.body.password, user1.password, (err, result) => {
                if (!result.length > 0) {
                    return res.status(404).json({
                        status: "Error",
                        failed: 'Unauthorized Access'
                    });
                }
                else {
                    const JWTToken = jwt.sign({
                        id: userInfo.id
                    },
                        'secret',
                        {
                            expiresIn: '2h'
                        }
                    );
                    return res.status(200).send({
                        status: "success",
                        data: userInfo,
                        token: JWTToken
                    });
                };
            });
    });
}
module.exports = { postregister, postauth }