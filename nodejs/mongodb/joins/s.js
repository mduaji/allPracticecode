const Mongoclient = require('mongodb').MongoClient;

const url = "mongodb://localhost:27017/joins";

Mongoclient.connect(url, { useNewUrlParser: true }, (err, db) => {
    if (err) throw err;
    var dbo = db.db('joins');
    console.log('db connected')

    dbo.collection('stddata').aggregate([

        // Join with user_info table
        {
            $lookup: {
                from: "stdtbl",       // other table name
                localField: "emp_id",   // name of users table field
                foreignField: "std_id", // name of userinfo table field
                as: "emp_info"         // alias for userinfo table
            }
        },
        { $unwind: "$emp_info" },     // $unwind used for getting data in object or for one record only

        // Join with user_role table
        {
            $lookup: {
                from: "avgdb",
                localField: "emp_id",
                foreignField: "avg_id",
                as: "avg_role"
            }
        },
        { $unwind: "$avg_role" },
        // define some conditions here 
        // {
        //     $match: {
        //         $and: [{ "emp_name": "ajay" }]
        //     }
        // },

        // define which fields are you want to fetch
        {
            $project: {
                _id: "$stdtbl.std_id",
                name: '$stddata.emp_name',
                age: '$avgdb.dept'
            }
        }
    ]).toArray((err, res) => {
        if (err) throw err;
        console.log(JSON.stringify(res));
    });
})