const Mongoclient = require('mongodb').MongoClient;

const url = "mongodb://localhost:27017/joins";

// Mongoclient.connect(url, { useNewUrlParser: true }, (err, db) => {
//     if (err) throw err;
//     var dbo = db.db('joins');
//     console.log('db connected');
//     dbo.collection('avgdb').aggregate([
//         {
//             $project: {
//                 avg: { $avg:['$age1','$age2']}
//             }
//         }
//     ]).toArray((err,res)=>{
//         if(err) throw err
//         console.log(res);
//     })
// });
//ceil method round the value
// Mongoclient.connect(url, { useNewUrlParser: true }, (err, db) => {
//     if (err) throw err;
//     var dbo = db.db('joins');
//     console.log('db connected');
//     dbo.collection('avgdb').aggregate([
//         {
//             $project: {
//                 _id: null,
//                 avg: { $ceil: '$age1' }

//             }
//         }
//     ]).toArray((err, res) => {
//         if (err) throw err
//         console.log(res);
//     })
// });
//sort each department first value
// Mongoclient.connect(url, { useNewUrlParser: true }, (err, db) => {
//     if (err) throw err;
//     var dbo = db.db('joins');
//     console.log('db connected');
//     dbo.collection('avgdb').aggregate([
//         {
//             $group: {
//                 _id: '$id',
//                 avg: { $first: '$age1' }

//             }
//         }
//     ]).toArray((err, res) => {
//         if (err) throw err
//         console.log(res);
//     })
// });