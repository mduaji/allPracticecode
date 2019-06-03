const Mongoclient = require('mongodb').MongoClient;

const url = "mongodb://localhost:27017/joins";

Mongoclient.connect(url, { useNewUrlParser: true }, (err, db) => {
    if (err) throw err
    var dbo = db.db('joins');
    console.log('db connected');
    dbo.collection('datedb').aggregate([{
        $match:{'name':'abi'}
    },
        {
            $project: {
                year: { $year: '$date' },
                month: { $month: '$date' },
                day: { $dayOfMonth: '$date' },
                hours: { $hour: '$date' },
                mint: { $minute: '$date' },
                second: { $second: '$date' },
                millisecond: { $millisecond: '$date' },
                dayofyear: { $dayOfYear: '$date' },
                dayofweek: { $dayOfWeek: '$date' },
                week: { $week: '$date' }
                , name: -1
                , dept: 1
                , datesub: { $floor: { $divide: [{ $subtract: [new Date, '$date'] }, 24 * 3600] } }
            }
        }
    ]).toArray((err, res) => {
        if (err) throw err
        console.log(res);
    })
})