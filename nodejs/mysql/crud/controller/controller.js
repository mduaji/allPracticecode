const con = require('../model/user');
const bcrypt = require('bcryptjs')

const get = (req, res) => {
    var sql = "SELECT * FROM emptbl";
    con.query(sql, (err, result) => {
        if (!result)
            res.status(404).json('get method is Error')
        else {
            res.status(200);
            res.json(result);
        }
    })
};
const getId = (req, res) => {
    // if (req.query.id) {
    // var id = req.query.id;
    var id = req.query.hasOwnProperty('id') ? req.query.id : 0;
    var name = req.query.hasOwnProperty('name') ? req.query.name : '';
    console.log(id, name);
    var sql = "call select_query_sp(?,?)";
    //var sql = "SELECT * FROM emptbl where id = ?";
    con.query(sql, [id, name], (err, result) => {
        if (!result.length > 0)
            res.status(404).json('get the id is error')
        else {
            res.json(result);
        }
    });
};

const post = (req, res) => {
    //var sql = "INSERT INTO emptbl set ?"
    var sql = 'call post_query_sp(?,?,?,?,?)'
    var hash = bcrypt.hashSync(req.body.password, 10);
    // var value = {
    //     id: req.body.id,
    //     name: req.body.name,
    //     age: req.body.age,
    //     address: req.body.address,
    //     password: hash
    // }
    con.query(sql, [req.body.id, req.body.name, req.body.age, req.body.address, hash], (err, result) => {
        if (!result)
            res.status(404).json('post the detail is error');
        else {
            res.json(result);
        }
    });
};

const putId = (req, res) => {
    //if (req.query.id) {
    // var id = req.query.id;
    // var sql = "UPDATE emptbl SET ? where id =?";
    var id = req.query.hasOwnProperty('id') ? req.query.id : 0;
    var name = req.query.hasOwnProperty('name') ? req.query.name : '';
    var sql = 'call put_query_sp(?,?,?,?,?);'
    var hash = bcrypt.hashSync(req.body.password, 10);
    // var value = {
    //     name: req.body.name,
    //     age: req.body.age,
    //     address: req.body.address,
    //     password: hash
    // };
    if (!id == 0) {
        con.query(sql, [id, req.body.name, req.body.age, req.body.address, hash], (err, result) => {
            console.log(result);
            if (result.affectedRows == 0)
                res.status(404).json('put id is error');
            else {
                res.status(200);
                res.json(result);
            }
        });
    }
    else if (id == 0) {
        con.query(sql, [req.body.id, name, req.body.age, req.body.address, hash], (err, result) => {
            console.log(result);
            if (result.affectedRows == 0)
                res.status(404).json('put id is error');
            else {
                res.status(200);
                res.json(result);
            }
        });
    }
};

const deleteId = (req, res) => {
    // if (req.query.id) {
    //     var id = req.query.id;
    //var sql = "DELETE FROM emptbl where id =?";
    var id = req.query.hasOwnProperty('id') ? req.query.id : 0;
    var name = req.query.hasOwnProperty('name') ? req.query.name : '';
    var sql = 'call delete_query_sp(?,?);'
    con.query(sql, [id, name], (err, result) => {
        if (result.affectedRows == 0)
            res.status(404).json('delete by id is error');
        else {
            res.status(200);
            res.json(result);
        }
    });
};
con.connect((err) => {
    if (err)
        console.log('db connection error');
    else {
        console.log('db connected');
    }
});

module.exports = { get, getId, putId, post, deleteId }
