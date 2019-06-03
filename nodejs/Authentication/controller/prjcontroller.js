const db = require('../model/model');
const bcrypt = require('bcryptjs');
const joi = require('joi');
const schema = require('../Validation/joi')


const getDtl = (req, res) => {
    //db is used to connect the database
    //find method get the all collection details 
    db.user.find({}, (err, result) => {
        res.json(result);
    })
};
const getID = (req, res) => {
    //Find the ProjectId Details
    if (req.query.projectId) {

        db.user.find({ projectId: req.query.projectId }, (err, result) => {

            if (!result.length > 0) {
                res.status(404).send('the given id is not found');
            }
            else {
                res.json(result);
            };
        });
    }
    //Find the ProjectManager Details
    else if (req.query.projectManager) {
        db.user.find({ projectManager: req.query.projectManager }, (err, result) => {

            if (!result.length > 0) {
                res.status(404).send('the given id is not found');
            }
            else {
                res.json(result);
            };
        });
    }
    //Find the ProjectName details
    else if (req.query.projectName) {
        db.user.find({ projectName: req.query.projectName }, (err, result) => {

            if (!result.length > 0) {
                res.status(404).send('the given id is not found');
            }
            else {
                res.json(result);
            };
        });
    }
}
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
    joi.validate(param, schema.postvalidation, (err, validationresult) => {
        validationresult.password = bcrypt.hashSync(validationresult.password)
        if (err)
            res.status(405).send('joi validation error');
        else {
            db.user.create(validationresult, (err, result) => {
                if (!result) {
                    res.status(404).send('enter vaild id & this Id is already use');
                }
                else {
                    res.json(result);
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

        joi.validate(param, schema.updateId, (err, validationresult) => {
            validationresult.password = bcrypt.hashSync(validationresult.password)
            if (err)
                res.status(405).send('joi validation error');
            else {
                //updateOne method used to update data
                db.user.updateOne({ projectId: req.query.projectId }, { $set: validationresult }, (err, result) => {
                    if (result.nModified == 0) {
                        res.status(404).send('Id not found & Enter the Vaild Id to update...');
                    } else {
                        res.status(200);
                        res.json(result);
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
            joi.validate(param, schema.updateManagerName, (err, validationresult) => {
                validationresult.password = bcrypt.hashSync(validationresult.password)
                if (err)
                    res.status(405).send('joi validation error');
                else {
                    //updateOne method used to update data
                    db.user.updateOne({ projectManager: req.query.projectManager }, { $set: validationresult }, (err, result) => {
                        if (result.nModified == 0) {
                            res.status(404).send('Id not found & Enter the Vaild Id to update....');
                        } else {
                            res.status(200);
                            res.json(result);
                        };
                    });
                }
            })

        });
    }
    //Update the Details With ProjectName
    else if (req.query.projectName) {
        //Encrypted the request Password

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
        joi.validate(param, schema.updateProjectName, (err, validationresult) => {
            validationresult.password = bcrypt.hashSync(validationresult.password)
            if (err)
                res.status(405).send('joi validation error');
            else {
                //updateOne method used to update data
                db.user.updateOne({ projectName: req.query.projectName }, { $set: validationresult }, (err, result) => {
                    if (result.nModified == 0) {
                        res.status(404).send('Id not found & Enter the Vaild Id to update...');
                    } else {
                        res.status(200);
                        res.json(result);
                    };
                });
            };
        });
    };
};
const deleteDtl = (req, res) => {
    //Delete the Details With projectId
    if (req.query.projectId) {
        db.user.deleteOne({ projectId: req.query.projectId }, (err, result) => {
            if (result.deletedCount == 0) {
                res.status(404).send('delete the details will error & Enter the Valid Id');
            } else {
                res.status(200);
                res.json(result);
            }
        })
    }
    //Delete the Details With projectName
    else if (req.query.projectName) {
        db.user.deleteOne({ projectName: req.query.projectName }, (err, result) => {
            if (result.deletedCount == 0) {
                res.status(404).send('delete the details will error & Enter the Valid Id');
            } else {
                res.status(200);
                res.json(result);
            }
        })
    }
    //Delete the Details With projectManager
    else if (req.query.projectManager) {
        db.user.deleteOne({ projectManager: req.query.projectManager }, (err, result) => {
            if (result.deletedCount == 0) {
                res.status(404).send('delete the details will error & Enter the Valid Id');
            } else {
                res.status(200);
                res.json(result);
            }
        })
    }
};
db.dbConnect();
module.exports = { getDtl, getID, postDtl, putDtl, deleteDtl };