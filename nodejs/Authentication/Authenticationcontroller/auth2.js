const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../model/model');
const joi = require('joi');
const Schema = require('../Validation/joi');

const postcreate = (req, res) => {
    //Encrypt the request password
    bcrypt.hash(req.body.password, 10, function (err, hash) {
        const data =req.body 
        joi.validate(data, Schema, (err, validationresult) => {
            if (err) throw err
            else {
                //post the data in database
                db.user.create(validationresult, (err, result) => {
                    if (!result) {
                        res.status(404).send('enter vaild id & this Id is already use');
                    }
                    else {
                        res.status(200);
                        res.json(result);
                    }

                });
            }
        });
    });
}
const postAuthenticate = (req, res) => {
    //find the request authenticate Id
    db.user.findOne({ projectId: req.body.projectId }, (err, userInfo) => {
        //get the user information
        if (!userInfo) {
            res.status(404);
            res.send('the userinfo is not found');
        }
        else {
            //compare the request password and userInfo password
            bcrypt.compare(req.body.password, userInfo.password, (err, result) => {
                if (!result) {
                    return res.status(404).send({
                        status: "Error",
                        failed: 'Unauthorized Access'
                    });
                }
                else {
                    //password is true and generate the token
                    const JWTToken = jwt.sign({
                        projectId: userInfo.projectId,
                        _id: userInfo._id
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

                }
            });
        }

    });
};

module.exports = { postAuthenticate, postcreate }

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../model/model');

const postcreate = (req, res) => {
    //Encrypt the request password
    bcrypt.hash(req.body.password, 10, function (err, hash) {

        var param = {
            projectId: req.body.projectId,
            projectName: req.body.projectName,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            projectDuration: req.body.projectDuration,
            totalProjectHours: req.body.totalProjectHours,
            projectManager: req.body.projectManager,
            projectDesc: req.body.projectDesc,
            password: hash
        };
        //post the data in database
        db.user.create(param, (err, result) => {
            if (!result) {
                res.status(404).send('enter vaild id & this Id is already use');
            }
            else {
                //res.status(200);
                res.json(result);
            }

        });
    });
}
const postAuthenticate = (req, res) => {
    //find the request authenticate Id
    db.user.findOne({ projectId: req.body.projectId }, (err, userInfo) => {
        //get the user information
        if (!userInfo) {
            res.status(404);
            res.send('the userinfo is not found');
        }
        else {
            //compare the request password and userInfo password
            bcrypt.compare(req.body.password, userInfo.password, (err, result) => {
                if (!result) {
                    return res.status(404).send({
                        status: "Error",
                        failed: 'Unauthorized Access'
                    });
                }
                else {
                    //password is true and generate the token
                    const JWTToken = jwt.sign({
                        projectId: userInfo.projectId,
                        _id: userInfo._id
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

                }
            });
        }

    });
};

module.exports = { postAuthenticate, postcreate }