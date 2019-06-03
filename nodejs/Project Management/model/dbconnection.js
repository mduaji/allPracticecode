//imports the mongoose module
var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dbConnect = () => {
    //use connect method to connect the server
    mongoose.connect("mongodb://localhost:27017/prj_mng_db", { useNewUrlParser: true }, (err) => {
        if (err)
            console.log('db connection error');
        else
            console.log('db connected');
    });
}
//create schema 
const prjTbl = new Schema({
    projectId: { type: Number, required: true, unique: true },
    projectName: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    projectDuration: { type: Number, required: true },
    totalPrjHours: { type: Number, required: true },
    prjManager: { type: String, required: true },
    prjDesc: { type: String, required: true }
});
//we need to create module using it
const user = mongoose.model('prjmngtbl', prjTbl);
//exports the module
module.exports = { dbConnect, user };
