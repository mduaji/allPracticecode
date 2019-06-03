const Mongoclient = require('mongodb').MongoClient;

const url = "mongodb://localhost:27017/joins";

Mongoclient.connect(url, { useNewUrlParser: true }, (err, db) => {
    if (err) throw err;
    var dbo = db.db("joins");
    console.log('db connected');
    dbo.collection('stdtbl').aggregate([
        {
            $lookup:
            {
                from: 'stddata',
                localField: 'std_id',
                foreignField: 'emp_id',
                as: 'alldetails'
            }
        }
    ]).toArray((err, res) => {
        if (err) throw err
        else {
            console.log(JSON.stringify(res));
            // console.log(res);
        }
    })
})
