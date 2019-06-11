const joi = require('joi');

const Manager = joi.object().keys({
    Name: joi.string().alphanum().min(3).max(20).required(),
    Email: joi.string().email().lowercase().required(),
    MobileNo: joi.string().regex(/^\d{10}$/).required(),
    Age: joi.number().integer().positive().min(5).max(100).required(),
    Address: joi.string().required(),
    Password: joi.string().required(),
    ManagerId: joi.number().integer().positive().min(300).max(499).required(),
    ProjectId: joi.number().integer().positive().min(500).max(700).required(),
    Role: joi.string().required()
});
const Employee = joi.object().keys({
    EmployeeId: joi.number().integer().positive().min(1).max(299).required(),
    Name: joi.string().alphanum().min(3).max(20).required(),
    Email: joi.string().email().lowercase().required(),
    MobileNo: joi.string().regex(/^\d{10}$/).required(),
    Age: joi.number().integer().positive().min(5).max(100).required(),
    Address: joi.string().required(),
    Password: joi.string().required(),
    ManagerId: joi.number().integer().positive().min(300).max(499).required(),
    ProjectId: joi.number().integer().positive().min(500).max(700).required(),
    Role: joi.string().required()
});


module.exports = { Manager, Employee }
