var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dbConnect = () => {
    mongoose.set('useCreateIndex', true);
    //use connect method to connect the server
    mongoose.connect("mongodb://localhost:27017/db1", { useNewUrlParser: true }, (err) => {
        console.log('db connected');
    });
}
//create schema 
const prjTbl = new Schema({
    Id: { type: Number, required: true },
    Name: { type: String, required: true },
    Status: { type: String, required: true }
});

const user = mongoose.model('vue', prjTbl);
//exports the modules
module.exports = { dbConnect, user };