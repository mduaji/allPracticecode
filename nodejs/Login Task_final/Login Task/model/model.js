const mysql = require('mysql');

const connection = mysql.createConnection({
    localhost: 'localhost',
    user: 'root',
    password: 'RootUser@123',
    database: 'logindb'
});

module.exports = connection;