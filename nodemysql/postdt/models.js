var mysql = require('mysql');
var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'EmployeeDb'
})
con.connect(function (err) {
    if(err) throw err;
    console.log('connected');
    let create = `create table employee(
        EmpId INT(11) PRIMARY KEY,
        Name VARCHAR(255) NOT NULL,
        Role VARCHAR(255) NOT NULL,
        PreOrganization VARCHAR(255) NOT NULL
    )`
    con.query(create,(err, result) =>{
        if(err) throw err;
        console.log('table created')
    })
})
// if (err) {
                    //     return con.rollback(function () {
                    //         throw err;
                    //     });
                    // }
                    // console.log('Changed ' + result.changedRows + ' results');
                    // con.commit(function (err) {
                    //     console.log('Commiting transaction.....');
                    //     if (err) {
                    //         return con.rollback(function () {
                    //             throw err;
                    //         });
                    //     }
                    //     console.log('Transaction Complete.');
                    //     con.end();
                    //     //callback(null, result);
                    // });