var MongoClient = require("mongodb").MongoClient;
MongoClient.connect("mongodb://localhost:27017/stddb", { useNewUrlParser: true }, function (err, db) {
    if (err) {
        console.log("Error");
    }
    console.log("the server connected");
    var dbs = db.db("stddb");
    var std_dtl = [
        { _id: 1, std_name: "Ajith", std_dept: "IT", std_age: 24 },
        { _id: 2, std_name: "Ajith", std_dept: "IT", std_age: 25 },
        { _id: 3, std_name: "Aravinth", std_dept: "ECE", std_age: 25 },
        { _id: 4, std_name: "Arun", std_dept: "CSC", std_age: 24 },
        { _id: 5, std_name: "Anu", std_dept: "CSC", std_age: 25 },
        { _id: 6, std_name: "Aajy", std_dept: "IT", std_age: 24 },
        { _id: 7, std_name: "Pavithra", std_dept: "EEE", std_age: 24 },
        { _id: 8, std_name: "Devi", std_dept: "IT", std_age: 23 },
        { _id: 9, std_name: "Joy", std_dept: "ECE", std_age: 24 },
        { _id: 10, std_name: "Dani", std_dept: "CSC", std_age: 23 }
    ];
    var ReadLine = require("readline-sync");
    var operation = ReadLine.question("Enter the operation");
    switch (operation) {
        case "insert":
            {
                dbs.collection("std_tbl").insertMany(std_dtl, function (err, res) {
                    if (err) {
                        console.log("the insert data is error");
                    }
                    console.log("the record insert")
                });
            }
        case "find_all":
            {
                dbs.collection("std_tbl").find({}).toArray(function (err, result) {
                    if (err) {
                        console.log("the list statement is error");
                    }
                    console.log(result);
                });
            }
        case "select":
            {
                var findqry = { _id: 4 };
                dbs.collection("std_tbl").find(findqry).toArray(function (err, result) {
                    if (err) {
                        console.log("the find statement is error ");
                    }
                    console.log(result);
                });
            }
        case "update":
            {
                var myqry = { _id: 4 };
                var newqry = { $set: { std_name: "vengi", std_dept: "E&I" } };
                dbs.collection("std_db").updateOne(myqry, newqry, function (err, result) {
                    if (err) {
                        console.log("the update statement is error");
                    }
                    console.log("the statement is updated");
                });
            }
            case "update_all":
            {
                var myqry = { std_name :/^A/ };
                var newqry = { $set: { std_name: "The name changed"} };
                dbs.collection("std_db").updateMany(myqry, newqry, function (err, result) {
                    if (err) {
                        console.log("the update statement is error");
                    }
                    console.log("the statement is updated");
                });
            }
        case "delete":
            {
                var dltqry = { _id: 9 };
                dbs.collection("std_tbl").deleteOne(dltqry, function (err, dlt) {
                    if (err) {
                        console.log("the delete statement is error");
                    }
                    console.log("the id is deleted");
                });
            }
            case "delete_many":
            {
                var dltqry = { std_name : /^A/ };
                dbs.collection("std_tbl").deleteMany(dltqry, function (err, dlt) {
                    if (err) {
                        console.log("the delete statement is error");
                    }
                    console.log("the id is deleted");
                });
            }
            case "drop":
            {
                dbs.collection("std_tbl").drop(function (err, dlt) {
                    if (err) {
                        console.log("the delete statement is error");
                    }
                    console.log("the collection is drop");
                });
            }
        };
            db.close();
    });
