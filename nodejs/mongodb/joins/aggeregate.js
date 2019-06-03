const Mongoclient = require('mongodb').MongoClient;

const url = "mongodb://localhost:27017/joins";

// Mongoclient.connect(url, { useNewUrlParser: true }, (err, db) => {
//     if (err) throw err;
//     var dbo = db.db("joins");
//     console.log('db connected');
//     dbo.collection('avgdb').aggregate([
//         { $match: { name: 'aji' } },
//         {
//             $project: {
//                 avg_id: 1, name: 1, age1: 1, age2: 1, dept: 1,
//                 avgage: { $avg: ['$age1', '$age2'] }
//             }
//         }
//     ]).toArray((err,result)=>{
//         if(err)
//         throw err
//         else{
//             console.log(result);
//         }
//     })
// })
Mongoclient.connect(url, { useNewUrlParser: true }, (err, db) => {
    if (err) throw err;
    var dbo = db.db("joins");
    console.log('db connected');
    dbo.collection('stddata').mapReduce(
        function () { emit(this.emp_name, this.emp_age) },
        function (key,values) { Array.sum(values) },
        {
            query: { 'emp_dept': 'cricket' },
            out: 'order_totals'
        }
     )
    dbo.collection('order_totals').find({}).toArray((err,res)=>{
        console.log(res)
    })

})
//})