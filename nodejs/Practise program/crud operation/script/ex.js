const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const db = require("./mongos.js")

app.use('/api', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
app.get('/api/view',(req,res)=>{
   db.user.find({},(err,doc)=>{
       if(err)
       res.json(err);
       else
       res.render('index',{users:doc})
   }) 
})
app.post('/api/std_dtl', (req, res) => {
    new user({
        std_id: req.body.std_id,
        std_name: req.body.std_name,
        std_dept: req.body.std_dept,
        std_age: req.body.std_age
    }).db.std_tbl.save((err, doc) => {
        if (err)
            res.json(err);
        else
            res.send("success");
    })

})
db.connect((err) => {
    if (err)
        console.log('db connection is error');
    else
        console.log("db connect")
})
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`the server listen ${port}......`));
