const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/stddb";
var _db;
module.exports = {
    connectToServer: (cb) => {

        MongoClient.connect(url, (err, client) => {
            _db = client.db("stddb");
            return cb(err);
        });
    },
    getdb: () => {
        return _db;
    }
}

//module.exports = { dbconnect };
