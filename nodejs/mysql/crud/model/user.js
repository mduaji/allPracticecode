var mysql = require('mysql')

var connection = mysql.createConnection({
    localhost: 'localhost',
    user: 'root',
    password: 'root',
    database: 'projectdb',
    // debug:true
})
module.exports = connection;