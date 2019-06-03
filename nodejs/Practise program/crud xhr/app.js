const express = require('express');
const bodyparser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const path = require('path');
const app = express();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
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
    res.sendFile(path.join(__dirname + '/getid.html'));
})
app.get('/api/get', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
})

app.get('/api/v1/view', (req, res) => {

    db.collection('std_tbl').find({}).toArray((err, result) => {
        if (err)
            console.log('find error');
        else {
            res.json(result);
        }
    })
});
app.get('/api/v1/get/:id', (req, res) => {

    const req_id = parseInt(req.params.id);
    console.log(req_id);

    db.collection('std_tbl').find({ id: req_id }).toArray((err, result) => {
        if (err)
            console.log()
        else
            res.json(result);
    })
})
// app.post('/api/v1/post', (req, res) => {
//     const inst_one = {
//         id: parseInt(req.body.id),
//         name: req.body.name
//     }
//     db.collection('std_tbl').insertOne(inst_one, (err, result) => {
//         if (err)
//             console.log('post method err');
//         else
//             res.redirect('/api/v1/view');
//     })
// })
// app.put('/api/v1/put/:id', (req, res) => {

//     const req_id = parseInt(req.params.id);
//     const updt_one = {
//         name: req.body.name
//     }
//     console.log(req_id);
    
//     db.collection('std_tbl').updateOne(req_id, updt_one, (err, result) => {
//         if (err)
//             console.log('put method error');
//         else
//             res.redirect('/api/v1/view');
//     })
// })
// app.delete('/api/v1/delete/:id', (req, res) => {

//     const req_id = parseInt(req.params.id);

//     console.log(req_id);

//     db.collection('std_tbl').deleteOne(req_id, (err, result) => {
//         if (err)
//             console.log("delete method error");
//         else
//             res.redirect('/api/v1/view');
//     })
// })
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`server listen ${port}....`));