const bcrypt = require('bcryptjs');
const con = require('../model/model');
const joi = require('joi')
const generator = require('generate-password');
const schema = require('../joi/joi');
const nodemailer = require('nodemailer');

const postRegister = (req, res) => {

    let sql = "INSERT INTO datadb set ?";
    const dynamicPassword = generator.generate({
        length: 7,
        numbers: true,
        uppercase: true
    });
    let value = {
        Name: req.body.Name,
        Email: req.body.Email,
        MobileNo: req.body.MobileNo,
        Age: req.body.Age,
        Gender: req.body.Gender,
        Address: req.body.Address,
        Password: dynamicPassword,
        Status: 0
    }
    console.log(dynamicPassword);
    joi.validate(value, schema, (err, validationresult) => {
        validationresult.Password = bcrypt.hashSync(validationresult.Password);
        if (err) {
            res.status(404).json({ status: 'Error', Error: 'joi validation error' });
        } else {
            con.query(sql, validationresult, (err, result) => {
                if (!result) {
                    res.status(404).json({
                        status: "Error",
                        Error: "invalid"
                    })
                }
                else {
                    var transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                            user: 'mduaji10@gmail.com',
                            pass: 'aji10964'
                        }
                    });

                    var mailOptions = {
                        from: 'mduaji10@gmail.com',
                        to: `${req.body.Email}`,
                        subject: 'Sending the Email in Login Password',
                        text: 'Your Gmail Login Password',
                        html: `<h1> password   :${dynamicPassword}<h1>`

                    };
                    transporter.sendMail(mailOptions, function (err, info) {
                        if (err) {
                            res.status(404).json({
                                status: "Error"
                            })
                        } else {
                            res.status(200).json('Email sent' + info.response);
                        }
                    });
                    res.status(200).json({
                        status: "Successfully Registered"
                    });
                }
            });
        }
    });
};
const postauth = (req, res) => {
    const email1 = req.body.Email;
    var sql = `SELECT * FROM datadb where email=?`;
    con.query(sql, [email1], function (err, userInfo) {
        if (!userInfo) {
            res.status(404);
            res.send('the userinfo is not found');
        }
        else
            bcrypt.compare(req.body.Password, userInfo[0].Password, (err, result) => {
                if (!result) {
                    return res.status(404).json({
                        status: "Error",
                        failed: 'Unauthorized Access'
                    });
                }
                else {
                    const sql = 'UPDATE datadb set Status = 1 where Email = ?';
                    const email1 = req.body.Email;
                    con.query(sql, [email1], (err, result) => {
                        if (!result) {
                            res.status(404);
                        }
                        else {
                            res.status(200);
                        }
                    });
                    res.status(200).send({
                        status: "Login Success"
                    });
                };
            });
    });
}

module.exports = { postRegister, postauth };