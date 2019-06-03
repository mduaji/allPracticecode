const express = require('express');
const app = express();
const path = require('path');
const bodyparser = require('body-parser');
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
const user = require('./Authentication/user');
const controller = require('./controller/controller');



app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname + '/router/index.html'));
});
app.get('/auth', (req, res) => {
    res.sendFile(path.join(__dirname + '/router/login.html'));
});
app.get('/Admin', (req, res) => {
    res.sendFile(path.join(__dirname + '/router/Admin.html'));
});


app.post("/api/v1/register", user.postRegister);
app.post("/api/v1/auth",user.postauth);
app.get('/api/v1/get',controller.getDtl);


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`The Server Listen Port ${port}....`));

module.exports = app;