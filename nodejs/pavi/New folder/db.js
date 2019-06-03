var mysql = require('mysql');
var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'db'
})
// con.connect(function (err){
//     if(err) throw err;
//     console.log('connected');
//     con.query('create database db', (err, result) =>{
//         if(err) throw err;
//         console.log('database created');
//     })
// })
con.connect(function (err) {
    if(err) throw err;
    console.log('connected');
    let create = `create table employee(
        id INT(11) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        mobileno BIGINT NOT NULL,
        email VARCHAR(255) NOT NULL,
        projectid INT(11) NOT NULL,
        comments VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL
    )`
    con.query(create,(err, result) =>{
        if(err) throw err;
        console.log('table created')
    })
})
// con.connect(function (err) {
//     if (err) throw err;
//     var sql = "DROP TABLE Employee";
//     con.query(sql, function (err, result) {
//         if (err) throw err;
//         console.log("Table deleted");
//     });
// });