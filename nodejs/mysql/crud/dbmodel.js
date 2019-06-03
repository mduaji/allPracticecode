const mysql = require('mysql');

const con = mysql.createConnection({
    localhost: 'localhost',
    user: 'root',
    password: 'root',
    database: 'projectdb'
})

// con.connect(function(err){
//     if(err)throw err
//     con.query('CREATE DATABASE projectdb',function(err,result){
//         if(err)throw err
//         console.log('db created')
//     })
// })

con.connect(function (err) {
    if (err) throw err
    var sql = "create table emptbl(id int(10) PRIMARY KEY,name varchar(255),age int(3),address varchar(255),password varchar(255))"
    con.query(sql, function (err, result) {
        if (err) throw err
        console.log('tbl created')
    })
})
