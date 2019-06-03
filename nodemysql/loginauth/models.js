const mysql = require('mysql');

//mysql connection
const connection = mysql.createConnection({
    localhost: 'localhost',
    user: 'root',
    password: 'root',
    database: 'logindb'
});

//exports module
module.exports = connection;

// create table datadb (Name varchar(255),Email varchar(255),MobileNo int,Age int,Address varchar(255),Password varchar(255));

// create unique index uni_index on datadb(Email);
// create database logindb;

// drop database logindb;