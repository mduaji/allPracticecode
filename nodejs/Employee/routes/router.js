const express = require('express');
//router object include methods for routing http request.
const router = express();
const controller = require('../controllers/controller');
const verifyToken = require("../auth/verifyToken");


module.exports = function (app) {

    // This is used to read all objects in a collection.
    router.get('/api',verifyToken, controller.getEmployee);
    // This is used to read the objects of specified Id in a collection.
    router.get('/api/Employee/',verifyToken, controller.getEmployeeById);

    // This is used to create a new object in a collection.
    router.post('/api', verifyToken, controller.postEmployee);

    // This is used to update an existing object in a collection.
    router.put('/api/Employee/',verifyToken, controller.putEmployee);

    // This is used to delete the object of a specified Id in a collection.
    router.delete('/api/Employee/',verifyToken, controller.delEmployee);

    app.use(router);
}