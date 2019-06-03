const express = require("express");
const db = require('./dbcon.js');
const app = express();
app.use(express.json());

app.get("/api/std_dtl", (req, res) => {

    db.getdb().collection("std_tbl").find({}).toArray((err, result) => {
        if (err) {
            console.log("find is error");
        }
        else {
            res.json(result);
        }
    });
});
app.get("/api/std_dtl/:id", (req, res) => {

    const req_id = parseInt(req.params.id);

    db.getdb().collection("std_tbl").find({ _id: req_id }).toArray((err, result) => {
        if (err) {
            console.log("find is error");
        }
        else {
            res.json(result);
        }
    });
});
app.post("/api/std_dtl", (req, res) => {

    const std_inst_dtl = {
        _id: req.body._id,
        std_name: req.body.std_name,
        std_dept: req.body.std_dept,
        std_age: req.body.std_age
    };

    db.getdb().collection("std_tbl").insertOne(std_inst_dtl, (err, result) => {
        if (err) {
            console.log("post is error");
        }
        else {
            res.json(result);
        }
    });
});

app.put("/api/std_dtl/:id", (req, res) => {

    const req_id = parseInt(req.params.id);

    const updt_tbl = {
        $set: {
            std_name: req.body.std_name,
            std_dept: req.body.std_dept,
            std_age: req.body.std_age
        }
    }
    db.getdb().collection("std_tbl").updateOne({ _id: req_id }, updt_tbl, (err, result) => {
        if (err) {
            console.log("update is error");
        }
        else {
            res.json(result);
        }
    });
});
app.delete("/api/std_dtl/:id", (req, res) => {

    const req_id = parseInt(req.params.id);

    db.getdb().collection("std_tbl").deleteOne({ _id: req_id }, (err, result) => {
        if (err) {
            console.log("delete is error");
        }
        else {
            res.json(result);
        }
    });
});


db.connect((err) => {
    if (err) {
        console.log('db connection is error');
    }
    else {
        const port = process.env.PORT || 5000;
        app.listen(port, () => console.log(`the server listen ${port}......`));
    }
})


