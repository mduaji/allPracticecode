const joi = require('joi');

module.exports= joi.object().keys({
    Name: joi.string().alphanum().min(3).max(20).required(),
    Email: joi.string().email().lowercase().required(),
    MobileNo: joi.string().regex(/^\d{10}$/).required(),
    Age: joi.number().integer().positive().min(5).max(100).required(),
    Gender: joi.string().min(4).max(6).required(),
    Address: joi.string().required(),
    Password: joi.string().required(),
    Status: joi.number().integer().required()
});

// const loginValidation = joi.object().keys({
//     Email: joi.string().email().lowercase().required(),
//     Password: joi.string().min(7).required()
// })


//module.exports = { registerValidation, loginValidation }



