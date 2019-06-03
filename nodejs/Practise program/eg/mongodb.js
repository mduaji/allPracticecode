const MongoClient = require("mongodb").MongoClient;

const url = "mongodb://localhost:27017/stddb";
const state = () => {
    dbs : null;
}
const connect = (cb) => {
    if (state.dbs) {
        cb();
    }
    else {
        MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
            if (err) {
                console.log("the connection is error");
            }
            else {
                console.log("the server connected");
                state.dbs = db.db("stddb");
                cb();
            }
        });
    }
}
const getdb = () => {
    return state.dbs;
};
module.exports = {getdb,connect};


