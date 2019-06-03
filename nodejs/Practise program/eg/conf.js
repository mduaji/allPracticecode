const express = require("express");
const app = express();
const MongoClient = require("mongodb").MongoClient;
const bodyParser = require ('body-parser');
MongoClient.connect("mongodb://localhost:27017/stddb", { useNewUrlParser: true }, function (err, db) {
    if (err) {
        console.log("Error");
    }
    console.log("the server connected");
    var dbs = db.db("stddb");
    app.get('/', (req, res) => {
        
            dbs.collection("std_tbl").find({}).toArray((err, res) => {
                if (err) {
                    console.log(" List statement is error");
                }
                console.log(res);
                db.close();
            });
        
    });

   app.get('/:id', (req, res) => {
        
            const id = req.params.id;
            dbs.collection("std_tbl").find({ _id: id }).toArray((err, res) => {
                if (err) {
                    console.log("Find statement is error ");
                }
                console.log(res);
            });

        
    });
        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(bodyParser.json());
    app.post('/post', (req, res) => { 
           var std_name = req.body.std_name;
           var std_dept = req.body.std_dept;
           var std_age  = req.body.std_age;

        console.log(response);
        res.end(JSON.stringify(response));
    })
});
/*app.delete('/delete',(req,res)=>{
    {
        var dltqry = { _id: 9 };
        dbs.collection("std_tbl").deleteOne(dltqry, () => {
            if (err) {
                console.log("the delete statement is error");
            }
            console.log("The id is deleted:");
        });
    }
});*/

var server = app.listen(5000, () => {
    console.log('Node server is running..');
});

