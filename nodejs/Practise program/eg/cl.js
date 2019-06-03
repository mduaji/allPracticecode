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
    var operation = ReadLine.question("Enter the operation  :");
    switch (operation) {
        case "insert":
            {
                dbs.collection("std_tbl").insertMany(std_dtl, (err,res) => {
                    if (err) {
                        console.log("the insert data is error");
                    }
                    console.log("Record insert count" + res.insertedCount);
                    console.log("Record insert");
                });
            }
            break;
        case "select_all":
            {
                dbs.collection("std_tbl").find({}).toArray((err,res) => {
                    if (err) {
                        console.log(" List statement is error");
                    }
                    console.log(res);
                });
               
            }
            break;
        case "select":

            {
                var id = ReadLine.question("enter the id")
                 while(id < std_dtl.length)
                {
                var myqry =std_dtl[id];
                }
                
                dbs.collection("std_tbl").find(myqry).toArray((err,res) => {
                    if (err) {
                        console.log("Find statement is error ");
                    }
                    console.log(res);
                });
              
            }
            break;
        case "update":
            { 
            while(i<std_dtl.length)
                {
                var myqry =std_dtl[i];
                }
                var newqry = { $set: { std_name: "vengi", std_dept: "E&I" } };
                dbs.collection("std_db").updateOne(myqry, newqry, () => {
                    if (err) {
                        console.log("the update statement is error");
                    }
                    console.log("The statement is updated");
                });
            }
            break;
        case "delete":
            {
                var dltqry = { _id: 9 };
                dbs.collection("std_tbl").deleteOne(dltqry, () => {
                    if (err) {
                        console.log("the delete statement is error");
                    }
                    console.log("The id is deleted:");
                });
            }
            break;
        case "drop":
            {
                dbs.collection("std_tbl").drop(() => {
                    if (err) {
                        console.log("the drop statement is error");
                    }
                    console.log("The collection is drop:");
                });
            }
            break;
        default:
            {
                console.log("Invalid operation");
            }
    };
    db.close();
});

