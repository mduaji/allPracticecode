const express = require('express');
const app = express();
const http = require ('http'); 
const mongoose = require('mongoose');
//const db = require('./mongos.js')
const bodyParser = require("body-parser");
const path = require("path");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

mongoose.connect("mongodb://localhost:27017/mydb", { useNewUrlParser: true }, (err) => {
    if (err)
        console.log(err);
    else {
        console.log("db connected");
    }
});
const stdSchema = new mongoose.Schema({
    std_id: Number,
    std_name: String,
    std_dept: String,
    std_age: Number
});

const User = mongoose.model('std_dtl', stdSchema);

app.get('/api/view', (req, res) => {
    User.find({}, (err, doc) => {
        if (err)
            res.json(err);
        else
            res.render('index', { users: doc });
    })
})

app.post('/api/std_dtl', (req, res) => {
    new User({
        std_id: req.body.std_id,
        std_name: req.body.std_name,
        std_dept: req.body.std_dept,
        std_age: req.body.std_age
    }).save((err, doc) => {
        if (err)
            res.json(err);
        else
            res.json(doc);
        //res.redirect('/api/view');
    })

})

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server listen ${port}....`))