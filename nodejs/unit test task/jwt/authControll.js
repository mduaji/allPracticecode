var express = require('express');
var router = express().router;
var bodyparser = require('body-parser');

var verifytoken = require('./verifyToken');

router.use(bodyparser.urlencoded({ extended: true }));
router.use(bodyparser.json());

var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var config = require('./config');


router.post('/login', (req, res) => {
    
    user.findOne({ projectName: req.params.projectName }, (err, user) => {

        if (err) return res.status(500).send('error on the server');
        if (!user) return res.status(404).send('no user found');

        var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

        if (!passwordIsValid) return res.status(404).send({ auth: false, token: null });

        var token = jwt.sign({ projectId: req.params.projectId }, config.secret, {
            expiresIn: 60 * 60
        })
        res.status(200).send({ auth: true, token: token });
    })
});

router.get('/logout', (req, res) => {
    res.status(200).send({ auth: false, token: null });
})
