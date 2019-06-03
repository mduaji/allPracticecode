const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const user = require('./Authentication/user');
const controller = require('./controller/controller');
//To Parse the UrlEncoded data
app.use(bodyparser.urlencoded({ extended: true }));
//To parser the json datas
app.use(bodyparser.json());
//use middleware
app.use('/static', express.static('public'));

// app Handler to send response
app.post("/api/v1/register", user.postRegister);
app.post("/static/api/v1/auth", user.postAuth);
app.get("/api/v1/get", controller.getDtl);

//server listen port....
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`The Server Listen Port ${port}....`));

module.exports = app;