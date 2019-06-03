const joi = require('joi');

const postvalidation = joi.object().keys({
    projectId: joi.number().integer().positive().min(1).max(100).required(),
    projectName: joi.string().alphanum().min(3).max(20).required(),
    startDate: joi.date().min('2010-01-01').iso().required(),
    endDate: joi.date().max('2020-12-30').iso().required(),
    projectDuration: joi.number().min(1).max(500).required(),
    totalProjectHours: joi.number().min(1).max(10000).required(),
    projectManager: joi.string().min(3).max(20).required(),
    projectDesc: joi.string().required(),
    password: joi.string().min(4).required()
});
const updateId = joi.object().keys({
    projectName: joi.string().alphanum().min(3).max(20).required(),
    startDate: joi.date().min('2010-01-01').iso().required(),
    endDate: joi.date().max('2020-12-30').iso().required(),
    projectDuration: joi.number().min(1).max(500).required(),
    totalProjectHours: joi.number().min(1).max(10000).required(),
    projectManager: joi.string().min(3).max(20).required(),
    projectDesc: joi.string().required(),
    password: joi.string().alphanum().min(4).required()
});
const updateProjectName = joi.object().keys({
    projectId: joi.number().integer().positive().min(1).max(100).required(),
    startDate: joi.date().min('2010-01-01').iso().required(),
    endDate: joi.date().max('2020-12-30').iso().required(),
    projectDuration: joi.number().min(1).max(500).required(),
    totalProjectHours: joi.number().min(1).max(10000).required(),
    projectManager: joi.string().min(3).max(20).required(),
    projectDesc: joi.string().required(),
    password: joi.string().alphanum().min(4).required()
});
const updateManagerName = joi.object().keys({
    projectId: joi.number().integer().positive().min(1).max(100).required(),
    projectName: joi.string().alphanum().min(3).max(20).required(),
    startDate: joi.date().min('2010-01-01').iso().required(),
    endDate: joi.date().max('2020-12-30').iso().required(),
    projectDuration: joi.number().min(1).max(500).required(),
    totalProjectHours: joi.number().min(1).max(10000).required(),
    projectDesc: joi.string().required(),
    password: joi.string().alphanum().min(4).required()
});

module.exports = { postvalidation, updateId, updateManagerName, updateProjectName };
