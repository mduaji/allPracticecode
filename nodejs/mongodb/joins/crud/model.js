const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/joins";
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
                state.db = client.db("joins");
                cb();
            }
        })
    }
};

const getdb = () => {

    return state.db;
}

module.exports = { connect, getdb };
