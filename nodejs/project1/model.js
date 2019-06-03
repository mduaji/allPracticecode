var mongoose = require('mongoose');

const Schema = mongoose.Schema;

const dbConnect = () => {
    mongoose.connect("mongodb://localhost:27017/prj_mng_db", { useNewUrlParser: true }, (err) => {
        if (err)
            console.log('db connection error');
        else
            console.log('db connected');
    });
}
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
const user = mongoose.model('prjmngtbl', prjTbl);

module.exports = { dbConnect, user };