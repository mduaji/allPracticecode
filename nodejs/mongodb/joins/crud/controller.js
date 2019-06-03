const db = require('./model.js');
//var setdate =Date.now();
var setdate = new Date;

const get_dtl = (req, res) => {

    db.getdb().collection("stddata").find({}).toArray((err, result) => {
        if (err) {
            console.log("find is error");
        }
        else {
            res.json(result);
        }
    });
}
/*const getID = (req, res) => {
    const req_id = parseInt(req.params.id);

    db.getdb().collection("std_tbl").find({ _id: req_id }).toArray((err, result) => {
        if (err) {
            console.log("find is error");
        }
        else {
            res.json(result);
        }
    });
};*/
const post_dtl = (req, res) => {

    const std_inst_dtl = {
        id: req.body.id,
        name: req.body.name,
        dept: req.body.dept,
        age: req.body.age,
        date:setdate
    };

    db.getdb().collection("datedb").insertOne(std_inst_dtl, (err, result) => {
        if (err) {
            console.log("post is error");
        }
        else {
            res.json(result);
        }
    });
}
/*const put_dtl = (req, res) => {
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
}
const delete_dtl = (req, res) => {
    const req_id = parseInt(req.params.id);

    db.getdb().collection("std_tbl").deleteOne({ _id: req_id }, (err, result) => {
        if (err) {
            console.log("delete is error");
        }
        else {
            res.json(result);
        }
    });
}*/

db.connect((err) => {
    if (err)
        console.log('db connection is error');
    else {
        console.log('db connect');
    }
})
//module.exports = { get_dtl, getID, post_dtl, put_dtl, delete_dtl }
module.exports = { get_dtl, post_dtl }