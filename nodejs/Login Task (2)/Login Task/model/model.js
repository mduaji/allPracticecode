const mysql = require('mysql');

const connection = mysql.createConnection({
    localhost: 'localhost',
    user: 'root',
    password: 'root',
    database: 'logindb'
});

module.exports = connection;