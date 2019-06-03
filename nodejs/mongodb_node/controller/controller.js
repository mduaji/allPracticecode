const db = require('../model/model');
const bcrypt = require('bcryptjs');
const joi = require('joi');
const schema = require('../joivalidation/validation')


const getDtl = (req, res) => {
    //db is used to connect the database
    //get the All Details 
    db.user.find({}, (err, result) => {
        res.json({ Status: "Success", data: result });
    })
};
const getID = (req, res) => {
    //Find the ProjectId Details
    if (req.query.projectId) {
        db.user.find({ projectId: req.query.projectId }, (err, result) => {
            //the project id is not found
            if (!req.query.projectId || !result.length > 0) {
                res.status(404).send({ Status: "Error", Error: 'Invalid Id' });
            }
            //get the result
            else {
                res.json({ Status: "Success", data: result });
            };
        });
    }
    //Find the ProjectManager Details
    else if (req.query.projectManager) {
        db.user.find({ projectManager: req.query.projectManager }, (err, result) => {
            //the Manager Name is not found
            if (!req.query.projectManager || !result.length > 0) {
                res.status(404).send({ Status: "Error", Error: 'Invalid Manager Name' });
            }
            //the result will be found
            else {
                res.json({ Status: "Success", data: result });
            };
        });
    }
    //Find the ProjectName details
    else if (req.query.projectName) {
        db.user.find({ projectName: req.query.projectName }, (err, result) => {
            //the projectname is not found 
            if (!req.query.projectName || !result.length > 0) {
                res.status(404).send({ Status: "Error", Error: 'Invalid Project Name' });
            }
            //result will be found
            else {
                res.json({ Status: "Success", data: result });
            };
        });
    }
}
//insert the data
const postDtl = (req, res) => {
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
    //joi validation to insert data
    joi.validate(param, schema.postvalidation, (err, validationresult) => {
        //hashing the incoming password
        validationresult.password = bcrypt.hashSync(validationresult.password)
        //joi validation should Error
        if (err)
            res.status(405).send({ Status: "Error", Error: 'joi validation error' });
        //Insert the incoming data with create method
        else {
            db.user.create(validationresult, (err, result) => {
                //post the exist data
                if (!result) {
                    res.status(404).send({ Status: "Error", Error: 'Id is Already Exist' });
                }
                //should be insert the data
                else {
                    res.json({ Status: "Success", data: result });
                };
            });
        };
    });
}
const putDtl = (req, res) => {
    //Update the Details With ProjectId
    if (req.query.projectId) {
        let param = {
            projectName: req.body.projectName,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            projectDuration: req.body.projectDuration,
            totalProjectHours: req.body.totalProjectHours,
            projectManager: req.body.projectManager,
            projectDesc: req.body.projectDesc,
            password: req.body.password
        }
        //validate the incoming data
        joi.validate(param, schema.updateId, (err, validationresult) => {
            //Hashing the password
            validationresult.password = bcrypt.hashSync(validationresult.password)
            //joi validation should be error
            if (err)
                res.status(405).send('joi validation error');
            else {
                //upadate the data using updateMany method
                db.user.updateMany({ projectId: req.query.projectId }, { $set: validationresult }, (err, result) => {
                    //can't be update should be error
                    if (!result || result.nModified === 0) {
                        res.status(404).send({ Status: "Error", Error: 'Invalid Id' });
                    } else {
                        //should be update the data using projectid
                        res.status(200);
                        res.json({ Status: "Success", AffectedRows: result.nModified });
                    };
                });
            }
        })

    }
    //Update the Details With ProjectManager
    else if (req.query.projectManager) {
        //Encrypted the request Password;
        bcrypt.hash(req.body.password, 10, function (err, hash) {
            let param = {
                projectId: req.body.projectId,
                projectName: req.body.projectName,
                startDate: req.body.startDate,
                endDate: req.body.endDate,
                projectDuration: req.body.projectDuration,
                totalProjectHours: req.body.totalProjectHours,
                projectDesc: req.body.projectDesc,
                password: req.body.password
            };
            //validate the incoming data
            joi.validate(param, schema.updateManagerName, (err, validationresult) => {
                //Hashing the password
                validationresult.password = bcrypt.hashSync(validationresult.password)
                //joi validation should be error
                if (err)
                    res.status(405).send('joi validation error');
                else {
                    //updateOne method used to update data
                    db.user.updateMany({ projectManager: req.query.projectManager }, { $set: validationresult }, (err, result) => {
                       //Manager name is not found
                        if (!result || result.nModified === 0) {
                            res.status(404).send({ Status: "Error", Error: 'Invalid Project Manager' });
                        } else {
                            //should update the data using managername
                            res.status(200);
                            res.json({ Status: "Success", AffectedRows: result.nModified });
                        };
                    });
                }
            })

        });
    }
    //Update the Details With ProjectName
    else if (req.query.projectName) {
        let param = {
            projectId: req.body.projectId,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            projectDuration: req.body.projectDuration,
            totalProjectHours: req.body.totalProjectHours,
            projectManager: req.body.projectManager,
            projectDesc: req.body.projectDesc,
            password: req.body.password
        };
        //validate the incoming data
        joi.validate(param, schema.updateProjectName, (err, validationresult) => {
            //Hashing the password
            validationresult.password = bcrypt.hashSync(validationresult.password)
            //joi validation should be error
            if (err)
                res.status(405).send('joi validation error');
            else {
                //updateOne method used to update data
                db.user.updateMany({ projectName: req.query.projectName }, { $set: validationresult }, (err, result) => {
                   //projectName is not found
                    if (!result || result.nModified === 0) {
                        res.status(404).send({ Status: "Error", Error: 'Invalid Project Name' });
                    } else {
                        //should be update the date using projectname
                        res.status(200);
                        res.json({ Status: "Success", AffectedRows: result.nModified });
                    };
                });
            };
        });
    };
};
const deleteDtl = (req, res) => {
    //Delete the Details With projectId
    if (req.query.projectId) {
        db.user.deleteMany({ projectId: req.query.projectId }, (err, result) => {
            //projectid not found
            if (result.deletedCount === 0) {
                res.status(404).send({ Status: "Error", Error: 'Invalid Id' });
            } else {
                //delete the data using projectid
                res.status(200);
                res.json({ Status: "Success", AffectedRows: result.deletedCount });
            }
        })
    }
    //Delete the Details With projectName
    else if (req.query.projectName) {
        db.user.deleteMany({ projectName: req.query.projectName }, (err, result) => {
            if (result.deletedCount === 0) {
                res.status(404).send({ Status: "Error", Error: 'Invalid Project Name' });
            } else {
                 //delete the data using projectName
                res.status(200);
                res.json({ Status: "Success", AffectedRows: result.deletedCount });
            }
        })
    }
    //Delete the Details With projectManager
    else if (req.query.projectManager) {
        db.user.deleteMany({ projectManager: req.query.projectManager }, (err, result) => {
            if (result.deletedCount === 0) {
                res.status(404).send({ Status: "Error", Error: 'Invalid Manager Name' });
            } else {
                 //delete the data using Managername
                res.status(200);
                res.json({ Status: "Success", AffectedRows: result.deletedCount });
            }
        })
    }
};
db.dbConnect();
module.exports = { getDtl, getID, postDtl, putDtl, deleteDtl };