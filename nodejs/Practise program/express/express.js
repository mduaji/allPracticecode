const express = require('express');
const bodyparser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const methodOverride = require('method-override');
const path = require('path');
const app = express();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
//app.use(express.static(path.resolve(__dirname, 'public')));
const url = 'mongodb://localhost:27017/student_db';
var db;

app.use(methodOverride('_method'));

MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
    if (err)
        console.log('connection error');
    else {
        console.log('db connect');
        db = client.db('student_db');
    }
});
//app.set('view engine', 'ejs');

app.get('/api', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
})

app.get('/api/stdtbl', (req, res) => {
    res.sendFile(path.join(__dirname + '/update1.html'));
})

app.get('/api/view', (req, res) => {

    db.collection('std_tbl').find({}).toArray((err, result) => {
        if (err)
            console.log('find error');
        else {
            // res.render('index.ejs', { std_tbl: result });
            res.json(result);
        }
    })
});

app.post('/api/post', (req, res) => {
    const inst_dtl = {

        id: parseInt(req.body.id),
        name: req.body.name
    }

    db.collection('std_tbl').insertOne((inst_dtl), (err, doc) => {
        if (err)
            console.log('insert error');
        else {
            res.redirect('/api/view');
        }
    });
});

app.put('/api/put/:id', (req, res) => {

    const _id = parseInt(req.params.id);
    const updt = { $set: { name: req.body.name } };

    db.collection('std_tbl').updateOne({ id: _id }, updt, (err, result) => {

        if (err)
            console.log('put is error');
        else {
            // res.json(result);
            res.redirect('/api/view');
        }
    });
});
app.delete('/api/delete/:id', (req, res) => {

    const _id = parseInt(req.params.id)

    db.collection('std_tbl').deleteOne({ id: _id }, (err, result) => {
        if (err)
            console.log('put is error');
        else {
            // res.json(result);
            res.redirect('/api/view');
        }
    });
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`server listen ${port}....`));