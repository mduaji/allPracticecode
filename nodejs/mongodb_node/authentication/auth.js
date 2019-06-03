const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../model/model');
const joi = require('joi');
const Schema = require('../joivalidation/validation');

const postcreate = (req, res) => {
    const param = {
        projectId: req.body.projectId,
        projectName: req.body.projectName,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        projectDuration: req.body.projectDuration,
        totalProjectHours: req.body.totalProjectHours,
        projectManager: req.body.projectManager,
        projectDesc: req.body.projectDesc,
        password: req.body.password
    };
    //validate the schema with joi validation
    joi.validate(param, Schema.postvalidation, (err, validationresult) => {
        //hash in the password
        validationresult.password = bcrypt.hashSync(validationresult.password);
        if (err)
            return res.status(404).send({ Status: "Error", Error: 'joi validation error' })
        else {
            //post the data in database
            db.user.create(validationresult, (err, result) => {
                //register the exist data
                if (!result) {
                    res.status(404).json({ Status: "Error", Error: 'Id is Already Exist' });
                }
                else {
                    //should be register the data
                    res.status(200);
                    res.json({
                        Status: "Success",
                        data: result
                    });
                }
            });
        }
    });
}
const postAuthenticate = (req, res) => {
    //find the request authenticate Id
    db.user.findOne({ projectId: req.body.projectId }, (err, userInfo) => {
        //get the user information
        if (!userInfo) {
            res.status(404).json({ Error: 'Invalid Id' });
        }
        else {
            //compare the password res==true
            bcrypt.compare(req.body.password, userInfo.password, (err, result) => {
                if (!result === true) {
                    res.status(404).json({
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


