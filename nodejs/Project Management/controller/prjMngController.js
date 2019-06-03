//db is require from  the database connection
const db = require('../model/dbconnection');

const getDtl = (req, res) => {

    //db is used to connect the database
    //find method get the all collection details 
    db.user.find({}, (err, result) => {
        if (err)
            console.log(err);
        else
            //the json responce will be get
            res.json(result);
    })
}
const getID = (req, res) => {

    //convert incoming id string to number
    let req_id = parseInt(req.params.id);

    //get the particular collection id
    db.user.find({ projectId: req_id }, (err, result) => {
        if (err)
            console.log(err);
        else
            //the json responce will be get
            res.json(result);
    })
}
const postDtl = (req, res) => {

    //create method insert the details to the collection
    db.user.create({
        projectId: req.body.projectId,
        projectName: req.body.projectName,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        projectDuration: req.body.projectDuration,
        totalPrjHours: req.body.totalPrjHours,
        prjManager: req.body.prjManager,
        prjDesc: req.body.prjDesc
    }, (err, result) => {
        if (err)
            console.log('post method err');
        else
            //the json responce will be get
            res.json(result);
    });
}
const putDtl = (req, res) => {

    //convert incoming id string to number
    let req_id = parseInt(req.params.id);

    let data = {
        projectName: req.body.projectName,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        projectDuration: req.body.projectDuration,
        totalPrjHours: req.body.totalPrjHours,
        prjManager: req.body.prjManager,
        prjDesc: req.body.prjDesc
    };

    //this details will update in particular id
    //updateOne method used to update data
    db.user.updateOne({ projectId: req_id }, data, (err, result) => {
        if (err)
            console.log('update method err');
        else
            //the json responce will be get
            res.json(result);
    })
}
const dlteDtl = (req, res) => {
    //convert incoming id string to number
    let req_id = parseInt(req.params.id);

    //deleteOne method used to delete particular id details
    db.user.deleteOne({ projectId: req_id }, (err, result) => {
        if (err)
            console.log('delete method err');
        else
            //the json responce will be get
            res.json(result);
    })
}

//database connection 
db.dbConnect((err) => {

    if (err)
        console.log('db connection is error');
    else {
        console.log('database connected');
    }
})

//exports the module
module.exports = { getDtl, getID, postDtl, putDtl, dlteDtl };