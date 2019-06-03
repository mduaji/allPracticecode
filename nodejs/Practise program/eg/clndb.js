var MongoClient = require("mongodb").MongoClient;
MongoClient.connect("mongodb://localhost:27017/stddb",{ useNewUrlParser : true }, function (err, db) {
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
    dbs.collection("std_tbl").insertMany(std_dtl,function(err,res){
        if(err){
            console.log("the insert data is error");
        }
        console.log("the record insert")
    });
    dbs.collection("std_tbl").find({}).toArray(function(err,result){
        if(err){
            console.log("the list statement is error");
        }
        console.log(result);
    });
    var findqry = {_id : 4};
    dbs.collection("std_tbl").find(findqry).toArray(function(err,result){
        if(err){
            console.log("the find statement is error ");
        }
        console.log(result);
    });
    var myqry = {_id:4};
    var newqry ={$set: {std_name :"vengi",std_dept : "E&I"} };
    dbs.collection("std_db").updateOne(myqry,newqry,function(err,result){
        if(err){
            console.log("the update statement is error");
        }
        console.log("the statement is updated");
    });
    var dltqry = {_id : 9};
    dbs.collection("std_tbl").deleteOne(dltqry,function(err,dlt){
        if(err){
            console.log("the delete statement is error");
        }
        console.log("the id is deleted");
    });
    db.close();
});