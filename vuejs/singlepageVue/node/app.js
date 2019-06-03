const express = require('express');
const router = express();
const db = require('./models');
const bodyParser = require('body-parser');
const joi = require('joi');
const schema = require('./joi');
var cors = require('cors');
router.use(cors());


router.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    next();
});

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/api/v1/get', (req, res) => {
    db.user.find({}, (err, result) => {
        res.send(result);
    });
})
router.post('/api/v1/post', (req, res) => {
   // const emp = parseInt(req.body.EmpId)
    // const Details = {
    //     EmpId: emp,
    //     Name: req.body.Name,
    //     Role: req.body.Role,
    //     PreOrganization: req.body.PreOrganization
    // };
    const objdata = req.body
    console.log(objdata)
    joi.validate(objdata, (err, result) => {
        if (err) {
            return res.status(404).send(err);
        }
        else {
            db.user.create(result, (err, user) => {
                // if (!user) {
                //     return res.status(404).send("This id is already in use.");
                // }
                if (err) return res.status(404).send(err);
                res.json(user);
            })
        }
    })
});

router.delete('/api/v1/delete/:EmpId', (req, res) => {
    const Id = req.params.EmpId;
    db.user.deleteOne({ EmpId: Id }, (err, user) => {
        if (user.n == 0) {
            return res.status(404).send("The given id is not found for delete request.");
        }
        res.json(user);
    });
})


const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/Emp_project", { useCreateIndex: true, useNewUrlParser: true, useFindAndModify: false }, function (err, db) {
    console.log("connected");
});
const port = process.env.PORT || 5000;
router.listen(port, () => {
    console.log(`Server connected on ${port}`);
})
module.exports = router;