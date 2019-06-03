const express = require('express');
var mysql = require('mysql');
const app = express();
const router = require('./router')
var  bodyParser = require('body-parser');
app.use(bodyParser.json());
const routers = require('./authcontroller');

app.use(routers);
app.use(router);
//app.use(con);
app.listen(5000, () =>{
    console.log('server listening on port');
});
module.exports = app;