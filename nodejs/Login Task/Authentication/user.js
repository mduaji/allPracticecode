//imports all module
const bcrypt = require('bcryptjs');
const con = require('../model/model');
const joi = require('joi')
const generator = require('generate-password');
const schema = require('../joi/joi');
const nodemailer = require('nodemailer');

//Register the details 
const postRegister = (req, res) => {
    //Insert into Table
    let sql = "INSERT INTO datadb set ?";
    //Dynamicly Password Generate
    const dynamicPassword = generator.generate({
        length: 7,
        numbers: true,
        uppercase: true
    });
    //Register Details
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
    //joi validation
    joi.validate(value, schema, (err, validationresult) => {
        //Hash the Request Password
        validationresult.Password = bcrypt.hashSync(validationresult.Password);
        //joi Validation Error
        if (err) {
            res.status(404).json({ status: 'Error', Error: 'joi validation error' });
        }
        //validation Success =>
        else {
            con.query(sql, validationresult, (err, result) => {
                //Details Already Exists
                if (err) {
                    res.status(404).json({
                        status: "Error",
                        Error: 'Email Already Exist '
                    })
                }
                //Details successfully Register
                else {
                    res.status(200).json({
                        status: "Successfully Registered"
                    });
                    //Send the Gmail Using Nodemailer package
                    var transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                            user: 'mduaji10@gmail.com',
                            pass: 'aji10964'
                        }
                    });
                    //Content to be send...
                    var mailOptions = {
                        from: 'mduaji10@gmail.com',
                        to: `${req.body.Email}`,
                        subject: 'Sending the Email in Login Password',
                        text: 'Your Gmail Login Password',
                        html: `<h1> Password   :${dynamicPassword}<h1>`

                    };
                    //The Mail should Be send
                    transporter.sendMail(mailOptions);

                }
            });
        }
    });
};
//Authentication
const postAuth = (req, res) => {
    const email1 = req.body.Email;
    //gte the Details in Database
    var sql = `SELECT * FROM datadb where Email=?`;
    con.query(sql, [email1], function (err, userInfo) {
        //Details Not Found
        if (!userInfo || userInfo.length === 0) {
            res.status(404).json({
                status: "Error",
                Error: "Invalid Email"
            });
        }
        else {
            //compare the request password and register password ,result ==true
            bcrypt.compare(req.body.Password, userInfo[0].Password, (err, result) => {
                //the Password Should Be Wrong
                if (!result == true) {
                    return res.status(404).json({
                        status: "Error",
                        failed: 'Unauthorized Access & Enter Correct Password'
                    });
                }
                else {
                    //Update the status
                    const sql = 'UPDATE datadb set Status = 1 where Email = ?';
                    const email1 = req.body.Email;
                    con.query(sql, [email1]);
                    //login Success
                    res.status(200).json({
                        status: "Login Success"
                    });
                };
            });
        }
    });
}

//exports the Module
module.exports = { postRegister, postAuth };