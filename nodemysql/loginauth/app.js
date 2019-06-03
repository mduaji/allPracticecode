const express = require('express');
const app = express();
const bodyparser = require('body-parser');
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
const bcrypt = require('bcryptjs');
const con = require('./models');
const joi = require('joi')
const schema = require('./joi');
const generator = require('generate-password');
const nodemailer = require('nodemailer');
const sgMail = require('@sendgrid/mail');
const jwt = require('jsonwebtoken');
const token = require('./token verify')

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
    next();
});

app.post('/api/login', (req, res) => {
    const email1 = req.body.Email;
    //gte the Details in Database
    var sql = `SELECT * FROM datadb where Email=?`;
    con.query(sql, [email1], function (err, userInfo) {
        //Details Not Found
        if (!userInfo || userInfo.length === 0) {
            res.status(404).json("Eamil Id not Found");
        }
        else {
            //compare the request password and register password ,result ==true
            bcrypt.compare(req.body.Password, userInfo[0].Password, (err, result) => {
                //the Password Should Be Wrong
                if (!result == true) {
                    console.log("password Error")
                    return res.status(500).json("login failed Enter Correct Password or user");
                }
                else {
                    //console.log(result);
                    const JWTToken = jwt.sign({
                        Email: result.Email
                    },
                        'secret',
                        {
                            expiresIn: '2h'
                        });
                    //the token will generate
                    return res.status(200).send({
                        status: "success",
                        data: userInfo,
                        token: JWTToken
                    });
                };
            });
        }
    });
});
app.get('/api/get', token, (req, res) => {
    const email = req.query.Email
    console.log(email);
    const sql = 'SELECT * FROM datadb where Email=?'
    con.query(sql, [email], (err, result) => {
        if (err) {
            res.status(404).json('Email not Found')
        } else {
            res.status(200).json(result);
        }
    })
});
// app.get('/api/getDetails', token, (req, res) => {
//     const email = req.query.Email
//     console.log(email);
//     const sql = 'SELECT * FROM datadb where Email=?'
//     con.query(sql, [email], (err, result) => {
//         if (err) {
//             res.status(404).json('Email not Found')
//         } else {
//             res.status(200).json(result);
//         }
//     })
// });
app.post('/api/register', (req, res) => {
    let sql = "INSERT INTO datadb set ?";
    //Register Details
    let value = {
        Name: req.body.Name,
        Email: req.body.Email,
        MobileNo: req.body.MobileNo,
        Age: req.body.Age,
        Address: req.body.Address,
        Password: req.body.Password
    }
    //console.log(value);
    //joi validation
    joi.validate(value, schema, (err, validationresult) => {
        //Hash the Request Password
        validationresult.Password = bcrypt.hashSync(validationresult.Password);
        //joi Validation Error

        if (err) {
            res.status(404).json({ status: 'Error', Error: 'joi validation error' + err });
        }
        //validation Success =>
        else {
            con.query(sql, validationresult, (err, result) => {
                //Details Already Exists
                if (err) {
                    res.status(404).json({
                        status: "Error",
                        Error: 'Email Already Exist ' + err
                    })
                }
                //Details successfully Register
                else {
                    res.status(200).json({
                        status: "Successfully Registered",
                        data: result
                    });
                }
            });
        }
    });
});
//app.use(token);

app.put('/api/put', token, (req, res) => {
    console.log("put is called")
    console.log(req.query.Email)
    const sql = "update datadb set Name=?,MobileNo=?,Age=?,Address=? where Email=?"
    console.log(req.body)
    con.query(sql, [req.body.Name, req.body.MobileNo, req.body.Age, req.body.Address, req.query.Email], (err, result) => {
        if (err) {
            res.status(404).json(err);
        }
        else {
            res.status(200).json(result);
        }
    })
});
app.get('/api/forgetPassword', (req, res) => {

    const dynamicPassword = generator.generate({
        length: 7,
        numbers: true,
        uppercase: true
    });
    const Email = req.query.Email
    // console.log(Email)
    const sql = "select Email from datadb where Email=?"
    con.query(sql, [Email], (err, result) => {
        if (result.length == 0) {
            res.status(404).json("Email Id is not found");
        }
        else {
            const sql = "insert into otptbl (Email,OTPvl) values (?,?)"
            con.query(sql, [Email, dynamicPassword], (err, result) => {
                if (err) {
                    console.log("insert Err")
                    // res.status(404).json('Insert OTP is error')
                    return res.redirect(`/api/delete?Email=${Email}`);
                } else {
                    sgMail.setApiKey('SG.TdGZt1e1SKe1qoKlgttoYQ.iMfuZDL_F9wuQeYMRxSFeIgPQegTLgxz1iX_ZiS6jD0');
                    const msg = {
                        to: 'ajithc1096@gmail.com',
                        from: 'mduaji10@gmail.com',
                        subject: 'Sending with Twilio SendGrid is Fun',
                        text: 'and easy to do anywhere, even with Node.js',
                        html: '<strong>and easy to do anywhere, even with Node.js</strong>',
                    };
                    sgMail.send(msg);
                    // var transporter = nodemailer.createTransport({
                    //     service: 'gmail',
                    //     auth: {
                    //         user: 'mduaji10@gmail.com',
                    //         pass: 'aji10964'
                    //     }
                    // });
                    // //Content to be send...
                    // var mailOptions = {
                    //     from: 'mduaji10@gmail.com',
                    //     to: `${req.query.Email}`,
                    //     subject: 'Sending the Email in Login Password',
                    //     text: 'Your Gmail Login Password',
                    //     html: `<h1> Password   :${dynamicPassword}<h1>`

                    // };
                    // //The Mail should Be send
                    // transporter.sendMail(mailOptions);
                    res.status(200).json(result)
                }
            })
        }
    })

});
app.get('/api/getOTP', (req, res) => {
    const sql = "select * from otptbl where OTPvl=?"
    const value = req.query.OTPvl;
    console.log("otp   :", value)
    con.query(sql, [value], (err, result) => {
        if (!result.length) {
            res.status(404).json("OTP not found")
        } else {
            res.status(200).json(result)
        }
    })
})
app.put('/api/putpass', (req, res) => {
    console.log(req.body)
    const sql = "update datadb set Password=? where Email =?"
    const Email = req.query.Email;
    Password1 = bcrypt.hashSync(req.body.Password);
    con.query(sql, [Password1, Email], (err, result) => {
        if (!result) {
            res.status(404).json("Password Update is error")
        } else {
            res.status(200).json(result)
        }
    })

})
app.put('/api/changepassword', token, (req, res) => {
    console.log(req.body)
    const sql = "update datadb set Password=? where Email =?"
    const Email = req.query.Email;
    Password1 = bcrypt.hashSync(req.body.Password);
    con.query(sql, [Password1, Email], (err, result) => {
        if (!result) {
            res.status(404).json("Password Update is error")
        } else {
            res.status(200).json(result)
        }
    })

})
app.get('/api/delete', (req, res) => {
    console.log("delete is called")
    const sql = "delete from otptbl where Email =?"
    const Email = req.query.Email
    con.query(sql, [Email], (err, result) => {
        if (!result) {
            res.status(404).json("Delete Method Is Error");
        } else {
            //res.status(200).json(result)
            return res.redirect(`/api/forgetPassword?Email=${Email}`)
        }
    })
})
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`The Server Listen Port ${port}....`));