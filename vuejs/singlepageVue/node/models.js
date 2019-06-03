const mongoose = require('mongoose');

var Schema = new mongoose.Schema({
    EmpId: { type: Number, required: true, unique: true },
    Name: { type: String, required: true },
    Role: { type: String, required: true },
    PreOrganization: { type: String, required: true },
});

var user = mongoose.model('Emp_schema', Schema);
module.exports = { user };