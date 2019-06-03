var express = require('express');
var router = express();
var bodyParser = require('body-parser');
var verifyToken = require('./verifyToken');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var db = require('../models/model');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config');

var moment = require('moment');
var moment = require('moment-business-days');
var dateFn = Date.now();
var startOfWeek = moment().startOf('week').toDate();
var endOfWeek = moment().endOf('week').toDate();
var moment = require("moment");
var momentDurationFormatSetup = require("moment-duration-format");
momentDurationFormatSetup(moment);
var duration = moment.duration(560, "minutes").format();

router.post('/login', (req, res) => {
    db.Employee.findOne({ employeeEmailId: req.body.employeeEmailId }, function (err, user) {

        if (!user) return res.status(404).send('No user found.');

        var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });


        var token = jwt.sign({ id: user._id }, config.secret, {
            expiresIn: '24h'
        });

        res.status(200).send({ auth: true, token: token, user });
    });
})

router.post('/register', (req, res) => {
    var hashedPassword = bcrypt.hashSync(req.body.password);
    db.Employee.create({
        employeeId: req.body.employeeId,
        employeeName: req.body.employeeName,
        employeeMobileNo: req.body.employeeMobileNo,
        employeeEmailId: req.body.employeeEmailId,
        projectManagerId: req.body.projectManagerId,
        todayDate: dateFn,
        daysofworkstart: startOfWeek,
        daysofworkend: endOfWeek,
        Duration: duration,
        comments: req.body.comments,
        password: hashedPassword
    }, (err, employeeDt) => {
        if (err) return res.status(404).send("there was a problem in registering employee");
        res.status(200).send({ auth: true, employeeDt });
    })
})
module.exports = router;