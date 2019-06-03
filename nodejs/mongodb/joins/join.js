const Mongoclient = require('mongodb').MongoClient;

const url = "mongodb://localhost:27017/joins";

Mongoclient.connect(url, { useNewUrlParser: true }, (err, db) => {
    if (err) throw err;
    var dbo = db.db('joins');
    console.log('db connected')

    dbo.collection('stddata').aggregate([{
        $lookup: {
            from: 'stdtbl',
            localField: 'emp_id',
            foreignField: 'std_id',
            as: 'std_info'
        }
    },
    { $unwind: "$std_tbl" }, {
        $lookup: {
            from: 'avgdb',
            localField: 'emp_id',
            foreignField: 'id',
            as: 'avg_db'
        }
    }, { $unwind: '$avg_db' },
    {
        $match: {
            $and: [{ 'name': 'aji' }]
        }
    },
    {
        $project: {
            id: '$avgdb.id',
            name: '$avgdb.name',
            age: '$stddata.emp_age',
            dept: '$stdtbl.std_dept'
        }
    }
    ]).toArray((err, res) => {
        if (err) throw err;
        console.log(res);
    })
})