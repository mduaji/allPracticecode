const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const state = () => {
    db: null;
}
const connect = (cb) => {
    mongoose.connect("mongodb://localhost:27017/stddbs", { useNewUrlParser: true }, (err) => {
        if (err)
            console.log(err);
        else {
            console.log("db connected");
        }
    });
}
const std_tbl = new Schema({
    std_id :Number,
    std_name:String,
    std_dept:String,
    std_age:Number

})
const user = mongoose.model('std_tb', std_tbl);

module.exports = { connect,user };
