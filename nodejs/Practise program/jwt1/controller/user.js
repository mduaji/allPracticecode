const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../model/model');

const postcreate = (req, res) => {

    //bcrypt.hash(req.body.password, 10, (hash) => {
    var hash = bcrypt.hashSync(req.body.password);
    console.log(hash);
    var data = {
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
    console.log(data);
    db.user.create(data, (err, result) => {
        if (err) {
            res.status(400);
            res.json('post the details is error');
        }
        else {
            res.status(200);
            //the json responce will be get
            res.json(result);
        }

    });
};



const postAuthenticate = (req, res) => {

    db.user.findOne({ projectId: req.body.projectId }, (err, userInfo) => {
        if (err) {
            res.send(err);
        }
        else {
            bcrypt.compare(req.body.password, userInfo.password, (err, result) => {
                if (result) {
                    const JWTToken = jwt.sign({
                        projectId: userInfo.projectId,
                        _id: userInfo._id
                    },
                        'secret',
                        {
                            expiresIn: '2h'
                        });
                    return res.status(200).json({
                        status: "success",
                        data: userInfo,
                        token: JWTToken
                    });
                }
                else {
                    return res.status(401).json({
                        status: "Error",
                        failed: 'Unauthorized Access'
                    });
                }
            });
        }

    });
};

module.exports = { postAuthenticate, postcreate }