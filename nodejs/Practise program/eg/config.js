const express = require("express");
const app = express();
const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017/stddb";

var std_dtl = [
    { _id: 1, std_name: "Ajith", std_dept: "IT", std_age: 24 },
    { _id: 2, std_name: "kavin", std_dept: "IT", std_age: 25 },
    { _id: 3, std_name: "Aravinth", std_dept: "ECE", std_age: 25 },
    { _id: 4, std_name: "Arun", std_dept: "CSC", std_age: 24 },
    { _id: 5, std_name: "Anu", std_dept: "CSC", std_age: 25 },
    { _id: 6, std_name: "Aajy", std_dept: "IT", std_age: 24 },
    { _id: 7, std_name: "Pavithra", std_dept: "EEE", std_age: 24 },
    { _id: 8, std_name: "Devi", std_dept: "IT", std_age: 23 },
    { _id: 9, std_name: "Joy", std_dept: "ECE", std_age: 24 },
    { _id: 10, std_name: "Dani", std_dept: "CSC", std_age: 23 }
];

app.get('/', (req, res) => {
    MongoClient.connect(url, { useNewUrlParser: true }).then(db => {

        var dbo = db.db("stddb");
        dbo.collection("std_tbl").find({}).toArray( (err) => {
            if (err) {
                console.log("select statement error");
            }
        });
        res.send();
    });
});

var server = app.listen(5000, () => {
    console.log('Node server is running..');
});