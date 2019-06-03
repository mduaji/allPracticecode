const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/stddb";
const state = () => {
    db: null;
}
const connect = (cb) => {
    if (state.db)
        cb();
    else {
        MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
            if (err) {
                console.log("db connection is error");
            }
            else {
                console.log("db is connected");
                state.db = client.db("stddb");
                cb();
            }
        })
    }
};
const getdb = () => {
    return state.db;
}

module.exports = { connect, getdb };
