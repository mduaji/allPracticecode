var db = require('../models/model');
var verifyToken = require('../auth/verifyToken');

var moment = require('moment');
var moment = require('moment-business-days');
var dateFn = Date.now();
var startOfWeek = moment().startOf('week').toDate();
var endOfWeek = moment().endOf('week').toDate();
var moment = require("moment");
var momentDurationFormatSetup = require("moment-duration-format");
momentDurationFormatSetup(moment);
var duration = moment.duration(320, "minutes").format();

const getEmployee = (req, res) => {
    // find method is used to select all documents from collection
    db.Employee.find({}, (err, employeeDt) => {
        res.send(employeeDt);
    });
}
const getEmployeeById = (req, res) => {
    // This find method is used to select the particular id of the collection object
    if (req.query.employeeId) {
        //var employee_id = req.query.employeeId;
        db.Employee.find({ employeeId: req.query.employeeId }, (err, employeeDt) => {
            if (!employeeDt.length > 0) {
                return res.status(404).send("The given id is not found.");
            }
            res.json(employeeDt);
        });
    }
    else if (req.query.employeeName) {
        //var employee_name = req.query.employeeName;
        db.Employee.find({ employeeName: req.query.employeeName }, (err, employeeDt) => {
            if (!employeeDt.length > 0) {
                return res.status(404).send("The given name is not found.");
            }
            res.json(employeeDt);
        });

    }
    else if (req.query.projectManagerId) {
        //var prjctManager_id = req.query.projectManagerId
        db.Employee.find({ projectManagerId: req.query.projectManagerId }, (err, employeeDt) => {
            if (!employeeDt.length > 0) {
                return res.status(404).send("The given project manager id is not found.");
            }
            res.json(employeeDt);
        });
    }
}
const postEmployee = (req, res) => {
    //Insert a document into a collection using create method.
    var Details = {
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
        password: req.body.password
    };
    db.Employee.create(Details, (err, employeeDt) => {
        if (!employeeDt) {
            return res.status(404).send("This id is already in use.");
        }
        res.json(employeeDt);
    })
}
const putEmployee = (req, res) => {
    // To update a document in a collection we use updateOne method
    if (req.query.employeeId) {
        var Details = {
            $set: {
                employeeName: req.body.employeeName,
                employeeMobileNo: req.body.employeeMobileNo,
                employeeEmailId: req.body.employeeEmailId,
                projectManagerId: req.body.projectManagerId,
                todayDate: dateFn,
                daysofworkstart: startOfWeek,
                daysofworkend: endOfWeek,
                Duration: duration,
                comments: req.body.comments
            }
        };

        db.Employee.updateOne({ employeeId: req.query.employeeId }, Details, { new: true }, (err, employeeDt) => {
            if (employeeDt.n == 0) {
                return res.status(404).send("There was a problem updating the employee.");
            } else {
                res.json(employeeDt);
            }
        })
    }
    else if (req.query.employeeName) {
        var Details = {
            $set: {
                employeeId: req.body.employeeId,
                employeeMobileNo: req.body.employeeMobileNo,
                employeeEmailId: req.body.employeeEmailId,
                projectManagerId: req.body.projectManagerId,
                todayDate: dateFn,
                daysofworkstart: startOfWeek,
                daysofworkend: endOfWeek,
                Duration: duration,
                comments: req.body.comments
            }
        };

        db.Employee.updateOne({ employeeName: req.query.employeeName }, Details, { new: true }, (err, employeeDt) => {
            if (employeeDt.n == 0) {
                return res.status(404).send("There was a problem updating the employee.");
            } else {
                res.json(employeeDt);
            }
        })

    }
    else if (req.query.projectManagerId) {
        var Details = {
            $set: {
                employeeId: req.body.employeeId,
                employeeName: req.body.employeeName,
                employeeMobileNo: req.body.employeeMobileNo,
                employeeEmailId: req.body.employeeEmailId,
                todayDate: dateFn,
                daysofworkstart: startOfWeek,
                daysofworkend: endOfWeek,
                Duration: duration,
                comments: req.body.comments
            }
        };

        db.Employee.updateOne({ projectManagerId: req.query.projectManagerId }, Details, { new: true }, (err, employeeDt) => {
            if (employeeDt.n == 0) {
                return res.status(404).send("There was a problem updating the employee.");
            } else {
                res.json(employeeDt);
            }
        })

    }
}
const delEmployee = (req, res) => {
    if (req.query.employeeId) {
        db.Employee.deleteOne({ employeeId: req.query.employeeId }, (err, employeeDt) => {
            if (employeeDt.n == 0) {
                return res.status(404).send("The given id is not found for delete request.");
            }
            res.json(employeeDt);
        });
    } //To delete a document in a collection we use deleteOne method.
    else if (req.query.employeeName) {
        db.Employee.deleteOne({ employeeName: req.query.employeeName }, (err, employeeDt) => {
            if (employeeDt.n == 0) {
                return res.status(404).send("The given name is not found for delete request.");
            }
            else {
                res.json(employeeDt);
            }
        });
    }
    else if (req.query.projectManagerId) {
        db.Employee.deleteOne({ projectManagerId: req.query.projectManagerId }, (err, employeeDt) => {
            if (employeeDt.n == 0) {
                return res.status(404).send("The given id is not found for delete request.");
            }
            else {
                res.json(employeeDt);
            }
        });
    }
}
module.exports = { getEmployee, getEmployeeById, postEmployee, putEmployee, delEmployee };