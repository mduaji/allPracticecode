const Mongoclient = require('mongodb').MongoClient;

const url = "mongodb://localhost:27017/joins";

//distinct
// Mongoclient.connect(url, { useNewUrlParser: true }, (err, db) => {
//     if (err) throw err;
//     var dbo = db.db("joins");
//     console.log('db connected');
//     dbo.collection('stddata').distinct('emp_id', function (err, res) {
//         console.log(res)
//     })
// })

//count
// Mongoclient.connect(url, { useNewUrlParser: true }, (err, db) => {
//     if (err) throw err;
//     var dbo = db.db("joins");
//     console.log('db connected');
//     dbo.collection('stddata').estimatedDocumentCount('emp_id', function (err, res) {
//         console.log(res)
//     })
// })
//max of value
// Mongoclient.connect(url,{useNewUrlParser:true},(err,db)=>{
//     if(err) throw err;
//     var dbo = db.db('joins');
//     console.log('db connected');
//     dbo.collection('stddata').aggregate([
//         {
//             $group:{
//                // _id:'$emp_id',
//                _id:null,
//                 max:{$max:'$emp_age'}
//             }
//         }
//     ]).toArray((err,res)=>{
//         if(err) throw err
//         console.log(res);
//     })
// })
//max of value =doubt
// Mongoclient.connect(url, { useNewUrlParser: true }, (err, db) => {
//     if (err) throw err;
//     var dbo = db.db('joins');
//     console.log('db connected');
//     dbo.collection('stddata').find({}).sort({ $emp_age: -1 }).limit(1),(err, res) => {
//         if (err) throw err
//         console.log(res);
//     }
// })
// Mongoclient.connect(url,{useNewUrlParser:true},(err,db)=>{
//     if(err) throw err;
//     var dbo = db.db('joins');
//     console.log('db connected');
//     dbo.collection('stddata').aggregate([
//         {
//             $group:{
//                // _id:'$emp_id',
//                _id:null,
//                 max:{$min:'$emp_age'}
//             }
//         }
//     ]).toArray((err,res)=>{
//         if(err) throw err
//         console.log(res);
//     })
// })
