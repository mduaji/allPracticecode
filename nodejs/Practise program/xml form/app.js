const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');
const app = express();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
const db = require('./model.js');

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/get.html'));
})
app.get('/api', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
})

app.get('/api/v1/view', (req, res) => {
    db.getdb().collection('std_tbl').find({}).toArray((err, result) => {
        if (err)
            console.log('get method err');
        else
            res.json(result);
    });
});
app.get('/api/v1/get/:id', (req, res) => {
    const req_id = parseInt(req.params.id);
    db.getdb().collection('std_tbl').find({ id: req_id }).toArray((err, result) => {
        if (err)
            console.log('get method err');
        else
            res.json(result);
    });
});
app.post('/api/v1/post/', (req, res) => {
    const inst_dtl = {
        id: parseInt(req.body.id),
        name: req.body.name
    }
    db.getdb().collection('std_tbl').insertOne(inst_dtl, (err, result) => {
        if (err)
            console.log('get method err');
        else
            res.json(result);
    });
});
app.put('/api/v1/put/:id', (req, res) => {
    const req_id = parseInt(req.params.id);
    const req_nm = { $set: { name: req.body.name } };

    db.getdb().collection('std_tbl').updateOne({ id: req_id }, req_nm, (err, result) => {
        if (err)
            console.log('put method err');
        else
            res.json(result);
    });
});
app.delete('/api/v1/delete/:id', (req, res) => {
    const req_id = parseInt(req.params.id);
    db.getdb().collection('std_tbl').deleteOne({ id: req_id }, (err, result) => {
        if (err)
            console.log('delete method err');
        else
            res.json(result);
    });
});
db.connect((err) => {
    if (err)
        console.log('db connection is error');
    else {
        console.log('db connect');
    }
})

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`server listen port ${port}...`));