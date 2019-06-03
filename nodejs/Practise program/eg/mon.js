const express = require("express");
const connectdb = require("./mongodb.js");
const app = express();
app.use(express.json());
const collection ="std_tbl";


app.get("/api/std_dtl", (req, res) => {

    connectdb.getdb().collection(collection).find({}).toArray((err, result) => {
        if (err) {
            console.log("find is error");
        }
        else {
            res.json(result);
        }
    });
});
/*app.get("/api/std_dtl/:id", (req, res) => {
    MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
        if (err) {
            console.log("db connect is error");
        }
        else {
            console.log("the server is connected");
        }
        const dbs = db.db("stddb");
        const req_id = parseInt(req.params.id);
        dbs.collection("std_tbl").find({ _id: req_id }).toArray((err, result) => {
            if (err) {
                console.log("find is error");
            }
            else {
                res.json(result);
            }
            db.close();
        });
    });
});
app.post("/api/std_dtl", (req, res) => {
    MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
        if (err) {
            console.log("db connect is error");
        }
        else {
            console.log("the server is connected");
        }
        const std_in_dtl = {
            _id: req.body._id,
            std_name: req.body.std_name,
            std_dept: req.body.std_dept,
            std_age: req.body.std_age
        };
        const dbs = db.db("stddb");
        dbs.collection("std_tbl").insertOne(std_in_dtl, (err, result) => {
            if (err) {
                console.log("post is error");
            }
            else {
                res.json(result);
            }
            db.close();
        });
    });
});
app.put("/api/std_dtl/:id", (req, res) => {
    MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
        if (err) {
            console.log("db connect is error");
        }
        else {
            console.log("the server is connected");
        }
        const dbs = db.db("stddb");
        const req_id = parseInt(req.params.id);
        const updt_tbl = {
            $set: {
                std_name: req.body.std_name,
                std_dept: req.body.std_dept,
                std_age: req.body.std_age
            }
        }
        dbs.collection("std_tbl").updateOne({ _id: req_id }, updt_tbl, (err, result) => {
            if (err) {
                console.log("update is error");
            }
            else {
                res.json(result);
            }
            db.close();
        });
    });
});
app.delete("/api/std_dtl/:id", (req, res) => {
    MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
        if (err) {
            console.log("db connect is error");
        }
        else {
            console.log("the server is connected");
        }
        const dbs = db.db("stddb");
        const req_id = parseInt(req.params.id);
        dbs.collection("std_tbl").deleteOne({ _id: req_id }, (err, result) => {
            if (err) {
                console.log("delete is error");
            }
            else {
                res.json(result);
            }
            db.close();
        });
    });
});*/
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`the server listen ${port}......`));

