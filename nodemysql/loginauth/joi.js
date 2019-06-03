const joi = require('joi');

module.exports= joi.object().keys({
    Name: joi.string().alphanum().min(3).max(20).required(),
    Email: joi.string().email().lowercase().required(),
    MobileNo: joi.string().regex(/^\d{10}$/).required(),
    Age: joi.number().integer().positive().min(5).max(100).required(),
    Address: joi.string().required(),
    Password: joi.string().required()
});