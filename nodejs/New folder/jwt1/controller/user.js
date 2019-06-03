const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../model/model');

const postcreate = (req, res) => {

    bcrypt.hash(req.body.password, 10, (err,hash) => {
       // var hash = bcrypt.hash(req.body.password,10);
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
        db.user.create( data , (err, result) => {
            // if (err) {
            //     res.status(400).json('post the details is error');
            // }
                res.status(200).json({ auth: true, result });
        });
    })}


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
db.dbConnect() ;
module.exports = { postAuthenticate, postcreate }