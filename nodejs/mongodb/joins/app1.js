const Mongoclient = require('mongodb').MongoClient;

const url = "mongodb://localhost:27017/joins";

// Mongoclient.connect(url, { useNewUrlParser: true }, (err, db) => {
//     if (err) throw err;
//     var dbo = db.db("joins");
//     console.log('db connected');
//     dbo.collection('stddata').mapReduce(
//         function () { emit(this.emp_id, this.emp_age) },
//         function (key, value) { return Array.sum(value) },
//         {
//             query: { emp_dept: 'cricket' },
//             out: 'ordered details'
//         }
//     )((err, res) => {
//         if (err) throw err
//         else {
//             //console.log(JSON.stringify(res));
//             console.log(res);
//         }
//     })
// })


//using aggregate
// Mongoclient.connect(url, { useNewUrlParser: true }, (err, db) => {
//     if (err) throw err;
//     var dbo = db.db("joins");
//     console.log('db connected');
//     dbo.collection('stddata').aggregate([
//         { $match: { emp_dept: 'cricket' } }, {
//             $group: {
//                 _id: '$emp_id', total_age: { $sum: '$emp_age' }
//             }
//         }
//     ]).toArray((err, res) => {
//         if (err) throw err
//         else {
//             //console.log(JSON.stringify(res));
//             console.log(res);
//         }
//     });
// })



// Mongoclient.connect(url, { useNewUrlParser: true }, (err, db) => {
//     if (err) throw err;
//     var dbo = db.db("joins");
//     console.log('db connected');
//     dbo.collection('stddata').aggregate([
//         {
//             $project: {
//                 emp_age: { $max: '$emp_age' }
//                 , emp_name: 1
//                 , emp_dept: 1
//             }
//         }, {
//             $sort: { 'emp_age': -1 }
//         }, {
//             $limit: 4
//          }//, {
//         //     $match: { 'emp_name': 'anu' }
//         // }
//     ]).toArray((err, res) => {
//         if (err) throw err
//         else {
//             //console.log(JSON.stringify(res));
//             console.log(res);
//         }
//     });
// })



// Mongoclient.connect(url, { useNewUrlParser: true }, (err, db) => {
//     if (err) throw err;
//     var dbo = db.db("joins");
//     console.log('db connected');
//     dbo.collection('stddata').find({}).sort({ 'emp_age': -1 }).skip(2).limit(1).toArray((err, res) => {
//         if (err) throw err
//         else {
//             console.log(res);
//         }
//     });
// })