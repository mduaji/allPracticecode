const express = require('express');
const bodyparser = require('body-parser');
const app = express();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));

const router = require('./router');

router(app);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`the server listen ${port}......`));

module.exports = app;