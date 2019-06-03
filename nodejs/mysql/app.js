var mysql = require('mysql');

var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'mydb'
});
// con.connect(function(err){
//     if(err)throw err
//     console.log('db connected');
//     con.query('CREATE DATABASE mydb',function(err,result){
//         if(err)throw err
//         console.log('db created');
//     });
// });
// con.connect(function(err){
//         if(err)throw err
//         console.log('db connected');
//         con.query("INSERT INTO customers(name,address) values ('arun','trichy')",function(err,result){
//             if(err)throw err
//             console.log(result.affectedRows);
//         });
//     });
// con.connect(function (err) {
//                         if (err) throw err
//                         console.log('db connected');
//                         var sql = "create table stdtbl (name varchar(255),address varchar(255))"
//                         con.query(sql, function (err, result) {
//                             if (err) throw err
//                             console.log(result);
//                         });
//                     });
con.connect(function (err) {
    if (err) throw err
    console.log('db connected');
    var sql = "INSERT INTO stdtbl (name,address) values ?";
    var val = [
        ['ajay','madurai'],
        ['abi','selam'],
        ['anu','cumbam'],
        ['ajith','vizga'],
        ['pavi','karur']
    ]
    con.query(sql,[val], function (err, result) {
        if (err) throw err
        console.log(result.affectedRows);
    });
});
// con.connect(function (err) {
//         if (err) throw err
//         console.log('db connected');
//         var sql = "INSERT INTO customers(name,address) values ('akil','theni')"
//         con.query(sql, function (err, result) {
//             if (err) throw err
//             console.log(result.insertId);
//         });
//     });
// con.connect(function (err) {
//             if (err) throw err
//             console.log('db connected');
//             var sql = "select * from customers"
//             con.query(sql, function (err, result,fields) {
//                 if (err) throw err
//                 console.log(result);
//             });
//         });
// con.connect(function (err) {
//                 if (err) throw err
//                 console.log('db connected');
//                 var sql = "select * from customers where address='chennai'"
//                 con.query(sql, function (err, result) {
//                     if (err) throw err
//                     console.log(result);
//                 });
//             });
// con.connect(function (err) {
//                     if (err) throw err
//                     console.log('db connected');
//                     var sql = "select * from customers where address Like 'c%'"
//                     con.query(sql, function (err, result) {
//                         if (err) throw err
//                         console.log(result);
//                     });
//                 });
// con.connect(function (err) {
//                         if (err) throw err
//                         console.log('db connected');
//                         var add='chennai'
//                         var sql = "select * from customers where address="+mysql.escape(add)
//                         con.query(sql, function (err, result) {
//                             if (err) throw err
//                             console.log(result);
//                         });
//                     });
// con.connect(function (err) {
//                         if (err) throw err
//                         console.log('db connected');
//                         var sql = "select * from customers where address='chennai' or name='abi'"
//                         con.query(sql, function (err, result) {
//                             if (err) throw err
//                             console.log(result);
//                         });
//                     });
// con.connect(function (err) {
//                         if (err) throw err
//                         console.log('db connected');
//                         var sql = "select * from customers  order by address"
//                         con.query(sql, function (err, result) {
//                             if (err) throw err
//                             console.log(result);
//                         });
//                     });
// con.connect(function (err) {
//                         if (err) throw err
//                         console.log('db connected');
//                         var sql = "delete from customers where name='abi'"
//                         con.query(sql, function (err, result) {
//                             if (err) throw err
//                             console.log(result.affectedRows);
//                         });
//                     });
// con.connect(function (err) {
//                         if (err) throw err
//                         console.log('db connected');
//                         var sql = "drop table if exists customers"
//                         con.query(sql, function (err, result) {
//                             if (err) throw err
//                             console.log(result);
//                         });
//                     });
con.connect(function (err) {
                        if (err) throw err
                        console.log('db connected');
                        var sql = "update customers set name = 'ajith' where name ='ajay'"
                        con.query(sql, function (err, result) {
                            if (err) throw err
                            console.log(result.affectedRows);
                        });
                    });
// con.connect(function (err) {
//     if (err) throw err
//     console.log('db connected');
//     var sql = "select * from customers limit 3"
//     con.query(sql, function (err, result) {
//         if (err) throw err
//         console.log(result);
//     });
// });
// con.connect(function (err) {
//     if (err) throw err
//     console.log('db connected');
//     var sql = "select * from customers limit 1,3"
//     con.query(sql, function (err, result) {
//         if (err) throw err
//         console.log(result);
//     });
// });
// con.connect(function (err) {
//     if (err) throw err
//     console.log('db connected');
//     var sql = "select c.name,c.address,s.name,s.address from customers c join stdtbl s on c.name = s.name"
//     con.query(sql, function (err, result) {
//         if (err) throw err
//         console.log(result);
//     });
// });
// var user = {
//     name: req.sanitize('name').escape().trim(),
//     age: req.sanitize('age').escape().trim(),
//     email: req.sanitize('email').escape().trim()
// }