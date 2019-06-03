var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
const db = require('./model.js')

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.resolve(__dirname, 'public')));

app.post('/api/std_dtl', (req, res) => {
   db.getdb((db) => {
        delete req.body._id;
        db.collection('dtl').insertOne(req.body);
    });
    res.send(JSON.stringify(req.body));
});

app.get('/api/view', (req, res) => {
    dbConn.then((db) => {
        db.collection('dtl').find({}).toArray().then((result) => {
            res.status(200).json(result);
        });
    });
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server listen ${port}....`))