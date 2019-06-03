const express = require('express');
const bodyparser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
//const methodOverride = require('method-override');
const path = require('path');
const app = express();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
//app.use(express.static(path.resolve(__dirname, 'public')));
const url = 'mongodb://localhost:27017/student_db';
var db;

MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
    if (err)
        console.log('connection error');
    else {
        console.log('db connect');
        db = client.db('student_db');
    }
});
app.get('/api', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
})
app.get('/api/view', (req, res) => {

    db.collection('std_tbl').find({}).toArray((err, result) => {
        if (err)
            console.log('find error');
        else {
            res.json(result);
        }
    })
});
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`server listen ${port}....`));