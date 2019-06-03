const express = require('express');
const app = express();
const router = require('../Employee/routes/router');


var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

router(app);

var authController = require('./auth/authcontroller');
app.use('/api/auth', authController)

const mongoose = require('mongoose');
//This  create a database and connect to mongodb server runnig on port : 27017.
mongoose.connect("mongodb://localhost:27017/EmployeeDb", {useCreateIndex : true, useNewUrlParser: true }, function (err, db) {
    console.log("connected");
});

// we will make server configuration on the specified port.
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server connected on ${port}`);
})
module.exports = app;